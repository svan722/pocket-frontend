import { initUtils } from '@telegram-apps/sdk';
import { ReactSVG } from 'react-svg';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Countdown from 'react-countdown';

const utils = initUtils();

const Earn = function () {
    const [dailyRemainSecond, setDailyRemainSecond] = useState(0);
    const [jointg, setJoinTG] = useState(false);
    const [followX, setFollowX] = useState(false);
    const [showDailyRewardModal, setShowDailyRewardModal] = useState(false);
    const [showJointModal, setJointModal] = useState(false);
    const [showFollowXModal, setShowFollowXModal] = useState(false);
    const [rewardData, setRewardData] = useState({});

    const handleTelegram = async function () {
        if(!jointg) return;
        const res = await axios.post(`/api/v1/users/jointg`, {status : 1});
        if(res.data.success === true && res.data.status === 'success') {
            setJoinTG(false);
            setJointModal(true);
        } else if(res.data.success === false) {
            if(res.data.status === 'notjoined') {
                utils.openTelegramLink('https://t.me/supercoolx_test');
            } else if(res.data.status === 'exist') {
                alert('already get bonus');
            }
        }
    }

    const handleTweeter = async function () {
        if (!followX) return;
        const res = await axios.post(`/api/v1/users/followx`, {status : 1});
        if(res.data.success === true && res.data.status === 'success') {
            setFollowX(false);
            setShowFollowXModal(true);
        }
        utils.openLink('https://twitter.com/hamster_kombat');
    }

    const onClaimDailyReward = async function () {
        const res = await axios.post(`/api/v1/users/claim_daily`, {status : 1});
        console.log(res);
        setDailyRemainSecond(res.data.ms);
        setRewardData(res.data);
        setShowDailyRewardModal(true);
    }
    useEffect(() => {
        getClaimStatus();
        getTGStatus();
        getXStatus();
    }, []);

    const getClaimStatus = async () => {
        const res = await axios.post(`/api/v1/users/claim_daily`, {});
        if(res.data.success === false) {
            setDailyRemainSecond(res.data.ms);
        }
        console.log('friends=', res);
    };
    const getTGStatus = async () => {
        const res = await axios.post(`/api/v1/users/jointg`, {});
        if(res.data.success === true && res.data.status === 0) {
            setJoinTG(res.data.jointg === 1 ? false : true);
        }
        console.log('getTGStatus=', res);
    };
    const getXStatus = async () => {
        const res = await axios.post(`/api/v1/users/followx`, {});
        if(res.data.success === true && res.data.status === 0) {
            setFollowX(res.data.followx === 1 ? false : true);
        }
        console.log('getXStatus=', res);
    };

    const handleRewardModalOK = () => {
        setShowDailyRewardModal(false);
    }

    const dailyRewardModal = () => {
        return (
            <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" aria-hidden="true"></div>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
                    <div className="relative overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                            {rewardData && rewardData.success ? (
                                <div className="sm:flex sm:items-start">
                                    <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-green-200 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" className="text-blue-500">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                                    </svg>
                                    </div>
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Congratulations!</h3>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">{rewardData.message}</p>
                                    </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="sm:flex sm:items-start">
                                    <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                                    <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                    </svg>
                                    </div>
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Failed!</h3>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">You've already got the daily reward.</p>
                                    </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="w-full px-4 py-3 bg-gray-50 sm:flex sm:flex-row-reverse sm:px-6">
                        <button onClick={handleRewardModalOK} type="button" className="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-500 sm:ml-3">Ok</button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        )
    }

    const jointModal = () => {
        return (
            <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" aria-hidden="true"></div>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
                    <div className="relative overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-green-200 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" className="text-blue-500">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                                </svg>
                                </div>
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Congratulations!</h3>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">You've joined Telegram and got 300 reward points.</p>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full px-4 py-3 bg-gray-50 sm:flex sm:flex-row-reverse sm:px-6">
                        <button onClick={() => setJointModal(false)} type="button" className="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-500 sm:ml-3">Ok</button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        )
    }

    const followXModal = () => {
        return (
            <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" aria-hidden="true"></div>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
                    <div className="relative overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-green-200 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" className="text-blue-500">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                                </svg>
                                </div>
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Congratulations!</h3>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">You've joined X account and got 300 reward points.</p>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full px-4 py-3 bg-gray-50 sm:flex sm:flex-row-reverse sm:px-6">
                        <button onClick={() => setShowFollowXModal(false)} type="button" className="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-500 sm:ml-3">Ok</button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='flex flex-col w-full pb-[100px] min-h-screen bg-gradient-to-b from-[#6fbef6] via-[#35a9ea] to-[#93cff9]'>
            <div className='flex items-center justify-end mt-[20px] ml-[32px]'>
                <div className='absolute left-[32px]'>
                    <p className='text-[32px] font-semibold break-keep'>Earn more coins</p>
                    <p className='text-[10px]'>Make our tasks to get more coins</p>
                </div>
                <img src="./images/rocket.png" alt='rocket' />
            </div>
            <div className='mt-[6px] mx-[32px]'>
                <div className='text-[19px] font-semibold'>Daily Task</div>
                <div className='flex items-center justify-between py-3 border-b'>
                    <div className='flex items-center gap-2'>
                        <div className='flex items-center justify-center w-[43px] h-[43px] bg-white border rounded-lg bg-opacity-10'>
                            <ReactSVG src='./imgs/calendar.svg' />
                        </div>
                        <div>
                            <div className='text-[8px] text-white text-opacity-[57%]'>500 Tokens</div>
                            <div className='text-xs'>Daily Reward</div>
                            <div className='text-[8px] text-[#2568ef]'>Get reward &gt;</div>
                        </div>
                    </div>
                    { dailyRemainSecond <= 0 ? <button onClick={onClaimDailyReward} className='w-[85px] h-[31px] bg-white text-[10px] text-[#35a9ea] rounded-lg'>Redeem</button>
                        : <button className='w-[85px] h-[31px] text-[10px] bg-[#93cff9] rounded-lg'>
                            <Countdown date={Date.now() + dailyRemainSecond} intervalDelay={1000} precision={3} onComplete={() => setDailyRemainSecond(0)} renderer={(props) => <span>{props.hours} : {props.minutes} : {props.seconds}</span>}></Countdown>
                        </button> }
                    {/* <button className='w-[85px] h-[31px] text-[10px] bg-[#93cff9] rounded-lg'>Redeem</button> */}
                </div>
                <div className='flex items-center justify-between py-3 border-b'>
                    <div className='flex items-center gap-2'>
                        <div className='flex items-center justify-center w-[43px] h-[43px] bg-white border rounded-lg bg-opacity-10'>
                            <ReactSVG src='./imgs/twitter.svg' />
                        </div>
                        <div>
                            <div className='text-[8px] text-white text-opacity-[57%]'>250 Tokens</div>
                            <div className='text-xs'>Retweet our post</div>
                            <div className='text-[8px] text-[#2568ef]'>Get reward &gt;</div>
                        </div>
                    </div>
                    <button className='w-[85px] h-[31px] bg-white text-[10px] text-[#35a9ea] rounded-lg'>Redeem</button>
                </div>
            </div>
            <div className='mt-[44px] mx-[32px]'>
                <div className='text-[19px] font-semibold'>Task List</div>
                <div className='flex items-center justify-between py-3 border-b'>
                    <div className='flex items-center gap-2'>
                        <div className='flex items-center justify-center w-[43px] h-[43px] bg-white border rounded-lg bg-opacity-10'>
                            <ReactSVG src='./imgs/wallet.svg' />
                        </div>
                        <div>
                            <div className='text-[8px] text-white text-opacity-[57%]'>1000 Tokens</div>
                            <div className='text-xs'>Wallet connect</div>
                            <div className='text-[8px] text-[#2568ef]'>Get reward &gt;</div>
                        </div>
                    </div>
                    <button className='w-[85px] h-[31px] text-[10px] bg-[#93cff9] rounded-lg'>Redeem</button>
                </div>
                <div className='flex items-center justify-between py-3 border-b'>
                    <div className='flex items-center gap-2'>
                        <div className='flex items-center justify-center w-[43px] h-[43px] bg-white border rounded-lg bg-opacity-10'>
                            <ReactSVG src='./imgs/telegram.svg' />
                        </div>
                        <div>
                            <div className='text-[8px] text-white text-opacity-[57%]'>300 Tokens</div>
                            <div className='text-xs'>Join our TG channel</div>
                            <div className='text-[8px] text-[#2568ef]'>Get reward &gt;</div>
                        </div>
                    </div>
                    <button onClick={handleTelegram} className={`w-[85px] h-[31px] ${jointg ? 'bg-white text-[#35a9ea]' : 'bg-[#93cff9]'} text-[10px] rounded-lg`}>Redeem</button>
                </div>
                <div className='flex items-center justify-between py-3 border-b'>
                    <div className='flex items-center gap-2'>
                        <div className='flex items-center justify-center w-[43px] h-[43px] bg-white border rounded-lg bg-opacity-10'>
                            <ReactSVG src='./imgs/twitter.svg' />
                        </div>
                        <div>
                            <div className='text-[8px] text-white text-opacity-[57%]'>300 Tokens</div>
                            <div className='text-xs'>Follow our X account</div>
                            <div className='text-[8px] text-[#2568ef]'>Get reward &gt;</div>
                        </div>
                    </div>
                    <button onClick={handleTweeter} className={`w-[85px] h-[31px] ${followX ? 'bg-white text-[#35a9ea]' : 'bg-[#93cff9]'} text-[10px] rounded-lg`}>Redeem</button>
                </div>
            </div>
            {showDailyRewardModal && dailyRewardModal()}
            {showJointModal && jointModal()}
            {showFollowXModal && followXModal()}
        </div>
    );
}

export default Earn;