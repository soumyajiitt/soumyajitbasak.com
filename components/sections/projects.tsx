'use client';

import {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
	type ReactNode,
} from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
	motion,
	useMotionValueEvent,
	useScroll,
	useSpring,
	useTransform,
} from 'framer-motion';
import { useLanguage } from '@/providers/language-provider';
import { BlurReveal } from '@/components/effects/blur-reveal';
import { ProjectModal } from '@/components/modals/project-modal';
import { WorkCard } from '@/components/sections/work-card';
import { cn } from '@/lib/utils';
import { useMediaQuery, BREAKPOINTS } from '@/hooks/use-media-query';
import { useLenis } from '@/providers/smooth-scroll-provider';
import type { ProjectItem } from '@/types/project';

export default function Projects() {
	const { content, dict } = useLanguage();
	const projects: ProjectItem[] = useMemo(
		() => content.projects ?? [],
		[content.projects],
	);
	const isDesktop = useMediaQuery(BREAKPOINTS.xl);
	const lenis = useLenis();

	const targetRef = useRef<HTMLElement>(null);
	const headerRef = useRef<HTMLDivElement>(null);
	const trackRef = useRef<HTMLDivElement>(null);

	const [scrollRange, setScrollRange] = useState(0);
	const [activeIndex, setActiveIndex] = useState(0);
	const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
		null,
	);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [scanMode, setScanMode] = useState(false);

	useEffect(() => {
		if (!isDesktop) {
			return;
		}

		const track = trackRef.current;
		const header = headerRef.current;
		if (!track) return;

		const update = () => {
			const headerWidth = header?.offsetWidth ?? 0;
			const visible = Math.max(window.innerWidth - headerWidth, 1);
			const range = Math.max(track.scrollWidth - visible, 0);
			setScrollRange(range);
		};

		const observer = new ResizeObserver(() => {
			requestAnimationFrame(update);
		});
		observer.observe(track);
		if (header) observer.observe(header);
		window.addEventListener('resize', update);

		return () => {
			observer.disconnect();
			window.removeEventListener('resize', update);
		};
	}, [isDesktop, projects]);

	const { scrollYProgress } = useScroll({
		target: targetRef,
		offset: ['start start', 'end end'],
	});

	const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);
	const smoothX = useSpring(x, {
		stiffness: 280,
		damping: 42,
		restDelta: 0.01,
	});
	const barScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

	useMotionValueEvent(scrollYProgress, 'change', (value) => {
		if (projects.length <= 1) {
			setActiveIndex(0);
			return;
		}
		setActiveIndex(Math.round(value * (projects.length - 1)));
	});

	const scrollToIndex = useCallback(
		(index: number) => {
			const el = targetRef.current;
			if (!el || projects.length <= 1) return;

			const clamped = Math.max(0, Math.min(index, projects.length - 1));
			const start = el.getBoundingClientRect().top + window.scrollY;
			const travel = Math.max(el.offsetHeight - window.innerHeight, 0);
			const top = start + travel * (clamped / (projects.length - 1));

			if (lenis) {
				lenis.scrollTo(top, { duration: 1.15 });
			} else {
				window.scrollTo({ top, behavior: 'smooth' });
			}
		},
		[lenis, projects.length],
	);

	useEffect(() => {
		if (!scanMode || projects.length <= 1) return;

		const interval = window.setInterval(() => {
			scrollToIndex((activeIndex + 1) % projects.length);
		}, 3500);

		return () => window.clearInterval(interval);
	}, [activeIndex, projects.length, scanMode, scrollToIndex]);

	const handleOpenProject = (project: ProjectItem) => {
		setSelectedProject(project);
		setIsModalOpen(true);
	};

	const canGoPrev = activeIndex > 0;
	const canGoNext = activeIndex < projects.length - 1;
	const sectionHeight = isDesktop
		? `${scrollRange + (typeof window !== 'undefined' ? window.innerHeight : 800)}px`
		: undefined;

	const header = (
		<div className='flex flex-col gap-4 max-w-xl'>
			<BlurReveal>
				<span className='title-counter'>[004]</span>
			</BlurReveal>
			<BlurReveal>
				<h2 className='title'>{dict.title.projects}</h2>
			</BlurReveal>
			<BlurReveal>
				<p className='mt-2 text-lg md:text-xl font-light leading-relaxed text-muted-foreground'>
					{dict.projectsIntro}
				</p>
			</BlurReveal>
		</div>
	);

	const controls = (
		<div className='flex items-center gap-6'>
			<div className='flex flex-col gap-2 min-w-40'>
				<div className='flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground'>
					<span>{dict.projectsScrollText}</span>
					<span>
						{String(activeIndex + 1).padStart(2, '0')} /{' '}
						{String(Math.max(projects.length, 1)).padStart(2, '0')}
					</span>
				</div>
				<div className='h-px w-full bg-border overflow-hidden'>
					<motion.div
						style={{ scaleX: barScale }}
						className='h-full origin-left bg-foreground'
					/>
				</div>
			</div>

			<div className='flex items-center gap-2'>
				<GalleryButton
					label={dict.galleryPrev}
					disabled={!canGoPrev}
					onClick={() => scrollToIndex(activeIndex - 1)}
				>
					<ChevronLeft className='h-4 w-4' />
				</GalleryButton>
				<GalleryButton
					label={dict.galleryNext}
					disabled={!canGoNext}
					onClick={() => scrollToIndex(activeIndex + 1)}
				>
					<ChevronRight className='h-4 w-4' />
				</GalleryButton>
			</div>
			<button
				type='button'
				onClick={() => setScanMode((active) => !active)}
				aria-pressed={scanMode}
				className='border border-foreground/20 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] hover:bg-foreground hover:text-background focus-visible:outline-2 focus-visible:outline-primary'
			>
				{scanMode ? 'Scan on' : 'Scan'}
			</button>
		</div>
	);

	return (
		<section
			ref={targetRef}
			data-slot='projects'
			className='relative'
			style={{ height: sectionHeight }}
		>
			{!isDesktop ? (
				<div className='py-16 md:py-24'>
					<div className='container mx-auto px-container mb-10'>{header}</div>
					<div className='flex flex-col gap-6 px-container'>
						{projects.map((project, index) => (
							<WorkCard
								key={project.id}
								item={project}
								index={index}
								onClick={() => handleOpenProject(project)}
							/>
						))}
					</div>
				</div>
			) : (
				<div className='sticky top-0 h-screen overflow-hidden flex'>
					<div
						ref={headerRef}
						className='w-[min(40vw,28rem)] xl:w-[min(36vw,32rem)] shrink-0 flex flex-col justify-center gap-10 px-container'
					>
						{header}
						{controls}
					</div>

					<div className='relative flex-1 overflow-hidden flex items-center'>
						<motion.div
							ref={trackRef}
							style={{ x: smoothX }}
							className='flex items-center gap-8 pr-[12vw] will-change-transform'
						>
							{projects.map((project, index) => (
								<WorkCard
									key={project.id}
									item={project}
									index={index}
									onClick={() => handleOpenProject(project)}
								/>
							))}
						</motion.div>
					</div>
				</div>
			)}

			<ProjectModal
				open={isModalOpen}
				onOpenChange={setIsModalOpen}
				project={selectedProject}
			/>
		</section>
	);
}

function GalleryButton({
	children,
	onClick,
	disabled,
	label,
}: {
	children: ReactNode;
	onClick: () => void;
	disabled: boolean;
	label: string;
}) {
	return (
		<button
			type='button'
			aria-label={label}
			disabled={disabled}
			onClick={onClick}
			className={cn(
				'flex h-10 w-10 items-center justify-center rounded-full border border-border/70 transition-colors',
				disabled
					? 'text-muted-foreground/30 cursor-not-allowed'
					: 'text-foreground hover:bg-foreground hover:text-background',
			)}
		>
			{children}
		</button>
	);
}
