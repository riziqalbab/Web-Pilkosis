import axios from "axios"
import { redirect } from "react-router-dom"
import cache from "./cache"
const origin = import.meta.env.VITE_HOST_BACKEND

interface UserData { 
	name: string
	username: string
	role: string
}

interface ResponseRequest {
	accessToken: string
	data: UserData
}

export default async function authorizer (type: ('user' | 'admin' | 'panitia' | '*') = 'user', onPageLogin?: 'onLoginPage') {
	if (cache.has('accessToken') && cache.has('userData')) {
		if (type !== '*' && cache.get('userData')?.role !== 'admin') {
			if (type === 'admin' && cache.get('userData')?.role !== 'admin')
				return redirect('/not-found')
			if (type === 'panitia' && cache.get('userData')?.role !== 'khusus')
				return redirect('/not-found')
		}

		return [cache.get('accessToken'), cache.get('userData')]
	}

	return await axios.get(`${origin}/api/token`, { validateStatus: (status) => status <= 200, withCredentials: true })
		.then(({ data }: { data: ResponseRequest }) => {
			cache.set('accessToken', data.accessToken)
			cache.set('userData', data.data)

			if (type !== '*' && cache.get('userData')?.role !== 'admin') {
				if (type === 'admin' && cache.get('userData')?.role !== 'admin')
					return redirect('/not-found')
				if (type === 'panitia' && cache.get('userData')?.role !== 'khusus')
					return redirect('/not-found')
			}

			return [cache.get('accessToken'), cache.get('userData')]
		})
		.catch((err) => { //? this section will be called if the user is not logged in or the refresh token is expired
			console.log(err);
			if (onPageLogin) return new Error('Gagal mengAuthorisasi')
			return redirect('/')
		})
}
