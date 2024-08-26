import decorations from "@assets/svg/decorations.svg";
import { IAbout, IFeedback, ILogout, IThumbsUp } from "@components/icons";
import { AnimatePresence, m } from "framer-motion";
import { cloneElement, useEffect, useRef, useState } from "react";
import { Link, useLoaderData, useLocation, useOutlet } from "react-router-dom";

function Sidebar() {
	const [menuYPosition, setMenuYPotion] = useState<number>();
	const handdleMenuClick = (
		ev: React.MouseEvent<HTMLLIElement, MouseEvent>
	) => [setMenuYPotion(ev.currentTarget.getBoundingClientRect().y)];

	const menu1 = useRef<HTMLLIElement>(null);
	const menu2 = useRef<HTMLLIElement>(null);
	const menu3 = useRef<HTMLLIElement>(null);

	const rawCurrentUrl = useLocation().pathname;
	const [currentUrl, setCurrentUrl] = useState<string>();
	useEffect(() => {
		let __currentUrl = "";
		if (rawCurrentUrl.endsWith("/"))
			__currentUrl = rawCurrentUrl.slice(0, -1);
		else __currentUrl = rawCurrentUrl;

		setCurrentUrl(__currentUrl);

		switch (__currentUrl) {
			case "/voting":
				setMenuYPotion(menu1.current?.getBoundingClientRect().y)
				document.title = "Web Pilkosis - Daftar Paslon"
				break
			case "/voting/tentang":
				setMenuYPotion(menu2.current?.getBoundingClientRect().y)
				document.title = "Web Pilkosis - Tentang"
				break
			case "/voting/umpan-balik":
				setMenuYPotion(menu3.current?.getBoundingClientRect().y)
				document.title = "Web Pilkosis - Umpan Balik"
				break
			default:
				document.title = "Web Pilkosis"
				break
		}
	}, [rawCurrentUrl]);

	return (
		<aside className="fixed top-0 left-0 h-screen w-80 bg-thirdtiary">
			<div className="relative w-full h-full p-8">
				{/*//? TITLE  */}
				<h1 className="text-accent-primary font-bold text-2xl">
					E-Voting Pilkosis
				</h1>
				<hr className="border-accent-primary my-4 border-[1.5px]" />

				{/*//? MENUS POINTER */}
				<div
					style={{ top: menuYPosition + "px" }}
					className="absolute top-[7.9rem] h-[3.3rem] w-full left-0 pl-8 transition-[top] duration-300 pointer-events-none -z-10"
				>
					<div className="relative w-full h-full bg-white rounded-l-full">
						{/*//? TOP-RIGHT ROUNDED */}
						<div className="absolute w-8 h-8 -top-8 right-0 bg-white" />
						<div className="absolute w-8 h-8 -top-8 right-0 bg-thirdtiary rounded-br-full" />

						{/*//? BOTTOM-RIGHT ROUNDED */}
						<div className="absolute w-8 h-8 -bottom-8 right-0 bg-white" />
						<div className="absolute w-8 h-8 -bottom-8 right-0 bg-thirdtiary rounded-tr-full" />
					</div>
				</div>

				{/*//? MENUS  */}
				<ul className="text-md mt-10">
					<li
						ref={menu1}
						onClick={handdleMenuClick}
						className="text-accent-primary mb-4"
					>
						<Link
							className={`${
								currentUrl == "/voting"
									? "pl-4 pointer-events-none"
									: "hover:pl-4 cursor-pointer"
							} block w-full h-full py-3 transition-[padding] duration-200`}
							to="/voting"
						>
							<IThumbsUp width="30" height="30" className="inline mr-4" />
							<span>Voting</span>
						</Link>
					</li>
					<li
						ref={menu2}
						onClick={handdleMenuClick}
						className="text-accent-primary mb-4"
					>
						<Link
							className={`${
								currentUrl == "/voting/tentang"
									? "pl-4 pointer-events-none"
									: "hover:pl-4 cursor-pointer"
							} block w-full h-full py-3 transition-[padding] duration-200`}
							to="/voting/tentang"
						>
							<IAbout width="25" height="25" className="inline mr-4" />
							<span>Tentang</span>
						</Link>
					</li>
					<li
						ref={menu3}
						onClick={handdleMenuClick}
						className="text-accent-primary mb-4"
					>
						<Link
							className={`${
								currentUrl == "/voting/umpan-balik"
									? "pl-4 pointer-events-none"
									: "hover:pl-4 cursor-pointer"
							} block w-full h-full py-3 transition-[padding] duration-200`}
							to="/voting/umpan-balik"
						>
							<IFeedback width="25" height="25" className="inline mr-4" />
							<span>Umpan Balik</span>
						</Link>
					</li>
					<li className="text-red-500 mb-4 hover:pl-4 cursor-pointer block w-full h-full py-3 transition-[padding] duration-200">
						<ILogout width="25" height="25" className="inline mr-4" />
						<span>Keluar</span>
					</li>
				</ul>

				{/*//? DECORATIONS  */}
				<img
					src={decorations}
					className="absolute bottom-0 left-0 pointer-events-none mt-auto"
				/>
			</div>
		</aside>
	);
}

export default function LayoutVote() {
	const { pathname } = useLocation();
	const loginData = useLoaderData();
	const element = useOutlet(loginData);

	return (
		<div className="pl-80">
			<Sidebar />
			<div className="flex justify-center p-7">
				<div className="container">
					<AnimatePresence mode="popLayout" initial={true}>
						<m.div 
							key={pathname}
							onAnimationStart={() => {
								document.body.style.overflowY = 'hidden'
								document.body.style.pointerEvents = 'none'
							}}
							onAnimationComplete={() => {
								document.body.style.overflowY = 'auto'
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
