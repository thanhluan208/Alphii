import { persist } from "zustand/middleware"
import { shallow } from "zustand/shallow"
import { createWithEqualityFn } from "zustand/traditional"
import { LOCAL_STORAGE_KEY } from "@/lib/constant";
import { Profile } from "@/types/user.type";

interface userState {
	Profile: Profile | null;
	setProfileData: (value: Profile | null) => void;
	token: string | null;
	setToken: (value: string | null) => void;
	language: string;
	setLanguage: (value: string) => void;
	userId: string | null,
	setUserId: (value: string | null) => void,
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
			},
			token: localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN) as string || null,
			setToken: (value) => set({ token: value }),
			language: "en",
			setLanguage: (value) => set({ language: value }),
			userId: localStorage.getItem(LOCAL_STORAGE_KEY.USER_ID) as string || null,
			setUserId: (value) => set({ userId: value }),
		}),
		{
			name: "user-store",
			partialize: (state) => ({
				language: state.language,
			}),
		}
	),
	shallow
)

export default useUserStore
