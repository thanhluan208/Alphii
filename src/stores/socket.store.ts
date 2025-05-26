import { shallow } from "zustand/shallow"
import { createWithEqualityFn } from "zustand/traditional"

interface socketState {
	socket: WebSocket | null
	setWebSocket: (value: WebSocket | null) => void
}

const useSocketStore = createWithEqualityFn<socketState>()(
	(set) => ({
		socket: null,
		setWebSocket: (value: WebSocket | null) => {
			if (!value) return

			set({
				socket: value
			})
		}
	}),
	shallow
)

export default useSocketStore
