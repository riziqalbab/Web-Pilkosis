import { CButton, CImage, CTitle } from "@components/component";
import FallbackErrorContent from "@components/contentErrorFallback";
import FallbackLoadContent from "@components/contentLoadFallback";
import { IThumbsUp } from "@components/icons";
import cache from "@utils/cache";
import { Suspense } from "react";
import { Await, Form, useLoaderData, useOutletContext } from "react-router-dom";

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

export default function IndexVote () {
   //? the second item of this array is a dataUser from the authorizer
   const dataUser = useOutletContext<Array<any>>()[1] 
   
   //? the cache as a fallback value is necessary to keep the content shows up when animate exit is runing
   const { dataPaslon } = (useLoaderData() as {dataPaslon: Array<DataPaslon>}) || {dataPaslon: cache.get('dataPaslon')} 

   return (
      <div>
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
                              <div key={index} className="w-full min-h-[30rem] rounded-2xl bg-thirdtiary/40 p-3 flex flex-col gap-3">
                                 <div className="grid grid-cols-5 gap-3">
                                    <CImage src={paslon.img} className="aspect-square object-cover rounded-2xl bg-primary/70" />
                                    <div className="rounded-2xl bg-primary/30 col-span-2 p-4">
                                       <h1 className="text-xl font-bold mb-2">Visi</h1>
                                       <p>
                                          {paslon.visi}
                                       </p>
                                    </div>
                                    <div className="rounded-2xl bg-primary/30 col-span-2 p-4">
                                       <h1 className="text-xl font-bold mb-2">Misi</h1>
                                       <p>
                                          {paslon.misi}
                                       </p>
                                    </div>
                                 </div>
                                 <div className="flex flex-col gap-3 grow">
                                    <div className="grow rounded-2xl bg-primary/30 p-4">
                                       <h2 className="text-xl font-bold mb-2">Program Kerja</h2>
                                       <p>
                                          {paslon.nama}, {paslon.caksis} dan {paslon.cawaksis}
                                       </p>
                                    </div>
                                    <Form action={`/voting?id=${paslon.id}`} className="w-full" method="post">
                                       <CButton type="submit" className="rounded-2xl bg-primary/50 text-center w-full">Vote!</CButton>
                                    </Form>
                                 </div>
                              </div>
                           ))}
                        </div>
                     )
                  }}
               />
            </Suspense>
         </div>
		</div>
   )
}