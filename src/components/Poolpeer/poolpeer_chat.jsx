/* eslint-disable no-unused-vars */

import { AiOutlineSend, AiOutlineArrowDown } from 'react-icons/ai'
import { IoIosArrowBack } from 'react-icons/io'
import { BiHelpCircle } from 'react-icons/bi'
import { motion } from 'framer-motion'
import { fadeIn } from '../../variants'
import ScrollToBottom from 'react-scroll-to-bottom';
import { useGlobalContext } from '../../context/context';
import Chat_Bubble from '../chat_bubble';
import { loader } from '../../assets'
import { useNavigate, useLocation } from 'react-router-dom';
import Poolpeerhelp_Modal from '../modals/poolpeerhelp_modal';
import { useEffect } from 'react';
import { auth } from '../../config/firebase';
import { onAuthStateChanged } from "firebase/auth";


function PollPeerCaht() {

    const navigate = useNavigate();
    const location = useLocation();
    let id = 0;

    try {
         id = location.state.id;
    }
    catch (err) {
        // navigate('/')
    }


    const {
        poolpeerChat,
        PoolPeerAddMessage,
        input,
        HandleInput,
        poolpeerloading,
        setShowhelp,
        setUser,
        user,
        setHideWarningToast,
    } = useGlobalContext()

    const navigate2home = () => {
        if (location.pathname === window.location.pathname) {
            setHideWarningToast(true)
            setTimeout(() => {
                navigate('/', { replace: true });
            }, 20);
            setTimeout(() => {
                setHideWarningToast(false)
            }, 4000);
        }
    }



    const downloadTxtFile = () => {
        const element = document.createElement("a");
        const file = new Blob([JSON.stringify(poolpeerChat[id].messages, ["message"], 2)], {
            type: "application/json"
        });
        element.href = URL.createObjectURL(file);
        element.download = "chat.json";
        document.body.appendChild(element);
        element.click();
    };

    return (
        <>
        {user  ? 
            <div className="bg-black/80 backdrop-blur-2xl h-[650px]  shadow-gray-800 shadow-inner
    flex flex-col  items-center  justify-between  lg:flex-row  rounded-lg  w-full">
                <Poolpeerhelp_Modal />
                <div className="flex lg:flex-col   items-center  w-full lg:h-full px-4 py-4 lg:max-w-[80px] justify-evenly">

                    <div className='tooltip cursor-pointer' data-tip='help'>
                        <BiHelpCircle onClick={() => { setShowhelp(true) }} className='w-5 h-5 cursor-pointer text-white/70' />
                    </div>
                    <div className='tooltip cursor-pointer' data-tip='download chat'>
                        <AiOutlineArrowDown onClick={downloadTxtFile} className='w-5 h-5 cursor-pointer text-white/70' />
                    </div>
                    <div className='tooltip cursor-pointer' data-tip='back'>
                        <button onClick={() => navigate(-1)}>
                            <IoIosArrowBack className='w-5 h-5 cursor-pointer text-white/70' />
                        </button>
                    </div>
                </div>
                <div className="flex flex-col justify-around   w-full space-y-2 px-4 h-[620px]">
                    <ScrollToBottom
                        className=" h-full  w-full max-h-[550px] overflow-auto scrollbar-hide p-4  mt-3 outline-dashed
                    outline-amber-700 outline-1 rounded-lg ">
                        {
                            poolpeerChat[id].messages.map((item, index) => (
                                <Chat_Bubble key={index} from={item.from} message={item.message} />))
                        }
                    </ScrollToBottom>
                    <motion.div
                        variants={fadeIn('up', 0.2)}
                        initial='hidden'
                        whileInView={'show'}
                        viewport={{ once: true, amount: 0.4 }}
                        className=" flex h-[90px] w-full  mb-3" >
                        <form className=" w-full relative " onSubmit={(e)=>{
                                e.preventDefault()
                                PoolPeerAddMessage(id)
                        }}>
                            <input
                                disabled={poolpeerloading}
                                // rows={1}

                                maxLength={512}
                                placeholder={
                                    poolpeerloading
                                        ? 'Waiting for response...'
                                        : 'Ask your question here...'
                                }
                                onChange={HandleInput}
                                value={input}
                                required
                                type="text"
                                className={`
                            ${poolpeerloading ? 'cursor-not-allowed' : 'cursor-text'}
                            w-full h-5/6 bg-black/30 outline-dashed
                         outline-amber-700 outline-1 pl-4 pr-16 text-white  font-satoshi font-semibold rounded-lg`} />

                            <button
                                type="submit" className="  absolute h-14 w-14  flex items-center justify-center
                            right-1 top-1 rounded-full">
                                {
                                    poolpeerloading ?
                                        <img onClick={(e) => { e.preventDefault() }} src={loader} className='w-7 h-7 object-contain' />
                                        :
                                        <AiOutlineSend className='w-7 h-7 text-white/70' />
                                }

                            </button>
                        </form>
                    </motion.div>
                </div>
                {/* <div className="flex flex-col  items-center justify-center px-6">
                asdfadf
            </div> */}
            </div>
            : navigate2home()}
        </>
    )
}

export default PollPeerCaht