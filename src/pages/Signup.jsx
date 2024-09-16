import React, { useEffect } from 'react';
import { useGlobalContext } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Signup = function () {
	const navigate = useNavigate();
	// const tgUser = { id: 7449972885, first_name: 'Marco', last_name: 'Wong'};
	const { onSignUp, user } = useGlobalContext();

	useEffect(() => {
		if(user?.username) navigate('/home');
	}, [user]);

    return (
		<div className='flex flex-col items-center w-full min-h-screen bg-gradient-to-b from-[#6fbef6] via-[#35a9ea] to-[#93cff9]'>
			<div className="flex flex-col items-center w-full my-auto">
				<p className='font-semibold'>Welcome Bonus</p>
				<p className='text-3xl font-semibold mt-[5px]'>500 Tokens</p>
				<div className='mt-[81px]'>
					<img src="./images/tokens.png" alt='tokens' />
				</div>
				<p className='mt-[55px] text-[12px] px-2 text-center'>As a first-time user, you'll receive <span className='font-semibold'>500 Tokens</span> instantly upon signing up.</p>
				<p className='text-[12px] px-2 text-center'>Earn additional rewards every time you complete a task and unlock more opportunities along the way.</p>
				<button onClick={() => onSignUp()} className='w-[315px] h-[46px] font-semibold text-[13px] flex justify-center mt-[33px] items-center text-[#35a9ea] bg-[#f5f5f5] rounded-md'>Sign up</button>
			</div>
		</div>
    );
}

export default Signup;