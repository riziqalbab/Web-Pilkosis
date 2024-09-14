import { IAbout, IThumbsUp } from "@components/icons";
import { AnimatePresence, m } from "framer-motion";
import { cloneElement } from "react";
import { Link, useLocation, useOutlet } from "react-router-dom";
import Sidebar from "@components/sidebar";


//? this list will be show with the same ordered
const allSidebarMenu: { [key: string]: { name: string; icon: JSX.Element } } = {
	'/voting': {
		name: 'Voting',
		icon: <IThumbsUp width="30" height="30" className="inline lg:mr-4" />
	},
	'/voting/tentang' : {
		name: 'Tentang',
		icon: <IAbout width="25" height="25" className="inline lg:mr-4" />
	}
}

export default function LayoutVote() {
	const { pathname } = useLocation();
	const element = useOutlet();

	return (
		<div className="lg:pl-80 lg:mb-0 mb-16">
			<Sidebar allSidebarMenu={allSidebarMenu} forEachMenuLink={({ currentUrl, url, text, icon, index }) => {
				return (
					<Link
						className={`${
							index == 0 ? (
								currentUrl?.includes('/voting/caksis') || currentUrl?.includes('/voting/cawaksis') || currentUrl == '/voting'
								? "lg:pl-4"
								: "lg:hover:pl-4 cursor-pointer"
							) : (
								currentUrl == url
								? "lg:pl-4 pointer-events-none"
								: "lg:hover:pl-4 cursor-pointer"
							)
						} block w-full h-full lg:py-3 transition-[padding] duration-200`}
						to={url}
					>
						{icon}
						<span className="lg:inline hidden">{text}</span>
					</Link>
				)
			}} />
			<div className="flex justify-center p-7">
				<div className="container">
					<AnimatePresence mode="popLayout" initial={true}>
						<m.div 
							key={pathname}
							onAnimationStart={() => {
								document.body.style.pointerEvents = 'none'
							}}
							onAnimationComplete={() => {
								document.body.style.pointerEvents = 'auto'
							}}
							initial={{ opacity: 0, y: 200 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -200 }}
							transition={{ duration: 0.5, ease: 'circInOut' }}
						>
							{ element && cloneElement(element, { key: pathname }) }
						</m.div>
					</AnimatePresence>
				</div>
			</div>
		</div>
	);
}
