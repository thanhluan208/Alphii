import { api } from "@/helpers"
import { DefaultResponse } from "@/types"

export const createNewMATSession = async (
	mat_id: string
): Promise<DefaultResponse & { session_id: string }> => {
	return api
		.post("/multi_agent_team/session/management/create_new_session", {
			mat_id
		})
		.then((res) => res.data)
}
