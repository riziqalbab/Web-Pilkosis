import { m } from "framer-motion";
import { ChangeEvent, InputHTMLAttributes, useState } from "react";

interface AnimateInputProps extends InputHTMLAttributes<HTMLInputElement> {
   name: string,
   type?: string,
   placeholder?: string,
   className?: string,
}

const AnimateInput = ({ type = 'text', name, placeholder = 'input', className = '', ...props }: AnimateInputProps) => {
   const [onFocus, setOnFocus] = useState(false)
   const [onFill, setOnFill] = useState(false)

   const handdleFocus = () => {
      setOnFocus(true)
   }

   const handdleBlur = () => {
      setOnFocus(false)
   }

   const handdleChange = (ev: ChangeEvent) => {
      if ((ev.target as HTMLInputElement).value) {
         setOnFill(true)
      } else {
         setOnFill(false)
      }
   }
   return (
      <div className="w-fit h-fit relative flex items-center mt-10 ml-10">
         <m.div
            animate={{
               y: ( onFocus || onFill) ? -35 : 0,
               x: ( onFocus || onFill) ? -10 : 10,
               color: ( onFocus || onFill) ? "#B56000" : "#ffffffbf",
               scale: ( onFocus || onFill) ? .8 : 1,
            }}
            transition={{
               duration: .3,
               ease: "circInOut"
            }}

            className="absolute text-xs left-2"
         >
            <label htmlFor={name}>{ placeholder }</label>
         </m.div>
         <input onChange={handdleChange} className={`focus-visible:outline-none text-sm border-[#c29562] text-white focus:border-2 px-4 py-3 shadow-md bg-[#FFC788] rounded-full w-96 ${className}`} onBlur={handdleBlur} onFocus={handdleFocus} type={type} name={name} id={name} {...props} />
      </div>
   )
}

export default AnimateInput