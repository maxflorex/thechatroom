import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {

	const btntw = 'mt-2 bg-slate-300 py-4 px-6 rounded-lg hover:bg-slate-900 hover:text-white duration-500 cursor-pointer mr-auto active:scale-110'
	const inputtw = 'bg-slate-100 p-4 rounded-lg w-96 focus:bg-slate-300 outline-none duration-500 active:scale-110'

	return (
		<div className="container mx-auto">
			<div className="grid grid-cols-2 h-[80vh]">
				<img src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="Login" className='w-full h-full object-cover' />
				<div className="flex flex-col p-8 justify-center items-center">
					<form className='flex flex-col gap-4'>
						<p className='italic'>Email:</p>
						<input className={inputtw} type="email" placeholder='Enter Email...' />
						<p className='text-xs text-slate-300'>Your information will never be shared</p>
						<p className='italic'>Password:</p>
						<input className={inputtw} type="password" placeholder='Enter Password...' />
						<span className={btntw}>Login</span>
					</form>
					<div className="pt-8">
						<h1>Don't have an account? <Link to='/signup' className='text-amber-500 hover:text-amber-300 duration-300'>Signup</Link></h1>
					</div>
				</div>
			</div>
		</div>

	)
}

export default Login