import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

const redis = new Redis({
    url: process.env.KV_REST_API_URL!,
    token: process.env.KV_REST_API_TOKEN!,
});

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const email = body.email?.trim()?.toLowerCase();

        if (!email || !EMAIL_REGEX.test(email)) {
            return NextResponse.json(
                { error: "Please enter a valid email address." },
                { status: 400 }
            );
        }

        // Check if already subscribed
        const exists = await redis.zscore("waitlist:emails", email);
        if (exists !== null) {
            return NextResponse.json(
                { message: "You're already on the waitlist! We'll be in touch soon." },
                { status: 200 }
            );
        }

        // Store email with timestamp as score (for ordering)
        await redis.zadd("waitlist:emails", {
            score: Date.now(),
            member: email,
        });

        // Increment counter
        const count = await redis.zcard("waitlist:emails");

        return NextResponse.json(
            {
                message: "Welcome to the waitlist! We'll be in touch soon.",
                count,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Waitlist error:", error);
        return NextResponse.json(
            { error: "Something went wrong. Please try again." },
            { status: 500 }
        );
    }
}
