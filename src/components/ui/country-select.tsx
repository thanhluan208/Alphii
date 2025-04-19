import React, { useMemo, useRef } from "react"
import { useTranslations } from "next-intl"

import countries from "@/data/Countries.json"
import { cn } from "@/lib/utils"
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

interface CountrySelectProps {
	value: string
	onValueChange: (value: string) => void
	citiesSelected?: string
	placeholder?: React.ReactNode
	classname?: string
	classnamePopoverContent?: string,
	disabled?: boolean
}

const CountrySelect = ({
	value,
	onValueChange,
	placeholder,
	citiesSelected,
	classname,
	classnamePopoverContent,
	disabled
}: CountrySelectProps) => {
	const [open, setOpen] = React.useState(false)
	const buttonRef = useRef<HTMLButtonElement | null>(null)
	const t = useTranslations("common")

	const countrySelected = useMemo(() => {
		if (!value) return ""

		if (!citiesSelected) return value

		const matchCountry = countries.find((country) => {
			return country.cities.includes(citiesSelected)
		})

		if (matchCountry) {
			onValueChange(matchCountry.country)
			return matchCountry.country
		}

		return ""
	}, [citiesSelected, value, onValueChange])

	const options = useMemo(() => {
		if (citiesSelected) {
			const foundCountry = countries.find((elm) =>
				elm.cities.includes(citiesSelected)
			)
			if (foundCountry) return [foundCountry]
			return []
		}

		return countries
	}, [citiesSelected])

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
					{countrySelected ? (
						<p className="text-black">{countrySelected}</p>
					) : (
						<p>{placeholder || t("pCountrySelect")}</p>
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
						<CommandEmpty>{t("lCountrySelectNotFound")}</CommandEmpty>
						<CommandGroup>
							{options.map((country) => (
								<CommandItem
									key={country.country}
									value={country.country}
									onSelect={(currentValue) => {
										onValueChange(currentValue === value ? "" : currentValue)
										setOpen(false)
									}}
								>
									{country.country}
									<Check
										className={cn(
											"ml-auto",
											countrySelected === country.country
												? "opacity-100"
												: "opacity-0"
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}

export default CountrySelect
