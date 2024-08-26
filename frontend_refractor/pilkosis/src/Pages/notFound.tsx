import { IInfo } from "@components/icons"

const NotFound = () => {
   return (
      <div className="flex justify-center items-center h-screen p-5">
         <IInfo width="100" height="100" className="text-secondary" />
         <h1 className="border-l-2 border-accent-secondary pl-4 ml-4 text-3xl text-accent-secondary">404 - Halaman Tidak di Temukan!</h1>
      </div>
   )
}

export default NotFound