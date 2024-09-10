import FallbackErrorContent from "@components/contentErrorFallback";
import FallbackLoadContent from "@components/contentLoadFallback";
import { IThumbsUp } from "@components/icons";
import Popup from "@components/popup";
import CTitle from "@components/title";
import cache from "@utils/cache";
import { Suspense, useEffect, useRef, useState } from "react";
import { Await, Link, useLoaderData } from "react-router-dom";
import { Bounce, Id, toast, ToastContainer } from "react-toastify";
import '@toastifyCss'
import ViseCard from "@components/viseCard";
import tryRequest from "@utils/tryRequest";

interface DataCaksis {
   id: string;
   nomor_urut: string;
   nama: string;
   calon_jabatan:string;
   visi: string;
   misi: string;
   program_kerja: string;
   img: string;
   ttl: string;
   motto: string;
   alamat: string;
   kelas: string
}

export default function IndexVote () {
   //? the cache as a fallback value is necessary to keep the content shows up when animate exit is runing
   const isUserAlreadyVote = (cache.get('isUserAlreadyVote') as {voted_caksis?: number, voted_cawaksis?: number})
   const { dataCaksis } = (useLoaderData() as {dataCaksis: Array<DataCaksis>}) || {dataCaksis: cache.get('dataCaksis')} 
   const [isSuccessVote, setIsSuccessVote] = useState<number|undefined>(isUserAlreadyVote.voted_cawaksis)
   const [loadingVote, setLoadingVote] = useState(false)
   const toastyId = useRef<Id>()

   useEffect(() => {
      setIsSuccessVote(isUserAlreadyVote.voted_caksis)
   }, [isUserAlreadyVote])

   const handdleVote = (id: string) => {
      setLoadingVote(true)
      if (toastyId.current) toast.dismiss(toastyId.current)

      tryRequest({
         apiEndPoint: '/api/vote',
         axiosOptions: { method: 'post', params: { id, type: 'caksis' } },
         onFailed: (err) => {
            if (typeof err.response?.data === 'object')
               toastyId.current = toast.error('Anda sudah memilih sebelumnya', {containerId: 'caksis'})
            else 
            toastyId.current = toast.error('Terjadi kesalahan, silahkan coba lagi atau kirim umpan balik', {containerId: 'caksis'})
         setLoadingVote(false)
      },
         onSucceed: () => {
            setIsSuccessVote(parseInt(id))
            cache.set('isUserAlreadyVote', {...isUserAlreadyVote, voted_caksis: parseInt(id)})
            toastyId.current = toast.success('Terimakasih sudah memilih', {containerId: 'caksis'})
            setLoadingVote(false)
         }
      })
   }

   const [CPopup, triggerPopup] = Popup()

   return (
      <div>
         <ToastContainer
            containerId='caksis'
            key='caksis'
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
         <CPopup title="Mantapkan!" message="Apakah kamu sudah yakin dengan pilihanmu?" />
         <CTitle className="mb-0" text="Voting Caksis" logo={<IThumbsUp width="40" height="40" />} />

         <Link to='/voting' className="px-6 py-2 rounded-md hover:shadow-lg transition-shadow duration-300 border-2 border-thirdtiary">👈Kembali</Link>

         <h1 className="my-8 text-2xl text-accent-primary">
            {isSuccessVote ? 'Terimakasih Atas Dukungan Mu!' : 
               <>
                  Pilih <span className="font-bold"> Calon Ketua Osis SMK Negeri 1 Kebumen</span>
               </>
            }
         </h1>

         {/* //? CONTENTS */}
         <div className="">
            <Suspense fallback={<FallbackLoadContent />}>
               <Await
                  resolve={dataCaksis}
                  errorElement={<FallbackErrorContent />}
                  children={(data: Array<DataCaksis>) => (
                     <div className="flex flex-col gap-10">
                        {data?.map((paslon: DataCaksis, index: number) => (
                           <ViseCard data={paslon} isAlreadyVoted={isSuccessVote} isLoadingVote={loadingVote} handdleVote={() => triggerPopup({onConfirm: () => handdleVote(paslon.id)})} key={index} />
                        ))}
                     </div>
                  )}
               />
            </Suspense>
         </div>
		</div>
   )
}