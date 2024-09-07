import { IThumbsUp } from "@components/icons"
import Popup from "@components/popup"
import CTitle from "@components/title"
import authorizer from "@utils/authorizer"
import cache from "@utils/cache"
import tryRequest from "@utils/tryRequest"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Bounce, toast, ToastContainer } from "react-toastify"
import "@toastifyCss"


interface DetailVote {
   created_at: string
   id: number
   paslon_id?: number
   pemilih: string
   user_id: number
   voted_caksis?: number
   voted_cawaksis?: number
}


export default function DetailVote () {
   const navigate = useNavigate()
   const cacheDetailVote = cache.get('detailVote')
   const [dataDetailVote, setDataDetailVote] = useState<DetailVote[]|undefined>(cacheDetailVote)
   const [CPopup, triggerPopup] = Popup()
   
   useEffect(() => {
      if (cacheDetailVote) {
         setDataDetailVote(cacheDetailVote)
      }
   }, [cacheDetailVote])

   const handdleDelete = (id: number) => {
      tryRequest({
         apiEndPoint: '/api/voted',
         axiosOptions: {
            method: 'DELETE',
            params: { id }
         },
         async tryAgainCallback(_, tryAgain) {
            const auth = await authorizer('panitia')
            if (Array.isArray(auth))
               return tryAgain()
            else 
               return navigate('/')
         },
         onSucceed() {
            setDataDetailVote(dataDetailVote?.filter(data => data.id !== id))
            toast.success('Berhasil menghapus data', { containerId: 'detailVote' })
         },
         onFailed(err) {
            toast.error(`Gagal menghapus data "${err.message}"`, { containerId: 'detailVote' })
         }
      })
   }

   return (
      <>
         <CTitle text="Detail Pemilih" logo={<IThumbsUp width="30" height="30" />} />
         <table className="w-full">
            <thead className="h-10">
               <th>Nama Pemilih</th>
               <th>Tanggal Memilih</th>
               <th>Sudah Memilih Caksis</th>
               <th>Sudah Memilih Cawaksis</th>
               <th>Aksi</th>
            </thead>
            <tbody>
               {dataDetailVote?.map((data, index) => (
                  <tr key={index} className="h-16 border-b border-gray-400">
                     <td className="text-center">{ data.pemilih }</td>
                     <td className="text-center">{ new Date(data.created_at).toLocaleString('id', {dateStyle: 'medium', timeStyle: 'medium'}) }</td>
                     <td className="text-center">
                        <span className={`${data.voted_caksis ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'} text-sm px-3 py-[0.1rem] text-center rounded-full`}>
                           { data.voted_caksis ? 'Sudah' : 'Belum' }
                        </span>
                     </td>
                     <td className="text-center">
                        <span className={`${data.voted_cawaksis ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'} text-sm px-3 py-[0.1rem] text-center rounded-full`}>
                           { data.voted_cawaksis ? 'Sudah' : 'Belum' }
                        </span>
                     </td>
                     <td className="text-center">
                        <button onClick={() => triggerPopup({message: `Yakin ingin menghapus pilihan dari ${data.pemilih}`, onConfirm: () => handdleDelete(data.id)})} className="group relative inline-block text-sm font-medium text-white focus:outline-none focus:ring rounded-full">
                           <span className="rounded-full absolute inset-0 border border-red-600"></span>
                           <span className="rounded-full block border border-red-600 bg-red-600 px-6 py-2 transition-transform group-hover:translate-x-0 -translate-x-1 group-hover:translate-y-0 -translate-y-1">
                              Hapus
                           </span>
                        </button>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>

         <CPopup title="Yakin" />
         <ToastContainer
            containerId='detailVote'
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
      </>
   )
}