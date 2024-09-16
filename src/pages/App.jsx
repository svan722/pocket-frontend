import { useEffect } from 'react';
import { ReactSVG } from 'react-svg';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { useGlobalContext } from '../hooks/useAuth';

function App() {
	const { user, onSignUp } = useGlobalContext();
	const navigate = useNavigate();

	useEffect(() => {
		onSignUp('splash');
	}, []);

	useEffect(() => {
		if(user?.username) navigate('/home');
	}, [user]);
	return (
		<div className='flex flex-col w-screen min-h-screen bg-gradient-to-b from-[#6fbef6] via-[#35a9ea] to-[#93cff9]'>
			<div className="w-full my-auto">
				<div className='flex flex-col items-center justify-center'>
					<ReactSVG src='./imgs/logo.svg' />
				</div>
				<h1 className='mt-5 text-center text-[29px] font-extrabold'>POCKET</h1>
				<p className='mt-[6px] text-center'>your Gateway to Easy Rewards!</p>
				<Link to='/signup' className='w-[315px] h-[46px] mx-auto font-semibold text-[13px] flex justify-center mt-[68px] items-center text-[#35a9ea] bg-[#f5f5f5] rounded-md'>Get Started</Link>
			</div>
		</div>
	);
}

export default App;
