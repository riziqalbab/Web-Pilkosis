import { m } from "framer-motion";
import { ReactElement } from "react";

export default function CTitle({ text, logo, className = '' }: { text: string, logo? : ReactElement, className?: string }) {
	return (
		<div className={`${className} mb-10 p-6 rounded-2xl bg-thirdtiary/40 text-accent-primary`}>
			<m.div
				initial={{ x: -30, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				transition={{ duration: 0.3, delay: 0.2 }}
				className="flex items-center gap-2"
			>
				<h1 className="text-3xl">{ text }</h1>
				{ logo }
			</m.div>
		</div>
	);
}
