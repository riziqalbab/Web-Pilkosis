import axios from "axios";
import { defer } from "react-router-dom";
import cache from "@utils/cache";
const origin = import.meta.env.VITE_HOST_BACKEND

//? this loader is don't need the user authorization
export default function PaslonLoader(): any {
   if (cache.has('dataPaslon')) return defer({ dataPaslon: Promise.resolve(cache.get('dataPaslon')) })
      
   const dataPaslon = axios.get(`${origin}/api/caksis`, { validateStatus: (status) => status >= 200 && status < 400, withCredentials: true })
      .then(res => {
         cache.set('dataPaslon', res.data.data)
         return res.data.data
      })
      .catch(err => {
         return Promise.reject('Gagal memuat data paslon - ' + err.code)
      })

   return defer({ dataPaslon })
}