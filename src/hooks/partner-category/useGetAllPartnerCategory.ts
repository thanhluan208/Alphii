import { useSearchParams } from "next/navigation"

import { QueryKeys } from "@/lib/constant"
import { PartnerCategories } from "@/services"
import { useQuery } from "@tanstack/react-query"

const useGetAllPartnerCategory = (argQuery?: string) => {
	const searchParams = useSearchParams()
	const page = searchParams?.get("page") ? Number(searchParams.get("page")) : 1
	const query = searchParams?.get("query") || argQuery

	return useQuery({
		queryKey: [QueryKeys.PARTNER_CATEGORY_ALL, page, query],
		queryFn: () => PartnerCategories.getAll({ page, query })
	})
}

export default useGetAllPartnerCategory
