import { IInfo } from "./icons";

export default function FallbackErrorContent ({ message = 'Gagal memuat data Calon' }: {message?: string}) {
   return (
      <div className="w-full h-full mt-10 flex flex-col items-center justify-center">
         <IInfo color="red" width="50" height="50" />
         <h1 className="text-xl text-red-500">{message}</h1>
      </div>
   )
}