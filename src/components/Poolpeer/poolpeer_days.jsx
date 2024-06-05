/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { Link } from 'react-router-dom'
import { days } from '../../config/days_db'
import { useGlobalContext } from '../../context/context'
import { motion } from 'framer-motion'
import { fadeIn } from '../../variants'
import { useNavigate, useLocation } from 'react-router-dom';


function PoolPeerDays() {
    const navigate = useNavigate();
    const location = useLocation();

    const {
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

    return (
        <>
            {user ?
                <div className="bg-black/80 backdrop-blur-2xl h-[650px]  shadow-gray-800 shadow-inner
                     rounded-lg w-full">
                    <div className="overflow-x-auto  h-full  w-full">
                        <table className="table   w-full">
                            <thead className='table-pin-rows'>
                                <tr  >
                                    <th className='bg-orange-700/10  text-center '></th>
                                    <th className='bg-orange-700/10 text-center'>Name</th>
                                    <th className='bg-orange-700/10  text-center '>Number of Exercises</th>
                                    <th className='bg-orange-700/10 text-center'>Assistant</th>
                                </tr>
                            </thead>
                            <tbody  >
                                {days.map((item, index) => {
                                    return (
                                        <motion.tr
                                            variants={fadeIn('right', index / 10)}
                                            initial='hidden'
                                            whileInView={'show'}
                                            viewport={{ once: true, amount: 0.7 }}
                                            key={index} className='font-satoshi font-bold'>
                                            <th className=' text-center'>{item.id + 1}</th>
                                            <td className=' text-center'>{item.name}</td>
                                            <td className=' text-center'>{item.number}</td>
                                            <td className=' text-center'><Link to={'/poolpeerchat'} state={{ id: item.id }} className='orange_gradient_btn'>Let's Talk</Link></td>
                                        </motion.tr>
                                    )
                                }
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                : navigate2home()}
        </>

    )
}

export default PoolPeerDays