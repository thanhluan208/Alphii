import { api } from "@/helpers"
import { objectToFormData } from "@/lib/utils"
import { DefaultResponse } from "@/types"
import {
	CreateMultiAgentTeamRequest,
	GenerateMatPrdsPayload,
	GetAllMatPrdPayload,
	PrdFiles,
	SelectMainPrd
} from "@/types/mat.type"

export const createNewMATSession = async (
	mat_id: string
): Promise<DefaultResponse & { session_id: string }> => {
	return api
		.post("/multi_agent_team/session/management/create_new_session", {
			mat_id
		})
		.then((res) => res.data)
}

export const getMainMatPrd = async (
	mat_id: string,
	session_id: string
): Promise<DefaultResponse & { prd_data: string }> => {
	return api
		.post("multi_agent_team/session/behaviour/get_main_prd_file", {
			mat_id,
			session_id
		})
		.then((res) => res.data)
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

export const generatePrds = async (
	body: GenerateMatPrdsPayload
): Promise<DefaultResponse & { mat_id: string }> => {
	return api
		.post("/multi_agent_team/session/behaviour/generate_prd", body)
		.then((res) => res.data)
}

export const selectMainPrd = async (
	body: SelectMainPrd
): Promise<DefaultResponse & { mat_id: string }> => {
	return api
		.post("/multi_agent_team/session/behaviour/set_main_prd_file", body)
		.then((res) => res.data)
}

export const getMainPrdIdea = async (
	body: GetAllMatPrdPayload
): Promise<DefaultResponse & { idea: string }> => {
	return api
		.post("/multi_agent_team/session/behaviour/get_prd_idea", body)
		.then((res) => res.data)
}

export const getAllPrds = async (
	body: GetAllMatPrdPayload
): Promise<DefaultResponse & { prd_files: PrdFiles }> => {
	return api
		.post("/multi_agent_team/session/behaviour/get_all_prd_files", body)
		.then((res) => res.data)
}
