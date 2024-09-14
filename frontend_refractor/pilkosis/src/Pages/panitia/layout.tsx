import { IChart, IChat, IThumbsUp } from "@components/icons";
import cache from "@utils/cache";
import { cloneElement, useEffect, useRef, useState } from "react";
import { Link, useLocation, useOutlet } from "react-router-dom";
import { AnimatePresence, m } from "framer-motion";
import Sidebar from "@components/sidebar";


//? this list will be show with the same ordered
const allSidebarMenu: { [key: string]: { name: string; icon: JSX.Element } } = {
	'/panitia': {
		name: 'grafik vote',
		icon: <IChart width="30" height="30" className="inline lg:mr-4" />
	},
	'/panitia/detail-vote' : {
		name: 'detail pemilih',
		icon: <IThumbsUp width="25" height="25" className="inline lg:mr-4" />
	},
	'/panitia/lihat-umpan-balik' : {
		name: 'lihat umpan balik',
		icon: <IChat width="25" height="25" className="inline lg:mr-4" />
	},
}

export default function LayoutPanitia() {
   const { pathname } = useLocation();
	const intervalRef = useRef(null)

	const cacheDetailVote = cache.get('detailVote')
   const [dataDetailVote, setDataDetailVote] = useState<[]|undefined>(cacheDetailVote)

	useEffect(() => {
      if (cacheDetailVote)
         setDataDetailVote(cacheDetailVote)
   }, [cacheDetailVote])

	const element = useOutlet({ intervalRef, detailVote: [dataDetailVote, setDataDetailVote] });

	return (
		<div className="lg:pl-80 lg:mb-0 mb-16">
			<Sidebar allSidebarMenu={allSidebarMenu} levelUser="Level Panitia" forEachMenuLink={({ currentUrl, icon, text, url }) => {
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
								intervalRef.current && clearInterval(intervalRef.current)
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