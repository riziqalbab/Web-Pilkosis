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
         validateStatus: (status) => status <= 200 && status < 400
      })
      return redirect('/voting')
   } catch (err: any) {
      if (typeof err.response?.data === 'object')
         response = new Error(err.response.data.message)
      else 
         response = new Error(err.message)
   }

   return response
} 