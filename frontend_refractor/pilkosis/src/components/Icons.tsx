import { SVGProps } from "react";

export interface IconProps extends SVGProps<SVGSVGElement> {
	color?: string;
	width?: string;
	height?: string;
   className?: string;
}

export const ILoading = ({ color = "currentColor", width = "20", height = "20", className, ...props}: IconProps) => {
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
					style={{display: "inline-block", verticalAlign: "middle"}}
					xmlns="http://www.w3.org/2000/svg"
				>
					<g fill="currentColor">
						<g fill="none" fillRule="evenodd">
							<path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z" />
							<path
								fill="currentColor"
								d="M12 4.5a7.5 7.5 0 1 0 0 15a7.5 7.5 0 0 0 0-15ZM1.5 12C1.5 6.201 6.201 1.5 12 1.5S22.5 6.201 22.5 12S17.799 22.5 12 22.5S1.5 17.799 1.5 12Z"
								opacity=".5"
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
