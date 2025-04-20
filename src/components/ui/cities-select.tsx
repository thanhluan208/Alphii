import React, { useMemo, useRef, useState } from "react"
import { useTranslations } from "next-intl"

import countries from "@/data/Countries.json"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Check, ChevronsUpDown } from "lucide-react"

import { Button } from "./button"
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList
} from "./command"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

interface CitySelectProps {
	value: string
	onValueChange: (value: string) => void
	countrySelected?: string
	placeholder?: React.ReactNode
	classname?: string
	classnamePopoverContent?: string
	disabled?: boolean
}

const CitySelect = ({
	value,
	onValueChange,
	placeholder,
	countrySelected,
	classname,
	classnamePopoverContent,
	disabled
}: CitySelectProps) => {
	const [open, setOpen] = React.useState(false)
	const t = useTranslations("common")
	const buttonRef = useRef<HTMLButtonElement | null>(null)

	const options = useMemo(() => {
		if (countrySelected) {
			const foundCountry = countries.find(
				(elm) => elm.country === countrySelected
			)
			if (foundCountry) return [foundCountry]

			return []
		}

		return []
	}, [countrySelected])

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className={cn(
						"justify-between h-14 border-[#e5e5e5] hover:bg-transparent text-grey-2",
						classname
					)}
					ref={buttonRef}
					disabled={disabled}
				>
					{value ? (
						<p className="text-black">{value}</p>
					) : (
						<p>{placeholder || t("pCitySelect")}</p>
					)}
					<ChevronsUpDown className="opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className={cn("w-[200px] p-0", classnamePopoverContent)}
				style={{
					width: buttonRef?.current?.offsetWidth
				}}
			>
				<Command>
					<CommandInput placeholder={t("pCountrySelectSearch")} />
					<CommandList>
						<CommandEmpty>
							{!countrySelected
								? "Select country to find a city"
								: t("lCountrySelectNotFound")}
						</CommandEmpty>
						{options.map((opt) => {
							return (
								<CommandGroup key={opt.country} heading={opt.country}>
									{opt.cities.map((cities) => (
										<CommandItem
											key={`${cities}_${opt.country}`}
											value={cities}
											onSelect={(currentValue) => {
												onValueChange(
													currentValue === value ? "" : currentValue
												)
												setOpen(false)
											}}
										>
											{cities}
											<Check
												className={cn(
													"ml-auto",
													value === cities ? "opacity-100" : "opacity-0"
												)}
											/>
										</CommandItem>
									))}
								</CommandGroup>
							)
						})}
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}

export default CitySelect
