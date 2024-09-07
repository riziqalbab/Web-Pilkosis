import { m } from "framer-motion";
import { ChangeEvent, InputHTMLAttributes, useState } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
   name: string,
   type?: string,
   placeholder?: string,
   className?: string,
   onChange?: (ev: ChangeEvent<HTMLInputElement>) => void
}

const CInput = ({ type = 'text', name, placeholder = 'input', className = '', onChange, ...props }: InputProps) => {
   const [onFocus, setOnFocus] = useState(false)
   const [onFill, setOnFill] = useState(false)

   const handdleFocus = () => {
      setOnFocus(true)
   }

   const handdleBlur = () => {
      setOnFocus(false)
   }

   const handdleChange = (ev: ChangeEvent<HTMLInputElement>) => {
      if ((ev.target as HTMLInputElement).value) {
         setOnFill(true)
      } else {
         setOnFill(false)
      }
   }
   return (
      <div className={`${className} w-96 h-fit relative flex items-center mt-10`}>
         <m.div
            animate={{
               y: ( onFocus || onFill) ? -40 : 0,
               x: ( onFocus || onFill) ? -10 : 10,
               color: ( onFocus || onFill) ? "#B56000" : "#00000080",
               scale: ( onFocus || onFill) ? .9 : 1,
            }}
            transition={{
               duration: .3,
               ease: "circInOut"
            }}

            className="absolute text-base left-2"
         >
            <label htmlFor={name}>{ placeholder }</label>
         </m.div>
         <input onChange={ev => {handdleChange(ev); onChange && onChange(ev)}} className="focus-visible:outline-none text-base border-accent-secondary text-black focus:border-2 px-4 py-3 shadow-md bg-primary rounded-full w-full" onBlur={handdleBlur} onFocus={handdleFocus} type={type} name={name} id={name} {...props} />
      </div>
   )
}

export default CInput