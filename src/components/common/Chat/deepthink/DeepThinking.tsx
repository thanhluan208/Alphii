import {
	Fragment,
	useCallback,
	useEffect,
	useId,
	useRef,
	useState
} from "react"
import Image from "next/image"

import { SpinIcon } from "@/components/icons"
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
import { ChatType } from "@/types"
import { isEmpty } from "lodash"
import { ChevronDown } from "lucide-react"

import DeepthinkContent from "./DeepthinkContent"

export interface Deepthink {
	type: ChatType
	isPending?: boolean
	contents: string[]
	id: string
	agentName?: string
}

const DeepThinking = ({ contents, isPending, agentName }: Deepthink) => {
	const id = useId()
	const [currentAnimation, setCurrentAnimation] = useState(0)
	const [isAutoScrollEnabled, setIsAutoScrollEnabled] = useState(true)
	const [userScrollTimeout, setUserScrollTimeout] =
		useState<NodeJS.Timeout | null>(null)

	const accordionContentRef = useRef<HTMLDivElement>(null)
	const lastScrollTop = useRef(0)
	const isScrollingDown = useRef(false)

	// Auto-scroll function
	const scrollToBottom = useCallback(
		(behavior = "smooth") => {
			if (accordionContentRef.current && isAutoScrollEnabled) {
				const element = accordionContentRef.current
				element.scrollTo({
					top: element.scrollHeight,
					behavior: behavior as ScrollBehavior
				})
			}
		},
		[isAutoScrollEnabled]
	)

	// Check if container needs scrolling
	const shouldAutoScroll = useCallback(() => {
		if (!accordionContentRef.current || !isPending) return false
		const element = accordionContentRef.current
		return element.scrollHeight > element.clientHeight
	}, [isPending])

	// Handle user scroll detection
	const handleScroll = useCallback(() => {
		if (!accordionContentRef.current) return

		const element = accordionContentRef.current
		const currentScrollTop = element.scrollTop
		const maxScrollTop = element.scrollHeight - element.clientHeight

		// Check if user is scrolling up
		const isScrollingUp = currentScrollTop < lastScrollTop.current
		isScrollingDown.current = currentScrollTop > lastScrollTop.current

		// If user scrolled up and we're not at the bottom, pause auto-scroll
		if (isScrollingUp && currentScrollTop < maxScrollTop - 10) {
			console.log("user scroll up. Stop auto scroll down")
			setIsAutoScrollEnabled(false)

			// Clear existing timeout
			if (userScrollTimeout) {
				clearTimeout(userScrollTimeout)
			}

			// Set new timeout to resume auto-scroll after 3 seconds
			const timeout = setTimeout(() => {
				console.log("restart auto scroll down")
				scrollToBottom()
				setIsAutoScrollEnabled(true)
			}, 3000)

			setUserScrollTimeout(timeout)
		}

		// If user scrolled to bottom manually, resume auto-scroll
		if (currentScrollTop >= maxScrollTop - 10) {
			setIsAutoScrollEnabled(true)
			if (userScrollTimeout) {
				clearTimeout(userScrollTimeout)
				setUserScrollTimeout(null)
			}
		}

		lastScrollTop.current = currentScrollTop
	}, [userScrollTimeout, scrollToBottom])

	// Auto-scroll when content changes and animation is active
	useEffect(() => {
		if (shouldAutoScroll() && isAutoScrollEnabled) {
			scrollToBottom()
		}
	}, [
		currentAnimation,
		contents,
		scrollToBottom,
		shouldAutoScroll,
		isAutoScrollEnabled
	])

	// Auto-scroll during typing animation
	useEffect(() => {
		if (isAutoScrollEnabled) {
			if (!accordionContentRef.current) return

			const interval = setInterval(() => {
				if (shouldAutoScroll()) {
					scrollToBottom()
				} else {
					clearInterval(interval)
				}
			}, 100) // Check every 100ms during typing

			return () => clearInterval(interval)
		}
	}, [contents, isAutoScrollEnabled, scrollToBottom, shouldAutoScroll])

	// Cleanup timeout on unmount
	useEffect(() => {
		return () => {
			if (userScrollTimeout) {
				clearTimeout(userScrollTimeout)
			}
		}
	}, [userScrollTimeout])

	return (
		<div className={cn("flex w-full justify-start")}>
			<Accordion
				type="single"
				onValueChange={(value) => {
					setCurrentAnimation(contents?.length)
					if (value) {
						scrollToBottom("instant")
					}
				}}
				collapsible
				className="w-full"
			>
				<AccordionItem
					value={id}
					className="flex flex-col transition-all w-full gap-1 bg-card dark:bg-alphii_background_2 pr-20 relative dark:border-none border rounded-xl max-w-[85%] rounded-br-md px-3 border-alphii_border_2"
				>
					<AccordionTrigger className="p-0 flex items-center gap-3">
						<div
							className={cn(
								"flex items-center gap-3 flex-1 bg-card dark:bg-alphii_background_2 w-3/4 relative dark:border-none border rounded-xl rounded-br-md p-3 border-alphii_border_2",
								isPending && "pl-20"
							)}
						>
							<p className="font-medium font-sm whitespace-pre-wrap">
								{!isPending
									? `${agentName || "The team"} finished deep thinking`
									: `${agentName || "The team"} is having a deep thinking session`}
							</p>
							{isPending && <SpinIcon className="w-4 h-4" />}
							{isPending && (
								<Image
									src="/images/project/deepthink-bg.png"
									alt="deepthing"
									className="absolute !-bottom-0 !left-0"
									width={68}
									height={40}
								/>
							)}
						</div>

						<ChevronDown className="transition-transform" />
					</AccordionTrigger>
					<AccordionContent className="mt-2 pb-3">
						<div
							className="max-h-96 overflow-y-auto no-scrollbar"
							onScroll={handleScroll}
							ref={accordionContentRef}
						>
							{!isEmpty(contents) &&
								contents.map((elm, index) => {
									return (
										<Fragment key={elm}>
											<DeepthinkContent
												content={elm}
												index={index}
												currentAnimation={isPending ? currentAnimation : -1}
												setNextAnimation={() => setCurrentAnimation(index + 1)}
												hasDivider={index < contents?.length - 1}
											/>
										</Fragment>
									)
								})}
						</div>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	)
}

export default DeepThinking
