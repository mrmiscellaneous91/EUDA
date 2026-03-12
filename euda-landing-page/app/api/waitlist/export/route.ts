import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

const redis = new Redis({
    url: process.env.KV_REST_API_URL!,
    token: process.env.KV_REST_API_TOKEN!,
});

export async function GET(request: NextRequest) {
    // Simple secret-based auth to protect the export
    const secret = request.nextUrl.searchParams.get("secret");
    if (secret !== process.env.EXPORT_SECRET) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        // Get all emails with their scores (timestamps)
        const results = await redis.zrange("waitlist:emails", 0, -1, {
            withScores: true,
        });

        // Build CSV with city from user hash
        let csv = "Email,City,Signed Up\n";

        for (let i = 0; i < results.length; i += 2) {
            const email = results[i] as string;
            const timestamp = results[i + 1] as number;
            const date = new Date(timestamp).toISOString();
            const userInfo = await redis.hgetall(`waitlist:user:${email}`);
            const city = (userInfo as Record<string, string>)?.city || "Unknown";
            csv += `${email},${city},${date}\n`;
        }

        return new NextResponse(csv, {
            headers: {
                "Content-Type": "text/csv",
                "Content-Disposition": `attachment; filename="euda-waitlist-${new Date().toISOString().split("T")[0]}.csv"`,
            },
        });
    } catch (error) {
        console.error("Export error:", error);
        return NextResponse.json(
            { error: "Failed to export data." },
            { status: 500 }
        );
    }
}
