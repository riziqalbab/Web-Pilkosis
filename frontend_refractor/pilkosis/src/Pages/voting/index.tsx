import CButton from "@components/button";
import FallbackErrorContent from "@components/contentErrorFallback";
import FallbackLoadContent from "@components/contentLoadFallback";
import { IThumbsUp } from "@components/icons";
import CImage from "@components/loadImage";
import Popup from "@components/popup";
import CTitle from "@components/title";
import authorizer from "@utils/authorizer";
import cache from "@utils/cache";
import axios from "axios";
import { Suspense, useRef, useState } from "react";
import { Await, useLoaderData, useNavigate, useOutletContext } from "react-router-dom";
import { Bounce, Id, toast, ToastContainer } from "react-toastify";

interface DataPaslon {
   caksis: string
   cawaksis: string
   id: string
   img: string
   misi: string
   nama: string
   nomor_urut: number
   total: number
   visi: string
}
const origin = import.meta.env.VITE_HOST_BACKEND

export default function IndexVote () {
   const navigate = useNavigate()
   const outletContex = useOutletContext<{loginData: Array<any>}>()
   
   //? the second item of this array is a dataUser from the authorizer
   const dataUser = outletContex.loginData[1]
   
   //? the cache as a fallback value is necessary to keep the content shows up when animate exit is runing
   const { dataPaslon } = (useLoaderData() as {dataPaslon: Array<DataPaslon>}) || {dataPaslon: cache.get('dataPaslon')} 
   
   const [loadingVote, setLoadingVote] = useState(false)
   const toastyId = useRef<Id>()

   const handdleVote = (id: string) => {
      setLoadingVote(true)
      toast.dismiss(toastyId.current)

      ;(function tryVote () {
         axios(`${origin}/api/vote`, {
            method: 'post',
            params: { id },
            headers: {
               'Authorization': `Bearer ${cache.get('accessToken')}`,
            },
            validateStatus: (status) => status <= 200 || status == 401,
         }).then(async res => {
            if (res.status === 401) {
               cache.delete('accessToken') //? delete the old access token from the cache
               const getNewAccessToken = await authorizer() //? this function is automaticly set the new access token to the cache when success
               if (Array.isArray(getNewAccessToken)) { //? if the authorizer is successfull the return value will be an array
                  return tryVote()
               } else
                  return navigate('/') //? if the authorizer is failed redirect to the login page
            }
            toast.success('Terimakasih sudah memilih')
            setLoadingVote(false)
         }).catch((err) => {
            if (typeof err.response?.data === 'object')
               toast.error('Anda sudah memilih sebelumnya')
            else 
               toast.error('Terjadi kesalahan, silahkan coba lagi atau kirim umpan balik')
            setLoadingVote(false)
         })
      })()
   }

   const [CPopup, triggerPopup] = Popup()

   return (
      <div>
         <CPopup title="Mantapkan!" message="Apakah kamu sudah yakin dengan pilihanmu?" />
         <CTitle className="mb-0" text="Voting Paslon" logo={<IThumbsUp width="40" height="40" />} />
         <h1 className="my-8 text-2xl text-accent-primary">
            Tentukan Pilihanmu 
            <span className="font-bold"> {dataUser?.nama}!</span>
         </h1>

         {/* //? CONTENTS */}
         <div className="">
            <Suspense fallback={<FallbackLoadContent />}>
               <Await
                  resolve={dataPaslon}
                  errorElement={<FallbackErrorContent />}
                  children={(data: Array<DataPaslon>) => {
                     return (
                        <div className="flex flex-col gap-10">
                           {data?.map((paslon: DataPaslon, index: number) => (
                              <div key={index} className="flex md:gap-4 gap-0 md:flex-row flex-col">

                                 <div className="min-w-fit h-auto bg-thirdtiary-light overflow-hidden md:rounded-xl rounded-t-xl shadow-md flex flex-col sm:flex-row md:flex-col ">
                                    <CImage src={paslon.img} alt={paslon.nama} className="aspect-square sm:w-72 w-full object-cover" />
                                    <div className="w-full-2xl p-4 relative z-20 h-fit md:h-fit sm:h-72">
                                       <div className="bg-thirdtiary-light absolute w-[180%] h-[150%] -top-4 rounded-t-[5rem] -left-[65%] -z-10 -rotate-12 md:block block sm:hidden" />
                                       <div>
                                          <h1 className="font-bold text-xl mb-4">
                                             <span className="text-accent-primary">#0{ paslon.nomor_urut } </span>
                                             { paslon.nama }
                                          </h1>
                                          <ul>
                                             <li className="mb-3">
                                                <p className="font-semibold">Caksis</p>
                                                <p>{ paslon.caksis }</p>
                                             </li>
                                             <li>
                                                <p className="font-semibold">Cawaksis</p>
                                                <p>{ paslon.cawaksis }</p>
                                             </li>
                                          </ul>
                                       </div>
                                       <CButton isLoading={loadingVote} onClick={() => triggerPopup({onConfirm: () => handdleVote(paslon.id)})} type="submit" className="py-2 mt-auto w-40 absolute bottom-0 hidden md:hidden sm:block">Vote!</CButton>
                                    </div>
                                    <CButton isLoading={loadingVote} onClick={() => triggerPopup({onConfirm: () => handdleVote(paslon.id)})} type="submit" className="py-2 mt-auto m-4 mb-4 z-30 block md:block sm:hidden">Vote!</CButton>
                                 </div>

                                 <div className="grow flex flex-col md:gap-4 gap-0 h-full">
                                    <div className="bg-thirdtiary-light md:shadow-md p-4 md:rounded-xl ">
                                       <h1 className="mb-2 font-bold text-lg">Visi</h1>
                                       <p>{ paslon.visi }</p>
                                    </div>
                                    <div className="bg-thirdtiary-light md:shadow-md p-4 md:rounded-xl ">
                                       <h1 className="mb-2 font-bold text-lg">Misi</h1>
                                       <p>{ paslon.misi }</p>
                                    </div>
                                    <div className="bg-thirdtiary-light md:shadow-md p-4 md:rounded-xl rounded-b-xl">
                                       <h1 className="mb-2 font-bold text-lg">Program Kerja</h1>
                                       <p>{ paslon.visi }</p>
                                    </div>
                                 </div>
                              </div>
                           ))}
                        </div>
                     )
                  }}
               />
            </Suspense>
         </div>

         <ToastContainer
            className="z-50"
				position="top-center"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
				transition={Bounce}
			/>
		</div>
   )
}