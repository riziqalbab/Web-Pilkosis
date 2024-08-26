import { CTitle } from "@components/component";
import { IAbout } from "@components/icons";
import { m } from "framer-motion";
import { useState } from "react";

export default function AboutVote() {
	const [onHover, setOnHover] = useState(false);
	return (
		<div>
			<CTitle text="Tentang" logo={<IAbout  width="27" height="27" />} />
			<m.div className="w-40 h-40 bg-violet-300 relative" onHoverStart={() => setOnHover(true)} onHoverEnd={() => setOnHover(false)}>
				<div className="w-full bg-red-300 h-full"></div>
				<m.button className="absolute top-1/2 -translate-y-1/2 left-1/2" transition={{ duration: .3 }} animate={{ y: onHover ? -10 : 0, opacity: onHover ? 1 : 0, x: '-50%'}}>Click me</m.button>
			</m.div>
		</div>
	);
}
