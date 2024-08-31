import axios from "axios"
import { redirect } from "react-router-dom"
import cache from "./cache"
const origin = import.meta.env.VITE_HOST_BACKEND

interface UserData { 
	nama: string
	username: string
	role: string
}

interface ResponseRequest {
	accessToken: string
	data: UserData
}

export default async function authorizer (type: ('user' | 'admin') = 'user', onPageLogin?: 'onLoginPage') {
	if (cache.has('accessToken') && cache.has('userData')) {
		if (type === 'admin' && cache.get('userData')?.role !== 'admin')
			return redirect('/not-found')

		return [cache.get('accessToken'), cache.get('userData')]
	}

	return await axios.get(`${origin}/api/token`, { validateStatus: (status) => status >= 200 && status < 400, withCredentials: true })
		.then(({ data }: { data: ResponseRequest }) => {
			cache.set('accessToken', data.accessToken)
			cache.set('userData', data.data)
			if (type === 'admin' && cache.get('userData')?.role !== 'admin')
				return redirect('/not-found')

			return [cache.get('accessToken'), cache.get('userData')]
		})
		.catch((err: Error) => { //? this section will be called if the user is not logged in or the refresh token is expired
			if (onPageLogin) return false
			return redirect('/')
		})
}
