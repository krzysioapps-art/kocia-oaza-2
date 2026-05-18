// app/components/bazarek/Countdown.tsx

"use client";

import { useEffect, useState } from "react";

type Props = {
    endsAt: string;
    compact?: boolean;
};

type TimeLeft = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
};

export default function Countdown({
    endsAt,
    compact = false,
}: Props) {
    const [mounted, setMounted] =
        useState(false);

    const [timeLeft, setTimeLeft] =
        useState<TimeLeft | null>(null);

    useEffect(() => {
        setMounted(true);

        const calculateTimeLeft =
            (): TimeLeft | null => {
                const difference =
                    new Date(endsAt).getTime() -
                    Date.now();

                if (difference <= 0) {
                    return null;
                }

                return {
                    days: Math.floor(
                        difference /
                        (1000 * 60 * 60 * 24)
                    ),

                    hours: Math.floor(
                        (difference /
                            (1000 * 60 * 60)) %
                        24
                    ),

                    minutes: Math.floor(
                        (difference /
                            (1000 * 60)) %
                        60
                    ),

                    seconds: Math.floor(
                        (difference / 1000) % 60
                    ),
                };
            };

        setTimeLeft(calculateTimeLeft());

        const interval = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () =>
            clearInterval(interval);
    }, [endsAt]);

    if (!mounted) {
        return null;
    }

    if (!timeLeft) {
        return (
            <div className="countdown countdown--ended">
                Aukcja zakończona
            </div>
        );
    }

    return (
        <div
            className={`
            countdown
            ${compact ? "countdown--compact" : ""}
        `}
        >
            <div className="countdown__item">
                <strong>{timeLeft.days}</strong>
                <span>dni</span>
            </div>

            <div className="countdown__item">
                <strong>{timeLeft.hours}</strong>
                <span>godz</span>
            </div>

            <div className="countdown__item">
                <strong>{timeLeft.minutes}</strong>
                <span>min</span>
            </div>

            <div className="countdown__item">
                <strong>{timeLeft.seconds}</strong>
                <span>sek</span>
            </div>
        </div>
    );
}