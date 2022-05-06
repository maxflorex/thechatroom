import Navigation from "./components/Navigation";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Chat from "./pages/Chat";
import { useSelector } from "react-redux";
import { useState } from "react";
import { AppContext, socket } from './context/appContext'
import Contact from "./pages/Contact";
import Footer from "./components/Footer";

function App() {
	const [rooms, setRooms] = useState([]);
	const [currentRooms, setCurrentRooms] = useState([]);
	const [members, setMembers] = useState([]);
	const [messages, setMessages] = useState([]);
	const [privateMemberMsg, setPrivateMemberMsg] = useState({});
	const [newMessages, setNewMessages] = useState({})

	const user = useSelector((state) => state.user);

	return (
		<AppContext.Provider value={{ socket, currentRooms, setCurrentRooms, members, setMembers, messages, setMessages, privateMemberMsg, setPrivateMemberMsg, newMessages, setNewMessages, rooms, setRooms }}>
			<BrowserRouter>
				<Navigation />
				<Routes>
					<Route path='/' element={<Home />} />
					{!user && (<>
						<Route path='/login' element={<Login />} />
						<Route path='/signup' element={<SignUp />} />
					</>)}
					<Route path='/contact' element={<Contact />} />
					<Route path='/chat' element={<Chat />} />
				</Routes>
				<Footer />
			</BrowserRouter>
		</AppContext.Provider>
	);
}

export default App;
