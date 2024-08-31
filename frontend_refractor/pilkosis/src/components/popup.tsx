import { m } from "framer-motion"
import {  useEffect, useState } from "react"

interface PopupProps {
   title?: string
   message?: string
   _open?:  boolean
   onConfirm?: () => void
   onCancel?: () => void
   children?: React.ReactNode
}

export default function Popup (): [React.FC<PopupProps>, (options?: PopupProps) => void] {
   let optionDispatch: React.Dispatch<React.SetStateAction<PopupProps>>

   const Component = (options: PopupProps) => {
      const [_options, _setOptions] = useState(options)

      useEffect(() => {
         optionDispatch = _setOptions
      }, [])

      useEffect(() => {
         document.body.style.overflow = _options._open ? 'hidden' : 'auto'
      }, [_options,])
   
      const handdleConfirm = () => {
         _setOptions(prev => ({...prev, _open: false}))
         _options.onConfirm && _options.onConfirm()
      }
      
      const handdleCancel = () => {
         _setOptions(prev => ({...prev, _open: false}))
         _options.onCancel && _options.onCancel()
      }

      return (
         <div className={`${!_options._open && 'pointer-events-none'} fixed w-full h-screen left-0 top-0 flex justify-center items-center z-50`}>
            <m.div
               initial={{ y: -100, opacity: 0 }}
               animate={{ y: _options._open ? 0 : -100, opacity: _options._open ? 1 : 0 }}
               transition={{ duration: 0.3, ease: 'anticipate' }}
               className="p-6 bg-thirdtiary z-50 shadow-xl rounded-xl lg:min-w-96 max-w-[40rem]"
            >
               {_options.children ? _options.children : (
                  <>
                     <h1 className="text-center text-2xl font-bold pb-2 mb-3 border-b border-black">{ _options.title }</h1>
                     <p className="text-center">{ _options.message }</p>
                     <div className="mt-6 flex gap-4 justify-center">
                        <button onClick={handdleConfirm} className="w-20 py-2 rounded-full shadow-md font-bold bg-red-400">Ya</button>
                        <button onClick={handdleCancel} className="w-20 py-2 rounded-full shadow-md font-bold bg-primary">Tidak</button>
                     </div>
                  </>
               )}
            </m.div>
            <m.div initial={{ opacity: 0 }} animate={{ opacity: _options._open ? 1 : 0 }} transition={{ duration: .3 }} onClick={handdleCancel} className="absolute left-0 top-0 w-full h-screen bg-black/50 z-40" 
            />
         </div>
      )
   }

   const trigger = (options: PopupProps = {}) => {
      optionDispatch(prev => ({...options, ...prev, _open: true}))
   }

   return [Component, trigger]
}