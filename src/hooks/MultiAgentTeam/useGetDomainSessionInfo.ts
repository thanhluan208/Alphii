import { QueryKeys } from "@/lib/constant"
import { MATServices } from "@/services"
import { useQuery } from "@tanstack/react-query"

export default function useGetDomainSessionInfo(sessionId: string) {
	return useQuery({
		queryKey: [QueryKeys.MAT_DOMAIN_SESSION_INFO, sessionId],
		queryFn: () =>
			MATServices.getDomainInfo({
				session_id: sessionId
			}),
		enabled: !!sessionId
	})
}
