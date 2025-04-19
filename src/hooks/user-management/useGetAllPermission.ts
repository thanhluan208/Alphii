import { QueryKeys } from "@/lib/constant"
import PartnerPermissions from "@/services/partner-role"
import { useQuery } from "@tanstack/react-query"

const useGetAllPermission = () => {
	return useQuery({
		queryKey: [QueryKeys.PARTNER_PERMISSION_ALL],
		queryFn: () => PartnerPermissions.getAll()
	})
}

export default useGetAllPermission
