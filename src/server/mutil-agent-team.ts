import { apiUtils } from "./helper"

export const getMatMainPrd = apiUtils.createServerAction<
	{ matId: string; sessionId: string },
	unknown
>("/multi_agent_team/session/behaviour/get_main_prd_file", "POST")
