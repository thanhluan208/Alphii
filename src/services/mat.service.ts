import { api } from "@/helpers"
import { objectToFormData } from "@/lib/utils"
import { DefaultResponse } from "@/types"
import { CreateMultiAgentTeamRequest } from "@/types/mat.type"

export const createNewMATSession = async (
	mat_id: string
): Promise<DefaultResponse & { session_id: string }> => {
	return api
		.post("/multi_agent_team/session/management/create_new_session", {
			mat_id
		})
		.then((res) => res.data)
}

export const getMainMatPrd = async (mat_id: string, session_id: string) => {
	return api.post("multi_agent_team/session/behaviour/get_main_prd_file", {
		mat_id,
		session_id
	})
}

export const createNewMATTeam = async (
	body: CreateMultiAgentTeamRequest
): Promise<DefaultResponse & { mat_id: string }> => {
	return api
		.post(
			"/multi_agent_team/team/management/create_multi_agent_team",
			objectToFormData(body)
		)
		.then((res) => res.data)
}
