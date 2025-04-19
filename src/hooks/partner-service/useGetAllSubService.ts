import { QueryKeys } from "@/lib/constant"
import { PartnerServices } from "@/services"
import { useQuery } from "@tanstack/react-query"

const useGetAllSubService = (serviceId: string) => {
	return useQuery({
		queryKey: [QueryKeys.PARTNER_SUB_SERVICE_DETAIL, serviceId],
		queryFn: () => PartnerServices.getAllSubService(serviceId),
		enabled: !!serviceId
	})
}

export default useGetAllSubService
