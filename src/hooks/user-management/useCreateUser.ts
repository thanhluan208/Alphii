import { userManagementAPI } from "@/services/user"
import { useMutation } from "@tanstack/react-query"

export const useCreateUser = () => {
	const handleCreateUser = useMutation({
		mutationFn: (user: object) => {
			return userManagementAPI.create(user)
		}
	})

	return { handleCreateUser }
}
