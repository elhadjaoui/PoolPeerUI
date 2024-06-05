import { BiUser } from 'react-icons/bi';
import { BsFileEarmarkCode, BsCodeSlash, BsCheck2Circle, BsTerminal } from 'react-icons/bs';

import { BsBriefcase, BsClipboardData } from 'react-icons/bs';
import { useGlobalContext } from '../context/context';
import { motion } from 'framer-motion'
import { fadeIn } from '../variants'

const Nav = () => {

    const {
        page,
        setPage,
    } = useGlobalContext()


    return <nav className='fixed bottom-2 lg:bottom-8 w-full overflow-hidden z-50 '>
        <div className='container mx-auto '>
            {/* nav inner */}
            <div className=' w-full bg-black/20  h-[90px] backdrop-blur-2xl rounded-full max-w-[450px]
      mx-auto  px-5 flex justify-between  text-2xl text-white/75 '>
                <motion.div
                    variants={fadeIn('left', 0.4)}
                    initial='hidden'
                    whileInView={'show'}
                    viewport={{ once: true, amount: 0.7 }}
                    onClick={() => setPage(0)}
                    className={`flex  items-center  justify-center w-[60px]  cursor-pointer ${page == 0 && 'orange_page_gradient'}`}>
                    <div className='tooltip cursor-pointer' data-tip={`PoolPeer`}>

                        <BsFileEarmarkCode />
                    </div>
                </motion.div>
                <motion.div
                    variants={fadeIn('left', 0.4)}
                    initial='hidden'
                    whileInView={'show'}
                    viewport={{ once: true, amount: 0.7 }}
                    onClick={() => setPage(1)}

                    className={`flex  items-center justify-center w-[60px]  cursor-pointer ${page == 1 && 'orange_page_gradient'}`}>
                    <div className='tooltip cursor-pointer' data-tip={`Commando`}>
                        <BsTerminal />
                    </div>
                </motion.div>
                <motion.div
                    variants={fadeIn('right', 0.4)}
                    initial='hidden'
                    whileInView={'show'}
                    viewport={{ once: true, amount: 0.7 }}
                    onClick={() => setPage(2)}

                    className={`flex  items-center justify-center w-[60px]  cursor-pointer ${page == 2 && 'orange_page_gradient'}`}>
                    <div className='tooltip cursor-pointer' data-tip={`CodGenuis`}>
                        <BsCodeSlash />
                    </div>

                </motion.div>
                <motion.div
                    variants={fadeIn('right', 0.4)}
                    initial='hidden'
                    whileInView={'show'}
                    onClick={() => setPage(3)}
                    className={`flex  items-center justify-center w-[60px]  cursor-pointer ${page == 3 && 'orange_page_gradient'}`}>
                    <div className='tooltip cursor-pointer' data-tip={`ExamMaster`}>
                        <BsCheck2Circle />
                    </div>
                </motion.div>

            </div>


        </div>
    </nav>;
};

export default Nav;
