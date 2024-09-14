import cache from "@utils/cache"
import { useEffect, useState } from "react"


export default function Timer () {
   const cacheCountdown = cache.get('countdown')
   const [endDate, setEndDate] = useState<number>(new Date(Date.now()).getTime())
   
   const variant = {
      daysOnly () {
         return Math.floor((endDate - Date.now()) / (1000 * 60 * 60 * 24))
      },
      hoursAndMinutes () {
         const minutes = Math.floor((endDate - Date.now()) / (1000 * 60))
         return {
            hours: Math.floor(minutes / 60),
            minutes: Math.floor(minutes % 60)
         }
      },
      minutesAndSeconds () {
         const seconds = Math.floor((endDate - Date.now()) / 1000)
         return {
            minutes: Math.floor(seconds / 60),
            seconds: Math.floor((seconds % 60))
         }
      }
   }
   const [time, setTime] = useState<string>()
   useEffect(() => {
      if (cacheCountdown) {
         if (cacheCountdown instanceof Error) {
            setTime('--, --')
         } else {
            setEndDate(new Date(cacheCountdown).getTime())
            setInterval(() => {
               const duration = variant.hoursAndMinutes().hours;
               if (duration > 24) {
                  setTime(`${variant.daysOnly()} hari`)
               } else if (duration <= 24 && duration > 1) {
                  const { hours, minutes } = variant.hoursAndMinutes()
                  setTime(`${hours} jam, ${minutes} menit`)
               } else if (duration >= 0) {
                  const { minutes, seconds } = variant.minutesAndSeconds()
                  setTime(`${minutes} menit, ${seconds} detik`)
               } else {
                  setTime('Sudah Habis')
               }
            }, 1000);
         }
      }
   }, [cacheCountdown])

   return (
      <p className="text-xl text-accent-primary">
         Waktu Voting tersisa: <strong>{time}</strong>
      </p>
   )
}