import React, {
	ComponentPropsWithoutRef,
	FormEvent,
	Fragment,
	useCallback,
	useEffect,
	useRef,
	useState
} from "react"

import { PlaceOption } from "@/types"
import {
	APIProvider,
	Map,
	useMap,
	useMapsLibrary
} from "@vis.gl/react-google-maps"

import useDebounce from "@/hooks/useDebounce"

import { Button } from "./button"
import { Input } from "./input"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

interface PlaceAutocomplete extends ComponentPropsWithoutRef<"input"> {
	onPlaceSelect?: (place: PlaceOption | null) => void
	value: string
	placeholder?: string
	disabled?: boolean
}

const PlaceAutocomplete = ({
	onPlaceSelect,
	value,
	placeholder,
	disabled,
	name
}: PlaceAutocomplete) => {
	const map = useMap()
	const places = useMapsLibrary("places")
	const inputRef = useRef<HTMLInputElement | null>(null)
	const [inputValue, setInputValue] = useState(value || "")

	// https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompleteSessionToken
	const [sessionToken, setSessionToken] =
		useState<google.maps.places.AutocompleteSessionToken>()

	// https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service
	const [autocompleteService, setAutocompleteService] =
		useState<google.maps.places.AutocompleteService | null>(null)

	// https://developers.google.com/maps/documentation/javascript/reference/places-service
	const [placesService, setPlacesService] =
		useState<google.maps.places.PlacesService | null>(null)

	const [predictionResults, setPredictionResults] = useState<
		Array<google.maps.places.AutocompletePrediction>
	>([])

	useEffect(() => {
		if (!places || !map) return

		setAutocompleteService(new places.AutocompleteService())
		setPlacesService(new places.PlacesService(map))
		setSessionToken(new places.AutocompleteSessionToken())

		return () => setAutocompleteService(null)
	}, [map, places])

	const fetchPredictions = useCallback(
		async (inputValue: string) => {
			if (!autocompleteService || !inputValue) {
				setPredictionResults([])
				return
			}

			const request = { input: inputValue, sessionToken }
			const response = await autocompleteService.getPlacePredictions(request)

			setPredictionResults(response.predictions)
			const time = setTimeout(() => {
				inputRef.current?.focus()
				clearTimeout(time)
			}, 0)
		},
		[autocompleteService, sessionToken]
	)

	const onInputChange = useCallback(
		(event: FormEvent<HTMLInputElement>) => {
			const value = (event.target as HTMLInputElement)?.value

			fetchPredictions(value)
		},
		[fetchPredictions]
	)

	const debounceInput = useDebounce(onInputChange)

	return (
		<div className="relative h-[56px]">
			<Map
				style={{
					display: "none"
				}}
			/>
			<Input
				onChange={(e) => {
					setInputValue(e.target.value)
					debounceInput(e)
				}}
				value={inputValue}
				className="h-14"
				ref={inputRef}
				placeholder={placeholder}
				disabled={disabled}
				name={name}
			/>
			<Popover
				open={predictionResults.length > 0}
				onOpenChange={(open) => {
					if (!open) {
						setPredictionResults([])
					}
				}}
				modal={false}
			>
				<PopoverTrigger className="w-full h-[0]"></PopoverTrigger>
				<PopoverContent
					style={{
						width: `${inputRef.current?.offsetWidth}px`
					}}
					className="px-0"
					onOpenAutoFocus={(e) => e.preventDefault()}
				>
					<div className="w-full px-2 flex gap-2 flex-col max-h-[256px] overflow-y-auto">
						{predictionResults.length === 0 ? (
							<p>No address found!</p>
						) : (
							predictionResults.map((predict) => {
								return (
									<Button
										variant="ghost"
										key={predict.place_id}
										onClick={(e) => {
											e.stopPropagation()
											onPlaceSelect && onPlaceSelect(predict as PlaceOption)
											setPredictionResults([])
										}}
										className="h-fit border-b text-left focus-visible:ring-0 focus-visible:ring-offset-0"
									>
										<p className="max-w-full w-full text-wrap text-left">
											{predict.description}
										</p>
									</Button>
								)
							})
						)}
					</div>
				</PopoverContent>
			</Popover>
		</div>
	)
}

export default PlaceAutocomplete
