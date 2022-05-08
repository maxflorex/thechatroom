import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HiOutlineCloudUpload } from 'react-icons/hi'
import { btntw, inputtw } from '../Styles/Styles';
import { useSignupUserMutation } from '../services/appApi';
import image1 from '../assets/Ikbal 5.png'
import image2 from '../assets/Badrun 4.png'
import profile from '../assets/profile.png'
import bg from '../assets/bg2_18.svg'
import image3 from '../assets/Other 09.webp'
import { motion } from 'framer-motion';

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

	return (
		<div className="flex h-[100vh] px-[5vw] pt-[6vh] items-center bg-cover z-0" style={{ backgroundImage: `url(${bg})` }}>
			<div className="flex flex-col p-8 justify-center items-start relative w-[100vw] md:w-full z-50">
				<h1 className='text-8xl font-bold mb-8 text-white drop-shadow-md'>Sing up</h1>
				<label htmlFor='image-upload' className='relative'>
					<img src={imagePrev || profile} alt="Headshot" className='w-40 h-40 rounded-full object-cover object-top mb-12 cursor-pointer hover:scale-110 active:scale-90 duration-300' />
					<HiOutlineCloudUpload className='absolute bottom-0 right-0 bg-teal-500 p-2 rounded-full text-white text-4xl cursor-pointer mb-4 hover:bg-amber-500' />
				</label>
				<input type="file" id='image-upload' hidden accept='image/png, image/jpeg' onChange={ValidateImg} />
				<form className='flex flex-col gap-4 w-full'>
					{error && <p>{error.data}</p>}
					<p className='italic'>Name:</p>
					<input className={inputtw} onChange={(e) => setName(e.target.value)} type="email" placeholder='Enter Your Name...' />
					<p className='italic'>Email:</p>
					<input className={inputtw} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Enter Email...' />
					<p className='text-xs text-white italic'>Your information will never be shared</p>
					<p className='italic'>Password:</p>
					<input className={inputtw} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Enter Password...' />
					<button className={btntw} onClick={handleSignUp}>{isLoading ? 'Signing you up' : 'Sign up'}</button>
				</form>
				<div className="pt-8">
					<h1>Already have an account? <Link to='/login' className='text-amber-100 hover:text-amber-300 duration-300'>Login</Link></h1>
				</div>
			</div>
			<motion.img src={image3} alt="Icon" className='absolute right-0 md:w-1/3 z-30 pb-40 hidden md:block'
				initial={{ x: '100vw', opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				exit={{ x: '100vw', opacity: 0 }}
				transition={{ ease: 'easeOut', delay: 0 }}
			/>
			<motion.img src={image2} alt="Login" className='xl:w-full md:w-2/3 w-40 object-contain max-h-[80vh] absolute right-0 z-20 bottom-4 md:bottom-auto'
				initial={{ y: '100vh', opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ ease: 'easeOut', delay: 0.7 }}
			/>
		</div>
	)
}

export default SignUp