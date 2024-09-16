import { FaChevronLeft } from 'react-icons/fa';
import { PiPlayFill } from 'react-icons/pi';

const Chat = function () {
    return (
        <div className='w-full min-h-screen px-10 pt-5 pb-32 bg-gradient-to-b from-blue-400 to-blue-300'>
            <div className='flex items-center gap-2 mb-10'>
                <a><FaChevronLeft /></a>
                <img src="./images/pocket.png" alt='pocket image' />
                <div>
                    <div className='text-xl font-semibold'>Pocket</div>
                    <div className='text-sm text-blue-300'>25.234.153 Subscribers</div>
                </div>
            </div>
            <div>
                <div className='p-3 pb-5 mt-5 bg-blue-300 rounded-bl-none rounded-xl'>
                    <p>slkdjsldkfjlskdfjlskdjflskdjf</p>
                    <p>slkdjsldkfjlskdfjlskdjflskdjf</p>
                    <p>slkdjsldkfjlskdfjlskdjflskdjf</p>
                    <p>slkdjsldkfjlskdfjlskdjflskdjf</p>
                </div>
                <div className='flex justify-between'>
                    <div className='text-xs'>12:40</div>
                    <div className='flex px-2 text-xs text-blue-600 -translate-x-2 -translate-y-2 bg-blue-400 rounded-l-full rounded-r-full'>👍 250.5k ❤ 892k 😅 962.6k</div>
                </div>
            </div>
            <div>
                <div className='p-3 pb-5 mt-5 bg-blue-300 rounded-bl-none rounded-xl'>
                    <img src="./images/train.png" alt='train image' />
                    <div className='mt-2'>
                        <p>slkdjsldkfjlskdfjlskdjflskdjf</p>
                        <p>slkdjsldkfjlskdfjlskdjflskdjf</p>
                        <p>slkdjsldkfjlskdfjlskdjflskdjf</p>
                        <p>slkdjsldkfjlskdfjlskdjflskdjf</p>
                    </div>
                </div>
                <div className='flex justify-between'>
                    <div className='text-xs'>12:40</div>
                    <div className='flex px-2 text-xs text-blue-600 -translate-x-2 -translate-y-2 bg-blue-400 rounded-l-full rounded-r-full'>👍 250.5k ❤ 892k 😅 962.6k</div>
                </div>
            </div>
            <div>
                <div className='flex justify-between p-3 pb-5 mt-5 bg-blue-300 rounded-bl-none rounded-xl'>
                    <PiPlayFill size={20} />
                    <div>02:40</div>
                </div>
                <div className='flex items-center justify-between'>
                    <div className='text-xs'>12:40</div>
                    <div className='flex px-2 text-xs text-blue-600 -translate-x-2 -translate-y-2 bg-blue-400 rounded-l-full rounded-r-full'>👍 250.5k ❤ 892k 😅 962.6k</div>
                </div>
            </div>
        </div>
    );
}

export default Chat;