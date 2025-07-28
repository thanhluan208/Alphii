import { QueryKeys } from "@/lib/constant"
import { MATServices } from "@/services"
import { useQuery } from "@tanstack/react-query"

export default function useGetAllMatPrd(matId: string, sessionId: string) {
	return useQuery({
		queryKey: [QueryKeys.MAT_MAIN_PRD, matId, sessionId],
		queryFn: () =>
			MATServices.getAllPrds({
				mat_id: matId,
				session_id: sessionId
			}),
		enabled: !!matId && !!sessionId
	})
}
