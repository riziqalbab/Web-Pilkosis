import { Outlet } from "react-router-dom";
import { domAnimation, LazyMotion } from "framer-motion";

function App() {
	return (
		<LazyMotion features={domAnimation} strict>
			<Outlet />
		</LazyMotion>
	);
}

export default App;
