import { ReactSVG } from 'react-svg';
import WebApp from '@twa-dev/sdk';
import axios from 'axios';
import { initUtils } from '@telegram-apps/sdk';
import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../hooks/useAuth';

const utils = initUtils();

const Friends = function () {
    const { user } = useGlobalContext();

    const [friends, setFriends] = useState([]);

    const handleInviteFriend = async function () {
        if (!user) return console.error('Can\'t get telegram user info');
        const inviteLink = `https://t.me/pocket_mini_app_bot/app?startapp=${user.username}`;
        const shareText = 'Join our telegram mini app.';
        const fullUrl = `https://t.me/share/url?url=${encodeURIComponent(inviteLink)}&text=${encodeURIComponent(shareText)}`;
        utils.openTelegramLink(fullUrl);
    }

    const handleCopyInviteLink = function () {
        if (!user) return console.error('Can\'t get telegram user info');
        const inviteLink = `https://t.me/pocket_mini_app_bot/app?startapp=${user.username}`;
        navigator.clipboard.writeText(inviteLink).then(() => {
            document.getElementById('copytext').innerText = 'Copied';
        });
    }

    useEffect(() => {
        getFriends();
    }, []);

    const getFriends = async () => {
        const res = await axios.get(`/api/v1/users/friends`, {});
        setFriends(res.data.user);
        console.log('friends=', res.data.user);
    };

    return (
        <div className='flex flex-col pb-[100px] w-full min-h-screen bg-gradient-to-b from-[#6fbef6] via-[#35a9ea] to-[#93cff9]'>
            <div className='w-full mt-[20px]'>
                <div className='relative z-10 flex justify-center'>
                    <img src="./images/invite.png" className='' alt='rocket' />
                </div>
                <div className='pt-[50px] pb-[21px] mx-[61px] text-center -translate-y-[52px] bg-white bg-opacity-25 rounded-lg'>
                    <div className='text-[28px] font-semibold'>Invite friends</div>
                    <div className='text-[12px] mt-[4px] text-[#eef5f8]'>You and your friend will receive bonuses</div>
                </div>
            </div>
            <div className='w-full mt-[14px]'>
                <div className='mx-[30px] -mt-[44px] text-left'>Earned</div>
                <div className='mx-[30px] mt-[8px] py-2 grid justify-items-center grid-cols-2 bg-white bg-opacity-25 rounded-lg'>
                    <div className='flex items-center'>
                        <ReactSVG src='./imgs/coin.svg' className='mr-[3px]' />
                        <span className='font-semibold'>0</span>
                    </div>
                    <div className='flex items-center'>
                        <ReactSVG src='./imgs/ton.svg' className='mr-[3px]' />
                        <span className='font-semibold'>0</span>
                    </div>
                </div>
            </div>
            <div className='flex justify-between gap-[13px] w-full mt-6 px-[47px]'>
                <button onClick={handleInviteFriend} className='px-[48px] py-[12px] font-semibold text-[#35a9ea] text-xs bg-white rounded-lg'>Invite a friend</button>
                <button onClick={handleCopyInviteLink} className='flex items-center gap-3 px-5 py-3 text-xs bg-white bg-opacity-25 rounded-lg'><ReactSVG src='./imgs/link.svg' /><span id='copytext'>Copy</span></button>
            </div>
            <div className='w-full'>
                <div className='flex items-center gap-3 px-3 py-2 mx-[30px] mt-[29px] border rounded-lg'>
                    <img src="./images/handmoney.png" alt='hand money' />
                    <div>
                        <div className='text-[21px] font-semibold'>Invite a friend</div>
                        <div className='text-[#eef5f8] text-[12px]'>1000 Tokens</div>
                    </div>
                </div>
            </div>
            <div className='w-full'>
                <div className='flex items-center gap-3 px-3 py-2 mx-[30px] mt-[29px] border rounded-lg'>
                    <img src="./images/handmoney.png" alt='hand money' />
                    <div>
                        <div className='text-[21px] leading-[21px] font-semibold'>Invite a friend with Telegram Premium</div>
                        <div className='text-[#eef5f8] text-[12px] mt-[11px]'>3000 Tokens</div>
                    </div>
                </div>
            </div>
            <h1 className='mt-[11px] ml-[33px] text-lg font-semibold'>List of your friends</h1>
            <div className='mx-[33px] pt-[27px] pb-[40px] text-center text-[14px] bg-white bg-opacity-25 rounded-lg'>
                {friends !== undefined && friends.length === 0 && (<span>You haven't invited anyone yet.</span>) }
                {friends !== undefined && friends.length !== 0 && friends.map((item) => {
                    return (
                        <div className='flex items-center mx-[32px] justify-between px-3 py-2 border-b border-white border-opacity-20'>
                            <div className='flex gap-2'>
                                <img src="./images/girl.png" alt='avatar' className='w-[35px] h-[35px]' />
                                <div>
                                    <div className='flex text-[12px] items-center'>{item.name} <ReactSVG src='./imgs/gem.svg' className='mr-[2px] ml-[5px]' /> <span className='text-[#0088cc] font-semibold'>50</span></div>
                                    <div className='text-white text-[12px] text-opacity-35'>{item.token}</div>
                                </div>
                            </div>
                            <div className='font-semibold text-[12px] shadow-lg'>4</div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default Friends;