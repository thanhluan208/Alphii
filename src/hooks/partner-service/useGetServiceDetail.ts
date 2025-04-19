import { QueryKeys } from "@/lib/constant"
import { PartnerServices } from "@/services"
import { useQuery } from "@tanstack/react-query"

const useGetServiceDetail = (id: string) => {
	return useQuery({
		queryKey: [QueryKeys.PARTNER_SERVICE_DETAIL, id],
		queryFn: () => PartnerServices.getDetail(id),
		enabled: !!id
	})
}

export default useGetServiceDetail
