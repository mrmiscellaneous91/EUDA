"use client";

import { useState, FormEvent } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

export function WaitlistForm({ id }: { id?: string }) {
    const t = useTranslations("waitlist");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (!email.trim()) return;

        setStatus("loading");
        try {
            const res = await fetch("/api/waitlist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, city }),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus("success");
                setMessage(data.message);
                setEmail("");
                setCity("");
            } else {
                setStatus("error");
                setMessage(data.error);
            }
        } catch {
            setStatus("error");
            setMessage("Something went wrong. Please try again.");
        }

        setTimeout(() => {
            setStatus("idle");
            setMessage("");
        }, 5000);
    }

    if (status === "success") {
        return (
            <div id={id} className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-3 px-6 py-4 bg-success/10 text-success rounded-2xl border border-success/20 font-semibold text-center">
                    <CheckCircle2 size={20} className="shrink-0" />
                    {message}
                </div>
            </div>
        );
    }

    return (
        <div id={id} className="flex flex-col items-center gap-4 w-full">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-2 w-full max-w-2xl p-1.5 bg-card rounded-2xl border border-border shadow-lg focus-within:border-primary/40 transition-all"
            >
                <input
                    type="email"
                    placeholder={t("placeholder")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 px-5 py-3 bg-transparent outline-none text-base font-medium min-w-0"
                />
                <div className="hidden sm:block w-px h-8 bg-border/50 self-center" />
                <input
                    type="text"
                    placeholder={t("cityPlaceholder")}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="flex-1 px-5 py-3 bg-transparent outline-none text-base font-medium min-w-0"
                />
                <button
                    type="submit"
                    disabled={status === "loading"}
                    className="px-6 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-[#0e44b0] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group whitespace-nowrap text-base disabled:opacity-70"
                >
                    {status === "loading" ? (
                        <>
                            <Loader2 size={18} className="animate-spin" />
                            {t("joining")}
                        </>
                    ) : (
                        <>
                            {t("button")}
                            <ArrowRight
                                size={18}
                                className="group-hover:translate-x-1 transition-transform"
                            />
                        </>
                    )}
                </button>
            </form>

            {status === "error" && (
                <p className="text-destructive text-sm font-medium">{message}</p>
            )}
        </div>
    );
}
