import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
	createBrowserRouter,
	defer,
	redirect,
	RouterProvider,
} from "react-router-dom";
import NotFound from "@pages/notFound.tsx";
import authorizer from "@utils/authorizer.ts";
import PageErrorFallback from "@components/pageErrorFallback.tsx";
import axios from "axios";
import cache from "@utils/cache.ts";

const origin = import.meta.env.VITE_HOST_BACKEND

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <PageErrorFallback />,
		children: [
			{
				index: true,
				async lazy () {
					const Index = (await import("./pages/auth/login/login.tsx")).default;
					const action = (await import("@utils/action/login.ts")).default;
					const loader = () => {
						return defer({auth: authorizer('*', 'onLoginPage')})
					}
					return { Component: Index, action, loader };
				},
			},
			{
				path: "voting",
				async lazy() {
					const LayoutVote = (await import("./pages/voting/layout.tsx")).default;
					const checkUserVote = (await import("./utils/loader/isAlreadyVote.ts")).default;
					const loader = () => {
						axios.get(`${origin}/api/countdown`)
						.then(res => {
							cache.set('countdown', res.data)
						})
						.catch(() => {
							cache.set('countdown', new Error())
						})
						return checkUserVote()
					}
					return { Component: LayoutVote, loader };
				},
				children: [
					{
						index: true,
						async lazy() {
							const IndexVote = (await import("./pages/voting/index.tsx")).default;
							return { Component: IndexVote };
						},
					},
					{
						path: 'caksis',
						async lazy() {
							const CaksisVote = (await import("./pages/voting/caksis.tsx")).default;
							const getCaksis = (await import("./utils/loader/caksis.ts")).default;
							return { Component: CaksisVote, loader: getCaksis };
						},
					},
					{
						path: 'cawaksis',
						async lazy() {
							const CawaksisVote = (await import("./pages/voting/cawaksis.tsx")).default;
							const getCawaksis = (await import("./utils/loader/cawaksis.ts")).default;
							return { Component: CawaksisVote, loader: getCawaksis };
						},
					},
					{
						path: "tentang",
						async lazy() {
							const AboutVote = (await import("./pages/voting/about.tsx")).default;
							const getGithubProfiles = (await import("./utils/loader/githubProfiles.ts")).default;
							return { Component: AboutVote, loader: getGithubProfiles };
						},
					}
				],
			},
			{
				path: "admin",
				async lazy() {
					const LayoutAdmin = (await import("./pages/admin/layout.tsx")).default;
					const authorize = () => authorizer('admin');
					return { Component: LayoutAdmin, loader: authorize };
				},
				children: [
					{
						index: true,
						async lazy() {
								const PaslonList = (await import("./pages/panitia/index.tsx")).default;
								return { Component: PaslonList };
						},
					},
					{
						path: 'lihat-umpan-balik',
						async lazy() {
							const ViewFeedback = (await import("./pages/admin/viewFeedback.tsx")).default;
							const getAllFeedback = (await import("./utils/loader/allFeedback.ts")).default;
							return { Component: ViewFeedback, loader: getAllFeedback };
						}
					},
					{
						path: 'tambah-calon',
						async lazy() {
							const AddPaslon = (await import("./pages/admin/addpaslon.tsx")).default;
							return { Component: AddPaslon };
						}
					}
				]
			},
			{
				path: 'panitia',
				async lazy() {
					const LayoutPanitia = (await import("./pages/panitia/layout.tsx")).default;
					const loadDetailVote = (await import("./utils/loader/detailVote.ts")).default;
					return { Component: LayoutPanitia, loader: loadDetailVote };
				},
				children: [
					{
						index: true,
						async lazy() {
							const ChartVote = (await import("./pages/panitia/index.tsx")).default;
							return { Component: ChartVote };
						},
					},
					{
						path: 'detail-vote',
						async lazy() {
							const DetailVote = (await import("./pages/panitia/detailVote.tsx")).default;
							return { Component: DetailVote };
						}
					},
					{
						path: 'lihat-umpan-balik',
						async lazy() {
							const ViewFeedback = (await import("./pages/admin/viewFeedback.tsx")).default;
							const getAllFeedback = (await import("./utils/loader/allFeedback.ts")).default;
							return { Component: ViewFeedback, loader: getAllFeedback };
						}
					}
				]
			},
			{
				path: "umpan-balik",
				async lazy() {
					const FeedbackVote = (await import("./pages/voting/feedback.tsx")).default;
					const feedbcack = (await import("./utils/action/feedback.ts")).default;
					return { Component: FeedbackVote, action: feedbcack};
					
				},
			},
		],
	},
	{
		path: "/not-found",
		Component: NotFound,
	},
	{
		path: "*",
		loader: () => redirect("/not-found"),
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<RouterProvider router={router} />
);
