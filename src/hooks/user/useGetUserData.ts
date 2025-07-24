import { QueryKeys, USER_ID } from "@/lib/constant"
import UserService from "@/services/user.service"
import { useQuery } from "@tanstack/react-query"
import Cookies from "js-cookie"
import { isNil } from "lodash"

export default function useGetUserData() {
	const userID = Cookies.get(USER_ID)

	return useQuery({
		queryKey: [QueryKeys.USER_DATA, String(userID)],
		queryFn: () => UserService.getUserData(String(userID)),
		enabled: !isNil(userID)
	})
}
