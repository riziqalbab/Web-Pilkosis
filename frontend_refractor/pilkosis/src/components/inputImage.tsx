/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react"
import { IAdd } from "./icons"

const allowImgType = ['jpg', 'jpeg', 'png', 'webp']

interface ImageInputProps {
   fallbackImagePreview?: Blob
   fallbackLetter?: string
   getImage?: (image: Blob) => void
   className?: string
   name?: string
}

export default function CImageInput ({ fallbackImagePreview, fallbackLetter = '', getImage, className = "", name = "photo-profile" }: ImageInputProps) {
   const dataTransfer = new DataTransfer()

   const inputRef = useRef<any>(null)
   const [previewImg, setPreviewImg] = useState(fallbackImagePreview)
   const upload = (files: any) => {
      if (getImage) getImage(files[0])
      setPreviewImg(files[0])
   }

   useEffect(() => {
      if (fallbackImagePreview instanceof Blob) {
         const file = new File([fallbackImagePreview], "image")
         dataTransfer.items.add(file)
         inputRef.current && (inputRef.current.files = dataTransfer.files)
      }
   }, [inputRef])

   // Input manual
   const handleButtonClick = () => inputRef.current.click()

   // Input drag'n drop
   const [dragging, setDragging] = useState(false);
   const handleDragEnter = (e: any) => {
		e.preventDefault();
		setDragging(true);
   };
   const handleDragLeave = () => setDragging(false)
   const handleDragOver = (e: any) => e.preventDefault()
   const handleDrop = (e: any) => {
      e.preventDefault();
      setDragging(false);
      const files = [...e.dataTransfer.files]

      // Check if the file is an image
      if (files.length === 0) return
      const imgType = files[0].type.split('/')
      if (imgType[0] != 'image') return
      if (!allowImgType.includes(imgType[1])) return

      const file = new File([files[0]], "image")
      dataTransfer.items.add(file)
      inputRef.current.files = dataTransfer.files
      
      upload(files);
   };

	return (
		<div
			className={`${dragging ? "border" : ""} relative group overflow-hidden text-center cursor-pointer bg-base-300 ${className}`}
			onDragEnter={handleDragEnter}
			onDragLeave={handleDragLeave}
			onDragOver={handleDragOver}
			onDrop={handleDrop}
			onClick={handleButtonClick}
		>
         <div className="absolute pointer-events-none left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
            {dragging ? (
               <span>Jatuhkan Gambar</span>
            ) : (
               <span className={`${previewImg ? 'group-hover:inline hidden' : ''} ${(fallbackLetter.length != 0 && !previewImg) ? 'text-5xl' : ''}`}>
                  {(fallbackLetter.length != 0 && !previewImg) ? fallbackLetter : <IAdd width="30" height="30" /> }
               </span>
            )}
         </div>

			<input
				onChange={(e) => upload(e.target.files)}
				ref={inputRef}
				className="w-full px-2 py-1 rounded-lg"
				accept=".jpg,.jpeg,.png,.webp"
				type="file"
				hidden
				name={name}
			/>
			{previewImg ? (
				<img
					className={`${dragging ? "opacity-10" : "opacity-100"} w-full h-full pointer-events-none object-cover absolute top-0 group-hover:opacity-10 transition-opacity duration-300`}
					src={previewImg instanceof Blob ? URL.createObjectURL(previewImg) : previewImg}
				/>
			) : ''}
		</div>
	)
}