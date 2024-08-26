import axios from "axios";

const origin = import.meta.env.VITE_HOST_BACKEND;

export default async function requestFeedback({ request }: { request: Request }) {
    const rawData = await request.formData();
    const data: { [key: string]: any } = {};
    rawData.forEach((value, key) => {
        data[key] = value;
    });
    // return 0


   let response: any;
   try {
      response = await axios(`${origin}/api/feedback`, {
         method: 'post',
         data: JSON.stringify(data),
         withCredentials: true,
         headers: {
            "Content-Type": "application/json",
         },
         validateStatus: (status) => status <= 200 && status < 400
        });
   } catch (error) {
      response = new Error((error as any).response.data.message || (error as any).message);    
   }

   return response;
}
