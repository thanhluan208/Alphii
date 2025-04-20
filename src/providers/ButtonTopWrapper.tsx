import React, { ComponentPropsWithoutRef, Fragment } from "react"

interface ButtonTopWrapperProps extends ComponentPropsWithoutRef<"div"> {
	button?: React.ReactNode
}

const ButtonTopWrapper = ({
	children,
	button,
	...rest
}: ButtonTopWrapperProps) => {
	return (
		<Fragment>
			<div className="aboslute top-6 left-0" {...rest}>
				{button}
			</div>
			{children}
		</Fragment>
	)
}

export default ButtonTopWrapper
