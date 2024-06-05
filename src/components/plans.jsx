/* eslint-disable no-unused-vars */




import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../config/firebase';
import { onAuthStateChanged } from "firebase/auth";
import { useGlobalContext } from '../context/context';
import { plans } from '../config/plans_db';
import { motion } from 'framer-motion'
import { fadeIn } from '../variants'
import Pay from './modals/pay';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../config/firebase';



const paragraph = `Hey there, smarty-pants Poolers! Get ready to do the happy dance because we've got some seriously hilarious pricing plans just for you. Our student-exclusive deals will make your wallet giggle with joy while giving you access to top-notch resources. Don't be a party pooper, Subscribe now and unleash your inner Einstein! Trust us, learning has never been this fun. Let's rock this school month together! 🎉. Subscribe now and let the laughter (and learning) begin!`;

function Plans() {
    const [status, setStatus] = useState('request');
    const [price, setPrice] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();

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

    const {
        user,
        setHideWarningToast,
        setAmount,
        userid,
        setErrorFetchingData,
        setShowPay,
    } = useGlobalContext()

    useEffect(() => {
        const getUserData = async () => {
            if (!userid  && !user) return
            const docRef = doc(db, "subscriptions", userid);
            const docSnap = await getDoc(docRef).catch((err) => {
                setErrorFetchingData(true)
                setTimeout(() => {
                    setErrorFetchingData(false)
                }, 4000);
            });

            if (docSnap.exists()) {
                const data = docSnap.data()
                setStatus(data.status)
                setPrice(data.amount)
            } else {
                // doc.data() will be undefined in this case
            }
        }

        getUserData()

    }, [])


    return (
        <>
            {
                user ?
                    <div className="min-h-[85vh] lg:min-h-[78vh] w-full flex   ">
                        <Pay />

                        <div className='container  flex flex-col justify-evenly  '>
                            <motion.p
                                variants={fadeIn('right', 0.3)}
                                initial='hidden'
                                whileInView={'show'}
                                viewport={{ once: true, amount: 0.7 }}
                                className='font-satoshi text-white font-bold '>{paragraph}</motion.p>
                            <div className='flex  flex-col lg:flex-row gap-y-8 items-center mt-3 lg:mt-0  lg:gap-x-12'>
                                {plans.map((plan, index) => {

                                    return (
                                        <motion.div
                                            variants={fadeIn('right', plan.fadein)}
                                            initial='hidden'
                                            whileInView={'show'}
                                            viewport={{ once: true, amount: 0.7 }}
                                            key={index} className="card max-w-xs    h-full max-h-[500px] outline-dashed
                                outline-amber-700 outline-1 w-96 bg-black/80 backdrop-blur-2xl text-primary-content">
                                            <div className="card-body">
                                                <h2 className=" card-title font-satoshi font-normal">{plan.name}</h2>
                                                <code className=' font-extrabold mb-2 text-2xl text-amber-700'>{plan.price} MAD</code>
                                                {/* <strong>{plan.query} Queries</strong> */}
                                                {plan.features.map((feature, index) => {
                                                    return (
                                                        <ul className='  h-full list-disc list-inside' key={index}>
                                                            <li className='text-sm font-satoshi font-bold'>{feature}</li>
                                                        </ul>
                                                    )
                                                }
                                                )}
                                                <div className="card-actions mt-4 justify-end">
                                                    {plan.id === 0 ? <button className=" deactivated_btn cursor-auto">Free 20 Queries</button> :

                                                        status === 'pending' && price === plan.price ?
                                                        <button className="orange_gradient_btn text-sm">Waiting Confirmation..</button>
                                                            :
                                                            <button onClick={() => {
                                                                setAmount(plan.price)
                                                                setShowPay(true)
                                                            }} className="orange_gradient_btn cursor-pointer">Add  {plan.query} Queries</button>
                                                    }

                                                </div>
                                            </div>
                                        </motion.div>
                                    )
                                })}
                            </div>

                        </div>

                    </div>
                    : navigate2home()
            }
        </>
    )
}

export default Plans