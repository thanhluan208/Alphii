import { persist } from "zustand/middleware"
import { shallow } from "zustand/shallow"
import { createWithEqualityFn } from "zustand/traditional"
import { Profile } from "@/types/profile.type"

export const PROFILE_KEY_STORE = "blubbo-profile-store"

interface ProfileState {
	profile: Profile | undefined
	setProfile: (value: Profile | undefined) => void
	token: string | null
	setToken: (value: string | null) => void
}

const useProfileStore = createWithEqualityFn<ProfileState>()(
	persist(
		(set) => ({
			profile: undefined,
			setProfile: (value) => {
				set({
					profile: value
				})
			},
			token: null,
			setToken: (value) => set({ token: value })
		}),
		{
			name: PROFILE_KEY_STORE,
			partialize: (state) => ({
				profile: state.profile,
				token: state.token
			})
		}
	),
	shallow
)

export default useProfileStore
