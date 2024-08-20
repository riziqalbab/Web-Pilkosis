/* eslint-disable @typescript-eslint/no-unused-vars */
import logoSmk from "@assets/logo/logo-smk.png";
import logoOsis from "@assets/logo/logo-osis.png";

import primaryBg from "@assets/images/login-bg.png";
import decorations from "@assets/svg/decorations.svg";
import loginText from "@assets/svg/login-text.svg";
import secondaryBg from "@assets/svg/login-bg-Secondary.svg";

// import { ToastContainer, toast } from "react-toastify";
// import "@toastifyCss";

// import axios from "axios";
import { useEffect, useState } from "react";
import { Form } from "react-router-dom";
import { CButton, CInput } from "@components/component";

// const url = import.meta.env.VITE_HOST_BACKEND;

export default function LoginPage() {
	// const [username, setUsername] = useState("");
	// const [password, setPassword] = useState("");

	// const navigate = useNavigate();

	// const [loadingLogin, setLoadingLogin] = useState(false);
	// const login = () => {
	// 	setLoadingLogin(true);
	// 	const id = toast.loading("Mohon tunggu ...");
	// 	axios({
	// 		method: "GET",
	// 		url: `${url}/api/login`,
	// 		params: {
	// 			username,
	// 			password,
	// 		},
	// 		withCredentials: true,
	// 	})
	// 		.then((res) => {
	// 			console.log(res.data);
	// 			toast.update(id, {
	// 				render: "Anda berhasil login",
	// 				type: "success",
	// 				position: "top-center",
	// 				autoClose: 2000,
	// 				draggable: true,
	// 				theme: "light",
	// 				isLoading: false,
	// 				onClose: () => {
	// 					navigate("/");
	// 				},
	// 			});
	// 		})
	// 		.catch((err) => {
	// 			toast.update(id, {
	// 				render: "password atau username salah",
	// 				type: "error",
	// 				position: "top-center",
	// 				autoClose: 2000,
	// 				draggable: true,
	// 				theme: "light",
	// 				isLoading: false,
	// 			});
	// 		})
	// 		.finally(() => {
	// 			setLoadingLogin(false);
	// 		});
	// };

	useEffect(() => {
		document.title = "Web Pilkosis - Login";
	}, []);

	const [loading, setLoading] = useState<Promise<string>>();

	const handleClick = () => {
		//! This is just a fake promise, use the real one soon
		setLoading(
			new Promise((resolve) => {
				setTimeout(() => {
					resolve("done");
				}, 2000);
			})
		);
	}

	return (
		<div className="flex items-center justify-center flex-col lg:flex-row h-screen lg:justify-between px-[5%]">
			{/*//? BACKGROUNDS */}
			<img src={primaryBg} className="w-full h-screen -z-10 absolute top-0 left-0 object-cover pointer-events-none" loading="lazy" />
			<img src={secondaryBg} className="w-full h-screen -z-10 absolute top-0 left-0 object-cover pointer-events-none" />

			{/*//? LOGO */}
			<img src={logoSmk} className="md:h-20 h-16 -z-10 absolute lg:translate-x-0 translate-x-3/4 top-10 lg:right-40 bg-white rounded-full object-cover" loading="lazy" />
			<img src={logoOsis} className="md:h-20 h-16 -z-10 absolute lg:translate-x-0 -translate-x-3/4 top-10 lg:right-14 object-cover" loading="lazy" />

			<Form className="z-10 flex flex-col items-stretch">
				<img src={loginText} className="pointer-events-none self-center lg:block hidden" />
				<h1 className="lg:hidden block text-center text-3xl text-white font-bold" style={{textShadow: '5px 5px 10px rgba(0, 0, 0, .5)'}}>Login</h1>
				<hr className="border-accent-primary lg:block hidden border-[1.5px] mt-8 mb-5" />

				<CInput name="nis" placeholder="nomor NIS mu" className="lg:w-[30vw] w-[80vw] max" />
				<CInput name="password" placeholder="password" type="password" className="lg:w-[30vw] w-[80vw] mb-10" />

				<CButton type="submit" onClick={handleClick} loadingWhen={loading} className="self-end px-10">Login</CButton>
			</Form>

			{/*//? TITLE */}
			<div className="lg:order-last order-first lg:text-right text-center lg:mb-0 mb-10">
				<h1 className="3xl:text-8xl 2xl:text-7xl xl:text-6xl lg:max-w-[50vw] lg:text-5xl md:text-4xl text-3xl mb-4 font-bold text-white" style={{textShadow: '5px 5px 10px rgba(0, 0, 0, .8)'}}>Selamat Datang Di Web Pilkosis 2024</h1>
				<h2 className="xl:text-3xl lg:text-2xl md:text-xl text-lg font-bold text-white" style={{textShadow: '5px 5px 10px rgba(0, 0, 0, .8)'}}>SMK Negeri 1 Kebumen</h2>
			</div>

			{/*//? DECORATIONS */}
			<img src={decorations} className="absolute bottom-0 left-0 pointer-events-none" />
			<img src={decorations} className="absolute top-0 -left-10 lg:block hidden -rotate-90 scale-[-1] pointer-events-none" />
		</div>
	);
}
