import { api } from "@/helpers"
import { DefaultResponse, PagingResponse } from "@/types"
import { RoleData } from "@/types/role.type"

class partnerPermissions {
	async getAll(): Promise<DefaultResponse<PagingResponse<RoleData[]>>> {
		return api.get(`/permission`).then((res) => res.data)
	}
}
const PartnerPermissions = new partnerPermissions()
export default PartnerPermissions
