import React, { useCallback, useEffect } from "react"
import { useSearchParams } from "next/navigation"

import { SpinIcon } from "@/components/icons"
import { Button } from "@/components/ui"

import useChatStore from "@/stores/chat.store"
import useMultiAgentTeamMutation from "@/hooks/MultiAgentTeam/useMATMutation"

const DeployButton = () => {
	const message = useChatStore((state) => state.messages)
	const messageLength = message?.length

	const messageLengthRef = React.useRef(messageLength)

	const query = useSearchParams()

	const matId = query.get("matId")
	const sessionId = query.get("sessionId")

	const {
		checkContainerRunning,
		checkDeployable,
		checkImageExist,
		buildAndRunContainer,
		runContainer,
		stopContainer
	} = useMultiAgentTeamMutation()

	const { mutate: checkDeploy } = checkDeployable
	const { mutate: checkImage } = checkImageExist
	const { mutate: checkContainer } = checkContainerRunning

	const isContainerRunning = checkContainerRunning?.data?.container_running
	const isImageExisted = checkImageExist?.data?.image_existed
	const isDeployable = checkDeployable?.data?.deployable

	const handleCheckDeployable = useCallback(() => {
		if (isDeployable || !matId || !sessionId) return

		checkDeploy({
			mat_id: matId,
			session_id: sessionId
		})
	}, [checkDeploy, matId, sessionId, isDeployable])

	const handleCheckContainerRunning = useCallback(() => {
		if (!isDeployable || isImageExisted || !matId || !sessionId) return
		checkImage({
			mat_id: matId,
			session_id: sessionId
		})
	}, [checkImage, matId, sessionId, isImageExisted, isDeployable])

	const handleCheckImageExist = useCallback(() => {
		if (!isDeployable || !matId || !sessionId) return
		checkContainer({
			mat_id: matId,
			session_id: sessionId
		})
	}, [checkContainer, matId, sessionId, isDeployable])

	const isPending =
		buildAndRunContainer.isPending ||
		runContainer.isPending ||
		stopContainer.isPending

	const handleClick = () => {
		if (!matId || !sessionId) return
		if (!isContainerRunning && !isImageExisted) {
			buildAndRunContainer.mutate({
				mat_id: matId,
				session_id: sessionId
			})
		}

		if (!isContainerRunning && isImageExisted) {
			runContainer.mutate({
				mat_id: matId,
				session_id: sessionId
			})
		}

		if (isContainerRunning) {
			stopContainer.mutate({
				mat_id: matId,
				session_id: sessionId
			})
		}
	}

	const renderButtonContent = () => {
		if (isPending) return <SpinIcon />

		if (isContainerRunning) return "Stop "

		if (isImageExisted) return "Deploy"

		return "Deploy"
	}

	useEffect(() => {
		if (messageLength <= messageLengthRef.current) return

		handleCheckDeployable()
		handleCheckContainerRunning()
		handleCheckImageExist()
		messageLengthRef.current = messageLength
	}, [
		messageLength,
		handleCheckDeployable,
		handleCheckContainerRunning,
		handleCheckImageExist
	])

	if (!isDeployable) return null

	return (
		<Button className="w-16" disabled={isPending} onClick={handleClick}>
			{renderButtonContent()}
		</Button>
	)
}

export default DeployButton
