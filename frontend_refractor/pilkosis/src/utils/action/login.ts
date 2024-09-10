import authorizer from "@utils/authorizer";
import axios from "axios";
import { redirect } from "react-router-dom";
const origin = import.meta.env.VITE_HOST_BACKEND

export default async function requestLogin ({ request }: { request: Request }) {
   const rawData = await request.formData()
   const data: {[key: string]: any} = {}
   rawData.forEach((value, key) => {
      data[key] = value
   })

   let response: any;
   try {
      response = await axios(`${origin}/api/login`, {
         method: 'post',
         data: JSON.stringify(data),
         withCredentials: true,
         headers: {
            "Content-Type": "application/json",
         },
         validateStatus: (status) => status <= 200
      })

      const auth = await authorizer('*', 'onLoginPage')
      if (Array.isArray(auth)) {
         switch (auth[1].role) {
            case 'admin':
               return redirect('/admin')
            case 'khusus': //? panitia
               return redirect('/panitia')
            default: //? user
               return redirect('/voting')
         }
      } else
         return auth
   } catch (err: any) {
      if (typeof err.response?.data === 'object')
         response = new Error(err.response.data.message)
      else 
         response = new Error(err.message)
   }

   return response
} 