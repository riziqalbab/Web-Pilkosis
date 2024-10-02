import FallbackErrorContent from "@components/contentErrorFallback";
import FallbackLoadContent from "@components/contentLoadFallback";
import { IThumbsUp } from "@components/icons";
import Popup from "@components/popup";
import CTitle from "@components/title";
import ViseCard from "@components/viseCard";
import cache from "@utils/cache";
import tryRequest from "@utils/tryRequest";
import { Suspense, useEffect, useRef, useState } from "react";
import { Await, Link, useLoaderData } from "react-router-dom";
import { Bounce, Id, toast, ToastContainer } from "react-toastify";
import '@toastifyCss'

interface DataCawaksis {
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
   const { dataCawaksis } = (useLoaderData() as {dataCawaksis: Array<DataCawaksis>}) || {dataCawaksis: cache.get('dataCawaksis')} 
   
   const cacheVoteTimeLeft = cache.get('countdown')
   const [voteTimeLeft, setVoteTimeLeft] = useState<number>(1)
   
   const [isSuccessVote, setIsSuccessVote] = useState<number|undefined>(1)
   const [loadingVote, setLoadingVote] = useState(false)
   const toastyId = useRef<Id>()

   useEffect(() => {
      if (cacheVoteTimeLeft) {
         if (cacheVoteTimeLeft instanceof Error) {
            setVoteTimeLeft(0)
         } else {
            setVoteTimeLeft(new Date(cacheVoteTimeLeft).getTime() - Date.now())
         }
      }
   }, [cacheVoteTimeLeft])

   useEffect(() => {
      setIsSuccessVote(isUserAlreadyVote.voted_cawaksis)
   }, [isUserAlreadyVote])

   const handdleVote = (id: string) => {
      setLoadingVote(true)
      if (toastyId.current) toast.dismiss(toastyId.current)

      tryRequest({
         apiEndPoint: '/api/vote',
         axiosOptions: { method: 'post', params: { id, type: 'cawaksis' } },
         onSucceed: () => {
            setIsSuccessVote(parseInt(id))
            cache.set('isUserAlreadyVote', {...isUserAlreadyVote, voted_cawaksis: parseInt(id)})
            toastyId.current = toast.success('Terimakasih sudah memilih', { containerId: 'cawaksis' })
            setLoadingVote(false)
         },
         onFailed: err => {
            if (typeof err.response?.data === 'object')
               toastyId.current = toast.error(err.response.data.message, { containerId: 'cawaksis' })
            else 
               toastyId.current = toast.error('Terjadi kesalahan, silahkan coba lagi atau kirim umpan balik', { containerId: 'cawaksis' })
            setLoadingVote(false)
            setTimeout(() => window.location.reload(), 1500);
         }
      })
   }

   const [CPopup, triggerPopup] = Popup()

   return (
      <div>
         <ToastContainer
            containerId='cawaksis'
            key='cawaksis'
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
         <CTitle className="mb-0" text="Voting Cawaksis" logo={<IThumbsUp width="40" height="40" />} />

         <Link to='/voting' className="px-6 py-2 rounded-md hover:shadow-lg transition-shadow duration-300 border-2 border-thirdtiary">👈Kembali</Link>

         <h1 className="my-8 text-2xl text-accent-primary">
            {
               isSuccessVote ? 'Terimakasih Atas Dukungan Mu!' : 
               voteTimeLeft <= 0 ? 'Waktu Voting Sudah Habis' :
               <>
                  Pilih <span className="font-bold"> Calon Wakil Ketua Osis SMK Negeri 1 Kebumen</span>
               </>
            }
         </h1>

         {/* //? CONTENTS */}
         <div className="">
            <Suspense fallback={<FallbackLoadContent />}>
               <Await
                  resolve={dataCawaksis}
                  errorElement={<FallbackErrorContent />}
                  children={(data: Array<DataCawaksis>) => (
                     <div className="flex flex-col gap-10">
                        {data?.sort(dPaslon => parseInt(dPaslon.nomor_urut)).map((paslon: DataCawaksis, index: number) => (
                           <ViseCard voteTimeLeft={voteTimeLeft} data={paslon} isAlreadyVoted={isSuccessVote} isLoadingVote={loadingVote} handdleVote={() => triggerPopup({onConfirm: () => handdleVote(paslon.id) })} key={index} />
                        ))}
                     </div>
                  )}
               />
            </Suspense>
         </div>
		</div>
   )
}