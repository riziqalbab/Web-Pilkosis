import axios from "axios";
import { defer } from "react-router-dom";
import cache from "@utils/cache";
const origin = import.meta.env.VITE_HOST_BACKEND

//? this loader is don't need the user authorization
export default function getCawaksis(): any {
   if (cache.has('dataCawaksis')) return defer({ dataCawaksis: Promise.resolve(cache.get('dataCawaksis')) })
      
   const dataCawaksis = axios.get(`${origin}/api/cawaksis`, { validateStatus: (status) => status >= 200 && status < 400, withCredentials: true })
      .then(res => {
         cache.set('dataCawaksis', res.data.data)
         return res.data.data
      })
      .catch(err => {
         return Promise.reject('Gagal memuat data Cawaksis - ' + err.code)
      })

   return defer({ dataCawaksis })
}