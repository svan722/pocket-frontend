import { useLocation } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import {Link} from 'react-router-dom';

const Footer = function () {
    const location = useLocation();

    return (
        <div className='fixed bottom-0 left-0 flex justify-between items-end w-full h-[87px] pb-[10px] bg-[#93cff9] rounded-t-[34px]'>
            <Link to='/home' className={`flex flex-col items-center w-32 transition-all duration-300 group ${location.pathname === '/home' ? '-translate-y-4' : 'hover:-translate-y-4'} ${location.pathname === '/home' ? 'scale-125' : 'hover:scale-125'}`}>
                {/* <img src={homeImg} className='h-[20px]' alt='home image' /> */}
                <ReactSVG src='./imgs/home.svg' />
                <span className='text-[10px]'>Home</span>
                <ReactSVG src='./imgs/triangle.svg' className={`mt-1 transition-all duration-300 ${location.pathname === '/home' ? '' : 'hidden group-hover:block'}`} />
            </Link>
            <Link to ='/friends' className={`flex flex-col items-center w-32 transition-all duration-300 group ${location.pathname === '/friends' ? '-translate-y-4' : 'hover:-translate-y-4'} ${location.pathname === '/friends' ? 'scale-125' : 'hover:scale-125'}`}>
                <ReactSVG src='./imgs/friends.svg' />
                <span className='text-[10px]'>Friends</span>
                <ReactSVG src='./imgs/triangle.svg' className={`mt-1 w-2 transition-all duration-300 ${location.pathname === '/friends' ? '' : 'hidden group-hover:block'}`} />
            </Link>
            <Link to ='/earn' className={`flex flex-col items-center w-32 transition-all duration-300 group ${location.pathname === '/earn' ? '-translate-y-4' : 'hover:-translate-y-4'} ${location.pathname === '/earn' ? 'scale-125' : 'hover:scale-125'}`}>
                <ReactSVG src='./imgs/earn.svg' />
                <span className='text-[10px]'>Earn</span>
                <ReactSVG src='./imgs/triangle.svg' className={`mt-1 w-2 transition-all duration-300 ${location.pathname === '/earn' ? '' : 'hidden group-hover:block'}`} />
            </Link>
            <Link to='/leaderboard' className={`flex flex-col items-center w-32 transition-all duration-300 group ${location.pathname === '/leaderboard' ? '-translate-y-4' : 'hover:-translate-y-4'} ${location.pathname === '/leaderboard' ? 'scale-125' : 'hover:scale-125'}`}>
                <ReactSVG src='./imgs/leaderboard.svg' />
                <span className='text-[10px]'>Leaderboard</span>
                <ReactSVG src='./imgs/triangle.svg' className={`mt-1 w-2 transition-all duration-300 ${location.pathname === '/leaderboard' ? '' : 'hidden group-hover:block'}`} />
            </Link>
        </div>
    );
}

export default Footer;