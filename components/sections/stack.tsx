'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/providers/language-provider';
import { BlurReveal } from '@/components/effects/blur-reveal';
import type { StackItem } from '@/types/stack';

const categoryColors = ['#ff6b5f', '#24a99a', '#e7aa36', '#7183e8', '#c676bd'];

type StackCategory = {
	id: string;
	title: string;
	items: StackItem[];
};

export default function Stack() {
	const { content, dict } = useLanguage();
	const [activeCategory, setActiveCategory] = useState('frontend');

	const categories: StackCategory[] = [
		{
			id: 'frontend',
			title: dict.frontendStack,
			items: (content.stack?.frontend || []) as StackItem[],
		},
		{
			id: 'backend',
			title: dict.backendStack,
			items: (content.stack?.backend || []) as StackItem[],
		},
		{
			id: 'database',
			title: dict.databaseStack,
			items: (content.stack?.database || []) as StackItem[],
		},
		{
			id: 'tools',
			title: dict.toolsStack,
			items: (content.stack?.tools || []) as StackItem[],
		},
		{
			id: 'ai',
			title: dict.aiToolsStack,
			items: (content.stack?.['AI Tools'] || []) as StackItem[],
		},
	];

	return (
		<section className='relative overflow-hidden bg-background py-20 text-foreground md:py-28 lg:py-36'>
			<motion.div
				aria-hidden
				animate={{ rotate: [0, 360], scale: [1, 1.04, 1] }}
				transition={{
					rotate: { duration: 32, repeat: Infinity, ease: 'linear' },
					scale: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
				}}
				className='pointer-events-none absolute -right-24 top-16 size-72 rounded-full border-34 border-(--coral)/10 md:size-96 will-change-transform'
			/>
			<div className='container relative z-10 mx-auto px-container'>
				<div className='mb-16 grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-end lg:mb-24'>
					<div>
						<BlurReveal>
							<span className='font-mono text-sm font-bold tracking-[0.2em] text-foreground/45'>
								[002]
							</span>
						</BlurReveal>
						<BlurReveal>
							<h2 className='mt-4 text-6xl font-bold uppercase leading-[0.8] tracking-[-0.08em] md:text-8xl'>
								{dict.title.stack}
							</h2>
						</BlurReveal>
					</div>
					<BlurReveal>
						<p className='max-w-lg border-l-2 border-(--coral) pl-5 text-base leading-relaxed text-foreground/65'>
							The tools I reach for to turn ideas into useful, reliable digital
							products.
						</p>
					</BlurReveal>
				</div>

				<div className='border-t-2 border-foreground'>
					{categories.map((category, index) => {
						const isActive = activeCategory === category.id;
						const featuredCount = category.items.filter(
							(item) => item.featured,
						).length;
						const color = categoryColors[index];
						return (
							<motion.div
								key={category.id}
								layout
								className='border-b-2 border-foreground'
							>
								<button
									type='button'
									aria-expanded={isActive}
									onClick={() => setActiveCategory(isActive ? '' : category.id)}
									className='group flex w-full items-center gap-4 py-5 text-left transition-colors md:py-7'
								>
									<span className='w-8 shrink-0 font-mono text-[10px] text-foreground/40'>
										0{index + 1}
									</span>
									<span className='relative flex-1 text-xl font-medium uppercase tracking-[-0.02em] transition-transform group-hover:translate-x-2 md:text-3xl'>
										{category.title}
										<span
											className='absolute -bottom-1 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full'
											style={{ backgroundColor: color }}
										/>
									</span>
									<span className='hidden items-center gap-3 text-xs text-foreground/45 sm:flex'>
										<span>
											{category.items.length}{' '}
											{category.items.length === 1 ? 'tool' : 'tools'}
										</span>
										{featuredCount > 0 && (
											<span
												className='flex items-center gap-1'
												style={{ color }}
											>
												<Sparkles className='size-3' /> {featuredCount} featured
											</span>
										)}
									</span>
									<motion.span
										animate={{
											rotate: isActive ? 180 : 0,
											backgroundColor: isActive ? color : 'transparent',
											color: isActive ? 'var(--primary-foreground)' : 'var(--foreground)',
										}}
										className='grid size-9 shrink-0 place-items-center rounded-full border border-foreground/30 transition-colors group-hover:border-foreground'
									>
										<ChevronDown className='size-4' />
									</motion.span>
								</button>
								<AnimatePresence initial={false}>
									{isActive && (
										<motion.div
											initial={{ height: 0, opacity: 0 }}
											animate={{ height: 'auto', opacity: 1 }}
											exit={{ height: 0, opacity: 0 }}
											transition={{ duration: 0.35, ease: 'easeOut' }}
											className='overflow-hidden'
										>
											<div className='grid gap-3 pb-8 pl-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
												{category.items.map((item, itemIndex) => (
													<motion.div
														key={item.name}
														initial={{ opacity: 0, y: 12 }}
														animate={{ opacity: 1, y: 0 }}
														transition={{ delay: itemIndex * 0.045 }}
														className='group relative flex min-h-24 items-center gap-4 overflow-hidden rounded-xl border border-foreground/15 bg-card/60 p-4 transition-all hover:-translate-y-1 hover:border-foreground/50 hover:bg-card hover:shadow-[4px_4px_0_var(--ink)]'
													>
														<div className='grid size-11 shrink-0 place-items-center rounded-lg bg-background transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110'>
															<Image
																src={item.icon}
																alt=''
																width={25}
																height={25}
																unoptimized={item.icon.endsWith('.svg')}
															/>
														</div>
														<div>
															<span className='block text-sm font-semibold'>
																{item.name}
															</span>
															<span className='mt-1 block font-mono text-[9px] uppercase tracking-[0.12em] text-foreground/40'>
																{item.featured ? 'core tool' : 'in toolkit'}
															</span>
														</div>
														<span className='absolute right-3 top-3 font-mono text-[9px] text-foreground/25'>
															{String(itemIndex + 1).padStart(2, '0')}
														</span>
													</motion.div>
												))}
											</div>
										</motion.div>
									)}
								</AnimatePresence>
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
