import { ImgHTMLAttributes, useEffect, useState } from "react"
import { IInfo, ILoading } from "./icons"

const LoadingFallback = ({ className }: { className: string }) => {
   return (
      <div className={`animate-pulse flex justify-center items-center ${className}`}></div>
   )
}

const ErrorFallback = ({ className }: { className: string }) => {
   return (
      <div className={`flex flex-col justify-center items-center gap-3 p-4 ${className}`}>
         <IInfo color="red" />
         <p className="text-sm text-center">Failed to load this image</p>
      </div>
   )
}

export interface CImageProps extends ImgHTMLAttributes<HTMLImageElement> {
   src: string,
   alt?: string,
   className?: string,
}

const LoadImage = ({ src, alt = 'image', className = '', ...other }: CImageProps) => {
   const [isLoaded, setIsLoaded] = useState(false)
   const [isError, setIsError] = useState(false)

   useEffect(() => {
      try {
         const img_cnstr = new Image()
         img_cnstr.src = src
         img_cnstr.onload = () => {
            setIsLoaded(true)
         }
         img_cnstr.onerror = () => {
            setIsLoaded(true)
            setIsError(true)
         }
      } catch (error) {
         setIsError(true)
      }
   }, [])

   return isLoaded && !isError ? (
      <img {...{className, src, alt, other}} />
   ) : isError ? <ErrorFallback className={className} /> : <LoadingFallback className={className} />
}

export default LoadImage