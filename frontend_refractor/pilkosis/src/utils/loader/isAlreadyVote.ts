import authorizer from "@utils/authorizer";
import cache from "@utils/cache";
import tryRequest from "@utils/tryRequest";

interface ApiResponseData {
   voted_caksis?: number;
   voted_cawaksis?: number;
}
interface ApiResponse {
   message: string,
   data: ApiResponse[],
   totalVotes: number
}

export default async function isAlreadyVote(): Promise<ApiResponseData | Error> {
   return await tryRequest<ApiResponseData | Error>({
      apiEndPoint: '/api/checkUserVote',
      axiosOptions: {
         method: 'get',
      },
      async tryAgainCallback(_, tryAgain) {
         cache.delete('accessToken')
         const auth = await authorizer('user')
         if (Array.isArray(auth)) //? if the authorizer is successfull the return value will be an array
            return tryAgain()
         return auth
      },
      onSucceed(res) {
         const result = (res.data as ApiResponse).data
         cache.set('isUserAlreadyVote', result)
         return 0
      },
      onFailed(err) {
         cache.set('isUserAlreadyVote', new Error(err.message))
         return 0
      }
   })
}