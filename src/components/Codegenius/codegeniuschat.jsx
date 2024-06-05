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
import { useEffect, useState } from 'react';
import { auth } from '../../config/firebase';
import { onAuthStateChanged } from "firebase/auth";

import { doc, getDoc } from "firebase/firestore";
import { db } from '../../config/firebase';
import CodeGenerator from './codegenerator'
import CleanCode from './cleancode'
import Line25 from './25line'

const max = 108;

function CodeGeniusChat() {

    const navigate = useNavigate();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState(0)

    let View = null;
    let form;
    if (activeTab === 0) {
        View = <CodeGenerator />
    }
    if (activeTab === 1) {
        View = <CleanCode />
    }
    if (activeTab === 2) {
        View = <Line25 />
    }

    const {
        userid,
        codeGeneratorLoading,
        cleanCodeLoading,
        Line25Loading,
        codeGeneratorChat,
        cleanCodeChat,
        line25Chat,
        CodeGeneratorAddMessage,
        CleanCodeAddMessage,
        Line25AddMessage,
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

    }, [user])


    if (activeTab === 0) {
        form = <MyForm AddMessage={CodeGeneratorAddMessage} loading={codeGeneratorLoading} id={activeTab} />
    }
    else if (activeTab === 1) {
        form = <MyForm AddMessage={CleanCodeAddMessage} loading={cleanCodeLoading} id={activeTab} />
    }
    else {
        form = <MyForm AddMessage={Line25AddMessage} loading={Line25Loading} id={activeTab} />
    }
    const downloadTxtFile = () => {
        const element = document.createElement("a");
        let file;
        if (activeTab === 0) {
            file = new Blob([JSON.stringify(codeGeneratorChat, ["message"], 2)], {
                type: "application/json"
            });
        }
        else if (activeTab === 1) {
            file = new Blob([JSON.stringify(cleanCodeChat, ["message"], 2)], {
                type: "application/json"
            });
        }
        else {
            file = new Blob([JSON.stringify(line25Chat, ["message"], 2)], {
                type: "application/json"
            });
        }

        element.href = URL.createObjectURL(file);
        if (activeTab === 0) {
            element.download = "CodeGeneratorChat.json";
        }
        else if (activeTab === 1) {
            element.download = "CleanCodeChat.json";
        }
        else {
            element.download = "Line25Chat.json";
        }
        document.body.appendChild(element);
        element.click();
    };


    return (
        <>
            {user ?
                <>
                    <div className="tabs ">
                        <div onClick={() => setActiveTab(0)} className={`tab  tab-lifted text-base  ${activeTab === 0 ? "tab-active text-amber-700 font-bold  " : "text-white"} `}>Code Generator</div>
                        <div onClick={() => setActiveTab(1)} className={`tab   tab-lifted  text-base ${activeTab === 1 ? "tab-active text-amber-700 font-bold " : "text-white"} `}>Clean Your Code</div>
                        <div onClick={() => setActiveTab(2)} className={`tab   tab-lifted  text-base ${activeTab === 2 ? "tab-active text-amber-700 font-bold " : "text-white"} `}>25 Lines</div>
                    </div>
                    <div className="bg-black/80 backdrop-blur-2xl h-[650px]  shadow-gray-800 shadow-inner
                                flex flex-col  items-center  justify-between  lg:flex-row  rounded-lg  w-full">
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
                            {View}
                            <motion.div
                                variants={fadeIn('up', 0.2)}
                                initial='hidden'
                                whileInView={'show'}
                                // viewport={{ once: false, amount: 0.4 }}
                                className=" flex h-[90px] w-full  mb-3" >
                                {form}
                            </motion.div>
                        </div>
                    </div>
                </>
                : navigate2home()}
        </>
    )
}

const MyForm = (prop) => {

    const {
        input,
        HandleInput,
    } = useGlobalContext()

    return (
        <form className=" w-full relative " onSubmit={prop.AddMessage}>
            <textarea
                disabled={prop.loading}
                placeholder={
                    prop.loading
                        ? 'Waiting for response...'
                        : 
                        prop.id === 0 ?
                        'Ask your question here...' 
                         :
                        'Past your code here...' 
                }
                onChange={HandleInput}
                value={input}
                required
                type="text"
                className={`
                        ${prop.loading ? 'cursor-not-allowed' : 'cursor-text'}
                        w-full h-5/6 bg-black/30 outline-dashed
                        outline-amber-700 outline-1 pl-4 pr-16 text-white  font-satoshi font-semibold rounded-lg`}
            />

            <button
                type="submit" className="  absolute h-14 w-14  flex items-center justify-center
                        right-1 top-1 rounded-full">
                {
                    prop.loading ?
                        <img onClick={(e) => { e.preventDefault() }} src={loader} className='w-7 h-7 object-contain' />
                        :
                        <AiOutlineSend className='w-7 h-7 text-white/70' />
                }

            </button>
        </form>
    )
}

export default CodeGeniusChat