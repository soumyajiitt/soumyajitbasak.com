"use client";

import { ArrowUpRight, Check, Copy, Mail, MoveUpRight, Radio, Sparkles } from "lucide-react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "@/providers/language-provider";
import { BlurReveal } from "@/components/effects/blur-reveal";
import { ShineButton } from "@/components/ui/shine-button";

export default function Contact() {
    const { content, dict } = useLanguage();
    const [copied, setCopied] = useState(false);
    const pointerX = useMotionValue(50);
    const pointerY = useMotionValue(50);
    const smoothX = useSpring(pointerX, { stiffness: 120, damping: 20 });
    const smoothY = useSpring(pointerY, { stiffness: 120, damping: 20 });
    const glowX = useTransform(smoothX, (value) => `${value}%`);
    const glowY = useTransform(smoothY, (value) => `${value}%`);
    const glow = useMotionTemplate`radial-gradient(circle at ${glowX} ${glowY}, color-mix(in srgb, var(--coral) 14%, transparent), transparent 32%)`;

    const updatePointer = (event: React.PointerEvent<HTMLDivElement>) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        pointerX.set(((event.clientX - bounds.left) / bounds.width) * 100);
        pointerY.set(((event.clientY - bounds.top) / bounds.height) * 100);
    };

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(content.contact.email);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1800);
        } catch {
            setCopied(false);
        }
    };

    return (
        <section className="relative pt-24 md:pt-32 xl:pt-48 bg-background overflow-hidden border-t border-border/50">

            <div className="container mx-auto px-container relative z-10">

                <div className="flex flex-col items-center text-center max-w-5xl mx-auto">

                    <div className="flex flex-col gap-4 mb-16 lg:mb-32">
                        <BlurReveal>
                            <span className="title-counter">
                                [006]
                            </span>
                        </BlurReveal>

                        <BlurReveal>
                            <h2 className="title">
                                {dict.title.contact}
                            </h2>
                        </BlurReveal>
                        <BlurReveal>
                            <p className="text-lg mt-3 max-w-xl italic font-medium tracking-tight text-foreground/60">
                                {dict.contactIntroText}
                            </p>
                        </BlurReveal>
                    </div>
                </div>

                <motion.div
                    onPointerMove={updatePointer}
                    onPointerLeave={() => {
                        pointerX.set(50);
                        pointerY.set(50);
                    }}
                    className="relative flex flex-col w-full max-w-5xl mx-auto mb-12 sm:mb-24 xl:mb-40 border-t border-border/50 overflow-hidden"
                >
                    <motion.div
                        aria-hidden="true"
                        className="pointer-events-none absolute -inset-32 opacity-70"
                        style={{ background: glow }}
                    />
                    <BlurReveal>
                        <a
                            href={`mailto:${content.contact.email}`}
                            className="group relative flex flex-col md:flex-row md:items-center justify-between py-10 md:py-14 border-b border-border/50 transition-all duration-700 hover:px-8"
                        >
                            <span className="mb-4 md:mb-0 flex items-center gap-3 text-sm font-mono tracking-widest text-muted-foreground uppercase transition-colors duration-500 group-hover:text-foreground">
                                <Mail className="size-4 text-primary transition-transform duration-500 group-hover:-rotate-12" />
                                {dict.sendEmail}
                            </span>
                            <div className="flex items-center gap-8">
                                <span className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-foreground transition-all duration-500 group-hover:text-primary group-hover:scale-[1.02] origin-left md:origin-right">
                                    {content.contact.email}
                                </span>
                                <div className="size-10 rounded-full border border-border/50 items-center justify-center bg-background group-hover:bg-foreground group-hover:border-foreground transition-all duration-700 shrink-0 opacity-0 -translate-x-8 group-hover:opacity-100 group-hover:translate-x-0 hidden md:flex">
                                    <ArrowUpRight className="w-6 h-6 text-foreground group-hover:text-background transition-colors duration-500" />
                                </div>
                            </div>
                        </a>
                    </BlurReveal>
                    <BlurReveal>
                        <motion.a
                            href="https://cal.com/soumyajit-basak"
                            target="_blank"
                            rel="noreferrer"
                            whileHover={{ y: -4 }}
                            whileTap={{ scale: 0.99 }}
                            transition={{ type: "spring", stiffness: 260, damping: 22 }}
                            className="group relative grid overflow-hidden border-b border-border/50 bg-foreground text-background transition-shadow duration-700 hover:shadow-[0_18px_45px_rgba(25,24,23,0.18)] sm:grid-cols-[minmax(150px,0.7fr)_1.7fr_auto]"
                        >
                            <div className="relative flex min-h-32 flex-col justify-between overflow-hidden bg-primary p-6 text-primary-foreground sm:min-h-40 sm:p-7">
                                <div className="relative z-10 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.2em]">
                                    <span>Cal.com</span>
                                    <Radio className="size-3.5 animate-pulse" />
                                </div>
                                <span aria-hidden="true" className="relative z-10 text-6xl font-black leading-none tracking-tighter transition-transform duration-700 group-hover:translate-x-2">15<span className="ml-1 text-xl font-medium tracking-normal">min</span></span>
                                <span aria-hidden="true" className="absolute -bottom-10 -right-3 text-[10rem] font-black leading-none tracking-tighter text-primary-foreground/15 transition-transform duration-1000 group-hover:-translate-x-2">+</span>
                            </div>
                            <div className="relative flex min-h-32 flex-col justify-center gap-3 px-6 py-7 sm:min-h-40 sm:px-8">
                                <span className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-background/60"><span className="size-1.5 rounded-full bg-primary animate-pulse" />Best way to connect</span>
                                <span className="text-2xl font-semibold tracking-tight sm:text-3xl">Let&apos;s find a good time.</span>
                                <span className="text-xs leading-relaxed text-background/55">Choose a quiet window for a quick conversation, a new idea, or a project worth making.</span>
                            </div>
                            <div className="relative flex min-h-20 items-center justify-between gap-5 border-t border-background/10 px-6 py-5 sm:min-h-40 sm:flex-col sm:items-end sm:justify-between sm:border-l sm:border-t-0 sm:px-5 sm:py-6">
                                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-background/50">Pick a slot</span>
                                <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-background/20 transition-all duration-500 group-hover:rotate-45 group-hover:border-primary group-hover:bg-primary group-hover:text-foreground">
                                    <ArrowUpRight className="size-5" />
                                </span>
                            </div>
                        </motion.a>
                    </BlurReveal>
                    <BlurReveal>
                        <div className="group relative flex flex-col md:flex-row md:items-center justify-between py-10 md:py-14 border-b border-border/50 transition-all duration-700 hover:px-8">
                            <span className="mb-4 md:mb-0 flex items-center gap-3 text-sm font-mono tracking-widest text-muted-foreground uppercase transition-colors duration-500 group-hover:text-foreground">
                                <Radio className="size-4 text-primary animate-pulse" />
                                {dict.directLine}
                            </span>
                            <div className="flex items-center gap-4 sm:gap-8">
                                <span className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-foreground transition-all duration-500 group-hover:text-primary group-hover:scale-[1.02] origin-left md:origin-right">
                                    {content.contact.phone}
                                </span>
                                <span className="hidden sm:inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-primary">
                                    <span className="size-1.5 rounded-full bg-primary animate-ping" />
                                    Soon
                                </span>
                            </div>
                        </div>
                    </BlurReveal>
                    <div className="relative z-10 flex flex-wrap items-center justify-center gap-4 pt-5">
                        <button type="button" onClick={copyEmail} className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
                            {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5 transition-transform group-hover:rotate-12" />}
                            {copied ? "Email copied" : "Copy email"}
                        </button>
                        <span className="text-border">/</span>
                        <span className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
                            <Sparkles className="size-3.5 text-primary" />
                            Open to good ideas
                        </span>
                    </div>
                </motion.div>

                <div className="w-full flex flex-col md:flex-row items-center justify-between pb-12 xl:py-12 xl:border-t border-border/50 gap-8">

                    <div className="text-sm font-mono tracking-widest text-muted-foreground uppercase flex items-center gap-4 max-xl:hidden">
                        <span>© 2026</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                        <span>SOUMYAJIT BASAK. {dict.allRightsReserved}</span>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-4">
                        {content.social.map((link: { label: string; href: string }) => (
                            <BlurReveal key={link.label}>
                                <ShineButton
                                    href={link.href}
                                    className="h-14 px-8"
                                    shineClassName="w-6 bg-background/20 dark:bg-background/20"
                                >
                                    <span className="relative z-10 flex items-center gap-3 text-sm font-medium tracking-widest uppercase">
                                        {link.label}
                                        <MoveUpRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                                    </span>
                                </ShineButton>
                            </BlurReveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
