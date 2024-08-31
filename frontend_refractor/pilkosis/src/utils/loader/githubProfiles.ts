import cache from "@utils/cache";
import axios from "axios";

const githubAccessToken = import.meta.env.VITE_GITHUB_ACCESS_TOKEN

//? list github username
const contributors = [
   'tegaradit', 'Eathen0'
]
export default function GetGithubProfiles () {
   if (!cache.get('githubProfiles')) {
      const response = contributors.map(async contributor => {
         return await axios.get(`https://api.github.com/users/${contributor}`, {
            headers: {
               'Authorization': `Bearer ${githubAccessToken}`
            },
            validateStatus: status => status <= 200
         }).then(res => {
            return res.data
         }).catch(err => {
            return new Error(err.message)
         })
      })

      cache.set('githubProfiles', response)
   }

   return cache.get('githubProfiles')
}