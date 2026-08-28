"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ProjectItem } from "@/types/project";

type WorkCardProps = {
    item: ProjectItem;
    onClick?: () => void;
    variant?: "gallery" | "featured";
    index?: number;
};

export function WorkCard({ item, onClick, variant = "gallery", index }: WorkCardProps) {
    const featured = variant === "featured";

    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                "group relative shrink-0 overflow-hidden border border-border/50 bg-muted text-left cursor-pointer transition-[border-color,transform,box-shadow] duration-700 ease-out hover:border-foreground/25 hover:-translate-y-1 hover:shadow-2xl hover:shadow-foreground/5",
                featured
                    ? "w-full aspect-16/10 md:aspect-video"
                    : "w-full xl:w-[min(38vw,36rem)] xl:shrink-0 aspect-4/3",
            )}
        >
            <div className="absolute inset-0 z-0">
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes={featured ? "(max-width: 1280px) 100vw, 60vw" : "(max-width: 1280px) 85vw, 38vw"}
                    loading={featured ? "eager" : "lazy"}
                    draggable={false}
                    className={cn(
                        "object-cover transition-all duration-1000 ease-out group-hover:scale-[1.04] pointer-events-none",
                        featured
                            ? "opacity-80 grayscale-[0.35] group-hover:opacity-100 group-hover:grayscale-0"
                            : "opacity-60 grayscale group-hover:opacity-100 group-hover:grayscale-0",
                    )}
                />
                <div className="absolute inset-0 bg-linear-to-t from-background via-background/35 to-transparent" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,119,106,0.24),transparent_46%)] opacity-0 transition-opacity duration-700 dark:group-hover:opacity-100" />
                    <div className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-primary shadow-[0_0_18px_var(--coral)] transition-transform duration-700 ease-out group-hover:scale-x-100" />
            </div>

            <div className="absolute inset-0 z-10 flex flex-col justify-between p-5 md:p-8 xl:p-10">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col items-start gap-3">
                        <div className="flex items-center gap-3">
                            {typeof index === "number" && (
                                <span className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground/70">
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                            )}
                            <span className="text-[10px] md:text-xs font-mono tracking-[0.22em] text-muted-foreground uppercase">
                                {item.category}
                            </span>
                        </div>
                        {item.status && (
                            <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-background/80 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-primary backdrop-blur-sm">
                                <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_currentColor]" />
                                {item.status}
                            </span>
                        )}
                    </div>
                    <span className="font-mono text-[10px] md:text-xs tracking-[0.18em] text-muted-foreground">
                        {item.year}
                    </span>
                </div>

                <h3
                    className={cn(
                        "font-black tracking-tighter uppercase text-foreground pointer-events-none transition-opacity duration-500",
                        featured
                            ? "text-5xl md:text-6xl xl:text-7xl 2xl:text-8xl opacity-90"
                            : "text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl opacity-25 group-hover:opacity-100",
                    )}
                >
                    {item.title}
                </h3>
            </div>
        </button>
    );
}
