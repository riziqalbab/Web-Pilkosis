import { IThumbsUp } from "@components/icons";
import CTitle from "@components/title";
import { Link, useLocation } from "react-router-dom";
import decoration from "@assets/svg/decorations.svg";
import decoration2 from "@assets/svg/decorations-2.svg";
import CImage from "@components/loadImage";
import cache from "@utils/cache";


export default function IndexVote () {
   const isUserAlreadyVote = (cache.get('isUserAlreadyVote') as {voted_caksis?: number, voted_cawaksis?: number})
   const dataUser = cache.get('userData')
   const { pathname } = useLocation()

   return (
      <div>
         <CTitle className="mb-0" text="Voting" logo={<IThumbsUp width="40" height="40" />} />
         <h1 className="my-8 text-2xl text-accent-primary">
            {
               (!isUserAlreadyVote?.voted_cawaksis && !isUserAlreadyVote?.voted_caksis) ? 'Tentukan Pilihanmu' :
               !isUserAlreadyVote?.voted_caksis ? 'Kamu belum memilih Calon Ketua Osis' :
               !isUserAlreadyVote?.voted_cawaksis ? 'Kamu belum memilih Calon Wakil Ketua Osis' :
               (isUserAlreadyVote?.voted_cawaksis && isUserAlreadyVote?.voted_caksis) && 'Terimakasih Telah Berpartisipasi'
            }
            <span className="font-bold">, {dataUser?.nama}!</span>
         </h1>

         {/* //? CONTENTS */}
         <div className="grid sm:grid-cols-2 grid-cols-1 gap-10">
            <Link to={`${pathname.includes('admin') ? '/admin/daftar-calon/caksis' : '/voting/caksis'}`} className="flex items-center justify-center group shadow-sm hover:shadow-lg hover:bg-thirdtiary/80 transition-all duration-500 bg-thirdtiary-light z-0 text-accent-primary p-4 rounded-3xl h-96 text-center relative overflow-hidden">
               <h2 className="text-3xl z-10 font-bold">Calon Ketua Osis <br /> SMK Negeri 1 Kebumen </h2>
               <CImage src={decoration} alt="decoration" className="group-hover:opacity-60 group-hover:-translate-y-4 translate-x-4 transition-all duration-500 -z-10 opacity-45 absolute top-0 right-0 w-full h-full" />
               <CImage src={decoration2} alt="decoration" className="opacity-0 group-hover:opacity-40 group-hover:-translate-y-10 delay-100 translate-x-20 transition-all duration-700 -z-10 rotate-[170deg] absolute top-0 right-0 w-3/4 h-3/4" />
               <CImage src={decoration2} alt="decoration" className="opacity-0 group-hover:opacity-40 group-hover:-translate-y-5 delay-300 translate-x-4 transition-all duration-700 -z-10 absolute top-0 right-0 w-full h-full" />
            </Link>
            <Link to={`${pathname.includes('admin') ? '/admin/daftar-calon/cawaksis' : '/voting/cawaksis'}`} className="flex items-center justify-center group shadow-sm hover:shadow-lg hover:bg-thirdtiary/80 transition-all duration-500 bg-thirdtiary-light z-0 text-accent-primary p-4 rounded-3xl h-96 text-center relative overflow-hidden">
               <h2 className="text-3xl z-10 font-bold">Calon <br /> Wakil Ketua Osis <br /> SMK Negeri 1 Kebumen</h2>
               <CImage src={decoration} alt="decoration" className="group-hover:opacity-60 group-hover:-translate-y-4 transition-all duration-500 -z-10 opacity-45 absolute top-0 right-0 w-full h-full rotate-45 translate-x-40" />
               <CImage src={decoration2} alt="decoration" className="opacity-0 group-hover:opacity-40 group-hover:-translate-y-10 delay-100 transition-all duration-700 -z-10 absolute top-0 right-0 w-full h-full rotate-[-80deg] -translate-x-40" />
               <CImage src={decoration2} alt="decoration" className="opacity-0 group-hover:opacity-40 group-hover:-translate-y-5 delay-300 transition-all duration-700 -z-10 absolute top-0 right-0 w-full h-full rotate-45 translate-x-40" />
            </Link>
         </div>
		</div>
   )
}