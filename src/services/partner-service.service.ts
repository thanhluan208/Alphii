import { api } from "@/helpers"
import { DefaultResponse, PagingResponse, StatusEnum } from "@/types"
import {
	CreateServicePayload,
	PartnerService,
	PartnerSubService,
	SubServicePayload
} from "@/types/partner-service.type"
import queryString from "query-string"

class partnerServices {
	async getAll(
		page?: string | null,
		field?: string | null
	): Promise<DefaultResponse<PagingResponse<PartnerService[]>>> {
		return api
			.get(
				`/service?${queryString.stringify({
					page,
					field
				})}`
			)
			.then((res) => res.data)
	}

	async getAllSubService(
		serviceId: string
	): Promise<DefaultResponse<PartnerSubService[]>> {
		return api.get(`/service/${serviceId}/sub-service`).then((res) => res.data)
	}

	async createService(
		payload: CreateServicePayload
	): Promise<DefaultResponse<PartnerService>> {
		const { serviceType, ...rest } = payload
		return api
			.post(`/service/create/${serviceType}`, rest)
			.then((res) => res.data)
	}

	async editService(
		payload: CreateServicePayload
	): Promise<DefaultResponse<PartnerService>> {
		const { id, ...rest } = payload
		return api.put(`/service/${id}`, rest).then((res) => res.data)
	}

	async uploadMedia(payload: FormData) {
		return api.post("/service/media/upload", payload).then((res) => res.data)
	}

	async getDetail(id: string): Promise<DefaultResponse<PartnerService>> {
		return api.get(`/service/${id}`).then((res) => res.data)
	}

	async delete(id: string) {
		return api.delete(`/service/${id}`).then((res) => res.data)
	}

	async deactivate(id: string) {
		return api
			.put(`/service/${id}`, {
				status: StatusEnum.DEACTIVE
			})
			.then((res) => res.data)
	}

	async activate(id: string) {
		return api
			.put(`/service/${id}`, {
				status: StatusEnum.ACTIVE
			})
			.then((res) => res.data)
	}

	async createSubService(
		payload: SubServicePayload
	): Promise<DefaultResponse<PartnerService>> {
		const { serviceId, ...rest } = payload
		return api
			.post(`/service/${serviceId}/sub-service`, rest)
			.then((res) => res.data)
	}

	async editSubService(
		payload: SubServicePayload
	): Promise<DefaultResponse<PartnerService>> {
		const { serviceId, id, ...rest } = payload
		return api
			.put(`/service/${serviceId}/sub-service/${id}`, rest)
			.then((res) => res.data)
	}
}

const PartnerServices = new partnerServices()
export default PartnerServices
