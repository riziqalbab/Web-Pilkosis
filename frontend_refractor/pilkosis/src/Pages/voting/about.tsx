import FallbackErrorContent from "@components/contentErrorFallback";
import FallbackLoadContent from "@components/contentLoadFallback";
import { IAbout } from "@components/icons";
import CImage from "@components/loadImage";
import CTitle from "@components/title";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { m } from "framer-motion";

//? Logos
import typescriptLogo 	from "@assets/logo/typescript.svg";
import reactLogo 		 	from "@assets/logo/react.svg";
import viteLogo 			from "@assets/logo/vite.svg";
import tailwindLogo 		from "@assets/logo/tailwind.svg";
import framerMotionLogo from "@assets/logo/framer-motion.svg";
import expressLogo 		from "@assets/logo/express.svg";
import nodeJsLogo 		from "@assets/logo/node.svg";
import mysqlLogo 			from "@assets/logo/mysql.svg";
import jwtLogo 			from "@assets/logo/jwt.svg";
import waWebJs 			from "@assets/logo/wa-web-js.png";
import reactRouterLogo 	from "@assets/logo/react-router-dom.svg";
import decoration 		from "@assets/svg/decorations.svg";
import decoration2 		from "@assets/svg/decorations-2.svg";

interface GithubApiResponse {
	login: string;
	id: number;
	node_id: string;
	avatar_url: string;
	gravatar_id: string;
	url: string;
	html_url: string;
	followers_url: string;
	following_url: string;
	gists_url: string;
	starred_url: string;
	subscriptions_url: string;
	organizations_url: string;
	repos_url: string;
	events_url: string;
	received_events_url: string;
	type: string;
	site_admin: boolean;
	name: string;
	company?: string;
	blog: string;
	location: string;
	email?: string;
	hireable: string;
	bio: string;
	twitter_username: string;
	public_repos: number;
	public_gists: number;
	followers: number;
	following: number;
	created_at: string;
	updated_at: string;
}

const LineDecoration = ({ title, reverse = false }: { title: string, reverse?: boolean }) => (
	<div className="relative h-28 w-2 lg:block hidden">
		<div className={`${reverse ? '-translate-x-full left-2' : 'origin-left'} absolute`}>
			<div className="relative h-28 xl:w-96 w-72">
				<h2 className={`${reverse ? 'left-0' : 'right-0'} absolute text-center xl:text-2xl text-lg font-light mb-6 bottom-0`}>{ title }</h2>
				<div className={`${reverse ? 'right-0' : 'left-0'} absolute top-0 w-4 h-4 rounded-full bg-primary`} />
				<div className={`${reverse ? 'rotate-[-55deg] origin-right right-1.5' : 'rotate-[55deg] origin-left left-1.5'} absolute top-1 w-32 h-1 rounded-full bg-primary`} />
				<div className={`${reverse ? 'right-[4.8rem] origin-right' : 'left-[4.8rem] origin-left'} absolute bottom-0 w-80 h-1 rounded-full bg-primary`} />
			</div>
		</div>
	</div>
)

export default function AboutVote() {
	const githubProfiles = useLoaderData() as Promise<GithubApiResponse>[];

	const [profiles, setProfiles] = useState<GithubApiResponse[]>([]);
	const [isError, setIsError] = useState(false);
	const [profilesCount, setProfilesCount] = useState(0);

	useEffect(() => {
		if (githubProfiles) {
			if (profilesCount === 0) {
				githubProfiles.forEach((profile) => {
					profile.then((res) => {
						if (res instanceof Error) {
							setIsError(true)
							setProfiles([])
						} else {
							setProfiles((prev) => [...prev, res]);
						}
					})
				})
			}
			setProfilesCount(githubProfiles.length)
		}
	}, [githubProfiles]);

	return (
		<div>
			<CTitle text="Tentang" logo={<IAbout width="27" height="27" />} />

			<div className="mb-20 ">
				<h1 className="text-3xl text-center mb-10">Kontributor Sistem E-Voting <sub className="text-base italic">src: api.github.com</sub></h1>
				<div className="grid gap-4 2xl:grid-cols-3 xl:grid-cols-2 grid-col-1">
					{profiles ? (
						!isError ? profiles.map((profile, index) => (
							<div key={index} className="border border-thirdtiary-light flex flex-col items-stretch rounded-2xl relative min-h-[30rem] shadow-md">
								<div className="bg-thirdtiary-light w-full h-56 rounded-t-2xl relative overflow-hidden">
									<m.div className="absolute" animate={{x: Math.random() * 200, rotate: Math.random() * 360}} transition={{duration: 1, ease: 'circInOut'}}>
										<CImage src={decoration} />
									</m.div>
									<m.div className="absolute" animate={{x: Math.random() * 200, rotate: Math.random() * 360}} transition={{duration: 1, ease: 'circInOut'}}>
										<CImage src={decoration2} />
									</m.div>
								</div>
								<div className="self-center top-56 -translate-y-1/2 bg-white absolute p-2 rounded-full border-2 border-thirdtiary-light w-fit">
									<CImage
										src={profile.avatar_url}
										alt={profile.login}
										className="w-40 h-40 rounded-full object-cover"
									/>
								</div>

								<a href={profile.html_url} target="_blank" title="klik Melihat Profilnya di Github.com" className="self-center text-accent-secondary underline underline-offset-4 font-bold mt-24">@{profile.login}</a>
								<p className="self-center px-4 py-1 rounded-full border border-accent-primary mt-2">{profile.name}</p>
								
								<p className="px-6 mt-5">
									Bergabung ke Github pada
									<strong> {new Date(profile.created_at).toLocaleDateString('ID', {dateStyle: 'full'})}</strong>
								</p>
								
								<p className="px-6">
									dan telah membuat
									<strong> {profile.public_repos} </strong>
									Repositori publik
								</p>

								<p className="px-6 pb-6 mt-3">
									<strong>Tentang Saya : </strong>
									<code className="mt-2 block">"{profile.bio}"</code>
								</p>
							</div>
						)) : (
							<FallbackErrorContent message="Gagal memuat profile" />
						)) : (
							<FallbackLoadContent />
						)
					}
				</div>
			</div>

			{/* //? TECHNOLOGY */}
			<div className="2xl:px-5">
				<h1 className="text-3xl mb-10 text-center">Sistem E-Voting Ini di Buat Dengan...</h1>

				<div className="flex flex-col lg:items-stretch items-center mb-10">
					{/* //? Programming Language */}
					<div className="flex flex-col items-center w-fit">
						<h2 className="text-center text-xl mb-8 mt-4 block lg:hidden">Bahasa Pemrograman</h2>
						<div className="mb-5">
							{/* //? Typescript Logo */}
							<div className="w-fit">
								<a href="https://www.typescriptlang.org/" target="_blank">
									<CImage className="xl:w-28 xl:h-28 w-20 h-20 object-cover" src={typescriptLogo} alt="Typescript Logo" />
								</a>
								<p className="text-center mt-3 xl:text-base text-sm italic">Typescript</p>
							</div>
						</div>
						<LineDecoration title="Bahasa Pemrograman" />
					</div>

					{/* //?Frontend Technology */}
					<div className="flex flex-col items-center w-fit mt-10 lg:ml-auto">
						<h2 className="text-center text-xl mb-8 mt-4 block lg:hidden">Teknologi Sisi Klien</h2>
						<div className="w-fit flex justify-center gap-16 mb-5 flex-wrap">
							{/* //? React Logo */}
							<div className="w-fit">
								<a href="https://vitejs.dev/" target="_blank" className="relative">
									<CImage className="xl:w-28 xl:h-28 w-20 h-20 object-cover" src={reactLogo} alt="React Logo" />
									<CImage className="xl:w-14 xl:h-14 w-10 h-10 object-cover absolute bottom-0 right-0" src={viteLogo} alt="Vite Logo" />
								</a>
								<p className="text-center mt-3 xl:text-base text-sm italic">Vite + React</p>
							</div>

							{/* //? Vite Logo */}
							<div className="w-fit">
								<a href="https://reactrouter.com/" target="_blank">
									<CImage className="xl:w-28 xl:h-28 w-20 h-20 object-cover" src={reactRouterLogo} alt="React Router DOM Logo" />
								</a>
								<p className="text-center mt-3 xl:text-base text-sm italic">React Router <br /> DOM</p>
							</div>

							{/* //? Tailwind Logo */}
							<div className="w-fit">
								<a href="https://tailwindcss.com/" target="_blank">
									<CImage className="xl:w-28 xl:h-28 w-20 h-20 object-cover" src={tailwindLogo} alt="Tailwind Logo" />
								</a>
								<p className="text-center mt-3 xl:text-base text-sm italic">Tailwind Css</p>
							</div>

							{/* //?Framer Motion Logo */}
							<div className="w-fit">
								<a href="https://www.framer.com/motion/" target="_blank">
									<CImage className="xl:w-28 xl:h-28 w-20 h-20 object-cover" src={framerMotionLogo} alt="Framer Motion Logo" />
								</a>
								<p className="text-center mt-3 xl:text-base text-sm italic">Framer Motion</p>
							</div>
						</div>
						<LineDecoration title="Teknologi Sisi Klien" reverse />
					</div>
				</div>

				<div className="flex flex-col lg:items-stretch items-center mb-10">
					{/* //? Backend Technology */}
					<div className="flex flex-col w-fit items-center">
						<h2 className="text-center text-xl mb-8 mt-4 block lg:hidden">Teknologi Sisi Server</h2>
						<div className="flex gap-16 justify-center pb-4 mb-5 flex-wrap">
							{/* //? Express Js Logo */}
							<div>
								<a href="https://expressjs.com/" target="_blank">
									<CImage className="xl:w-28 xl:h-28 w-20 h-20 object-cover" src={expressLogo} alt="Express Logo" />
								</a>
								<p className="text-center mt-3 xl:text-base text-sm italic">Express</p>
							</div>

							{/* //? Node Js Logo */}
							<div>
								<a href="https://nodejs.org/en" target="_blank">
									<CImage className="xl:w-28 xl:h-28 w-20 h-20 object-cover" src={nodeJsLogo} alt="Node Js Logo" />
								</a>
								<p className="text-center mt-3 xl:text-base text-sm italic">Node Js</p>
							</div>

							{/* //? JWT Logo */}
							<div>
								<a href="https://jwt.io/" target="_blank">
									<CImage className="xl:w-28 xl:h-28 w-20 h-20 object-cover" src={jwtLogo} alt="JWT Logo" />
								</a>
								<p className="text-center mt-3 xl:text-base text-sm italic">JSON Web <br /> Token</p>
							</div>
						</div>
						
						<LineDecoration title="Teknologi Sisi Server" />
					</div>

					{/* //? Database */}
					<div className="flex flex-col items-center w-fit mt-5 lg:ml-auto">
						{/* //? MySql Logo */}
						<h2 className="text-center text-xl mb-8 mt-4 block lg:hidden">Basis Data</h2>
						<div className="mb-5">
							<a href="https://www.mysql.com/" target="_blank">
								<CImage className="xl:w-28 xl:h-28 w-20 h-20 object-cover" src={mysqlLogo} alt="MySql Logo" />
							</a>
							<p className="text-center mt-3 xl:text-base text-sm italic">MySql</p>
						</div>
						<LineDecoration title="Basis Data" reverse />
					</div>
				</div>


				<div className="flex flex-col items-center lg:w-fit mb-10">
					<h2 className="text-center text-xl mb-8 mt-4 block lg:hidden">Bot Obrolan</h2>
					<div className="mb-5">
						<a href="https://wwebjs.dev/" target="_blank">
							<CImage className="xl:w-28 xl:h-28 w-20 h-20 object-cover" src={waWebJs} alt="WaWebJs Logo" />
						</a>
						<p className="text-center mt-3 xl:text-base text-sm italic">WhatsApp <br /> Web Js</p>
					</div>

					<LineDecoration title="Bot Obrolan" />
				</div>
			</div>
		</div>
	);
}
