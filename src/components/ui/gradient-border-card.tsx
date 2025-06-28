import React, { ComponentPropsWithoutRef } from "react"

import { cn } from "@/lib/utils"

const GradientBorderCard = ({
	className,
	children
}: ComponentPropsWithoutRef<"div">) => {
	return <div className={cn(" relative", className)}>{children}</div>
}

export default GradientBorderCard
