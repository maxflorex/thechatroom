import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HiOutlineCloudUpload } from 'react-icons/hi'
import { btntw, inputtw } from '../Styles/Styles';
import { useSignupUserMutation } from '../services/appApi';

const SignUp = () => {

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [signupUser, { isLoading, error }] = useSignupUserMutation();

	// IMAGE UPLOAD states

	const [image, setImage] = useState(null);
	const [uploading, setUploading] = useState(false);
	const [imagePrev, setImagePrev] = useState(null);
	const navigate = useNavigate();

	// FUNCTION - IMAGE VALIDATION

	const ValidateImg = (e) => {
		const file = e.target.files[0];
		if (file.size >= 1048576) {
			return alert('Max file is 1mb')
		} else {
			setImage(file);
			setImagePrev(URL.createObjectURL(file))
		}
	}

	// FUNCTION - SIGNUP

	const handleSignUp = async (e) => {
		e.preventDefault();
		if (!image) return alert('Please add your profile picture');
		const url = await uploadImage(image);
		console.log(url)
		signupUser({ name, email, password, picture: url }).then(({ data }) => {
			if (data) {
				console.log(data);
				navigate('/chat')
			}
		})
	}


	// FUNCTION - UPLOAD IMAGE

	const uploadImage = async () => {
		const data = new FormData();
		data.append('file', image);
		data.append('upload_preset', 'thechatroom');
		try {
			setUploading(true);
			let res = await fetch('https://api.cloudinary.com/v1_1/mx-dev/image/upload', {
				method: 'post',
				body: data
			})
			const urlData = await res.json();
			setUploading(false);
			return urlData.url
		} catch (error) {
			setUploading(false);
			console.log(error)
		}
	}

	// CONSOLE

	// console.log(name, email, password)

	// LINKS

	const img = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'


	return (
		<div className="container mx-auto">
			<div className="grid grid-cols-2 h-[80vh]">
				<div className="flex flex-col p-8 justify-center items-start relative">
					<h1 className='text-4xl font-bold mb-8'>Sing up</h1>
					<label htmlFor='image-upload' className='relative'>
						<img src={imagePrev || img} alt="Headshot" className='w-40 h-40 rounded-full object-cover object-top mb-12 cursor-pointer hover:scale-110 active:scale-90 duration-300' />
						<HiOutlineCloudUpload className='absolute bottom-0 right-0 bg-teal-500 p-2 rounded-full text-white text-4xl cursor-pointer mb-4 hover:bg-amber-500' />
					</label>
					<input type="file" id='image-upload' hidden accept='image/png, image/jpeg' onChange={ValidateImg} />
					<form className='flex flex-col gap-4'>
						{error && <p>{error.data}</p>}
						<p className='italic'>Name:</p>
						<input className={inputtw} onChange={(e) => setName(e.target.value)} type="email" placeholder='Enter Your Name...' />
						<p className='italic'>Email:</p>
						<input className={inputtw} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Enter Email...' />
						<p className='text-xs text-slate-300'>Your information will never be shared</p>
						<p className='italic'>Password:</p>
						<input className={inputtw} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Enter Password...' />
						<span className={btntw} onClick={handleSignUp}>{isLoading ? 'Signing you up' : 'Sign up'}</span>
					</form>
					<div className="pt-8">
						<h1>Already have an account? <Link to='/login' className='text-amber-500 hover:text-amber-300 duration-300'>Login</Link></h1>
					</div>
				</div>
				<img src="https://images.unsplash.com/photo-1580130037032-b1d3878e348b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1365&q=80" alt="Login" className='w-full h-full object-cover' />
			</div>
		</div>
	)
}

export default SignUp