import decorations from "@assets/svg/decorations.svg";
import { IAbout, IFeedback, ILogout, IThumbsUp } from "@components/icons";
import { AnimatePresence, m } from "framer-motion";
import { cloneElement, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useOutlet } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import '@toastifyCss'
import axios from "axios";
import cache from "@utils/cache";
import Popup from "@components/popup";

const origin = import.meta.env.VITE_HOST_BACKEND;

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

function Sidebar() {
	const navigate = useNavigate();
	const [menuYPosition, setMenuYPotion] = useState<number>();
	const handdleMenuClick = (ev: React.MouseEvent<HTMLLIElement, MouseEvent>) => [setMenuYPotion(ev.currentTarget.getBoundingClientRect().y)];


	const parentMenu = useRef<HTMLUListElement>(null);
	const rawCurrentUrl = useLocation().pathname;
	const [currentUrl, setCurrentUrl] = useState<string>();
	useEffect(() => {
		//? clean up current url
		let __currentUrl = "";
		if (rawCurrentUrl.endsWith("/"))
			__currentUrl = rawCurrentUrl.slice(0, -1)
		else
			__currentUrl = rawCurrentUrl;


		Object.keys(allSidebarMenu).forEach((menu, index) => {
			if (menu === __currentUrl)
				setMenuYPotion(parentMenu.current?.children.item(index)?.getBoundingClientRect().y)

			if(allSidebarMenu[__currentUrl]) 
				document.title = `Web Pilkosis - ${allSidebarMenu[__currentUrl].name}`
		})
		setCurrentUrl(__currentUrl);
	}, [rawCurrentUrl]);

	
	const [CPopup, triggerPopup] = Popup()
	const handdleConfirmLogout = () => {
		toast.promise(
			axios(`${origin}/api/logout`, { withCredentials: true, method: 'post', validateStatus: status => status <= 200 })
			.then(() => {
				cache.delete('accessToken')
				return navigate('/')
			})
			,{
				error: 'Logout gagal, silahkan coba lagi',
				pending: 'Sedang logout, mohon tunggu',
			},
			{
				containerId: 'layout'
			}
		)
	}

	return (
		<aside className="fixed lg:top-0 lg:bottom-auto bottom-0 left-0 lg:h-screen h-16 lg:w-80 w-full bg-thirdtiary z-50">
			<CPopup title="Logout?" message="Apakah anda yakin akan logout" onConfirm={handdleConfirmLogout} />
			<div className="relative w-full h-full lg:p-8">
				{/*//? TITLE  */}
				<h1 className="text-accent-primary font-bold text-2xl lg:block hidden">
					E-Voting Pilkosis
				</h1>
				<hr className="border-accent-primary my-4 border-[1.5px] lg:block hidden" />

				{/*//? MENUS POINTER */}
				<div
					style={{ top: menuYPosition + "px" }}
					className="absolute top-[7.9rem] h-[3.3rem] w-full left-0 pl-8 transition-[top] duration-300 pointer-events-none -z-10"
				>
					<div className="relative w-full h-full bg-white rounded-l-full lg:block hidden">
						{/*//? TOP-RIGHT ROUNDED */}
						<div className="absolute w-8 h-8 -top-8 right-0 bg-white" />
						<div className="absolute w-8 h-8 -top-8 right-0 bg-thirdtiary rounded-br-full" />

						{/*//? BOTTOM-RIGHT ROUNDED */}
						<div className="absolute w-8 h-8 -bottom-8 right-0 bg-white" />
						<div className="absolute w-8 h-8 -bottom-8 right-0 bg-thirdtiary rounded-tr-full" />
					</div>
				</div>

				{/*//? MENUS  */}
				<ul ref={parentMenu} className="text-md lg:mt-10 lg:block mt-2 flex items-center w-full h-full justify-center sm:gap-24 xs:gap-16 gap-10">
					{Object.entries(allSidebarMenu).map(([menu, { name, icon }], index) => (
						<li
							key={index}
							onClick={handdleMenuClick}
							className="text-accent-primary mb-4"
						>
							<Link
								className={`${
									index == 0 ? (
										currentUrl?.includes('/voting/caksis') || currentUrl?.includes('/voting/cawaksis') || currentUrl == '/voting'
										? "lg:pl-4"
										: "lg:hover:pl-4 cursor-pointer"
									) : (
										currentUrl == menu
										? "lg:pl-4 pointer-events-none"
										: "lg:hover:pl-4 cursor-pointer"
									)
								} block w-full h-full lg:py-3 transition-[padding] duration-200`}
								to={menu}
							>
								{icon}
								<span className="lg:inline hidden">{name}</span>
							</Link>
						</li>
					))}
					<li onClick={() => triggerPopup()} className="text-red-500 mb-4 lg:hover:pl-4 cursor-pointer block lg:w-full lg:h-full lg:py-3 transition-[padding] duration-200">
						<ILogout width="25" height="25" className="inline lg:mr-4" />
						<span className="lg:inline hidden">Keluar</span>
					</li>
				</ul>

				{/*//? DECORATIONS  */}
				<img
					src={decorations}
					className="absolute bottom-0 left-0 pointer-events-none mt-auto hidden lg:block"
				/>
			</div>

			<ToastContainer
				containerId='layout'
				key='layout'
				className='z-10'
				position="top-center"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
				transition={Bounce}
			/>
		</aside>
	);
}

export default function LayoutVote() {
	const { pathname } = useLocation();
	const element = useOutlet();

	return (
		<div className="lg:pl-80 lg:mb-0 mb-16">
			<Sidebar />
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
