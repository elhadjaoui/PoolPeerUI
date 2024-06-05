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
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../config/firebase';
import { useEffect } from 'react';
import { auth } from '../../config/firebase';
import { onAuthStateChanged } from "firebase/auth";


const max = 308;

function ExamChat() {

    const navigate = useNavigate();
    const location = useLocation();
    var exercise = null;
    try {
         exercise = location.state.exercise;
    }
    catch (err) {
        // navigate('/')
    }


    const {
        examLoading,
        examChat,
        setExamChat,
        ExamAddMessage,
        input,
        HandleInput,
        userid,
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

    useEffect(() => {
        const getUserData = async () => {
            if (!userid) return
            const docRef = doc(db, "users", userid);
            const docSnap = await getDoc(docRef).catch((err) => {
                navigate2home()
            });

            if (docSnap.exists()) {
                // setUser(docSnap.data())
                if (docSnap.data().maxqueries <= max) {
                    navigate2home()
                }
            } else {
                // docSnap.data() will be undefined in this case
            }
        }

        getUserData()

    }, [])

    useEffect(() => {
        setExamChat([
            {
                message: " <h1> Hey there! I'm your friend <strong  > ExamMaster. </strong> </h1>",
                from: "ai",
            },
            {
                message: " <h1> I'm here to assist you in preparing for your exam. I can help you with any questions you may have regarding this exercise. </h1>",
                from: "ai",
            },
            {
                message: " <h1> Here are some examples to help you get started: </h1>",
                from: "ai",
            },
            {
                message: `-<strong  >Could you assist me in resolving this exercise? </strong>
                    <p>-<strong  > Can you provide a step-by-step breakdown of the exercise? </strong> </p>
                    <p>-<strong  > Could you provide me with the probability percentage (%) of this exercise being included in the exam? </strong> </p>
                    <p>-<strong  > ساعدني لحل هذا التمرين</strong> </p>
                    `,
                from: "ai",
            },
        ])
    }, [])



    const downloadTxtFile = () => {
        const element = document.createElement("a");
        const file = new Blob([JSON.stringify(examChat, ["message"], 2)], {
            type: "application/json"
        });
        element.href = URL.createObjectURL(file);
        element.download = "chat.json";
        document.body.appendChild(element);
        element.click();
    };

    return (
        <>
            {user ?
                <div className="bg-black/80 backdrop-blur-2xl h-[650px]  shadow-gray-800 shadow-inner
    flex flex-col  items-center  justify-between  lg:flex-row  rounded-lg  w-full">
                    <Poolpeerhelp_Modal />
                    <div className="flex lg:flex-col   items-center  w-full lg:h-full px-4 py-4 lg:max-w-[80px] justify-evenly">

                        {/* <div className='tooltip cursor-pointer' data-tip='help'>
                        <BiHelpCircle onClick={() => { setShowhelp(true) }} className='w-5 h-5 cursor-pointer text-white/70' />
                    </div> */}
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
                                examChat.map((item, index) => (
                                    <Chat_Bubble key={index} from={item.from} message={item.message} />))
                            }
                        </ScrollToBottom>
                        <motion.div
                            variants={fadeIn('up', 0.2)}
                            initial='hidden'
                            whileInView={'show'}
                            viewport={{ once: true, amount: 0.4 }}
                            className=" flex h-[90px] w-full  mb-3" >
                            <form className=" w-full relative " onSubmit={(e) => {
                                e.preventDefault()
                                ExamAddMessage(exercise)
                            }}>
                                <input
                                    disabled={examLoading}
                                    // rows={1}

                                    maxLength={512}
                                    placeholder={
                                        examLoading
                                            ? 'Waiting for response...'
                                            : 'Ask your question here...'
                                    }
                                    onChange={HandleInput}
                                    value={input}
                                    required
                                    type="text"
                                    className={`
                            ${examLoading ? 'cursor-not-allowed' : 'cursor-text'}
                            w-full h-5/6 bg-black/30 outline-dashed
                         outline-amber-700 outline-1 pl-4 pr-16 text-white  font-satoshi font-semibold rounded-lg`} />

                                <button
                                    type="submit" className="  absolute h-14 w-14  flex items-center justify-center
                            right-1 top-1 rounded-full">
                                    {
                                        examLoading ?
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

export default ExamChat