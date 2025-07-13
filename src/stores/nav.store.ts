import { shallow } from "zustand/shallow"
import { createWithEqualityFn } from "zustand/traditional"

interface userState {
	breadcrumbs: Record<string, string>
	setBreadCrumbs: (value: Record<string, string>) => void
}

const useNavStore = createWithEqualityFn<userState>()(
	(set) => ({
		breadcrumbs: {},
		setBreadCrumbs: (value: Record<string, string>) => {
			if (!value) return

			set({
				breadcrumbs: value
			})
		}
	}),
	shallow
)

export default useNavStore
