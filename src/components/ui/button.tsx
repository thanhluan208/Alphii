import * as React from "react"

import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva(
	"inline-flex items-center box-border rounded-[12px] flex flex-row justify-center items-center px-5 py-2.5 border border-white/10 shadow-[0_4px_10px_rgba(0,0,0,0.12)]  gap-1 w-48 h-12  justify-center gap-2 whitespace-nowrap  text-sm font-medium ring-offset-background  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default:
					"bg-[linear-gradient(0deg,#5100D9,#5100D9),linear-gradient(90deg,#3A10D1_0%,#794BFF_100%)] text-primary-foreground disabled:bg-grey-2 disabled:bg-none disabled:text-white",
				secondary: "border border-red-600 bg-background text-red-600 ",
				outline: "border-2 bg-[#F9F9FB] border-[#D9DAE1]",
				text: "text-primary hover:bg-jungleGreen/10",
				ghost: "hover:bg-accent hover:text-accent-foreground",
				link: "text-primary underline-offset-4 hover:underline",
				destructive:
					"border border-destructive bg-transparent text-destructive hover:bg-destructive/10 disabled:border-grey-2 disabled:text-grey-2"
			},

			size: {
				default: "h-10 px-4 py-2",
				sm: "h-9  px-3",
				lg: "h-11  px-8",
				icon: "h-10 w-10"
			}
		},
		defaultVariants: {
			variant: "default",
			size: "default"
		}
	}
)

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : "button"
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		)
	}
)
Button.displayName = "Button"

export { Button, buttonVariants }
