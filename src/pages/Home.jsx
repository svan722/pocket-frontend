import { useEffect } from 'react';
import { useGlobalContext } from '../hooks/useAuth';

const Home = function () {
	const {
        logoutUser,
        user ,
        fetchUser
    } = useGlobalContext();
    
    const onLogout = async (e) => {
        await logoutUser();
    }

    useEffect(() => {
        fetchUser();
    }, []);
    return (
        <div className='flex flex-col items-center w-full min-h-screen bg-gradient-to-b from-[#6fbef6] via-[#35a9ea] to-[#93cff9]'>
            <div className='px-[34px] w-full pb-[100px]'>
                <div className='flex items-end justify-between w-full pt-16'>
                    <div className='flex gap-2'>
                        <img src="./images/avatar.png" className='w-[41px] h-[41px]' alt='avatar' />
                        <div>
                            <p className='font-semibold'>{user.name}</p>
                            <p className='text-[11px]'>{}</p>
                        </div>
                    </div>
                    <button onClick={onLogout} className='w-[97px] h-[31px] font-semibold text-[#35a9ea] text-[9px] bg-white rounded-md'>Connect Wallet</button>
                </div>
                <div className='flex justify-center mt-[67px]'>
                    <img src="./images/pocket.jpg" className='w-[207px] h-[207px] rounded-full' alt='money' />
                </div>
                <div>
                    <p className='mt-[22px] text-[37px] font-semibold text-center'>{user.token}</p>
                    {/* <p className='flex items-center justify-center text-sm'><img src={boltImg} className='h-[17px] mr-[2px]' alt='bolt' />998/1000</p> */}
                </div>
                <div className='w-full py-2 mt-[34px] bg-white bg-opacity-25 rounded-lg'>
                    <div className='flex items-center justify-center'>
                        <div className='text-[19px] font-semibold text-[#35a9ea]'>Swap in DEX</div>
                        <img src="./images/dex.png" alt='dex' />
                    </div>
                    <p className='text-[28px] -mt-2 font-semibold text-center'>Coming Soon</p>
                </div>
                <div className='w-full py-2 mt-[14px] bg-white bg-opacity-25 rounded-lg'>
                    <div className='flex items-center justify-center'>
                        <div className='text-[19px] font-semibold text-[#35a9ea]'>Holding TON</div>
                        <img src="./images/toncoin.png" alt='dex' />
                    </div>
                    <p className='text-[28px] -mt-2 font-semibold text-center'>Coming Soon</p>
                </div>
            </div>
        </div>
    );
}

export default Home;