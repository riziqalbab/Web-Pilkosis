import authorizer from "@utils/authorizer"
import cache from "@utils/cache"
import axios from "axios"

const origin = import.meta.env.VITE_HOST_BACKEND

export default async function vote ({ request }: {request: Request}) {
   const { searchParams } = new URL(request.url)
   const id = searchParams.get('id')
   
   // console.log('palon id', id)
   // return 0

   const response = (async function tryVote () {
      return await axios(`${origin}/api/vote`, {
         method: 'post',
         params: { id },
         headers: {
            'Authorization': `Bearer ${cache.get('accessToken')}`,
         },
         validateStatus: (status) => status >= 200 && status < 500 && status !== 400,
      }).then(async res => {
         console.log(res);
         if (res.status <= 400) return true
         if (res.status === 401) {
            console.log('access token expires');
            cache.delete('accessToken')
   
            const getNewAccessToken = await authorizer()
   
            if (Array.isArray(getNewAccessToken))
               tryVote()
            else
               return getNewAccessToken
         }
         return false
      }).catch((err) => {
         console.log(err);
         return false
      })
   })()

   return response
}