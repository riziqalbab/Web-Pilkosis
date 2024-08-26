import { IInfo } from "./icons";

export default function FallbackErrorContent () {
   return (
      <div className="w-full h-full mt-10 flex flex-col items-center justify-center">
         <IInfo color="red" width="50" height="50" />
         <h1 className="text-xl text-red-500">Gagal memuat data Paslon</h1>
      </div>
   )
}