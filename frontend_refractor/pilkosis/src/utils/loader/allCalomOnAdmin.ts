import cache from "@utils/cache"
import axios from "axios";
import { defer } from "react-router-dom";

const origin = import.meta.env.VITE_HOST_BACKEND

type DataCalon = {
   id: string;
   nomor_urut: string;
   nama: string;
   calon_jabatan: string;
   visi: string;
   misi: string;
   program_kerja: string;
   img: string;
   ttl: string;
   motto: string;
   alamat: string;
   kelas: string
}

export default function () {
   const cacheCaksis = cache.get('dataCaksis') as DataCalon[]
   const cacheCawaksis = cache.get('dataCawaksis') as DataCalon[]

   if (cacheCaksis && cacheCawaksis) {
      return defer({dataCaksis: cacheCaksis, dataCawaksis: cacheCawaksis})
   }

   const resDataCaksis = axios.get(`${origin}/api/caksis`, { validateStatus: status => status <= 200, withCredentials: true })
   .then(res => res.data.data)
   .catch(err => {
      console.log('err caksis', err)
      return new Error(err)
   })
   const resDataCawaksis = axios.get(`${origin}/api/cawaksis`, { validateStatus: status => status <= 200, withCredentials: true })
   .then(res => res.data.data)
   .catch(err => {
      console.log('err cawaksis', err)
      return new Error(err)
   })

   return defer({dataCaksis: resDataCaksis, dataCawaksis: resDataCawaksis})
}