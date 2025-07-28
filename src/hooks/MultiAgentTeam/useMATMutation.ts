import { QueryKeys } from "@/lib/constant"
import { MATServices } from "@/services"
import { STATUS_CODE } from "@/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export default function useMultiAgentTeamMutation() {
	const queryClient = useQueryClient()

	const createNewMATSession = useMutation({
		mutationFn: MATServices.createNewMATSession
	})

	const createNewMATTeam = useMutation({
		mutationFn: MATServices.createNewMATTeam
	})

	const generateMATPrds = useMutation({
		mutationFn: MATServices.generatePrds,
		onSuccess: async (response) => {
			if (response.status_code === STATUS_CODE.SUCCESS) {
				await Promise.allSettled([
					queryClient.invalidateQueries({
						queryKey: [QueryKeys.MAT_MAIN_PRD]
					}),
					queryClient.invalidateQueries({
						queryKey: [QueryKeys.ALL_MAT_PRD]
					})
				])
			}
		}
	})

	const selectMainPrd = useMutation({
		mutationFn: MATServices.selectMainPrd,
		onSuccess: async (response) => {
			if (response.status_code === STATUS_CODE.SUCCESS) {
				await Promise.allSettled([
					queryClient.invalidateQueries({
						queryKey: [QueryKeys.MAT_MAIN_PRD]
					})
				])
			}
		}
	})
	const getMainPrdIdea = useMutation({
		mutationFn: MATServices.getMainPrdIdea
	})

	return {
		createNewMATSession,
		createNewMATTeam,
		generateMATPrds,
		selectMainPrd,
		getMainPrdIdea
	}
}
