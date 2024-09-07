import authorizer from "@utils/authorizer";
import cache from "@utils/cache";
import tryRequest from "@utils/tryRequest";

export default function detailVote() {
   return tryRequest({
      apiEndPoint: '/api/voted',
      axiosOptions: {
         method: 'GET'
      },
      async tryAgainCallback(_, tryAgain) {
         cache.delete('accessToken')
         const auth = await authorizer('panitia')
         if (Array.isArray(auth))
            return tryAgain()
         else 
            return auth
      },
      onSucceed(res) {
         cache.set('detailVote', res.data.data)
         return 0
      },
      onFailed(err) {
         try {
            cache.set('detailVote', new Error(err.response.data.message))
         } catch {
            cache.set('detailVote', new Error(err.message))
         }
         return 1
      }
   })
}