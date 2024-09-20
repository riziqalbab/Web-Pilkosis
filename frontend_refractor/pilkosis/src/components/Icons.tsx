import { SVGProps } from "react";

export interface IconProps extends SVGProps<SVGSVGElement> {
	color?: string;
	width?: string;
	height?: string;
	className?: string;
}

export const Isearch = ({
	color = "currentColor",
	width = "20",
	height = "20",
	className,
	...props
}: IconProps) => {
	return (
		<svg
			{...props}
			width={width}
			height={height}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
			<g
				id="SVGRepo_tracerCarrier"
				strokeLinecap="round"
				strokeLinejoin="round"
			></g>
			<g id="SVGRepo_iconCarrier">
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M15 10.5C15 12.9853 12.9853 15 10.5 15C8.01472 15 6 12.9853 6 10.5C6 8.01472 8.01472 6 10.5 6C12.9853 6 15 8.01472 15 10.5ZM14.1793 15.2399C13.1632 16.0297 11.8865 16.5 10.5 16.5C7.18629 16.5 4.5 13.8137 4.5 10.5C4.5 7.18629 7.18629 4.5 10.5 4.5C13.8137 4.5 16.5 7.18629 16.5 10.5C16.5 11.8865 16.0297 13.1632 15.2399 14.1792L20.0304 18.9697L18.9697 20.0303L14.1793 15.2399Z"
					fill={color}
				></path>
			</g>
		</svg>
	);
};

export const ILoading = ({
	color = "currentColor",
	width = "20",
	height = "20",
	className,
	...props
}: IconProps) => {
	return (
		<div className="animate-spin inline-block">
			<svg
				width={width}
				height={height}
				viewBox="0 0 512 512"
				color={color}
				xmlns="http://www.w3.org/2000/svg"
				className={`${className} h-full w-full`}
				{...props}
			>
				<svg
					width="512px"
					height="512px"
					viewBox="0 0 24 24"
					fill="currentColor"
					x="0"
					y="0"
					role="img"
					style={{ display: "inline-block", verticalAlign: "middle" }}
					xmlns="http://www.w3.org/2000/svg"
				>
					<g fill="currentColor">
						<g fill="none" fillRule="evenodd">
							<path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z" />
							<path
								fill="currentColor"
								d="M12 4.5a7.5 7.5 0 1 0 0 15a7.5 7.5 0 0 0 0-15ZM1.5 12C1.5 6.201 6.201 1.5 12 1.5S22.5 6.201 22.5 12S17.799 22.5 12 22.5S1.5 17.799 1.5 12Z"
								opacity=".4"
							/>
							<path
								fill="currentColor"
								d="M12 4.5a7.458 7.458 0 0 0-5.187 2.083a1.5 1.5 0 0 1-2.075-2.166A10.458 10.458 0 0 1 12 1.5a1.5 1.5 0 0 1 0 3Z"
							/>
						</g>
					</g>
				</svg>
			</svg>
		</div>
	);
};

export const IPerson = ({
	color = "currentColor",
	width = "20",
	height = "20",
	...props
}: IconProps) => {
	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M19 10C19.003 11.7868 18.4715 13.5336 17.474 15.016C16.6514 16.243 15.5391 17.2483 14.2355 17.9432C12.9319 18.6381 11.4772 19.001 10 19C8.52279 19.001 7.06808 18.6381 5.76451 17.9432C4.46093 17.2483 3.34865 16.243 2.526 15.016C1.74273 13.8484 1.2439 12.5136 1.06951 11.1184C0.895109 9.72333 1.05 8.30676 1.52175 6.98229C1.9935 5.65782 2.769 4.4623 3.78607 3.49156C4.80314 2.52082 6.0335 1.80187 7.37851 1.39234C8.72352 0.982814 10.1458 0.894099 11.5312 1.13331C12.9167 1.37252 14.2269 1.933 15.3567 2.76982C16.4865 3.60664 17.4046 4.69653 18.0373 5.95211C18.67 7.20768 18.9997 8.59403 19 10Z"
				stroke={color}
				strokeWidth="1.8"
			/>
			<path
				d="M11.25 7C11.25 7.69 10.69 8.25 10 8.25V9.75C10.7294 9.75 11.4288 9.46027 11.9446 8.94454C12.4603 8.42882 12.75 7.72935 12.75 7H11.25ZM10 8.25C9.31002 8.25 8.75002 7.69 8.75002 7H7.25002C7.25002 7.72935 7.53975 8.42882 8.05547 8.94454C8.5712 9.46027 9.27067 9.75 10 9.75V8.25ZM8.75002 7C8.75002 6.31 9.31002 5.75 10 5.75V4.25C9.27067 4.25 8.5712 4.53973 8.05547 5.05546C7.53975 5.57118 7.25002 6.27065 7.25002 7H8.75002ZM10 5.75C10.69 5.75 11.25 6.31 11.25 7H12.75C12.75 6.27065 12.4603 5.57118 11.9446 5.05546C11.4288 4.53973 10.7294 4.25 10 4.25V5.75ZM3.16602 15.856L2.44702 15.642L2.33002 16.034L2.59702 16.344L3.16602 15.856ZM16.834 15.856L17.404 16.345L17.67 16.035L17.553 15.642L16.834 15.856ZM7.00002 13.75H13V12.25H7.00002V13.75ZM7.00002 12.25C5.97712 12.25 4.98153 12.5802 4.16125 13.1913C3.34096 13.8024 2.73977 14.6619 2.44702 15.642L3.88502 16.07C4.08555 15.3996 4.49695 14.8118 5.05812 14.3939C5.61929 13.9759 6.30031 13.7501 7.00002 13.75V12.25ZM10 18.25C8.80943 18.2514 7.63273 17.9944 6.5511 17.4968C5.46947 16.9993 4.50868 16.273 3.73502 15.368L2.59702 16.344C3.51148 17.413 4.64686 18.272 5.92491 18.8598C7.20295 19.4476 8.59327 19.7513 10 19.75V18.25ZM13 13.75C14.47 13.75 15.715 14.728 16.115 16.07L17.553 15.642C17.2603 14.6619 16.6591 13.8024 15.8388 13.1913C15.0185 12.5802 14.0229 12.25 13 12.25V13.75ZM16.265 15.368C15.4914 16.273 14.5306 16.9993 13.4489 17.4968C12.3673 17.9944 11.1906 18.2514 10 18.25V19.75C11.4068 19.7513 12.7971 19.4476 14.0751 18.8598C15.3532 18.272 16.4896 17.414 17.404 16.345L16.265 15.368Z"
				fill={color}
			/>
		</svg>
	);
};

export const IAbout = ({
	color = "currentColor",
	width = "20",
	height = "20",
	...props
}: IconProps) => {
	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M9 7H11V5H9M10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18ZM10 0C8.68678 0 7.38642 0.258658 6.17317 0.761205C4.95991 1.26375 3.85752 2.00035 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10C0 12.6522 1.05357 15.1957 2.92893 17.0711C3.85752 17.9997 4.95991 18.7362 6.17317 19.2388C7.38642 19.7413 8.68678 20 10 20C12.6522 20 15.1957 18.9464 17.0711 17.0711C18.9464 15.1957 20 12.6522 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7362 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0ZM9 15H11V9H9V15Z"
				fill={color}
			/>
		</svg>
	);
};

export const IFeedback = ({
	color = "currentColor",
	width = "20",
	height = "20",
	...props
}: IconProps) => {
	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M10 13C10.2833 13 10.521 12.904 10.713 12.712C10.905 12.52 11.0007 12.2827 11 12C10.9993 11.7173 10.9033 11.48 10.712 11.288C10.5207 11.096 10.2833 11 10 11C9.71667 11 9.47933 11.096 9.288 11.288C9.09667 11.48 9.00067 11.7173 9 12C8.99933 12.2827 9.09533 12.5203 9.288 12.713C9.48067 12.9057 9.718 13.0013 10 13ZM9 9H11V3H9V9ZM0 20V2C0 1.45 0.196 0.979333 0.588 0.588C0.98 0.196667 1.45067 0.000666667 2 0H18C18.55 0 19.021 0.196 19.413 0.588C19.805 0.98 20.0007 1.45067 20 2V14C20 14.55 19.8043 15.021 19.413 15.413C19.0217 15.805 18.5507 16.0007 18 16H4L0 20ZM3.15 14H18V2H2V15.125L3.15 14Z"
				fill={color}
			/>
		</svg>
	);
};

export const ILogout = ({
	color = "currentColor",
	width = "20",
	height = "20",
	...props
}: IconProps) => {
	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 20 22"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M5.02301 4.5C3.4122 5.56898 2.18841 7.12823 1.53281 8.94691C0.877218 10.7656 0.824667 12.7471 1.38294 14.5979C1.94121 16.4488 3.08063 18.0707 4.63252 19.2236C6.18441 20.3765 8.06627 20.999 9.99951 20.999C11.9328 20.999 13.8146 20.3765 15.3665 19.2236C16.9184 18.0707 18.0578 16.4488 18.6161 14.5979C19.1744 12.7471 19.1218 10.7656 18.4662 8.94691C17.8106 7.12823 16.5868 5.56898 14.976 4.5M10 1V9"
				stroke={color}
				strokeWidth="2.3"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export const IThumbsUp = ({
	color = "currentColor",
	width = "20",
	height = "20",
	...props
}: IconProps) => {
	return (
		<svg
			width={width}
			height={height}
			{...props}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g id="SVGRepo_bgCarrier" strokeWidth="0" />
			<g
				id="SVGRepo_tracerCarrier"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<g id="SVGRepo_iconCarrier">
				<path
					d="M20.22 9.55C19.79 9.04 19.17 8.75 18.5 8.75H14.47V6C14.47 4.48 13.24 3.25 11.64 3.25C10.94 3.25 10.31 3.67 10.03 4.32L7.49 10.25H5.62C4.31 10.25 3.25 11.31 3.25 12.62V18.39C3.25 19.69 4.32 20.75 5.62 20.75H17.18C18.27 20.75 19.2 19.97 19.39 18.89L20.71 11.39C20.82 10.73 20.64 10.06 20.21 9.55H20.22ZM5.62 19.25C5.14 19.25 4.75 18.86 4.75 18.39V12.62C4.75 12.14 5.14 11.75 5.62 11.75H7.23V19.25H5.62ZM17.92 18.63C17.86 18.99 17.55 19.25 17.18 19.25H8.74V11.15L11.41 4.9C11.45 4.81 11.54 4.74 11.73 4.74C12.42 4.74 12.97 5.3 12.97 5.99V10.24H18.5C18.73 10.24 18.93 10.33 19.07 10.5C19.21 10.67 19.27 10.89 19.23 11.12L17.91 18.62L17.92 18.63Z"
					fill={color}
				/>
			</g>
		</svg>
	);
};

export const IInfo = ({
	color = "currentColor",
	width = "20",
	height = "20",
	...props
}: IconProps) => {
	return (
		<svg
			width={width}
			height={height}
			{...props}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
			<g
				id="SVGRepo_tracerCarrier"
				strokeLinecap="round"
				strokeLinejoin="round"
			></g>
			<g id="SVGRepo_iconCarrier">
				<path
					d="M12 17.75C12.4142 17.75 12.75 17.4142 12.75 17V11C12.75 10.5858 12.4142 10.25 12 10.25C11.5858 10.25 11.25 10.5858 11.25 11V17C11.25 17.4142 11.5858 17.75 12 17.75Z"
					fill={color}
				></path>
				<path
					d="M12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7Z"
					fill={color}
				></path>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75Z"
					fill={color}
				></path>
			</g>
		</svg>
	);
};

export const IChat = ({
	color = "currentColor",
	width = "20",
	height = "20",
	...props
}: IconProps) => {
	return (
		<svg
			width={width}
			height={height}
			{...props}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
			<g
				id="SVGRepo_tracerCarrier"
				strokeLinecap="round"
				strokeLinejoin="round"
			></g>
			<g id="SVGRepo_iconCarrier">
				<path
					d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22Z"
					stroke={color}
					strokeWidth="1.5"
				></path>
				<path
					opacity="0.5"
					d="M8 12H8.009M11.991 12H12M15.991 12H16"
					stroke={color}
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				></path>
			</g>
		</svg>
	);
};

export const IAdd = ({
	color = "currentColor",
	width = "20",
	height = "20",
	...props
}: IconProps) => {
	return (
		<svg
			width={width}
			height={height}
			{...props}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
			<g
				id="SVGRepo_tracerCarrier"
				strokeLinecap="round"
				strokeLinejoin="round"
			></g>
			<g id="SVGRepo_iconCarrier">
				<path
					d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z"
					stroke={color}
					strokeWidth="1.5"
				></path>
				<path
					d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"
					stroke={color}
					strokeWidth="1.5"
					strokeLinecap="round"
				></path>
			</g>
		</svg>
	);
};

export const IChart = ({
	color = "currentColor",
	width = "20",
	height = "20",
	...props
}: IconProps) => {
	return (
		<svg
			{...props}
			width={width}
			height={height}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
			<g
				id="SVGRepo_tracerCarrier"
				strokeLinecap="round"
				strokeLinejoin="round"
			></g>
			<g id="SVGRepo_iconCarrier">
				<path
					d="M3 14.6C3 14.0399 3 13.7599 3.10899 13.546C3.20487 13.3578 3.35785 13.2049 3.54601 13.109C3.75992 13 4.03995 13 4.6 13H5.4C5.96005 13 6.24008 13 6.45399 13.109C6.64215 13.2049 6.79513 13.3578 6.89101 13.546C7 13.7599 7 14.0399 7 14.6V19.4C7 19.9601 7 20.2401 6.89101 20.454C6.79513 20.6422 6.64215 20.7951 6.45399 20.891C6.24008 21 5.96005 21 5.4 21H4.6C4.03995 21 3.75992 21 3.54601 20.891C3.35785 20.7951 3.20487 20.6422 3.10899 20.454C3 20.2401 3 19.9601 3 19.4V14.6Z"
					stroke={color}
					strokeWidth="1"
					strokeLinecap="round"
					strokeLinejoin="round"
				></path>
				<path
					d="M10 4.6C10 4.03995 10 3.75992 10.109 3.54601C10.2049 3.35785 10.3578 3.20487 10.546 3.10899C10.7599 3 11.0399 3 11.6 3H12.4C12.9601 3 13.2401 3 13.454 3.10899C13.6422 3.20487 13.7951 3.35785 13.891 3.54601C14 3.75992 14 4.03995 14 4.6V19.4C14 19.9601 14 20.2401 13.891 20.454C13.7951 20.6422 13.6422 20.7951 13.454 20.891C13.2401 21 12.9601 21 12.4 21H11.6C11.0399 21 10.7599 21 10.546 20.891C10.3578 20.7951 10.2049 20.6422 10.109 20.454C10 20.2401 10 19.9601 10 19.4V4.6Z"
					stroke={color}
					strokeWidth="1"
					strokeLinecap="round"
					strokeLinejoin="round"
				></path>
				<path
					d="M17 10.6C17 10.0399 17 9.75992 17.109 9.54601C17.2049 9.35785 17.3578 9.20487 17.546 9.10899C17.7599 9 18.0399 9 18.6 9H19.4C19.9601 9 20.2401 9 20.454 9.10899C20.6422 9.20487 20.7951 9.35785 20.891 9.54601C21 9.75992 21 10.0399 21 10.6V19.4C21 19.9601 21 20.2401 20.891 20.454C20.7951 20.6422 20.6422 20.7951 20.454 20.891C20.2401 21 19.9601 21 19.4 21H18.6C18.0399 21 17.7599 21 17.546 20.891C17.3578 20.7951 17.2049 20.6422 17.109 20.454C17 20.2401 17 19.9601 17 19.4V10.6Z"
					stroke={color}
					strokeWidth="1"
					strokeLinecap="round"
					strokeLinejoin="round"
				></path>
			</g>
		</svg>
	);
};
