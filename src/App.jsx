/* eslint-disable no-unused-vars */
import './App.css'
import Nav from './components/nav'
import Header from './components/header'
import { useGlobalContext } from './context/context'
import { Route, Routes } from 'react-router-dom'
import PoolPeerChat from './components/Poolpeer/poolpeer_chat'
import { useEffect } from 'react'
import { auth } from './config/firebase'
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";

import { ToastContainer } from 'react-toastify';
import Plans from './components/plans'
import Admin from './components/Admin/admin'
import CommandChat from './components/Cammando/commandchat'
import CodeGeniusChat from './components/Codegenius/codegeniuschat'
import ExamTable from './components/Exam/exam_table'
import NotFound from './components/NotFound'
import PoolPeerDays from './components/Poolpeer/poolpeer_days'
import ExamChat from './components/Exam/exam_chat'




function App() {
  const {
    View,
    
  } = useGlobalContext()

  
  return (
    <main>
      <ToastContainer />
      <div className="main">
        <div className="gradient" />
      </div>
      <div className="app">
        <Header />
        <Routes>
          <Route path='/' element={<>{View}  <Nav /></>} />
          <Route path='/poolpeer' element={<PoolPeerDays />} />
          <Route path='/poolpeerchat' element={<PoolPeerChat />} />
          <Route path='/commando' element={<CommandChat />} />
          <Route path='/codegenius' element={<CodeGeniusChat />} />
          <Route path='/upgrade' element={<Plans />} />
          <Route path='/exam' element={<ExamTable />} />
          <Route path='/examchat' element={<ExamChat />} />
          <Route path='/65884ecb4b063cdb05dc834dab9a576b7aa22f512678df9e24ec560be2330fc1' element={<Admin />} />
          <Route path='/*' element={<NotFound />} />
          {/* <Route path="*" element={<PageNotFound />} />  */}
        </Routes>
        {/* {View}
        <Nav /> */}

      </div>

    </main>
  )
}

export default App
