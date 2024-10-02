import { IChart, IChat, IInfo, IThumbsUp } from "@components/icons";
import { AnimatePresence, m } from "framer-motion";
import { cloneElement, useRef } from "react";
import { Link, useLocation, useOutlet } from "react-router-dom";
import Sidebar from "@components/sidebar";

//? this list will be show with the same ordered
const allSidebarMenu: { [key: string]: { name: string; icon: JSX.Element } } = {
	'/admin' : {
		name: 'grafik voting',
		icon: <IChart width="25" height="25" className="inline lg:mr-4" />
	},
	'/admin/lihat-umpan-balik' : {
		name: 'lihat umpan balik',
		icon: <IChat width="25" height="25" className="inline lg:mr-4" />
	},
	'/admin/calon' : {
		name: 'daftar calon',
		icon: <IThumbsUp width="30" height="30" className="inline lg:mr-4" />
	},
	'/panitia' : {
		name: 'halaman panitia',
		icon: <IInfo width="25" height="25" className="inline lg:mr-4" />
	},
	
}


export default function LayoutAdmin () {
	const { pathname } = useLocation();
	const intervalRef = useRef(null)
	const element = useOutlet({ intervalRef });

	return (
		<div className="lg:pl-80 lg:mb-0 mb-16">
			<Sidebar allSidebarMenu={allSidebarMenu} levelUser="Level Admin" forEachMenuLink={({ currentUrl, icon, text, url }) => {
				return (
					<Link
						className={`${
							currentUrl == url
							? "lg:pl-4 pointer-events-none"
							: "lg:hover:pl-4 cursor-pointer"
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
								// document.body.style.overflowY = 'hidden'
								document.body.style.pointerEvents = 'none'
								// toast.dismiss()
							}}
							onAnimationComplete={() => {
								// document.body.style.overflowY = 'auto'
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