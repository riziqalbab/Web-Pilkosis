import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { redirect } from "react-router-dom";
import cache from "./cache";
import authorizer from "./authorizer";

const origin = import.meta.env.VITE_HOST_BACKEND;
interface Params {
	apiEndPoint: string;
	axiosOptions?: Omit<AxiosRequestConfig, "url">;
	tryAgainWhenStatus?: number[];
	limit?: number;
   tryAgainCallback?: (res: AxiosResponse, tryAgain: () => any) => any | Promise<any>;
	onFailed?: (err: any) => any;
	onSucceed?: (res: AxiosResponse) => any;
}

const defaultOnFailed = (err: any) => {
	console.error(err);
	try {
		return new Error(err.response.data.message);
	} catch {
		return new Error(err.message);
	}
};

const defaultOnSucceed = (res: AxiosResponse) => {
	console.log(res);
	return res.data.message;
};

const defaultTryAgainCallback = async (_: any, tryAgian: () => any) => {
   cache.delete('accessToken')
   if (Array.isArray(await authorizer())) //? if the authorizer is successfull the return value will be an array
		return tryAgian()
      // return 0

   return redirect('/')
}

export default async function <T = any>({
	apiEndPoint,
	axiosOptions = {},
	tryAgainWhenStatus = [401],
	limit = 3,
   tryAgainCallback = defaultTryAgainCallback,
	onFailed = defaultOnFailed,
	onSucceed = defaultOnSucceed,
}: Params): Promise<T> {

	let limitCounter = 0;

   return await (async function _tryRequest() {
      return await axios(`${origin}${apiEndPoint}`, {
         validateStatus: (status) => (status <= 200 || tryAgainWhenStatus.includes(status)),
			withCredentials: true,
			headers: {
				Authorization: 'Bearer ' + cache.get('accessToken')
			},
         ...axiosOptions,
      }).then(async (res: AxiosResponse<T>) => {
			if (tryAgainWhenStatus.includes(res.status)) {
				limitCounter++;
				if (limitCounter <= limit)
					return await tryAgainCallback(res, _tryRequest);
				throw new Error('Limit of try request has been reached');
			}
         return onSucceed(res);
      }).catch(err => {
         return onFailed(err);
      });
   })()
}
