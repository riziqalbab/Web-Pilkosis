import { m, MotionProps } from "framer-motion"
import { ILoading } from "@components/icons"

export interface ButtonProps extends MotionProps, Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag' | 'onDragEnd' | 'onDragStart' | 'style' | 'onAnimationStart'> {
   children: React.ReactNode,
   isLoading?: boolean,
   classname?: string,
}

const CButton = ({ children, isLoading, className, ...props }: ButtonProps) => {
   return (
      <m.button
         animate={{ background: isLoading ? '#808080' : '#FFB765'  }}
         whileHover={{ background: isLoading ? '#808080' : '#FF941B' }}
         whileTap={{ scale: isLoading ? 1 : .9 }}
         transition={{ duration: .15 }}
         disabled={isLoading}
         className={`${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'} ${className} flex items-center justify-center gap-2 font-bold px-6 py-2 text-white shadow-lg rounded-full`}
         {...props}
      >
         { children }
         {isLoading && <ILoading />}
      </m.button>
   )
}

export default CButton