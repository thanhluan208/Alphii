import { QueryKeys, USER_ID } from "@/lib/constant"
import { MATServices } from "@/services"
import UserService from "@/services/user.service"
import { useQuery } from "@tanstack/react-query"
import Cookies from "js-cookie"
import { isNil } from "lodash"

export default function useGetMatMainPrd(matId: string, sessionId: string) {
	const userID = Cookies.get(USER_ID)

	return useQuery({
		queryKey: [QueryKeys.MAT_MAIN_PRD, String(userID), matId, sessionId],
		queryFn: () => MATServices.getMainMatPrd(matId, sessionId),
		enabled: !isNil(userID) && !!matId && !!sessionId
	})
}
