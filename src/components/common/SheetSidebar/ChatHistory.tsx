"use client"

import React, { useState } from "react"

import { cn } from "@/lib/utils"
import { ChatHistory as ChatHistoryType } from "@/types/user.type"
import { isEmpty } from "lodash"
import { Trash } from "lucide-react"

const mockChatHistory = [
	{
		id: 1,
		createdAt: new Date("2025-06-05T10:30:00"),
		lastUpdate: new Date("2025-06-05T14:22:00"),
		title: "RecipeVault Recipe Sharing App"
	},
	{
		id: 2,
		createdAt: new Date("2025-06-05T09:15:00"),
		lastUpdate: new Date("2025-06-05T11:45:00"),
		title: "Budget Tracker Dashboard Design"
	},
	{
		id: 3,
		createdAt: new Date("2025-06-04T16:20:00"),
		lastUpdate: new Date("2025-06-04T18:30:00"),
		title: "E-commerce Product Catalog"
	},
	{
		id: 4,
		createdAt: new Date("2025-06-04T14:10:00"),
		lastUpdate: new Date("2025-06-04T15:25:00"),
		title: "Task Management System"
	},
	{
		id: 5,
		createdAt: new Date("2025-05-29T11:00:00"),
		lastUpdate: new Date("2025-05-29T13:15:00"),
		title: "Social Media Analytics Tool"
	},
	{
		id: 6,
		createdAt: new Date("2025-05-28T09:30:00"),
		lastUpdate: new Date("2025-05-28T16:45:00"),
		title: "Fitness Tracking Mobile App"
	},
	{
		id: 7,
		createdAt: new Date("2025-05-05T10:20:00"),
		lastUpdate: new Date("2025-05-05T12:30:00"),
		title: "Online Learning Platform"
	},
	{
		id: 8,
		createdAt: new Date("2025-05-04T14:15:00"),
		lastUpdate: new Date("2025-05-04T17:20:00"),
		title: "Weather Forecast Dashboard"
	},
	{
		id: 9,
		createdAt: new Date("2025-04-25T08:45:00"),
		lastUpdate: new Date("2025-04-25T10:15:00"),
		title: "Inventory Management System"
	},
	{
		id: 10,
		createdAt: new Date("2025-04-20T13:30:00"),
		lastUpdate: new Date("2025-04-20T15:45:00"),
		title: "Real Estate Property Finder"
	}
]

const ChatHistory = () => {
	const [activeChat, setActiveChat] = useState<number | null>(1)

	const formatDateGroup = (date: Date) => {
		const now = new Date()
		const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
		const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000)
		const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
		const lastMonth = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)

		const targetDate = new Date(
			date.getFullYear(),
			date.getMonth(),
			date.getDate()
		)

		if (targetDate.getTime() === today.getTime()) {
			return "Today"
		} else if (targetDate.getTime() === yesterday.getTime()) {
			return "Yesterday"
		} else if (targetDate >= lastWeek) {
			return "Last Week"
		} else if (targetDate >= lastMonth) {
			return "Last Month"
		} else {
			return date.toLocaleDateString("en-GB", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric"
			})
		}
	}

	const groupChatsByDate = (chats: ChatHistoryType[]) => {
		const groups: Record<string, { date: Date; chats: ChatHistoryType[] }> = {}

		chats.forEach((chat) => {
			const dateKey = chat.lastUpdate.toDateString()
			if (!groups[dateKey]) {
				groups[dateKey] = {
					date: chat.lastUpdate,
					chats: []
				}
			}
			groups[dateKey].chats.push(chat)
		})

		// Sort groups by date (most recent first)
		const sortedGroups = Object.values(groups).sort(
			(a, b) => b.date.getTime() - a.date.getTime()
		)

		// Sort chats within each group by lastUpdate (most recent first)
		sortedGroups.forEach((group) => {
			group.chats.sort(
				(a, b) => b.lastUpdate.getTime() - a.lastUpdate.getTime()
			)
		})

		return sortedGroups
	}

	const groupedChats = groupChatsByDate(mockChatHistory)

	return (
		<div className="flex flex-col gap-2 max-h-[35%] overflow-y-auto no-scrollbar">
			{!isEmpty(groupedChats) &&
				groupedChats.map((group) => {
					if (isEmpty(group.chats)) return null
					return (
						<div className="flex flex-col" key={group.date.toDateString()}>
							<div className="h-9 flex items-center text-sm font-medium text-alphii_text_sub_600 px-2">
								{formatDateGroup(group.date)}
							</div>
							{group.chats.map((chat) => {
								return (
									<button
										onClick={() => setActiveChat(chat.id)}
										key={chat.id}
										className={cn(
											"h-9 group flex items-center px-2 rounded-xl justify-between transition-all duration-300 hover:bg-background",
											chat.id === activeChat && "bg-background"
										)}
									>
										<p className="text-sm font-medium">{chat.title}</p>
										<Trash className="opacity-0 text-destructive group-hover:opacity-100 h-5 w-5 transition-all duration-300" />
									</button>
								)
							})}
						</div>
					)
				})}
		</div>
	)
}

export default ChatHistory
