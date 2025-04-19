import { QueryKeys } from "@/lib/constant"
import { PartnerServices } from "@/services"
import { useQuery } from "@tanstack/react-query"

const useGetAllParnerService = (
	page?: string | null,
	field?: string | null
) => {
	return useQuery({
		queryKey: [QueryKeys.PARTNER_SERVICE_ALL, page, field],
		queryFn: () => PartnerServices.getAll(page, field)
	})
}

export default useGetAllParnerService
