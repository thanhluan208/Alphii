import { api } from "@/helpers"

interface CategoryParams {
	page?: number
	limit?: number
	query?: string
}

class partnerCategory {
	async getAll({ page, limit = 8, query = "" }: CategoryParams) {
		return api
			.get(`/category/all`, {
				params: {
					page,
					limit,
					field: query
				}
			})
			.then((res) => res.data)
	}
}

const PartnerCategories = new partnerCategory()
export default PartnerCategories
