import toast from "react-hot-toast"
import { useTranslations } from "next-intl"

import { QueryKeys } from "@/lib/constant"
import { PartnerServices } from "@/services"
import { STATUS_CODE } from "@/types"
import {
	CreateServicePayload,
	SubServicePayload
} from "@/types/partner-service.type"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Check } from "lucide-react"

const useServiceMutate = () => {
	const QueryClient = useQueryClient()
	const serviceTranslation = useTranslations("service")
	const commonTranslation = useTranslations("common")

	const handleUploadMedia = useMutation({
		mutationFn: (medias: File[]) => {
			const formData = new FormData()
			for (let i = 0; i < medias.length; i++) {
				formData.append("media", medias[i])
			}
			return PartnerServices.uploadMedia(formData)
		},
		onError: () => {
			toast.error(
				commonTranslation("aFailed", {
					action: serviceTranslation("lUploadMedia")
				})
			)
		}
	})

	const handleCreateService = useMutation({
		mutationFn: (body: CreateServicePayload) => {
			return PartnerServices.createService(body)
		},
		onSuccess: async () => {
			await QueryClient.invalidateQueries({
				queryKey: [QueryKeys.PARTNER_SUB_SERVICE_DETAIL]
			})
			toast.success(
				commonTranslation("aSuccess", { action: serviceTranslation("lAddNew") })
			)
		},
		onError: () => {
			toast.error(
				commonTranslation("aFailed", { action: serviceTranslation("lAddNew") })
			)
		}
	})

	const handleEditService = useMutation({
		mutationFn: (body: CreateServicePayload) => {
			return PartnerServices.editService(body)
		},
		onSuccess: async () => {
			await QueryClient.invalidateQueries({
				queryKey: [QueryKeys.PARTNER_SERVICE_DETAIL]
			})
			toast.success(
				commonTranslation("aSuccess", { action: commonTranslation("lEdit") })
			)
		},
		onError: () => {
			toast.error(
				commonTranslation("aFailed", { action: commonTranslation("lEdit") })
			)
		}
	})

	const handleDeleteService = useMutation({
		mutationFn: (id: string) => {
			return PartnerServices.delete(id)
		},
		onSuccess: async () => {
			await QueryClient.invalidateQueries({
				queryKey: [QueryKeys.PARTNER_SERVICE_ALL]
			})
			toast.success(
				commonTranslation("aSuccess", { action: commonTranslation("lDelete") })
			)
		},
		onError: () => {
			toast.error(
				commonTranslation("aFailed", { action: commonTranslation("lDelete") })
			)
		}
	})
	const handleDeactivateService = useMutation({
		mutationFn: (id: string) => {
			return PartnerServices.deactivate(id)
		},
		onSuccess: async () => {
			await QueryClient.invalidateQueries({
				queryKey: [QueryKeys.PARTNER_SERVICE_ALL]
			})
			toast.success(
				commonTranslation("aSuccess", {
					action: commonTranslation("lDeactivate")
				})
			)
		},
		onError: () => {
			toast.error(
				commonTranslation("aFailed", {
					action: commonTranslation("lDeactivate")
				})
			)
		}
	})
	const handleActivateService = useMutation({
		mutationFn: (id: string) => {
			return PartnerServices.activate(id)
		},
		onSuccess: async () => {
			await QueryClient.invalidateQueries({
				queryKey: [QueryKeys.PARTNER_SERVICE_ALL]
			})
			toast.success(
				commonTranslation("aSuccess", {
					action: commonTranslation("lActivate")
				})
			)
		},
		onError: () => {
			toast.error(
				commonTranslation("aFailed", {
					action: commonTranslation("lActivate")
				})
			)
		}
	})

	const handleCreateSubService = useMutation({
		mutationFn: (body: SubServicePayload) => {
			return PartnerServices.createSubService(body)
		},
		onSuccess: async () => {
			await QueryClient.invalidateQueries({
				queryKey: [QueryKeys.PARTNER_SUB_SERVICE_DETAIL]
			})
			toast.success(
				commonTranslation("aSuccess", { action: serviceTranslation("lAddNew") })
			)
		},
		onError: () => {
			toast.error(
				commonTranslation("aFailed", { action: serviceTranslation("lAddNew") })
			)
		}
	})

	const handleEditSubService = useMutation({
		mutationFn: (body: SubServicePayload) => {
			return PartnerServices.editSubService(body)
		},
		onSuccess: async () => {
			await QueryClient.invalidateQueries({
				queryKey: [QueryKeys.PARTNER_SERVICE_DETAIL]
			})
			toast.success(
				commonTranslation("aSuccess", { action: commonTranslation("lEdit") })
			)
		},
		onError: () => {
			toast.error(
				commonTranslation("aFailed", { action: commonTranslation("lEdit") })
			)
		}
	})

	return {
		handleUploadMedia,
		handleCreateService,
		handleDeactivateService,
		handleDeleteService,
		handleActivateService,
		handleEditService,
		handleCreateSubService,
		handleEditSubService
	}
}

export default useServiceMutate
