"use client"

import React from "react"

import Bell from "../icons/Bell"
import Profile from "../icons/Profile"
import Question from "../icons/Question"

const HeaderRight = () => {
	return (
		<div className="flex gap-8 items-center">
			<Question />
			<Bell />
			<Profile />
		</div>
	)
}

export default HeaderRight
