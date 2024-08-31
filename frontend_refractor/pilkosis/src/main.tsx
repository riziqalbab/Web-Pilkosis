import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
	createBrowserRouter,
	defer,
	redirect,
	RouterProvider,
} from "react-router-dom";
import Login from "./pages/auth/login/login.tsx";
import requestLogin from "@utils/action/login.ts";
import NotFound from "@pages/notFound.tsx";
import authorizer from "@utils/authorizer.ts";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				index: true,
				element: <Login />,
				action: requestLogin,
				loader: () => {
					return defer({auth: authorizer('user', 'onLoginPage')})
				},
			},
			{
				path: "voting",
				async lazy() {
					const LayoutVote = (await import("./pages/voting/layout.tsx")).default;
					const checkUserVote = (await import("./utils/loader/isAlreadyVote.ts")).default;
					return { Component: LayoutVote, loader: checkUserVote };
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
				path: "admin",
				async lazy() {
					const LayoutAdmin = (await import("./pages/admin/layout.tsx")).default;
					return { Component: LayoutAdmin };
				},
				children:[
					{
                        path: "paslon",
                        async lazy() {
                            const PaslonList = (await import("./pages/admin/count.tsx")).default;
                            return { Component: PaslonList };
                        },
                    }
				]
			}
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
