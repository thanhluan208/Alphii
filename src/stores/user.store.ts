import { persist } from "zustand/middleware"
import { shallow } from "zustand/shallow"
import { createWithEqualityFn } from "zustand/traditional"
import { Profile } from "@/types/user.type"

interface userState {
	profile: Profile | null
	setProfileData: (value: Profile | null) => void
	token: string | null
	setToken: (value: string | null) => void
	language: string
	setLanguage: (value: string) => void
	userId: string | null
	setUserId: (value: string | null) => void
}

const useUserStore = createWithEqualityFn<userState>()(
	persist(
		(set) => ({
			profile: null,
			setProfileData: (value: Profile | null) => {
				if (!value) return

				set({
					profile: value
				})
			},
			token: null,
			setToken: (value) => set({ token: value }),
			language: "en",
			setLanguage: (value) => set({ language: value }),
			userId: null,
			setUserId: (value) => set({ userId: value })
		}),
		{
			name: "user-store",
			partialize: (state) => ({
				language: state.language
			})
		}
	),
	shallow
)

export default useUserStore
