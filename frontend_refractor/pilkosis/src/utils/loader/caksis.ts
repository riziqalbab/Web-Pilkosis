import axios from "axios";
import { defer } from "react-router-dom";
import cache from "@utils/cache";
const origin = import.meta.env.VITE_HOST_BACKEND

//? this loader is don't need the user authorization
export default function getCaksis(): any {
   if (cache.has('dataCaksis')) return defer({ dataCaksis: Promise.resolve(cache.get('dataCaksis')) })
      
   const dataCaksis = axios.get(`${origin}/api/caksis`, { validateStatus: (status) => status >= 200 && status < 400, withCredentials: true })
      .then(res => {
         cache.set('dataCaksis', res.data.data)
         return res.data.data
      })
      .catch(err => {
         return Promise.reject('Gagal memuat data Caksis - ' + err.code)
      })

   return defer({ dataCaksis })
}