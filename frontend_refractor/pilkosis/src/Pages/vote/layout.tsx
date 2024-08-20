import decorations from "@assets/svg/decorations.svg";
import { IAbout, IFeedback, ILogout, IPerson } from "@components/icons";
import { AnimatePresence, m } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

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
			case "/vote":
				setMenuYPotion(menu1.current?.getBoundingClientRect().y);
				document.title = "Web Pilkosis - Daftar Paslon"
				break
			case "/vote/tentang":
				setMenuYPotion(menu2.current?.getBoundingClientRect().y)
				document.title = "Web Pilkosis - Tentang"
				break
			case "/vote/umpan-balik":
				setMenuYPotion(menu3.current?.getBoundingClientRect().y)
				document.title = "Web Pilkosis - Umpan Balik"
				break
			default:
				document.title = "Web Pilkosis"
				break
		}
	}, [rawCurrentUrl]);

	return (
		<aside className="fixed top-0 left-0 h-screen w-96 bg-thirdtiary">
			<div className="relative w-full h-full p-8">
				{/*//? TITLE  */}
				<h1 className="text-accent-primary font-bold text-3xl">
					E-Voting Pilkosis
				</h1>
				<hr className="border-accent-primary my-4 border-[1.5px]" />

				{/*//? MENUS POINTER */}
				<div
					style={{ top: menuYPosition + "px" }}
					className="absolute top-[7.9rem] h-16 w-[calc(100%-2rem)] transition-[top] duration-300 pointer-events-none -z-10"
				>
					<div className="relative w-full h-16 bg-white rounded-l-full">
						{/*//? TOP-RIGHT ROUNDED */}
						<div className="absolute w-8 h-8 -top-8 right-0 bg-white" />
						<div className="absolute w-8 h-8 -top-8 right-0 bg-thirdtiary rounded-br-full" />

						{/*//? BOTTOM-RIGHT ROUNDED */}
						<div className="absolute w-8 h-8 -bottom-8 right-0 bg-white" />
						<div className="absolute w-8 h-8 -bottom-8 right-0 bg-thirdtiary rounded-tr-full" />
					</div>
				</div>

				{/*//? MENUS  */}
				<ul className="text-xl mt-10">
					<li
						ref={menu1}
						onClick={handdleMenuClick}
						className="text-accent-primary mb-4"
					>
						<Link
							className={`${
								currentUrl == "/vote"
									? "pl-4 pointer-events-none"
									: "hover:pl-4 cursor-pointer"
							} block w-full h-full py-4 transition-[padding] duration-200`}
							to="/vote"
						>
							<IPerson width="30" height="30" className="inline mr-4" />
							<span>Daftar Paslon</span>
						</Link>
					</li>
					<li
						ref={menu2}
						onClick={handdleMenuClick}
						className="text-accent-primary mb-4"
					>
						<Link
							className={`${
								currentUrl == "/vote/tentang"
									? "pl-4 pointer-events-none"
									: "hover:pl-4 cursor-pointer"
							} block w-full h-full py-4 transition-[padding] duration-200`}
							to="/vote/tentang"
						>
							<IAbout width="30" height="30" className="inline mr-4" />
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
								currentUrl == "/vote/umpan-balik"
									? "pl-4 pointer-events-none"
									: "hover:pl-4 cursor-pointer"
							} block w-full h-full py-4 transition-[padding] duration-200`}
							to="/vote/umpan-balik"
						>
							<IFeedback
								width="30"
								height="30"
								className="inline mr-4"
							/>
							<span>Umpan Balik</span>
						</Link>
					</li>
					<li className="text-red-500 mb-4">
						<Link
							className={`${
								currentUrl == "/vote"
									? "pl-4 pointer-events-none"
									: "hover:pl-4 cursor-pointer"
							} block w-full h-full py-4 transition-[padding] duration-200`}
							to="#"
						>
							<ILogout width="30" height="30" className="inline mr-4" />
							<span>Keluar</span>
						</Link>
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

	return (
		<div className="pl-96">
			<Sidebar />
			<div className="w-full h-screen">
				<AnimatePresence mode="popLayout" initial={true}>
					<m.div 
						onAnimationStart={() => document.body.style.overflowY = 'hidden'}
						onAnimationComplete={() => document.body.style.overflowY = 'auto'}
						key={pathname}
						initial={{ opacity: 0, y: 200 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 200 }}
						transition={{ duration: 0.5 }}
						className="w-full h-full"
					>
						<Outlet />
					</m.div>
				</AnimatePresence>
					{/* {previousEl && cloneElement(previousEl, { key: pathname + 'previous' })} */}
			</div>
		</div>
	);
}
