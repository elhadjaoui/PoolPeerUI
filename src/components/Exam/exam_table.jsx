/* eslint-disable react/no-unescaped-entities */


import React from 'react'
import { levels } from '../../config/exam_db'
import { useGlobalContext } from '../../context/context'
import { motion } from 'framer-motion'
import { fadeIn } from '../../variants'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../config/firebase';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

const max = 308;

function ExamTable() {

    const navigate = useNavigate();
    const location = useLocation();


    const navigate2home = () => {
        if (location.pathname === window.location.pathname) {
            setHideWarningToast(true)
            setTimeout(() => {
                navigate('/', { replace: true });
            }, 10);
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

    const {
        setShowExercise,
        setExerciseContent,
        setExerciseName,
        userid,
        user,
        setHideWarningToast,

    } = useGlobalContext()
    return (
        <>
            {user ?
                <div className="bg-black/80 backdrop-blur-2xl h-[650px]  shadow-gray-800 shadow-inner
                     rounded-lg  w-full">
                    <div className=' rounded-lg h-full max-h-[650px] w-full overflow-auto'>

                        {
                            levels.map((item, index) => {
                                return (
                                    <motion.div
                                        variants={fadeIn('right', 0.1 * index)}
                                        initial='hidden'
                                        whileInView={'show'}
                                        viewport={{ once: true, amount: 0.7 }}
                                        key={index} className="collapse bg-base-200 w-full  rounded-lg max-h-[650px] mb-2">
                                        <input type="checkbox" />
                                        <div className="collapse-title font-bold font-satoshi  text-center">
                                            {item.name}
                                        </div>
                                        <div className="collapse-content">
                                            <div className="overflow-x-auto  h-full w-full">
                                                <table className="table table-xs w-full">
                                                    <thead className='table-pin-rows'>
                                                        <tr  >
                                                            <th className='bg-orange-700/10 '></th>
                                                            <th className='bg-orange-700/10 '>Name</th>
                                                            <th className='bg-orange-700/10 '>Content</th>
                                                            <th className='bg-orange-700/10 '>Level</th>
                                                            {/* <th className='bg-orange-700/10 '>Probability</th>  */}
                                                            {/* /* Based on the complexity and specificity of this exercise* */}
                                                            <th className='bg-orange-700/10 '>Assistant</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody  >
                                                        {item.exercises.map((item, index) => {
                                                            return (
                                                                <motion.tr
                                                                    variants={fadeIn('right', 0.1 * index)}
                                                                    initial='hidden'
                                                                    whileInView={'show'}
                                                                    viewport={{ once: true, amount: 0.7 }}
                                                                    key={index} className='font-satoshi font-bold '>
                                                                    <th>{item.id + 1}</th>
                                                                    <td >{item.name}</td>
                                                                    <td><button onClick={() => {
                                                                        setShowExercise(true);
                                                                        setExerciseContent(item.content);
                                                                        setExerciseName(item.name);
                                                                    }
                                                                    } className='orange_gradient_btn'>View</button> </td>
                                                                    <td>{item.level}</td>
                                                                    {/* <td>{item.probability}</td> */}
                                                                    <td><Link to={'/examchat'} state={{ exercise: item.content }} className='orange_gradient_btn'>Let's Talk</Link></td>
                                                                </motion.tr>
                                                            )
                                                        }
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </motion.div>
                                )
                            })}

                    </div>


                </div>
                : navigate2home()}
        </>
    )
}

export default ExamTable