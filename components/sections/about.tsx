"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BriefcaseBusiness, Compass, GraduationCap, Hammer, Move3d } from "lucide-react";
import { BlurReveal } from "@/components/effects/blur-reveal";
import { useLanguage } from "@/providers/language-provider";
import { useState } from "react";
import { HangingProfile } from "@/components/widgets/hanging-profile";

export default function About() {
    const { content, dict } = useLanguage();
    const [activeMoment, setActiveMoment] = useState("work");
    const [orbitTilt, setOrbitTilt] = useState({ x: 0, y: 0 });

    const moments = {
        work: {
            label: "EXA AG",
            kicker: "WHERE I AM",
            title: "Building for people who depend on the details.",
            text: "I contribute to enterprise platforms and internal products, improving reusable React components and turning complex requirements into dependable tools.",
            icon: BriefcaseBusiness,
            color: "var(--coral)",
        },
        foundation: {
            label: "FOUNDATION",
            kicker: "WHAT SHAPED ME",
            title: "A technical foundation with a human center.",
            text: "My B.Tech in Electronics & Communication Engineering taught me to think across systems. Coursework in design, networks, and fundamentals keeps that thinking grounded.",
            icon: GraduationCap,
            color: "var(--gold)",
        },
        making: {
            label: "FLOWPI",
            kicker: "WHAT I AM MAKING",
            title: "Learning by giving an idea somewhere to live.",
            text: "FlowPi is my JIRA-like project management application. Building it with React, Next.js, Hono.js, Appwrite, and Redux is how I deepen the craft beyond client work.",
            icon: Hammer,
            color: "var(--mint)",
        },
        direction: {
            label: "NEXT",
            kicker: "WHERE I AM GOING",
            title: "From polished surfaces to stronger foundations.",
            text: "I am moving toward backend development and system design, with a focus on professional software, reusable libraries, and simple tools that solve practical problems.",
            icon: Compass,
            color: "var(--coral)",
        },
    } as const;
    const selectedMoment = moments[activeMoment as keyof typeof moments];
    const MomentIcon = selectedMoment.icon;

    const handleOrbitMove = (event: React.PointerEvent<HTMLDivElement>) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        setOrbitTilt({
            x: ((event.clientX - bounds.left) / bounds.width - 0.5) * 8,
            y: ((event.clientY - bounds.top) / bounds.height - 0.5) * -8,
        });
    };

    return (
        <section className="w-full container-void bg-background text-foreground overflow-hidden relative">
            <div className="container mx-auto px-container">
                <div className="flex flex-col xl:flex-row gap-12 xl:gap-32">

                    <div className="xl:w-1/4">
                        <div className="flex flex-col gap-4 sticky top-32">

                            <BlurReveal>
                                <span className="title-counter">
                                    [001]
                                </span>
                            </BlurReveal>

                            <BlurReveal>
                                <h2 className="title relative z-10">
                                    {dict.title.about}
                                </h2>
                            </BlurReveal>

                            <BlurReveal>
                                <div className="mt-8 hidden xl:block">
                                    <HangingProfile />
                                </div>
                            </BlurReveal>

                        </div>
                    </div>

                    <div className="xl:w-3/4 flex flex-col gap-24">

                        <div className="space-y-12">

                            <BlurReveal>
                                <h3 className="text-3xl md:text-5xl lg:text-6xl font-light leading-[1.1]">
                                    {content.about.intro}
                                </h3>
                            </BlurReveal>

                            <BlurReveal>
                                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                                    {content.about.description}
                                </p>
                            </BlurReveal>

                            <BlurReveal>
                                <div
                                    className="relative border-y-2 border-foreground py-8 md:py-12"
                                    onPointerMove={handleOrbitMove}
                                    onPointerLeave={() => setOrbitTilt({ x: 0, y: 0 })}
                                >
                                    <div className="mb-8 flex items-end justify-between gap-4">
                                        <div>
                                            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/45">A living timeline</span>
                                            <p className="mt-2 max-w-xs text-sm text-foreground/60">Four points that explain how I work, learn, and keep moving.</p>
                                        </div>
                                        <Move3d className="hidden size-5 text-foreground/30 sm:block" aria-hidden="true" />
                                    </div>

                                    <div className="grid gap-8 lg:grid-cols-[minmax(220px,0.8fr)_1.2fr] lg:items-center">
                                        <motion.div
                                            className="relative mx-auto aspect-square w-full max-w-[280px] rounded-full border border-foreground/15"
                                            animate={{ rotateX: orbitTilt.y, rotateY: orbitTilt.x }}
                                            transition={{ type: "spring", stiffness: 180, damping: 20 }}
                                            style={{ transformStyle: "preserve-3d" }}
                                        >
                                            <div className="absolute inset-[18%] rounded-full border border-dashed border-foreground/20" />
                                            <motion.div className="absolute inset-[34%] rounded-full bg-foreground" animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
                                            {Object.entries(moments).map(([key, moment], index) => {
                                                const angle = index * 90 - 90;
                                                const isActive = activeMoment === key;
                                                const Icon = moment.icon;
                                                return <button key={key} type="button" aria-label={`Show ${moment.label}`} aria-pressed={isActive} onClick={() => setActiveMoment(key)} className="absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border bg-background transition-transform hover:scale-110" style={{ transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${isActive ? 112 : 100}px) rotate(-${angle}deg)`, borderColor: isActive ? moment.color : "color-mix(in srgb, var(--foreground) 20%, transparent)" }}>
                                                    <Icon className="size-5" style={{ color: isActive ? moment.color : "currentColor" }} />
                                                </button>;
                                            })}
                                        </motion.div>

                                        <div className="min-h-[250px] border border-foreground/15 bg-card/40 p-6 md:p-8">
                                            <AnimatePresence mode="wait">
                                                <motion.div key={activeMoment} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.3 }}>
                                                    <div className="flex items-center justify-between gap-4">
                                                        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: selectedMoment.color }}>{selectedMoment.kicker}</span>
                                                        <span className="font-mono text-[10px] text-foreground/35">0{Object.keys(moments).indexOf(activeMoment) + 1} / 04</span>
                                                    </div>
                                                    <h4 className="mt-8 max-w-lg text-2xl font-medium leading-tight md:text-4xl">{selectedMoment.title}</h4>
                                                    <p className="mt-4 max-w-lg text-sm leading-relaxed text-foreground/60">{selectedMoment.text}</p>
                                                    <div className="mt-8 flex items-center gap-3 border-t border-foreground/15 pt-4">
                                                        <MomentIcon className="size-4" style={{ color: selectedMoment.color }} />
                                                        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/50">{selectedMoment.label}</span>
                                                    </div>
                                                </motion.div>
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </div>
                            </BlurReveal>


                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
