import React, { Fragment } from "react"
import ReactMarkdown from "react-markdown"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from "@/components/ui/dialog"

import { ChatboxProps } from "./Chatbox"

const ChatPrd = ({ content, name }: ChatboxProps) => {
	const t = useTranslations("studio.prdSelector")
	const [open, setOpen] = React.useState(false)

	return (
		<Fragment>
			<div className="flex w-full justify-end">
				<div className="flex flex-col bg-card dark:bg-alphii_background_2 border rounded-xl w-fit max-w-[85%] rounded-br-md gap-1 p-3 border-alphii_border dark:border-none">
					<div className="flex items-center gap-2">
						<div className="w-6 h-6 rounded-full bg-[url('/images/agents/bob-avatar.png')] bg-cover bg-center" />
						<p className="text-sm font-medium">{name}</p>
					</div>

					<p className="text-wrap">
						<span
							className="font-medium whitespace-pre-wrap text-wrap text-sm"
							style={{
								wordBreak: "break-word"
							}}
						>
							{content.substring(0, 100)}...
						</span>
					</p>
				</div>
			</div>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className="max-w-[unset] w-[calc(100vw-100px)] h-[calc(100vh-100px)] rounded-lg bg-alphii_background_2">
					<DialogHeader>
						<DialogTitle>{t("confirmedTitle")}</DialogTitle>
					</DialogHeader>

					<div className="max-h-full overflow-y-auto">
						<ReactMarkdown>{content}</ReactMarkdown>
					</div>

					<DialogFooter>
						<div className="flex gap-3">
							<Button
								className="w-32"
								variant="secondary"
								onClick={() => setOpen(false)}
							>
								{t("cancelButton")}
							</Button>
						</div>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</Fragment>
	)
}

export default ChatPrd
