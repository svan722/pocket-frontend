import { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import axios from 'axios';
import { useGlobalContext } from '../hooks/useAuth';

const Leaderboard = function () {
    const [period, setPeriod] = useState('week');
    const [users, setUsers] = useState([]);
    const [rank, setRank] = useState(-1);
    const [self, setSelf] = useState({});

    const { user, fetchUser } = useGlobalContext();

    const getLeaderboard = async () => {
        const res = await axios.post(`/api/v1/users/leaderboard`, {type: period});
        setUsers(res.data.users);
        setRank(res.data.rank);
        setSelf(res.data.self);
    };

    useEffect(()=> {
        getLeaderboard();
    },[period])

    useEffect(() => {
        fetchUser();
    }, []);
    const filteredUsers = users.length > 0 && users.find(item => item._id === self._id);
    return (
        <div className='flex flex-col pb-[100px] w-full min-h-screen bg-gradient-to-b from-[#6fbef6] via-[#35a9ea] to-[#93cff9]'>
            <div className='w-full mt-[20px]'>
                <div className='flex justify-center -translate-x-8 translate-y-10'>
                    <img className='' src="./images/crown.png" alt='crown image' />
                </div>
                <div className='flex mx-[30px]'>
                    <div className='flex justify-center flex-1 translate-y-20'><img src="./images/girl.png" className='w-20 h-20' alt='avatar' /></div>
                    <div className='flex justify-center flex-1 translate-y-6'><img src="./images/girl.png" className='w-20 h-20' alt='avatar' /></div>
                    <div className='flex justify-center flex-1 translate-y-20'><img src="./images/girl.png" className='w-20 h-20' alt='avatar' /></div>
                </div>
                <div className='flex mx-[30px] items-end'>
                    <div className='flex flex-col items-center justify-center flex-1 gap-1 pt-8 pb-2 bg-[#98d1ff] bg-opacity-20 rounded-l-lg'>
                        <div className='flex items-center justify-center w-5 h-5 text-xs -translate-y-3 bg-gradient-to-t from-[#0e1932] to-[#4474a2] rotate-45 rounded-lg'><span className='-rotate-45'>2</span></div>
                        <div className='text-[12px] font-light'>{users[1] && users[1].name}</div>
                        <div className='text-[14px] font-semibold'>
                            {users[1] && (period == "week" ? users[1].weeklyToken : period == "month" ? users[1].monthlyToken : users[1].token)}
                        </div>
                        <div className='flex items-center gap-1 text-[14px] text-[#35a9ea]'>
                            <ReactSVG src='./imgs/gem.svg' /> 100
                        </div>
                    </div>
                    <div className='flex flex-col items-center justify-center flex-1 gap-1 pt-10 pb-10 bg-white rounded-t-3xl'>
                        <div className='flex items-center justify-center w-5 h-5 text-xs -translate-y-7 bg-gradient-to-t from-[#c85929] to-[#fec63c] rotate-45 rounded-lg'><span className='-rotate-45'>1</span></div>
                        <div className='text-sm text-blue-400'>{users[0] && users[0].name}</div>
                        <div className='font-semibold text-blue-400'>
                            {users[0] && (period == "week" ? users[0].weeklyToken : period == "month" ? users[0].monthlyToken : users[0].token)}
                        </div>
                        <div className='flex items-center gap-1 text-blue-500'>
                            <ReactSVG src='./imgs/gem.svg' /> 100
                        </div>
                    </div>
                    <div className='flex flex-col items-center justify-center flex-1 gap-1 pt-8 pb-2 bg-[#98d1ff] bg-opacity-20 rounded-r-lg'>
                        <div className='flex items-center justify-center w-5 h-5 text-xs -translate-y-3 bg-gradient-to-t from-[#231450] to-[#3e4eca] rotate-45 rounded-lg'><span className='-rotate-45'>3</span></div>
                        <div className='text-[12px] font-light'>{users[2] && users[2].name}</div>
                        <div className='text-[14px] font-semibold'>
                            {users[2] && (period == "week" ? users[2].weeklyToken : period == "month" ? users[2].monthlyToken : users[2].token)}
                        </div>
                        <div className='flex items-center gap-1 text-[14px] text-[#35a9ea]'>
                            <ReactSVG src='./imgs/gem.svg' /> 100
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex justify-center gap-4 mt-5'>
                <div className='flex-col items-center justify-center px-4 py-3 bg-[#6fbef6] rounded-xl'>
                    <div className='font-semibold text-center'>{period == "week" ? user.weeklyToken : period == "month" ? user.monthlyToken : user.token}</div>
                    <div className='flex items-center gap-1 text-[12px] mt-[3px]'>Your Tokens <ReactSVG src='./imgs/arrow-right.svg' /></div>
                </div>
                <div className='flex-col items-center justify-center px-4 py-3 bg-[#6fbef6] rounded-xl'>
                    <div className='font-semibold text-center'>#{rank}</div>
                    <div className='flex items-center gap-1 text-[12px] mt-[3px]'>Your Rank <ReactSVG src='./imgs/arrow-right.svg' /></div>
                </div>
            </div>
            <div className='flex justify-between items-center py-[4px] mx-[32px] mt-10 mb-[30px] bg-white bg-opacity-25 rounded-xl'>
                <div onClick={() => setPeriod('week')} className={`flex-1 text-center text-[12px] transition-all duration-300 font-semibold cursor-pointer py-[10px] rounded-lg ml-1 ${ period == 'week' ? '' : 'hover:' }bg-[#6fbef6]`}>Weekly</div>
                <div onClick={() => setPeriod('month')} className={`flex-1 text-center text-[12px] transition-all duration-300 font-semibold cursor-pointer py-[10px] rounded-lg mx-1 ${ period == 'month' ? '' : 'hover:' }bg-[#6fbef6]`}>Monthly</div>
                <div onClick={() => setPeriod('all')} className={`flex-1 text-center text-[12px] transition-all duration-300 font-semibold cursor-pointer py-[10px] rounded-lg mr-1 ${ period == 'all' ? '' : 'hover:' }bg-[#6fbef6]`}>All time</div>
            </div>
            <div>
                {users.length > 0 && users.map((item, index)=>{
                    return (
                        <div className={item._id == self._id ? 'flex items-center mx-[15px] justify-between px-7 py-2 bg-white bg-opacity-70 rounded-lg' :'flex items-center mx-[32px] justify-between px-3 py-2 border-b border-white border-opacity-20'}>
                            <div className='flex gap-2'>
                                <img src="./images/girl.png" alt='avatar image' className='w-[35px] h-[35px]' />
                                <div>
                                    <div className={item._id == self._id ? 'flex text-[12px] items-center text-[#35a9ea]': 'flex text-[12px] items-center'}>{item.name} <ReactSVG src='./imgs/gem.svg' className='mr-[2px] ml-[5px]' />
                                     {item._id == self._id ? <span className='ml-2 bg-[#0088cc] text-white rounded-full text-[10px] px-3 font-semibold'>You</span> : <span className='text-[#0088cc] font-semibold'>50</span>}
                                     </div>
                                    <div className={item._id == self._id ? 'text-[#6fbef6] text-[12px]' : 'text-white text-[12px] text-opacity-35'}>
                                        {period == "week" ? item.weeklyToken : period == "month" ? item.monthlyToken : item.token}
                                    </div>
                                </div>
                            </div>
                            <div className={item._id == self._id ? 'font-semibold text-[12px] shadow-lg text-[#6fbef6]' : 'font-semibold text-[12px] shadow-lg'}>{index + 1}</div>
                        </div>
                    )
                })}
                {filteredUsers == null && (
                    <div className='flex items-center mx-[15px] justify-between px-7 py-2 bg-white bg-opacity-70 rounded-lg'>
                    <div className='flex gap-2'>
                        <img src="./images/girl.png" alt='avatar image' className='w-[35px] h-[35px]' />
                        <div>
                            <div className='flex text-[12px] items-center text-[#35a9ea]'>{self.name} <ReactSVG src='./imgs/gem.svg' className='mr-[2px] ml-[5px]' />
                             <span className='ml-2 bg-[#0088cc] text-white rounded-full text-[10px] px-3 font-semibold'>You</span>
                             </div>
                            <div className='text-[#6fbef6] text-[12px]'>
                                {period == "week" ? self.weeklyToken : period == "month" ? self.monthlyToken : self.token}
                            </div>
                        </div>
                    </div>
                    <div className='font-semibold text-[12px] shadow-lg text-[#6fbef6]'>{rank}</div>
                </div>
                )}
            </div>
        </div>
    );
}

export default Leaderboard;