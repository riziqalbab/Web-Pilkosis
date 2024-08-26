import { ILoading } from "./icons"

export default function FallbackLoadContent () {
   return (
      <div className="w-full h-full flex gap-4 items-center justify-center">
         <ILoading width="50" height="50" color="orange" />
         <h1 className="text-xl text-accent-primary">Memuat...</h1>
      </div>
   )
}