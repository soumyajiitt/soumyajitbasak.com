"use client";

import Image from "next/image";
import { useMemo } from "react";
import { useLanguage } from "@/providers/language-provider";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { flattenStackCatalog, resolveStackIcons } from "@/lib/stack-icons";
import type { StackItem } from "@/types/stack";

export function StackLogos({ names }: { names: string[] }) {
    const { content } = useLanguage();
    const catalog = useMemo(
        () => flattenStackCatalog(content.stack as Record<string, StackItem[]> | undefined),
        [content.stack],
    );
    const items = useMemo(() => resolveStackIcons(names, catalog), [names, catalog]);

    if (items.length === 0) return null;

    return (
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            {items.map((item) => (
                <HoverCard key={item.name} openDelay={50} closeDelay={50}>
                    <HoverCardTrigger asChild>
                        <div className="group flex items-center gap-2.5 py-1 shrink-0 cursor-default">
                            {item.icon ? (
                                <div className="transition-all duration-500 ease-out opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110">
                                    <Image
                                        src={item.icon}
                                        alt={item.name}
                                        width={18}
                                        height={18}
                                        unoptimized={item.icon.endsWith(".svg")}
                                    />
                                </div>
                            ) : (
                                <span className="h-2 w-2 rounded-full bg-muted-foreground/40" />
                            )}
                            <span className="text-xs tracking-wide text-muted-foreground transition-colors duration-500 ease-out group-hover:text-foreground">
                                {item.name}
                            </span>
                        </div>
                    </HoverCardTrigger>
                    <HoverCardContent
                        side="top"
                        align="center"
                        className="w-auto p-4 flex flex-col items-center justify-center gap-3 bg-background/95 backdrop-blur-xl border border-border/50 shadow-2xl rounded-2xl overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />
                        {item.icon && (
                            <div className="relative p-3 rounded-xl bg-secondary/50 ring-1 ring-border/50 shadow-inner">
                                <Image
                                    src={item.icon}
                                    alt={item.name}
                                    width={32}
                                    height={32}
                                    className="drop-shadow-lg"
                                    unoptimized={item.icon.endsWith(".svg")}
                                />
                            </div>
                        )}
                        <span className="text-sm font-bold tracking-[0.15em] uppercase text-foreground">
                            {item.name}
                        </span>
                    </HoverCardContent>
                </HoverCard>
            ))}
        </div>
    );
}
