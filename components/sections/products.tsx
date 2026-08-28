'use client';

import { useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useLanguage } from '@/providers/language-provider';
import { BlurReveal } from '@/components/effects/blur-reveal';
import { ProjectModal } from '@/components/modals/project-modal';
import { WorkCard } from '@/components/sections/work-card';
import { StackLogos } from '@/components/widgets/stack-logos';
import { useMediaQuery, BREAKPOINTS } from '@/hooks/use-media-query';
import type { ProjectItem } from '@/types/project';

export default function Products() {
	const { content, dict } = useLanguage();
	const products: ProjectItem[] = content.products ?? [];
	const featured = products[0];
	const isDesktop = useMediaQuery(BREAKPOINTS.xl);

	const targetRef = useRef<HTMLElement>(null);
	const { scrollYProgress } = useScroll({
		target: targetRef,
		offset: ['start start', 'end end'],
	});

	const smoothProgress = useSpring(scrollYProgress, {
		stiffness: 70,
		damping: 26,
		restDelta: 0.001,
	});

	const copyX = useTransform(
		smoothProgress,
		[0, 0.45],
		isDesktop ? [-56, 0] : [0, 0],
	);
	const copyOpacity = useTransform(
		smoothProgress,
		[0, 0.32],
		isDesktop ? [0.15, 1] : [1, 1],
	);
	const imageY = useTransform(
		smoothProgress,
		[0, 1],
		isDesktop ? [90, -24] : [0, 0],
	);
	const imageScale = useTransform(
		smoothProgress,
		[0, 0.75],
		isDesktop ? [1.16, 1] : [1, 1],
	);
	const barScale = useTransform(smoothProgress, [0, 1], [0, 1]);

	const [selected, setSelected] = useState<ProjectItem | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [cardTilt, setCardTilt] = useState({ x: 2, y: -4 });

	const handleCardMove = (event: React.PointerEvent<HTMLDivElement>) => {
		if (event.pointerType === 'touch') return;

		const bounds = event.currentTarget.getBoundingClientRect();
		setCardTilt({
			x: 2 - ((event.clientY - bounds.top) / bounds.height - 0.5) * 5,
			y: -4 + ((event.clientX - bounds.left) / bounds.width - 0.5) * 7,
		});
	};

	const resetCardTilt = () => setCardTilt({ x: 2, y: -4 });

	const openProduct = (product: ProjectItem) => {
		setSelected(product);
		setIsModalOpen(true);
	};

	if (!featured) return null;

	return (
		<section
			ref={targetRef}
			data-slot='products'
			className={`relative ${isDesktop ? 'h-[220vh]' : 'container-void'}`}
		>
			<div
				className={
					isDesktop
						? 'sticky top-0 h-screen overflow-hidden flex items-center'
						: 'relative'
				}
			>
				<div className='container mx-auto px-container w-full'>
					<div className='grid grid-cols-1 xl:grid-cols-[minmax(0,0.88fr)_minmax(0,1.32fr)] gap-10 xl:gap-16 2xl:gap-24 items-center'>
						<motion.div
							style={{ x: copyX, opacity: copyOpacity }}
							className='flex flex-col gap-4'
						>
							<BlurReveal>
								<span className='title-counter'>[003]</span>
							</BlurReveal>

							<BlurReveal>
								<h2 className='title inline-flex items-center gap-3'>
									{dict.title.products}
									<span
										className='relative mt-1 inline-flex h-3 w-3 shrink-0'
										aria-hidden
									>
										<span className='absolute inset-0 rounded-full bg-foreground/30 animate-ping' />
										<span className='relative inline-flex h-3 w-3 items-center justify-center rounded-full border border-foreground/50'>
											<span className='h-1.5 w-1.5 rounded-full bg-foreground' />
										</span>
									</span>
								</h2>
							</BlurReveal>

							<BlurReveal>
								<p className='mt-4 text-lg md:text-xl xl:text-2xl font-light leading-relaxed text-muted-foreground max-w-md'>
									{dict.productsIntro}
								</p>
							</BlurReveal>

							<BlurReveal>
								<button
									type='button'
									onClick={() => openProduct(featured)}
									className='group mt-6 inline-flex w-fit items-center gap-2 text-sm font-medium uppercase tracking-[0.18em]'
								>
									<span className='border-b border-foreground/30 pb-1 transition-colors group-hover:border-foreground'>
										{dict.productsCta}
									</span>
									<ArrowUpRight className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
								</button>
							</BlurReveal>

							{featured.stack && featured.stack.length > 0 && (
								<BlurReveal>
									<div className='mt-8'>
										<StackLogos names={featured.stack} />
									</div>
								</BlurReveal>
							)}

							{isDesktop && (
								<div className='mt-10 flex items-center gap-4'>
									<div className='relative h-px w-24 bg-border overflow-hidden'>
										<motion.div
											style={{ scaleX: barScale }}
											className='absolute inset-0 origin-left bg-foreground'
										/>
									</div>
									<span className='text-sm font-mono text-foreground/40 uppercase tracking-[0.18em]'>
										{dict.productsScrollText}
									</span>
								</div>
							)}
						</motion.div>

						<motion.div
							style={{
								y: imageY,
								scale: imageScale,
								rotateX: cardTilt.x,
								rotateY: cardTilt.y,
								transformPerspective: 1400,
							}}
							onPointerMove={handleCardMove}
							onPointerLeave={resetCardTilt}
							className='w-full origin-left will-change-transform perspective-[1400px]'
						>
							<WorkCard
								item={featured}
								variant='featured'
								index={0}
								onClick={() => openProduct(featured)}
							/>
						</motion.div>
					</div>
				</div>
			</div>

			<ProjectModal
				open={isModalOpen}
				onOpenChange={setIsModalOpen}
				project={selected}
			/>
		</section>
	);
}
