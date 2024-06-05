/* eslint-disable no-unused-vars */
import { logo } from '../assets'
import { useGlobalContext } from '../context/context'
import { RiArrowDropDownLine } from 'react-icons/ri'
import Disclaimer from './modals/disclaimer_modal'
import { loader } from '../assets'
import { error_toast, login_toast,copied_toast, logout_toast, warning_toast, error_fetching_data_toast, error_maximum_reached_toast,upload_error_toast } from './alerts/toasts'
import { useEffect } from 'react'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../config/firebase';
import { Link } from 'react-router-dom'
import Exercise from './modals/exercise'


const group = "https://chat.whatsapp.com/Dy0FvnkGKUHHkL0aAHrBuh"
const discord = 'https://discord.gg/GanHJWQNh'

function Header() {
  const {
    login,
    user,
    setUser,
    setShowDisclaimer,
    Logout,
    loginloading,
    hideWarningToast,
    hideLoginToast,
    hideLogoutToast,
    errorLogin,
    errorFetchingData,
    maximumReached,
    uploadErrorToast,
    textCopy,
    uploaded
  } = useGlobalContext()

  useEffect(() => {
    onAuthStateChanged(auth, (currentuser) => {
      if (currentuser) {
        // User is signed in.;
      } else {
        setUser(null)
      }
    });
  }
  )

  return (
    <header className=" w-full flex justify-center items-center ">
      {/* WARNING TOAST */}
      {hideWarningToast && warning_toast()}
      {/* LOGIN TOAST */}
      {hideLoginToast && login_toast("Hello, friend! We've been waiting for you. Enjoy your stay.")}
      {/* LOGOUT TOAST */}
      {hideLogoutToast && logout_toast("Goodbye, friend! We'll be here to welcome you back anytime.")}
      {/* ERROR LOGIN TOAST */}
      {errorLogin && error_toast()}
      {/* ERROR FETCHING DATA TOAST */}
      {errorFetchingData && error_fetching_data_toast()}
      {/* ERROR MAXIMUM REACHED TOAST */}
      {maximumReached && error_maximum_reached_toast()}
      {/* TEXT COPIED TOAST */}
      {textCopy && copied_toast("Copied to clipboard!")}
      {/* Uploaded TOAST */}
      {uploaded && copied_toast("We have received your payment! Once it's confirmed, you will receive your queries.")}
       {/* Uploaded Error TOAST */}
       {uploadErrorToast && upload_error_toast()}
      
      

      <Disclaimer />
      <Exercise/>
      <nav className=" flex justify-between items-center  w-full mb-10 pt-3">
        <Link to={'/'}>
          <img src={logo} alt="logo" className="  w-36 object-contain" />
        </Link>
        {user
          ?
          <>
            <div className="dropdown dropdown-end">
              <label tabIndex={0}>
                <div className={`flex items-center  ${loginloading ? " loading_login_btn" : "orange_gradient_btn"}`}>
                  <button type='button' disabled={loginloading} className=" truncate">{loginloading ?
                    "See you soon..." : user.name}
                  </button>
                  {loginloading ? <img src={loader} className='w-7 h-7  object-contain' /> : <RiArrowDropDownLine className=" w-7 h-7 cursor-pointer" />}
                </div>
              </label>
              <ul tabIndex={0} className="mt-3 p-2   shadow   dropdown-content bg-base-100 rounded-box w-52">
                <li >
                  <div className='tooltip tooltip-left w-full cursor-pointer' data-tip={`Queries (${user.queries}/ ${user.maxqueries})`}>
                    <input type="range" readOnly={true} min="0" max={user.maxqueries} value={user.queries} className="range range-xs range-warning p-2" />
                  </div>
                </li>
                <li><p className=' w-full py-1 px-2  rounded-lg cursor-pointer hover:font-bold hover:bg-amber-700  font-satoshi'><Link to={'upgrade'}>Upgrade Plan</Link></p></li>
                <li><p className=' w-full py-1 px-2  rounded-lg cursor-pointer hover:font-bold hover:bg-amber-700  font-satoshi' onClick={() => { setShowDisclaimer(true) }} >Disclaimer</p></li>
                <li><p className=' w-full py-1 px-2  rounded-lg cursor-pointer hover:font-bold hover:bg-amber-700  font-satoshi'><a href={discord} target='_blank'  rel="noreferrer">Discord</a></p></li>
                <li><p className=' w-full py-1 px-2  rounded-lg cursor-pointer hover:font-bold hover:bg-amber-700  font-satoshi'><a href={group} target='_blank'  rel="noreferrer">Whatsapp</a></p></li>
                <li><p className=' w-full py-1 px-2 rounded-lg cursor-pointer hover:font-bold hover:bg-amber-700  font-satoshi' onClick={Logout}>Logout</p></li>
              </ul>
            </div>
          </>
          // <button type='button' onClick={login} className="orange_gradient_btn">{user.name}</button>
          :
          <div className={`flex items-center  ${loginloading ? " loading_login_btn" : "orange_gradient_btn"}`}>
            <button type='button' disabled={loginloading} onClick={login} className={`truncate  `}> {loginloading ? "Connecting..." : "Connect With Google"}</button>
            {/* {loginloading ? <img src={loader} className='w-7 h-7  object-contain' /> : ""} */}
          </div>
        }
      </nav>

    </header>
  )
}

export default Header