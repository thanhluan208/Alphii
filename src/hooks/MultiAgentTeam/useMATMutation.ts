import { MATServices } from "@/services"
import { useMutation } from "@tanstack/react-query"

export default function useMultiAgentTeamMutation() {
	const createNewMATSession = useMutation({
		mutationFn: MATServices.createNewMATSession
	})

	const createNewMATTeam = useMutation({
		mutationFn: MATServices.createNewMATTeam
	})

	return {
		createNewMATSession,
		createNewMATTeam
	}
}
