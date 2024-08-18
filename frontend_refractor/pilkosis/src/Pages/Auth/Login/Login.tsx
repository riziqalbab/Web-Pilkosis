/* eslint-disable @typescript-eslint/no-unused-vars */
import logoSmk from "./login-aset/logo-smk.png";
import logoOsis from "./login-aset/logo-osis.png";

import primaryBg from "./login-aset/login-bg.png";
import decorations from "../../../assets/svg/decorations.svg";
import loginText from "../../../assets/svg/login-text.svg";
import secondaryBg from "../../../assets/svg/login-bg-Secondary.svg";

// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import axios from "axios";
import { useEffect, useState } from "react";
import { Form } from "react-router-dom";
import { CButton, CInput } from "../../../components/Component";

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
		<div className="flex items-center h-screen justify-between px-[5%]">
			{/*//? BACKGROUNDS */}
			<img src={primaryBg} className="w-full h-screen -z-10 absolute top-0 left-0 object-cover pointer-events-none" />
			<img src={secondaryBg} className="w-full h-screen -z-10 absolute top-0 left-0 object-cover pointer-events-none" />

			{/*//? LOGO */}
			<img src={logoSmk} className="h-20 -z-10 absolute top-10 right-40 bg-white rounded-full object-cover" />
			<img src={logoOsis} className="h-20 -z-10 absolute top-10 right-14 object-cover" />

			<Form className="z-10 flex flex-col items-stretch">
				<img src={loginText} className="pointer-events-none self-center" />
				<hr className="border-accent-primary border-[1.5px] mt-8 mb-5" />

				<CInput name="nis" placeholder="nomor NIS mu" className="w-[30vw] " />
				<CInput name="password" placeholder="password" type="password" className="w-[30vw] mb-10" />

				<CButton type="submit" onClick={handleClick} loadingWhen={loading} className="self-end">Login</CButton>
			</Form>

			{/*//? TITLE */}
			<div>
				<h1 className="text-8xl mb-4 max-w-[50vw] font-bold text-right text-white" style={{textShadow: '5px 5px 10px rgba(0, 0, 0, .5)'}}>Welcome To Web Pilkosis 2024</h1>
				<h2 className="text-3xl font-bold text-right text-white" style={{textShadow: '5px 5px 10px rgba(0, 0, 0, .5)'}}>SMK Negeri 1 Kebumen</h2>
			</div>

			{/*//? DECORATIONS */}
			<img src={decorations} className="absolute bottom-0 left-0 pointer-events-none" />
		</div>
	);
}
