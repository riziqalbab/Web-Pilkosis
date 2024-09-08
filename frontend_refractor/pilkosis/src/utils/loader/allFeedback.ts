import cache from "@utils/cache";
import axios from "axios";
import { defer } from "react-router-dom";
const origin = import.meta.env.VITE_HOST_BACKEND;

export default function allFeedback(): unknown {
	const result = axios
		.get(`${origin}/api/feedback`)
		.then((res) => {
         cache.set('dataFeedback', res.data.data)
         return res.data.data
      })
		.catch((err) => {
         cache.set('dataFeedback', new Error(err.response.data.message))
         return new Error(err.message)
      });
	return defer({ dataFeedback: result });
}
