import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { btntw, inputtw } from '../Styles/Styles';
import { useLoginUserMutation } from '../services/appApi';
import { AppContext } from '../context/appContext'

const Login = () => {

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loginUser, { isLoading, error }] = useLoginUserMutation();
	const navigate = useNavigate();
	const { socket } = useContext(AppContext)

	// FUNCTION - LOGIN
	const handleLogin = (e) => {
		e.preventDefault();
		// LOGIN LOGIC
		loginUser({ email, password }).then(({ data }) => {
				if (data) {
					// SOCKET WORKS
					socket.emit('new-user')
					// NAVIGATE TO THE CHAT
					navigate('/chat')
				}
			})
	}

	return (
		<div className="container mx-auto">
			<div className="grid grid-cols-2 h-[80vh]">
				<img src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="Login" className='w-full h-full object-cover' />
				<div className="flex flex-col p-8 justify-center items-center">
					<form className='flex flex-col gap-4'>
						<p className='italic'>Email:</p>
						<input className={inputtw} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Enter Email...' required />
						<p className='text-xs text-slate-300'>Your information will never be shared</p>
						<p className='italic'>Password:</p>
						<input className={inputtw} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Enter Password...' required />
						<button className={btntw} onClick={handleLogin}>Login</button>
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