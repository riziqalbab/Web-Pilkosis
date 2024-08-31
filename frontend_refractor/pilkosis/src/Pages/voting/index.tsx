import { IThumbsUp } from "@components/icons";
import CTitle from "@components/title";
import { Link, useOutletContext } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import decoration from "@assets/svg/decorations.svg";
import CImage from "@components/loadImage";


export default function IndexVote () {
   const outletContex = useOutletContext<{loginData: Array<any>}>()
   
   //? the second item of this array is a dataUser from the authorizer
   const dataUser = outletContex.loginData[1]
   return (
      <div>
         <CTitle className="mb-0" text="Voting" logo={<IThumbsUp width="40" height="40" />} />
         <h1 className="my-8 text-2xl text-accent-primary">
            Tentukan Pilihanmu 
            <span className="font-bold"> {dataUser?.nama}!</span>
         </h1>

         {/* //? CONTENTS */}
         <div className="grid sm:grid-cols-2 grid-cols-1 gap-10">
            <Link to="/voting/caksis" className="group shadow-sm hover:shadow-lg transition-shadow duration-300 bg-thirdtiary-light z-0 text-accent-primary p-4 rounded-3xl h-96 text-center relative overflow-hidden">
               <h2 className="text-3xl leading-[24rem] group-hover:scale-150 transition-transform duration-300 z-10 font-bold">Caksis</h2>
               <CImage src={decoration} alt="decoration" className="group-hover:opacity-80 group-hover:-translate-y-4 transition-all duration-300 -z-10 opacity-45 absolute top-0 right-0 w-full h-full" />
            </Link>
            <Link to="/voting/cawaksis" className="group shadow-sm hover:shadow-lg transition-shadow duration-300 bg-thirdtiary-light z-0 text-accent-primary p-4 rounded-3xl h-96 text-center relative overflow-hidden">
               <h2 className="text-3xl leading-[24rem] group-hover:scale-150 transition-transform duration-300 z-10 font-bold">Cawaksis</h2>
               <CImage src={decoration} alt="decoration" className="group-hover:opacity-80 group-hover:-translate-y-4 transition-all duration-300 -z-10 opacity-45 absolute top-0 right-0 w-full h-full rotate-45 translate-x-40" />
            </Link>
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