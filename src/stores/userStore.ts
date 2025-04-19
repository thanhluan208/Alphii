import { persist } from "zustand/middleware"
import { shallow } from "zustand/shallow"
import { createWithEqualityFn } from "zustand/traditional"
import { Profile } from "@/types/profile.type"

interface userState {
	Profile: Profile | null
	setProfileData: (value: Profile | null) => void
}

const useUserStore = createWithEqualityFn<userState>()(
	persist(
		(set) => ({
			Profile: null,
			setProfileData: (value: Profile | null) => {
				if (!value) return

				set({
					Profile: value
				})
			}
		}),
		{
			name: "user-store"
		}
	),
	shallow
)

export default useUserStore
