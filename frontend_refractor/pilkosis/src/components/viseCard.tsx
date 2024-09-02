import CButton from "./button";
import CImage from "./loadImage";
import Popup from "./popup";

interface DataVise {
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

export default function ViseCard ({ data, isLoadingVote, handdleVote, isAlreadyVoted }: { isAlreadyVoted?: number, data: DataVise, isLoadingVote: boolean, handdleVote: () => void }) {
   const [Cpopup, trigertPopup] = Popup()

   return (
      <div className="flex md:gap-4 gap-0 md:flex-row flex-col">
         <Cpopup>
            <CImage src={data.img} alt={data.nama} className="aspect-square w-screen object-cover" />
         </Cpopup>
         <div className="md:max-w-72 md:min-w-72 h-auto bg-thirdtiary-light overflow-hidden md:rounded-xl rounded-t-xl shadow-md flex flex-col">
            <div className="sm:w-72 w-full cursor-pointer self-stretch sm:self-center md:self-stretch mt-0 sm:mt-4 md:mt-0" onClick={() => trigertPopup()}>
               <CImage src={data.img} alt={data.nama} className="aspect-square w-full h-full object-cover cursor-pointer rounded-none sm:rounded-xl md:stroke-none" />
            </div>
            <div className="w-full-2xl p-4 relative z-20 h-fit md:h-fit sm:h-72 mb-4">
               <div className="bg-thirdtiary-light absolute w-[185%] h-[150%] -top-4 rounded-t-[5rem] -left-[65%] -z-10 -rotate-12 md:block block sm:hidden" />
               <div>
                  <h1 className="font-bold text-xl mb-4">
                     <span className="text-accent-primary">#{ data.nomor_urut } </span>
                     { data.nama }
                  </h1>
                  <ul>
                     <li className="mb-3">
                        <p className="font-bold">Tempat Tanggal Lahir</p>
                        <p>{ data.ttl }</p>
                     </li>
                     <li className="mb-3">
                        <p className="font-bold">Motto</p>
                        <p>{ data.motto }</p>
                     </li>
                     <li className="mb-3">
                        <p className="font-bold">Kelas</p>
                        <p>{ data.kelas }</p>
                     </li>
                     <li>
                        <p className="font-bold">Alamat</p>
                        <p>{ data.alamat }</p>
                     </li>
                  </ul>
               </div>
            </div>
            {!Number.isInteger(isAlreadyVoted) && 
               <CButton isLoading={isLoadingVote} onClick={() => handdleVote()} type="submit" className="py-2 mt-auto m-4 mb-4 z-30 block">Vote!</CButton>
            }
         </div>

         <div className="grow flex flex-col md:gap-4 gap-0 h-full">
            <div className="bg-thirdtiary-light md:shadow-md p-4 md:rounded-xl">
               <h1 className="mb-2 font-bold text-lg">Visi</h1>
               <div dangerouslySetInnerHTML={{ __html: data.visi }} id="displayer" />
            </div>
            <div className="bg-thirdtiary-light md:shadow-md p-4 md:rounded-xl">
               <h1 className="mb-2 font-bold text-lg">Misi</h1>
               <div dangerouslySetInnerHTML={{ __html: data.misi }} id="displayer" />
            </div>
            <div className="bg-thirdtiary-light md:shadow-md p-4 md:rounded-xl rounded-b-xl">
               <h1 className="mb-2 font-bold text-lg">Program Kerja</h1>
               <div dangerouslySetInnerHTML={{ __html: data.program_kerja }} id="displayer" />
            </div>
         </div>
      </div>
   )
}