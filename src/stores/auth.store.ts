import { shallow } from "zustand/shallow"
import { createWithEqualityFn } from "zustand/traditional"
import { AuthLoginSuccessParams } from "@/types/authentication.type"

interface authState {
	authParams: AuthLoginSuccessParams | null
	setAuthParams: (value: AuthLoginSuccessParams | null) => void
}

const useAuthStore = createWithEqualityFn<authState>()(
	(set) => ({
		authParams: null,
		setAuthParams: (value: AuthLoginSuccessParams | null) => {
			set({
				authParams: value
			})
		}
	}),
	shallow
)

export default useAuthStore
