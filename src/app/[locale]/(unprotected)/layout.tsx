import Image from "next/image"
import Link from "next/link"

export default function AccountLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div className="container flex p-6  items-center gap-28 justify-center h-screen">
            <div className="relative w-[773px] h-full">
                <Image
                    src="/imgs/login/img-bg.png"
                    alt="Login Image"
                    fill
                    className="rounded-lg object-cover"
                />
            </div>
            {children}
        </div>
    )
}
