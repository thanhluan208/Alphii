import { ComponentPropsWithoutRef } from "react"

export const DoubleChevronRight: React.FC<ComponentPropsWithoutRef<"svg">> = ({
	fill = "currentColor"
}) => {
	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M6.29279 6.29279C6.48031 6.10532 6.73462 6 6.99979 6C7.26495 6 7.51926 6.10532 7.70679 6.29279L12.7068 11.2928C12.8943 11.4803 12.9996 11.7346 12.9996 11.9998C12.9996 12.265 12.8943 12.5193 12.7068 12.7068L7.70679 17.7068C7.51818 17.8889 7.26558 17.9897 7.00339 17.9875C6.74119 17.9852 6.49038 17.88 6.30497 17.6946C6.11956 17.5092 6.01439 17.2584 6.01211 16.9962C6.00983 16.734 6.11063 16.4814 6.29279 16.2928L10.5858 11.9998L6.29279 7.70679C6.10532 7.51926 6 7.26495 6 6.99979C6 6.73462 6.10532 6.48031 6.29279 6.29279ZM12.2928 6.29279C12.4803 6.10532 12.7346 6 12.9998 6C13.265 6 13.5193 6.10532 13.7068 6.29279L18.7068 11.2928C18.8943 11.4803 18.9996 11.7346 18.9996 11.9998C18.9996 12.265 18.8943 12.5193 18.7068 12.7068L13.7068 17.7068C13.5182 17.8889 13.2656 17.9897 13.0034 17.9875C12.7412 17.9852 12.4904 17.88 12.305 17.6946C12.1196 17.5092 12.0144 17.2584 12.0121 16.9962C12.0098 16.734 12.1106 16.4814 12.2928 16.2928L16.5858 11.9998L12.2928 7.70679C12.1053 7.51926 12 7.26495 12 6.99979C12 6.73462 12.1053 6.48031 12.2928 6.29279Z"
				fill={fill}
			/>
		</svg>
	)
}

export const Twitter: React.FC<ComponentPropsWithoutRef<"svg">> = ({
	fill = "currentColor"
}) => {
	return (
		<svg
			width="20"
			height="21"
			viewBox="0 0 20 21"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M16.7967 17.3926C16.7429 17.4906 16.6637 17.5724 16.5676 17.6294C16.4714 17.6864 16.3616 17.7166 16.2498 17.7168H12.4998C12.3946 17.7168 12.2911 17.6902 12.199 17.6395C12.1068 17.5889 12.0289 17.5157 11.9725 17.427L8.80919 12.4559L4.21232 17.5121C4.10026 17.6325 3.94526 17.7038 3.78095 17.7107C3.61663 17.7176 3.45622 17.6594 3.33451 17.5488C3.2128 17.4382 3.13959 17.2841 3.13076 17.1198C3.12192 16.9556 3.17817 16.7945 3.28732 16.6715L8.1131 11.359L3.22247 3.67773C3.16224 3.58324 3.12852 3.47428 3.12485 3.36228C3.12117 3.25028 3.14768 3.13935 3.20159 3.04111C3.25551 2.94287 3.33484 2.86093 3.43129 2.80387C3.52774 2.74682 3.63775 2.71674 3.74982 2.7168H7.49982C7.605 2.71683 7.70848 2.74341 7.80067 2.79408C7.89285 2.84474 7.97075 2.91786 8.02716 3.00664L11.1904 7.97773L15.7873 2.92148C15.8994 2.80111 16.0544 2.72975 16.2187 2.72289C16.383 2.71602 16.5434 2.7742 16.6651 2.88481C16.7868 2.99542 16.86 3.14954 16.8689 3.31377C16.8777 3.47799 16.8215 3.63908 16.7123 3.76211L11.8865 9.0707L16.7772 16.7566C16.8371 16.8512 16.8705 16.9601 16.8739 17.0719C16.8773 17.1838 16.8507 17.2945 16.7967 17.3926Z"
				fill={fill}
			/>
		</svg>
	)
}

export const Linkedin: React.FC<ComponentPropsWithoutRef<"svg">> = ({
	fill = "currentColor"
}) => {
	return (
		<svg
			width="20"
			height="21"
			viewBox="0 0 20 21"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M16.875 2.0918H3.125C2.79348 2.0918 2.47554 2.22349 2.24112 2.45791C2.0067 2.69233 1.875 3.01028 1.875 3.3418V17.0918C1.875 17.4233 2.0067 17.7413 2.24112 17.9757C2.47554 18.2101 2.79348 18.3418 3.125 18.3418H16.875C17.2065 18.3418 17.5245 18.2101 17.7589 17.9757C17.9933 17.7413 18.125 17.4233 18.125 17.0918V3.3418C18.125 3.01028 17.9933 2.69233 17.7589 2.45791C17.5245 2.22349 17.2065 2.0918 16.875 2.0918ZM7.5 13.9668C7.5 14.1326 7.43415 14.2915 7.31694 14.4087C7.19973 14.5259 7.04076 14.5918 6.875 14.5918C6.70924 14.5918 6.55027 14.5259 6.43306 14.4087C6.31585 14.2915 6.25 14.1326 6.25 13.9668V8.9668C6.25 8.80104 6.31585 8.64207 6.43306 8.52486C6.55027 8.40765 6.70924 8.3418 6.875 8.3418C7.04076 8.3418 7.19973 8.40765 7.31694 8.52486C7.43415 8.64207 7.5 8.80104 7.5 8.9668V13.9668ZM6.875 7.7168C6.68958 7.7168 6.50832 7.66181 6.35415 7.5588C6.19998 7.45579 6.07982 7.30937 6.00886 7.13806C5.93791 6.96676 5.91934 6.77826 5.95551 6.5964C5.99169 6.41454 6.08098 6.2475 6.21209 6.11638C6.3432 5.98527 6.51025 5.89598 6.6921 5.85981C6.87396 5.82364 7.06246 5.8422 7.23377 5.91316C7.40507 5.98412 7.55149 6.10428 7.6545 6.25845C7.75752 6.41262 7.8125 6.59388 7.8125 6.7793C7.8125 7.02794 7.71373 7.26639 7.53791 7.44221C7.3621 7.61802 7.12364 7.7168 6.875 7.7168ZM14.375 13.9668C14.375 14.1326 14.3092 14.2915 14.1919 14.4087C14.0747 14.5259 13.9158 14.5918 13.75 14.5918C13.5842 14.5918 13.4253 14.5259 13.3081 14.4087C13.1908 14.2915 13.125 14.1326 13.125 13.9668V11.1543C13.125 10.7399 12.9604 10.3425 12.6674 10.0494C12.3743 9.75642 11.9769 9.5918 11.5625 9.5918C11.1481 9.5918 10.7507 9.75642 10.4576 10.0494C10.1646 10.3425 10 10.7399 10 11.1543V13.9668C10 14.1326 9.93415 14.2915 9.81694 14.4087C9.69973 14.5259 9.54076 14.5918 9.375 14.5918C9.20924 14.5918 9.05027 14.5259 8.93306 14.4087C8.81585 14.2915 8.75 14.1326 8.75 13.9668V8.9668C8.75078 8.81371 8.80771 8.66623 8.91001 8.55233C9.01231 8.43843 9.15285 8.36605 9.30498 8.3489C9.45711 8.33175 9.61024 8.37103 9.73533 8.45929C9.86041 8.54756 9.94876 8.67866 9.98359 8.82773C10.4064 8.54092 10.8993 8.37469 11.4095 8.34689C11.9196 8.31909 12.4277 8.43079 12.8792 8.66997C13.3306 8.90915 13.7084 9.26679 13.972 9.70449C14.2355 10.1422 14.3748 10.6434 14.375 11.1543V13.9668Z"
				fill={fill}
			/>
		</svg>
	)
}

export const CustomPriceIcon: React.FC<ComponentPropsWithoutRef<"svg">> = ({
	fill = "currentColor"
}) => {
	return (
		<svg
			width="88"
			height="89"
			viewBox="0 0 88 89"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g filter="url(#filter0_di_41_3194)">
				<g clip-path="url(#clip0_41_3194)">
					<rect
						x="12"
						y="10.2168"
						width="64"
						height="64"
						rx="16"
						fill="#2F2F2F"
					/>
					<g filter="url(#filter1_d_41_3194)">
						<rect
							x="18"
							y="16.5498"
							width="52"
							height="52"
							rx="12"
							fill="url(#paint0_linear_41_3194)"
							shape-rendering="crispEdges"
						/>
						<rect
							x="19"
							y="17.5498"
							width="50"
							height="50"
							rx="11"
							stroke="url(#paint1_linear_41_3194)"
							stroke-width="2"
							shape-rendering="crispEdges"
						/>
					</g>
				</g>
				<rect
					x="13"
					y="11.2168"
					width="62"
					height="62"
					rx="15"
					stroke="black"
					stroke-opacity="0.08"
					stroke-width="2"
				/>
			</g>
			<defs>
				<filter
					id="filter0_di_41_3194"
					x="0"
					y="0.216797"
					width="88"
					height="88"
					filterUnits="userSpaceOnUse"
					color-interpolation-filters="sRGB"
				>
					<feFlood flood-opacity="0" result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="2" />
					<feGaussianBlur stdDeviation="6" />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
					/>
					<feBlend
						mode="normal"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_41_3194"
					/>
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_41_3194"
						result="shape"
					/>
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="4" />
					<feGaussianBlur stdDeviation="4" />
					<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.35 0"
					/>
					<feBlend
						mode="normal"
						in2="shape"
						result="effect2_innerShadow_41_3194"
					/>
				</filter>
				<filter
					id="filter1_d_41_3194"
					x="8"
					y="10.5498"
					width="72"
					height="72"
					filterUnits="userSpaceOnUse"
					color-interpolation-filters="sRGB"
				>
					<feFlood flood-opacity="0" result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="4" />
					<feGaussianBlur stdDeviation="5" />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0"
					/>
					<feBlend
						mode="normal"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_41_3194"
					/>
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_41_3194"
						result="shape"
					/>
				</filter>
				<linearGradient
					id="paint0_linear_41_3194"
					x1="44"
					y1="16.5498"
					x2="44"
					y2="68.5498"
					gradientUnits="userSpaceOnUse"
				>
					<stop stop-color="white" stop-opacity="0" />
					<stop offset="1" stop-color="white" stop-opacity="0.2" />
				</linearGradient>
				<linearGradient
					id="paint1_linear_41_3194"
					x1="44"
					y1="16.5498"
					x2="44"
					y2="68.5498"
					gradientUnits="userSpaceOnUse"
				>
					<stop stop-color="white" stop-opacity="0.08" />
					<stop offset="0.5" stop-color="white" stop-opacity="0.55" />
					<stop offset="1" stop-color="white" stop-opacity="0.08" />
				</linearGradient>
				<clipPath id="clip0_41_3194">
					<rect
						x="12"
						y="10.2168"
						width="64"
						height="64"
						rx="16"
						fill="white"
					/>
				</clipPath>
			</defs>
		</svg>
	)
}

export const PlusIcon: React.FC<ComponentPropsWithoutRef<"svg">> = ({
	fill = "currentColor"
}) => {
	return (
		<svg
			width="88"
			height="89"
			viewBox="0 0 88 89"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g filter="url(#filter0_di_41_3145)">
				<g clip-path="url(#clip0_41_3145)">
					<rect
						x="12"
						y="10.2168"
						width="64"
						height="64"
						rx="16"
						fill="#FB8601"
					/>
					<g filter="url(#filter1_d_41_3145)">
						<g clip-path="url(#clip1_41_3145)">
							<rect
								x="18"
								y="16.5498"
								width="52"
								height="52"
								rx="12"
								fill="url(#paint0_linear_41_3145)"
								shape-rendering="crispEdges"
							/>
							<g filter="url(#filter2_di_41_3145)">
								<path
									d="M44 29.5332C41.4288 29.5332 38.9154 30.2956 36.7776 31.7241C34.6398 33.1526 32.9735 35.1829 31.9896 37.5583C31.0056 39.9338 30.7482 42.5476 31.2498 45.0694C31.7514 47.5911 32.9895 49.9075 34.8076 51.7256C36.6257 53.5437 38.9421 54.7818 41.4638 55.2834C43.9856 55.785 46.5995 55.5276 48.9749 54.5436C51.3503 53.5597 53.3807 51.8935 54.8091 49.7556C56.2376 47.6178 57 45.1044 57 42.5332C56.9964 39.0865 55.6256 35.782 53.1884 33.3448C50.7512 30.9077 47.4467 29.5368 44 29.5332ZM51.4288 45.667C51.6195 45.777 51.7686 45.9469 51.8529 46.1503C51.9373 46.3537 51.9521 46.5793 51.8951 46.792C51.8381 47.0047 51.7125 47.1926 51.5378 47.3267C51.363 47.4607 51.149 47.5333 50.9288 47.5332C50.7532 47.5337 50.5806 47.4876 50.4288 47.3995L45 44.2657V50.5332C45 50.7984 44.8946 51.0528 44.7071 51.2403C44.5196 51.4278 44.2652 51.5332 44 51.5332C43.7348 51.5332 43.4804 51.4278 43.2929 51.2403C43.1054 51.0528 43 50.7984 43 50.5332V44.2657L37.5713 47.3995C37.3416 47.5317 37.0689 47.5674 36.813 47.4988C36.557 47.4301 36.3388 47.2626 36.2063 47.0332C36.0735 46.8036 36.0374 46.5307 36.1058 46.2745C36.1743 46.0183 36.3417 45.7997 36.5713 45.667L42 42.5332L36.5713 39.3995C36.3415 39.2668 36.1739 39.0484 36.1052 38.7922C36.0712 38.6653 36.0625 38.533 36.0796 38.4028C36.0967 38.2725 36.1393 38.147 36.205 38.0332C36.2707 37.9194 36.3581 37.8197 36.4623 37.7398C36.5665 37.6598 36.6854 37.6011 36.8123 37.5671C37.0685 37.4984 37.3415 37.5343 37.5713 37.667L43 40.8007V34.5332C43 34.268 43.1054 34.0136 43.2929 33.8261C43.4804 33.6386 43.7348 33.5332 44 33.5332C44.2652 33.5332 44.5196 33.6386 44.7071 33.8261C44.8946 34.0136 45 34.268 45 34.5332V40.8007L50.4288 37.667C50.6585 37.5343 50.9315 37.4984 51.1877 37.5671C51.444 37.6358 51.6624 37.8035 51.795 38.0332C51.9276 38.2629 51.9635 38.536 51.8948 38.7922C51.8262 39.0484 51.6585 39.2668 51.4288 39.3995L46 42.5332L51.4288 45.667Z"
									fill="white"
								/>
							</g>
						</g>
						<rect
							x="19"
							y="17.5498"
							width="50"
							height="50"
							rx="11"
							stroke="url(#paint1_linear_41_3145)"
							stroke-width="2"
							shape-rendering="crispEdges"
						/>
					</g>
				</g>
				<rect
					x="13"
					y="11.2168"
					width="62"
					height="62"
					rx="15"
					stroke="black"
					stroke-opacity="0.08"
					stroke-width="2"
				/>
			</g>
			<defs>
				<filter
					id="filter0_di_41_3145"
					x="0"
					y="0.216797"
					width="88"
					height="88"
					filterUnits="userSpaceOnUse"
					color-interpolation-filters="sRGB"
				>
					<feFlood flood-opacity="0" result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="2" />
					<feGaussianBlur stdDeviation="6" />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
					/>
					<feBlend
						mode="normal"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_41_3145"
					/>
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_41_3145"
						result="shape"
					/>
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="4" />
					<feGaussianBlur stdDeviation="4" />
					<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.35 0"
					/>
					<feBlend
						mode="normal"
						in2="shape"
						result="effect2_innerShadow_41_3145"
					/>
				</filter>
				<filter
					id="filter1_d_41_3145"
					x="8"
					y="10.5498"
					width="72"
					height="72"
					filterUnits="userSpaceOnUse"
					color-interpolation-filters="sRGB"
				>
					<feFlood flood-opacity="0" result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="4" />
					<feGaussianBlur stdDeviation="5" />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0"
					/>
					<feBlend
						mode="normal"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_41_3145"
					/>
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_41_3145"
						result="shape"
					/>
				</filter>
				<filter
					id="filter2_di_41_3145"
					x="19"
					y="21.5332"
					width="50"
					height="50"
					filterUnits="userSpaceOnUse"
					color-interpolation-filters="sRGB"
				>
					<feFlood flood-opacity="0" result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="4" />
					<feGaussianBlur stdDeviation="6" />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 1 0 0 0 0 0.825707 0 0 0 0 0.502019 0 0 0 1 0"
					/>
					<feBlend
						mode="normal"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_41_3145"
					/>
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_41_3145"
						result="shape"
					/>
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="4" />
					<feGaussianBlur stdDeviation="2" />
					<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"
					/>
					<feBlend
						mode="normal"
						in2="shape"
						result="effect2_innerShadow_41_3145"
					/>
				</filter>
				<linearGradient
					id="paint0_linear_41_3145"
					x1="44"
					y1="16.5498"
					x2="44"
					y2="68.5498"
					gradientUnits="userSpaceOnUse"
				>
					<stop stop-color="white" stop-opacity="0" />
					<stop offset="1" stop-color="white" stop-opacity="0.2" />
				</linearGradient>
				<linearGradient
					id="paint1_linear_41_3145"
					x1="44"
					y1="16.5498"
					x2="44"
					y2="68.5498"
					gradientUnits="userSpaceOnUse"
				>
					<stop stop-color="white" stop-opacity="0.08" />
					<stop offset="0.5" stop-color="white" stop-opacity="0.55" />
					<stop offset="1" stop-color="white" stop-opacity="0.08" />
				</linearGradient>
				<clipPath id="clip0_41_3145">
					<rect
						x="12"
						y="10.2168"
						width="64"
						height="64"
						rx="16"
						fill="white"
					/>
				</clipPath>
				<clipPath id="clip1_41_3145">
					<rect
						x="18"
						y="16.5498"
						width="52"
						height="52"
						rx="12"
						fill="white"
					/>
				</clipPath>
			</defs>
		</svg>
	)
}

export const BasicIcon: React.FC<ComponentPropsWithoutRef<"svg">> = ({
	fill = "currentColor"
}) => {
	return (
		<svg
			width="88"
			height="89"
			viewBox="0 0 88 89"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g filter="url(#filter0_di_41_3096)">
				<g clip-path="url(#clip0_41_3096)">
					<rect
						x="12"
						y="10.2168"
						width="64"
						height="64"
						rx="16"
						fill="#643AFE"
					/>
					<g filter="url(#filter1_d_41_3096)">
						<g clip-path="url(#clip1_41_3096)">
							<rect
								x="18"
								y="16.5498"
								width="52"
								height="52"
								rx="12"
								fill="url(#paint0_linear_41_3096)"
								shape-rendering="crispEdges"
							/>
							<g filter="url(#filter2_d_41_3096)">
								<path
									d="M45.9225 28.7643C45.7992 28.6618 45.6531 28.5904 45.4965 28.5562C45.3399 28.522 45.1773 28.526 45.0225 28.5678C44.8678 28.6096 44.7253 28.6879 44.6072 28.7963C44.489 28.9047 44.3987 29.0399 44.3438 29.1905L41.5938 36.7418L38.5737 33.8155C38.4723 33.7171 38.3512 33.6414 38.2184 33.5932C38.0856 33.5451 37.944 33.5256 37.8031 33.5361C37.6622 33.5466 37.5252 33.5869 37.4009 33.6542C37.2767 33.7215 37.1682 33.8144 37.0825 33.9268C34.375 37.4743 33 41.043 33 44.533C33 47.4504 34.1589 50.2483 36.2218 52.3112C38.2847 54.3741 41.0826 55.533 44 55.533C46.9174 55.533 49.7153 54.3741 51.7782 52.3112C53.8411 50.2483 55 47.4504 55 44.533C55 37.1018 48.6513 31.033 45.9225 28.7643Z"
									fill="white"
								/>
							</g>
						</g>
						<rect
							x="19"
							y="17.5498"
							width="50"
							height="50"
							rx="11"
							stroke="url(#paint1_linear_41_3096)"
							stroke-width="2"
							shape-rendering="crispEdges"
						/>
					</g>
				</g>
				<rect
					x="13"
					y="11.2168"
					width="62"
					height="62"
					rx="15"
					stroke="black"
					stroke-opacity="0.08"
					stroke-width="2"
				/>
			</g>
			<defs>
				<filter
					id="filter0_di_41_3096"
					x="0"
					y="0.216797"
					width="88"
					height="88"
					filterUnits="userSpaceOnUse"
					color-interpolation-filters="sRGB"
				>
					<feFlood flood-opacity="0" result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="2" />
					<feGaussianBlur stdDeviation="6" />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
					/>
					<feBlend
						mode="normal"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_41_3096"
					/>
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_41_3096"
						result="shape"
					/>
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="4" />
					<feGaussianBlur stdDeviation="4" />
					<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.35 0"
					/>
					<feBlend
						mode="normal"
						in2="shape"
						result="effect2_innerShadow_41_3096"
					/>
				</filter>
				<filter
					id="filter1_d_41_3096"
					x="8"
					y="10.5498"
					width="72"
					height="72"
					filterUnits="userSpaceOnUse"
					color-interpolation-filters="sRGB"
				>
					<feFlood flood-opacity="0" result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="4" />
					<feGaussianBlur stdDeviation="5" />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0"
					/>
					<feBlend
						mode="normal"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_41_3096"
					/>
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_41_3096"
						result="shape"
					/>
				</filter>
				<filter
					id="filter2_d_41_3096"
					x="21"
					y="20.5332"
					width="46"
					height="51"
					filterUnits="userSpaceOnUse"
					color-interpolation-filters="sRGB"
				>
					<feFlood flood-opacity="0" result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="4" />
					<feGaussianBlur stdDeviation="6" />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0.809107 0 0 0 0 0.502019 0 0 0 0 1 0 0 0 1 0"
					/>
					<feBlend
						mode="normal"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_41_3096"
					/>
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_41_3096"
						result="shape"
					/>
				</filter>
				<linearGradient
					id="paint0_linear_41_3096"
					x1="44"
					y1="16.5498"
					x2="44"
					y2="68.5498"
					gradientUnits="userSpaceOnUse"
				>
					<stop stop-color="white" stop-opacity="0" />
					<stop offset="1" stop-color="white" stop-opacity="0.2" />
				</linearGradient>
				<linearGradient
					id="paint1_linear_41_3096"
					x1="44"
					y1="16.5498"
					x2="44"
					y2="68.5498"
					gradientUnits="userSpaceOnUse"
				>
					<stop stop-color="white" stop-opacity="0.08" />
					<stop offset="0.5" stop-color="white" stop-opacity="0.55" />
					<stop offset="1" stop-color="white" stop-opacity="0.08" />
				</linearGradient>
				<clipPath id="clip0_41_3096">
					<rect
						x="12"
						y="10.2168"
						width="64"
						height="64"
						rx="16"
						fill="white"
					/>
				</clipPath>
				<clipPath id="clip1_41_3096">
					<rect
						x="18"
						y="16.5498"
						width="52"
						height="52"
						rx="12"
						fill="white"
					/>
				</clipPath>
			</defs>
		</svg>
	)
}

export const StoreDataIcon: React.FC<ComponentPropsWithoutRef<"svg">> = ({
	fill = "currentColor"
}) => {
	return (
		<svg
			width="44"
			height="45"
			viewBox="0 0 44 45"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g filter="url(#filter0_di_50_589)">
				<g clipPath="url(#clip0_50_589)">
					<rect x="6" y="5.2998" width="32" height="32" rx="8" fill="#663FF6" />
					<g filter="url(#filter1_d_50_589)">
						<rect
							x="9"
							y="8.46533"
							width="26"
							height="26"
							rx="6"
							fill="url(#paint0_linear_50_589)"
							shapeRendering="crispEdges"
						/>
						<rect
							x="9.5"
							y="8.96533"
							width="25"
							height="25"
							rx="5.5"
							stroke="url(#paint1_linear_50_589)"
							shapeRendering="crispEdges"
						/>
						<path
							d="M26.9585 15.479H15.7085C15.4101 15.479 15.124 15.5975 14.913 15.8085C14.702 16.0195 14.5835 16.3056 14.5835 16.604V19.979C14.5835 20.2774 14.702 20.5635 14.913 20.7745C15.124 20.9855 15.4101 21.104 15.7085 21.104H26.9585C27.2569 21.104 27.543 20.9855 27.754 20.7745C27.965 20.5635 28.0835 20.2774 28.0835 19.979V16.604C28.0835 16.3056 27.965 16.0195 27.754 15.8085C27.543 15.5975 27.2569 15.479 26.9585 15.479ZM24.9897 19.1353C24.8229 19.1353 24.6597 19.0858 24.521 18.9931C24.3822 18.9003 24.2741 18.7686 24.2102 18.6144C24.1464 18.4602 24.1297 18.2906 24.1622 18.1269C24.1948 17.9632 24.2751 17.8129 24.3931 17.6949C24.5111 17.5769 24.6615 17.4965 24.8251 17.464C24.9888 17.4314 25.1585 17.4481 25.3126 17.512C25.4668 17.5758 25.5986 17.684 25.6913 17.8227C25.784 17.9615 25.8335 18.1246 25.8335 18.2915C25.8335 18.5153 25.7446 18.7299 25.5864 18.8881C25.4281 19.0464 25.2135 19.1353 24.9897 19.1353Z"
							fill="white"
						/>
						<path
							d="M26.9585 22.229H15.7085C15.4101 22.229 15.124 22.3475 14.913 22.5585C14.702 22.7695 14.5835 23.0556 14.5835 23.354V26.729C14.5835 27.0274 14.702 27.3135 14.913 27.5245C15.124 27.7355 15.4101 27.854 15.7085 27.854H26.9585C27.2569 27.854 27.543 27.7355 27.754 27.5245C27.965 27.3135 28.0835 27.0274 28.0835 26.729V23.354C28.0835 23.0556 27.965 22.7695 27.754 22.5585C27.543 22.3475 27.2569 22.229 26.9585 22.229ZM24.9897 25.8853C24.8229 25.8853 24.6597 25.8358 24.521 25.7431C24.3822 25.6503 24.2741 25.5186 24.2102 25.3644C24.1464 25.2102 24.1297 25.0406 24.1622 24.8769C24.1948 24.7132 24.2751 24.5629 24.3931 24.4449C24.5111 24.3269 24.6615 24.2465 24.8251 24.214C24.9888 24.1814 25.1585 24.1981 25.3126 24.262C25.4668 24.3258 25.5986 24.434 25.6913 24.5727C25.784 24.7115 25.8335 24.8746 25.8335 25.0415C25.8335 25.2653 25.7446 25.4799 25.5864 25.6381C25.4281 25.7964 25.2135 25.8853 24.9897 25.8853Z"
							fill="white"
						/>
					</g>
				</g>
				<rect
					x="6.5"
					y="5.7998"
					width="31"
					height="31"
					rx="7.5"
					stroke="url(#paint2_linear_50_589)"
				/>
			</g>
			<defs>
				<filter
					id="filter0_di_50_589"
					x="0"
					y="0.299805"
					width="44"
					height="44"
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB"
				>
					<feFlood floodOpacity="0" result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="1" />
					<feGaussianBlur stdDeviation="3" />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
					/>
					<feBlend
						mode="normal"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_50_589"
					/>
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_50_589"
						result="shape"
					/>
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="2" />
					<feGaussianBlur stdDeviation="2" />
					<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.35 0"
					/>
					<feBlend
						mode="normal"
						in2="shape"
						result="effect2_innerShadow_50_589"
					/>
				</filter>
				<filter
					id="filter1_d_50_589"
					x="4"
					y="5.46533"
					width="36"
					height="36"
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB"
				>
					<feFlood floodOpacity="0" result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="2" />
					<feGaussianBlur stdDeviation="2.5" />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0"
					/>
					<feBlend
						mode="normal"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_50_589"
					/>
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_50_589"
						result="shape"
					/>
				</filter>
				<linearGradient
					id="paint0_linear_50_589"
					x1="22"
					y1="8.46533"
					x2="22"
					y2="34.4653"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="white" stopOpacity="0" />
					<stop offset="1" stopColor="white" stopOpacity="0.2" />
				</linearGradient>
				<linearGradient
					id="paint1_linear_50_589"
					x1="22"
					y1="8.46533"
					x2="22"
					y2="34.4653"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="white" stopOpacity="0.08" />
					<stop offset="0.5" stopColor="white" stopOpacity="0.55" />
					<stop offset="1" stopColor="white" stopOpacity="0.08" />
				</linearGradient>
				<linearGradient
					id="paint2_linear_50_589"
					x1="6"
					y1="5.55293"
					x2="38"
					y2="37.5529"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopOpacity="0.25" />
					<stop offset="0.5" stopColor="white" stopOpacity="0.55" />
					<stop offset="1" stopOpacity="0.25" />
				</linearGradient>
				<clipPath id="clip0_50_589">
					<rect x="6" y="5.2998" width="32" height="32" rx="8" fill="white" />
				</clipPath>
			</defs>
		</svg>
	)
}

export const CodeIcon: React.FC<ComponentPropsWithoutRef<"svg">> = ({
	fill = "currentColor"
}) => {
	return (
		<svg
			width="34"
			height="34"
			viewBox="0 0 34 34"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g filter="url(#filter0_di_50_15)">
				<g clipPath="url(#clip0_50_15)">
					<rect
						x="5"
						y="3.88281"
						width="24"
						height="24"
						rx="6"
						fill="#0156FB"
					/>
					<g filter="url(#filter1_d_50_15)">
						<rect
							x="7.25"
							y="6.25684"
							width="19.5"
							height="19.5"
							rx="4.5"
							fill="url(#paint0_linear_50_15)"
							shapeRendering="crispEdges"
						/>
						<rect
							x="7.625"
							y="6.63184"
							width="18.75"
							height="18.75"
							rx="4.125"
							stroke="url(#paint1_linear_50_15)"
							stroke-width="0.75"
							shapeRendering="crispEdges"
						/>
						<path
							d="M21.2952 11.416H12.2952C12.0782 11.416 11.8701 11.5022 11.7167 11.6557C11.5633 11.8091 11.4771 12.0172 11.4771 12.2342V19.5978C11.4771 19.8148 11.5633 20.0229 11.7167 20.1764C11.8701 20.3298 12.0782 20.416 12.2952 20.416H21.2952C21.5122 20.416 21.7203 20.3298 21.8738 20.1764C22.0272 20.0229 22.1134 19.8148 22.1134 19.5978V12.2342C22.1134 12.0172 22.0272 11.8091 21.8738 11.6557C21.7203 11.5022 21.5122 11.416 21.2952 11.416ZM15.4483 17.672C15.4863 17.71 15.5165 17.7552 15.537 17.8048C15.5576 17.8545 15.5682 17.9077 15.5682 17.9615C15.5682 18.0152 15.5576 18.0684 15.537 18.1181C15.5165 18.1678 15.4863 18.2129 15.4483 18.2509C15.4103 18.2889 15.3652 18.3191 15.3155 18.3396C15.2658 18.3602 15.2126 18.3708 15.1589 18.3708C15.1051 18.3708 15.0519 18.3602 15.0022 18.3396C14.9526 18.3191 14.9074 18.2889 14.8694 18.2509L12.824 16.2054C12.7859 16.1675 12.7558 16.1223 12.7352 16.0727C12.7146 16.023 12.704 15.9698 12.704 15.916C12.704 15.8623 12.7146 15.809 12.7352 15.7594C12.7558 15.7097 12.7859 15.6646 12.824 15.6266L14.8694 13.5811C14.9462 13.5044 15.0503 13.4612 15.1589 13.4612C15.2674 13.4612 15.3715 13.5044 15.4483 13.5811C15.5251 13.6579 15.5682 13.762 15.5682 13.8706C15.5682 13.9791 15.5251 14.0832 15.4483 14.16L13.6918 15.916L15.4483 17.672ZM20.7665 16.2054L18.721 18.2509C18.6443 18.3277 18.5402 18.3708 18.4316 18.3708C18.323 18.3708 18.2189 18.3277 18.1422 18.2509C18.0654 18.1741 18.0223 18.07 18.0223 17.9615C18.0223 17.8529 18.0654 17.7488 18.1422 17.672L19.8987 15.916L18.1422 14.16C18.0654 14.0832 18.0223 13.9791 18.0223 13.8706C18.0223 13.762 18.0654 13.6579 18.1422 13.5811C18.2189 13.5044 18.323 13.4612 18.4316 13.4612C18.5402 13.4612 18.6443 13.5044 18.721 13.5811L20.7665 15.6266C20.8045 15.6646 20.8347 15.7097 20.8553 15.7594C20.8759 15.809 20.8865 15.8623 20.8865 15.916C20.8865 15.9698 20.8759 16.023 20.8553 16.0727C20.8347 16.1223 20.8045 16.1675 20.7665 16.2054Z"
							fill="white"
						/>
					</g>
				</g>
				<rect
					x="5.375"
					y="4.25781"
					width="23.25"
					height="23.25"
					rx="5.625"
					stroke="url(#paint2_linear_50_15)"
					stroke-width="0.75"
				/>
			</g>
			<defs>
				<filter
					id="filter0_di_50_15"
					x="0.5"
					y="0.132812"
					width="33"
					height="33"
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB"
				>
					<feFlood floodOpacity="0" result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="0.75" />
					<feGaussianBlur stdDeviation="2.25" />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
					/>
					<feBlend
						mode="normal"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_50_15"
					/>
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_50_15"
						result="shape"
					/>
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="1.5" />
					<feGaussianBlur stdDeviation="1.5" />
					<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.35 0"
					/>
					<feBlend
						mode="normal"
						in2="shape"
						result="effect2_innerShadow_50_15"
					/>
				</filter>
				<filter
					id="filter1_d_50_15"
					x="3.5"
					y="4.00684"
					width="27"
					height="27"
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB"
				>
					<feFlood floodOpacity="0" result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="1.5" />
					<feGaussianBlur stdDeviation="1.875" />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0"
					/>
					<feBlend
						mode="normal"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_50_15"
					/>
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_50_15"
						result="shape"
					/>
				</filter>
				<linearGradient
					id="paint0_linear_50_15"
					x1="17"
					y1="6.25684"
					x2="17"
					y2="25.7568"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="white" stopOpacity="0" />
					<stop offset="1" stopColor="white" stopOpacity="0.2" />
				</linearGradient>
				<linearGradient
					id="paint1_linear_50_15"
					x1="17"
					y1="6.25684"
					x2="17"
					y2="25.7568"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="white" stopOpacity="0.08" />
					<stop offset="0.5" stopColor="white" stopOpacity="0.55" />
					<stop offset="1" stopColor="white" stopOpacity="0.08" />
				</linearGradient>
				<linearGradient
					id="paint2_linear_50_15"
					x1="5"
					y1="4.07266"
					x2="29"
					y2="28.0727"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopOpacity="0.25" />
					<stop offset="0.5" stopColor="white" stopOpacity="0.55" />
					<stop offset="1" stopOpacity="0.25" />
				</linearGradient>
				<clipPath id="clip0_50_15">
					<rect x="5" y="3.88281" width="24" height="24" rx="6" fill="white" />
				</clipPath>
			</defs>
		</svg>
	)
}

export const Document: React.FC<ComponentPropsWithoutRef<"svg">> = ({
	fill = "currentColor"
}) => {
	return (
		<svg
			width="16"
			height="16"
			viewBox="0 0 16 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M11.9998 1.3335C12.3535 1.3335 12.6926 1.47397 12.9426 1.72402C13.1927 1.97407 13.3332 2.31321 13.3332 2.66683V9.3335H8.99984C8.73462 9.3335 8.48027 9.43885 8.29273 9.62639C8.10519 9.81392 7.99984 10.0683 7.99984 10.3335V14.6668H3.99984C3.64622 14.6668 3.30708 14.5264 3.05703 14.2763C2.80698 14.0263 2.6665 13.6871 2.6665 13.3335V2.66683C2.6665 2.31321 2.80698 1.97407 3.05703 1.72402C3.30708 1.47397 3.64622 1.3335 3.99984 1.3335H11.9998ZM13.3045 10.6668C13.2509 10.9194 13.1252 11.151 12.9425 11.3335L9.99984 14.2762C9.81735 14.4588 9.58576 14.5846 9.33317 14.6382V10.6668H13.3045ZM6.6665 7.3335H5.99984C5.82303 7.3335 5.65346 7.40373 5.52843 7.52876C5.40341 7.65378 5.33317 7.82335 5.33317 8.00016C5.33317 8.17697 5.40341 8.34654 5.52843 8.47157C5.65346 8.59659 5.82303 8.66683 5.99984 8.66683H6.6665C6.84332 8.66683 7.01288 8.59659 7.13791 8.47157C7.26293 8.34654 7.33317 8.17697 7.33317 8.00016C7.33317 7.82335 7.26293 7.65378 7.13791 7.52876C7.01288 7.40373 6.84332 7.3335 6.6665 7.3335ZM9.99984 4.66683H5.99984C5.82303 4.66683 5.65346 4.73707 5.52843 4.86209C5.40341 4.98712 5.33317 5.15668 5.33317 5.3335C5.33317 5.51031 5.40341 5.67988 5.52843 5.8049C5.65346 5.92992 5.82303 6.00016 5.99984 6.00016H9.99984C10.1766 6.00016 10.3462 5.92992 10.4712 5.8049C10.5963 5.67988 10.6665 5.51031 10.6665 5.3335C10.6665 5.15668 10.5963 4.98712 10.4712 4.86209C10.3462 4.73707 10.1766 4.66683 9.99984 4.66683Z"
				fill={fill}
			/>
		</svg>
	)
}

export const RoleBase: React.FC<ComponentPropsWithoutRef<"svg">> = ({
	fill = "currentColor"
}) => {
	return (
		<svg
			width="44"
			height="45"
			viewBox="0 0 44 45"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g filter="url(#filter0_di_50_574)">
				<g clipPath="url(#clip0_50_574)">
					<rect x="6" y="5.9668" width="32" height="32" rx="8" fill="#007FFF" />
					<g filter="url(#filter1_d_50_574)">
						<rect
							x="9"
							y="9.13232"
							width="26"
							height="26"
							rx="6"
							fill="url(#paint0_linear_50_574)"
							shapeRendering="crispEdges"
						/>
						<rect
							x="9.5"
							y="9.63232"
							width="25"
							height="25"
							rx="5.5"
							stroke="url(#paint1_linear_50_574)"
							shapeRendering="crispEdges"
						/>
						<g clipPath="url(#clip1_50_574)">
							<path
								d="M30.8352 22.7313L28.5852 24.9813C28.533 25.0336 28.471 25.0751 28.4027 25.1034C28.3344 25.1318 28.2612 25.1463 28.1873 25.1463C28.1134 25.1463 28.0402 25.1318 27.9719 25.1034C27.9036 25.0751 27.8416 25.0336 27.7893 24.9813L26.6643 23.8563C26.5588 23.7508 26.4995 23.6076 26.4995 23.4584C26.4995 23.3091 26.5588 23.166 26.6643 23.0604C26.7699 22.9549 26.913 22.8956 27.0623 22.8956C27.2115 22.8956 27.3547 22.9549 27.4602 23.0604L28.1873 23.7881L30.0393 21.9354C30.1449 21.8299 30.288 21.7706 30.4373 21.7706C30.5865 21.7706 30.7297 21.8299 30.8352 21.9354C30.9408 22.041 31.0001 22.1841 31.0001 22.3334C31.0001 22.4826 30.9408 22.6258 30.8352 22.7313ZM23.1248 24.4203C24.0066 23.871 24.6855 23.0496 25.0588 22.0802C25.4322 21.1107 25.4797 20.0461 25.194 19.0473C24.9084 18.0485 24.3053 17.1699 23.4759 16.5444C22.6465 15.9189 21.6359 15.5806 20.597 15.5806C19.5582 15.5806 18.5476 15.9189 17.7182 16.5444C16.8888 17.1699 16.2857 18.0485 16 19.0473C15.7144 20.0461 15.7619 21.1107 16.1352 22.0802C16.5086 23.0496 17.1875 23.871 18.0693 24.4203C16.6174 24.8956 15.311 25.7836 14.2605 27.0338C14.1917 27.1155 14.1476 27.2152 14.1334 27.321C14.1192 27.4269 14.1354 27.5346 14.1802 27.6316C14.225 27.7286 14.2964 27.8109 14.3862 27.8687C14.476 27.9266 14.5805 27.9577 14.6873 27.9584H26.4998C26.607 27.9585 26.7119 27.928 26.8024 27.8704C26.8928 27.8129 26.9649 27.7307 27.0102 27.6335C27.0555 27.5364 27.0721 27.4283 27.058 27.3221C27.0439 27.2158 26.9998 27.1158 26.9308 27.0338C25.8796 25.7836 24.5732 24.8956 23.1248 24.4203Z"
								fill="white"
							/>
						</g>
					</g>
				</g>
				<rect
					x="6.5"
					y="6.4668"
					width="31"
					height="31"
					rx="7.5"
					stroke="url(#paint2_linear_50_574)"
				/>
			</g>
			<defs>
				<filter
					id="filter0_di_50_574"
					x="0"
					y="0.966797"
					width="44"
					height="44"
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB"
				>
					<feFlood floodOpacity="0" result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="1" />
					<feGaussianBlur stdDeviation="3" />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
					/>
					<feBlend
						mode="normal"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_50_574"
					/>
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_50_574"
						result="shape"
					/>
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="2" />
					<feGaussianBlur stdDeviation="2" />
					<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.35 0"
					/>
					<feBlend
						mode="normal"
						in2="shape"
						result="effect2_innerShadow_50_574"
					/>
				</filter>
				<filter
					id="filter1_d_50_574"
					x="4"
					y="6.13232"
					width="36"
					height="36"
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB"
				>
					<feFlood floodOpacity="0" result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="2" />
					<feGaussianBlur stdDeviation="2.5" />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0"
					/>
					<feBlend
						mode="normal"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_50_574"
					/>
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_50_574"
						result="shape"
					/>
				</filter>
				<linearGradient
					id="paint0_linear_50_574"
					x1="22"
					y1="9.13232"
					x2="22"
					y2="35.1323"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="white" stopOpacity="0" />
					<stop offset="1" stopColor="white" stopOpacity="0.2" />
				</linearGradient>
				<linearGradient
					id="paint1_linear_50_574"
					x1="22"
					y1="9.13232"
					x2="22"
					y2="35.1323"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="white" stopOpacity="0.08" />
					<stop offset="0.5" stopColor="white" stopOpacity="0.55" />
					<stop offset="1" stopColor="white" stopOpacity="0.08" />
				</linearGradient>
				<linearGradient
					id="paint2_linear_50_574"
					x1="6"
					y1="6.21992"
					x2="38"
					y2="38.2199"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopOpacity="0.25" />
					<stop offset="0.5" stopColor="white" stopOpacity="0.55" />
					<stop offset="1" stopOpacity="0.25" />
				</linearGradient>
				<clipPath id="clip0_50_574">
					<rect x="6" y="5.9668" width="32" height="32" rx="8" fill="white" />
				</clipPath>
				<clipPath id="clip1_50_574">
					<rect
						width="18"
						height="18"
						fill="white"
						transform="translate(13 13.3335)"
					/>
				</clipPath>
			</defs>
		</svg>
	)
}

export const Security: React.FC<ComponentPropsWithoutRef<"svg">> = ({
	fill = "currentColor"
}) => {
	return (
		<svg
			width="44"
			height="45"
			viewBox="0 0 44 45"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g filter="url(#filter0_di_50_582)">
				<g clipPath="url(#clip0_50_582)">
					<rect x="6" y="5.6333" width="32" height="32" rx="8" fill="#00C131" />
					<g filter="url(#filter1_d_50_582)">
						<rect
							x="9"
							y="8.79883"
							width="26"
							height="26"
							rx="6"
							fill="url(#paint0_linear_50_582)"
							shapeRendering="crispEdges"
						/>
						<rect
							x="9.5"
							y="9.29883"
							width="25"
							height="25"
							rx="5.5"
							stroke="url(#paint1_linear_50_582)"
							shapeRendering="crispEdges"
						/>
						<g clipPath="url(#clip1_50_582)">
							<path
								d="M27.2915 15.8125H16.0415C15.7431 15.8125 15.457 15.931 15.246 16.142C15.035 16.353 14.9165 16.6391 14.9165 16.9375V20.875C14.9165 24.5819 16.7109 26.8284 18.2163 28.0602C19.8377 29.3863 21.4506 29.8363 21.521 29.8553C21.6176 29.8816 21.7196 29.8816 21.8163 29.8553C21.8866 29.8363 23.4974 29.3863 25.121 28.0602C26.6221 26.8284 28.4165 24.5819 28.4165 20.875V16.9375C28.4165 16.6391 28.298 16.353 28.087 16.142C27.876 15.931 27.5899 15.8125 27.2915 15.8125ZM24.8784 20.7105L20.9409 24.648C20.8886 24.7003 20.8266 24.7418 20.7583 24.7701C20.69 24.7984 20.6168 24.8129 20.5429 24.8129C20.469 24.8129 20.3958 24.7984 20.3275 24.7701C20.2592 24.7418 20.1972 24.7003 20.1449 24.648L18.4574 22.9605C18.3519 22.8549 18.2926 22.7118 18.2926 22.5625C18.2926 22.4132 18.3519 22.2701 18.4574 22.1645C18.563 22.059 18.7061 21.9997 18.8554 21.9997C19.0047 21.9997 19.1478 22.059 19.2534 22.1645L20.5415 23.4548L24.081 19.9145C24.1333 19.8623 24.1953 19.8208 24.2636 19.7925C24.3319 19.7642 24.4051 19.7497 24.479 19.7497C24.5529 19.7497 24.6261 19.7642 24.6944 19.7925C24.7627 19.8208 24.8247 19.8623 24.877 19.9145C24.9292 19.9668 24.9707 20.0288 24.999 20.0971C25.0273 20.1654 25.0418 20.2386 25.0418 20.3125C25.0418 20.3864 25.0273 20.4596 24.999 20.5279C24.9707 20.5962 24.9292 20.6582 24.877 20.7105H24.8784Z"
								fill="white"
							/>
						</g>
					</g>
				</g>
				<rect
					x="6.5"
					y="6.1333"
					width="31"
					height="31"
					rx="7.5"
					stroke="url(#paint2_linear_50_582)"
				/>
			</g>
			<defs>
				<filter
					id="filter0_di_50_582"
					x="0"
					y="0.633301"
					width="44"
					height="44"
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB"
				>
					<feFlood floodOpacity="0" result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="1" />
					<feGaussianBlur stdDeviation="3" />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
					/>
					<feBlend
						mode="normal"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_50_582"
					/>
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_50_582"
						result="shape"
					/>
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="2" />
					<feGaussianBlur stdDeviation="2" />
					<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.35 0"
					/>
					<feBlend
						mode="normal"
						in2="shape"
						result="effect2_innerShadow_50_582"
					/>
				</filter>
				<filter
					id="filter1_d_50_582"
					x="4"
					y="5.79883"
					width="36"
					height="36"
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB"
				>
					<feFlood floodOpacity="0" result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="2" />
					<feGaussianBlur stdDeviation="2.5" />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0"
					/>
					<feBlend
						mode="normal"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_50_582"
					/>
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_50_582"
						result="shape"
					/>
				</filter>
				<linearGradient
					id="paint0_linear_50_582"
					x1="22"
					y1="8.79883"
					x2="22"
					y2="34.7988"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="white" stopOpacity="0" />
					<stop offset="1" stopColor="white" stopOpacity="0.2" />
				</linearGradient>
				<linearGradient
					id="paint1_linear_50_582"
					x1="22"
					y1="8.79883"
					x2="22"
					y2="34.7988"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="white" stopOpacity="0.08" />
					<stop offset="0.5" stopColor="white" stopOpacity="0.55" />
					<stop offset="1" stopColor="white" stopOpacity="0.08" />
				</linearGradient>
				<linearGradient
					id="paint2_linear_50_582"
					x1="6"
					y1="5.88643"
					x2="38"
					y2="37.8864"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopOpacity="0.25" />
					<stop offset="0.5" stopColor="white" stopOpacity="0.55" />
					<stop offset="1" stopOpacity="0.25" />
				</linearGradient>
				<clipPath id="clip0_50_582">
					<rect x="6" y="5.6333" width="32" height="32" rx="8" fill="white" />
				</clipPath>
				<clipPath id="clip1_50_582">
					<rect
						width="18"
						height="18"
						fill="white"
						transform="translate(12.6665 13)"
					/>
				</clipPath>
			</defs>
		</svg>
	)
}
