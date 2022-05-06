import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { btntw, inputtw } from '../Styles/Styles';
import { useLoginUserMutation } from '../services/appApi';
import { AppContext } from '../context/appContext'
import bg from '../assets/bg6_6.svg'
import character from '../assets/Marni 2.png'
import object1 from '../assets/Other 12.webp'

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
		<div className="flex h-[100vh] px-[5vw] pt-[6vh] items-center bg-cover z-0" style={{ backgroundImage: `url(${bg})` }}>
			<div className="flex flex-col p-8 justify-center items-start relative w-[100vw] md:w-full z-50">
				<h1 className='text-8xl font-bold mb-8 text-white drop-shadow-md'>Login</h1>
				<form className='flex flex-col gap-4 w-full'>
					{error && <p>{error.data}</p>}
					<p className='italic'>Email:</p>
					<input className={inputtw} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Enter Email...' required />
					<p className='text-xs text-white italic'>Your information will never be shared</p>
					<p className='italic'>Password:</p>
					<input className={inputtw} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Enter Password...' required />
					<button className={btntw} onClick={handleLogin}>{isLoading ? 'Loggin in' : 'Login'}</button>
				</form>
				<div className="pt-8">
					<h1>Don't have an account? <Link to='/signup' className='text-amber-500 hover:text-amber-300 duration-300'>Signup</Link></h1>
				</div>
			</div>
			<img src={object1} alt="Icon" className='absolute right-0 md:w-1/3 z-30 pb-40 hidden md:block' />
			<img src={character} alt="Login" className='xl:w-full md:w-2/3 w-40 object-contain max-h-[80vh] absolute right-0 z-0 bottom-4 md:bottom-auto' />
		</div>

	)
}

export default Login