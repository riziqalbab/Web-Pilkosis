import { m, MotionProps } from "framer-motion"
import { useEffect, useState } from "react"
import { ILoading } from "@components/icons"

export interface ButtonProps extends Omit<MotionProps, 'style'>, Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag' | 'onDragEnd' | 'onDragStart' | 'style' | 'onAnimationStart'> {
   children: React.ReactNode,
   loadingWhen?: Promise<unknown>,
   classname?: string,
}

const Button = ({ children, loadingWhen, className, ...props }: ButtonProps) => {
   const [loading, setLoading] = useState(false)

   useEffect(() => {
      if (loadingWhen) {
         if (!loading) {
            setLoading(true)
            loadingWhen.finally(() => setLoading(false))
         }
      }
   }, [loadingWhen])

   return (
      <m.button
         animate={{ background: loading ? '#808080' : '#FFB765'  }}
         whileHover={{ background: loading ? '#808080' : '#FF941B' }}
         whileTap={{ scale: loading ? 1 : .9 }}
         transition={{ duration: .15 }}
         disabled={loading}
         className={`${loading ? 'cursor-not-allowed' : 'cursor-pointer'} ${className} flex items-center gap-2 font-bold px-6 py-2 text-white shadow-lg rounded-full`}
         {...props}
      >
         { children }
         {loading && <ILoading />}
      </m.button>
   )
}

export default Button