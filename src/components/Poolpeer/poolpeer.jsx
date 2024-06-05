/* eslint-disable no-unused-vars */



import ReactPlayer from 'react-player'
import { TypeAnimation } from 'react-type-animation'
import { motion } from 'framer-motion'
import { fadeIn } from '../../variants'
import { CiPlay1, CiPause1 } from 'react-icons/ci'
import { useGlobalContext } from '../../context/context';
import { Link } from 'react-router-dom'
import { useEffect } from 'react'




function PoolPeer() {


    const {
        play,
        setPlay,
        user,
    } = useGlobalContext()

    return (
        <div className=' min-h-[85vh] lg:min-h-[78vh] flex items-center'>
            <div className='container mx-auto '>
                <div className='flex flex-col lg:flex-row gap-y-8 items-center lg:gap-x-12'>

                    {/* Text */}

                    <div className=' flex-1 text-center font-satoshi lg:text-left'>

                        {/* <h1 className=' font-satoshi text-white'>
                            Pool <span>Peer</span>
                        </h1> */}
                        <motion.div
                            variants={fadeIn('up', 0.3)}
                            initial='hidden'
                            whileInView={'show'}
                            viewport={{ once: true, amount: 0.7 }}
                            className=' mb-4 text-[36px] lg:text-[60px] max-w-lg font-satoshi font-semibold
                         uppercase  leading-[1]'>
                            <p className=' text-white mr-4'>I am  </p>
                            <TypeAnimation
                                cursor={true}
                                speed={20}
                                sequence={[
                                    'PoolPeer',
                                    2000,
                                    'Your Peer',
                                    2000,
                                    'Your Assistant',
                                    2000,
                                ]}
                                className='orange_gradient '
                                wrapper='p'
                                repeat={Infinity}
                            />
                        </motion.div>
                        <motion.p
                            variants={fadeIn('up', 0.4)}
                            initial='hidden'
                            whileInView={'show'}
                            viewport={{ once: true, amount: 0.7 }}
                            className=' font-satoshi text-white max-w-lg mx-auto  lg:mx-0 mb-8'>
                               <strong>PoolPeer</strong>  is  designed to interact with a collection of 42 pool Documents. Users can ask questions and have conversations about the information contained in these Documents. My purpose is to provide accurate and helpful responses based on the content within those documents.
                        </motion.p>
                        <motion.div
                            variants={fadeIn('up', 0.5)}
                            initial='hidden'
                            whileInView={'show'}
                            viewport={{ once: true, amount: 0.7 }}
                            className='flex  max-w-max gap-x-8 items-center mb-12 mx-auto lg:mx-0'>
                            {
                                user ?
                                    <Link to={'poolpeer'} className='orange_gradient_btn '>
                                        Get Started
                                    </Link>
                                    :
                                    <div className='tooltip cursor-pointer' data-tip='You must log in before proceeding.'>

                                        <button className='cursor-not-allowed'>Get Started</button>
                                    </div>

                            }
                            <a href="https://youtu.be/TpIHyd0lBgU"  target={'_blank'} rel="noreferrer"  className='orange_gradient font-satoshi'>
                                How it works
                            </a>
                        </motion.div>
                    </div>

                    {/* Video */}
                    <motion.div
                        variants={fadeIn('down', 0.6)}
                        initial='hidden'
                        whileInView={'show'}
                        viewport={{ once: true, amount: 0.7 }}
                        onClick={() => { setPlay(!play) }}

                        className='relative w-full max-w-[400px]  cursor-pointer'>
                        <div
                            className='  w-[350px] h-[380px] max-w-[400px]  flex overflow-hidden  
                             lg:max-w-[500px] mx-auto object-fill rounded-full  outline-dashed outline-2 outline-amber-700  '>
                            <ReactPlayer
                                width='800px'
                                height='400px'
                                playing={play}
                                style={{ width: '100%', height: 'auto', backgroundColor: 'rgba(234,236,238,255)', scale: '1.2' }}
                                // playIcon={<button className='bg-white'>Play</button>}
                                // light={true}
                                // loop={true}
                                // wrapper='div'
                                // controls='true'
                                url='arab.mp4'
                                onEnded={() => { setPlay(false) }}
                            />
                            {/* Play|Pause */}

                            <div className={` h-8 w-8   absolute  bg-black/20 backdrop-blur-2xl
                         lg:top-8  top-5 right-16 outline-dashed outline-2 outline-amber-700 rounded-full cursor-pointer`}>
                                {play
                                    ?
                                    <CiPause1 className=' text-white w-full h-full p-1' />
                                    :
                                    <CiPlay1 className=' text-white w-full h-full p-1' />
                                }
                            </div>
                        </div>
                    </motion.div>
                </div>

            </div>
        </div>
    )
}


export default PoolPeer