/* eslint-disable no-unused-vars */
import { useEffect } from 'react'
import { useState } from 'react'
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from '../../config/firebase';
import { motion } from 'framer-motion'
import { fadeIn } from '../../variants'
import { useGlobalContext } from '../../context/context';
import { doc, updateDoc, increment, addDoc, getDocs } from "firebase/firestore";
import { async } from '@firebase/util';




function Admin() {
  const [activeTab, setActiveTab] = useState(0)

  let View = null
  if (activeTab === 0) {
    View = <Pending />
  }
  if (activeTab === 1) {
    View = <Success />
  }
  if (activeTab === 2) {
    View = <Reject />
  }
  if (activeTab === 3) {
    View = <AllUsers />
  }


  return (
    <div className=' min-h-[85vh] lg:min-h-[78vh]  w-full flex flex-col items-center space-y-7'>
      <div className="tabs ">
        <div onClick={() => setActiveTab(0)} className={`tab  tab-lifted text-base  ${activeTab === 0 ? "tab-active text-amber-700 font-bold  " : "text-white"} `}>Pending</div>
        <div onClick={() => setActiveTab(1)} className={`tab   tab-lifted  text-base ${activeTab === 1 ? "tab-active text-amber-700 font-bold " : "text-white"} `}>Success</div>
        <div onClick={() => setActiveTab(2)} className={`tab  tab-lifted text-base  ${activeTab === 2 ? "tab-active text-amber-700 font-bold  " : "text-white"} `}>Reject</div>
        <div onClick={() => setActiveTab(3)} className={`tab   tab-lifted  text-base ${activeTab === 3 ? "tab-active text-amber-700 font-bold " : "text-white"} `}>All Users</div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 w-full gap-4 shadow-md shadow-slate-700 rounded-md drop  p-4  h-[600px] overflow-auto lg:grid-cols-4'>
        {View}
      </div>

    </div>
  )
}

const Pending = () => {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const q = query(collection(db, "subscriptions"), where("status", "==", 'pending'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setData([])
      querySnapshot.forEach((doc) => {
        setData(prev => [...prev, doc.data()]);
      });
      setLoading(false)
    });
    return () => {
      unsubscribe(); // Stop listening for updates whenever the component unmounts
    };
  }, [])
  return (
    <>
      {
        data.length > 0 ? data.map((item, index) => {
          return (
            <Card key={index} item={item} />
          )
        })
          :
          loading ? <div className='col-span-2 font-satoshi '>Fetching...</div> :
            <div className=' col-span-2 font-satoshi '>
              No pending subscriptions
            </div>
      }
    </>
  )
}
const Success = () => {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)


  useEffect(() => {

    setLoading(true)
    async function getSuccess() {
      const querySnapshot = await getDocs(collection(db, "success"));
      setData([])
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        setData((prev) => [...prev, doc.data()])
      });
      setLoading(false)
    }
    getSuccess()

  }, [])

  return (
    <>
      {
        data.length > 0 ? data.map((item, index) => {
          return (
            <Card key={index} item={item} />
          )
        })
          :
          loading ? <div className='col-span-2 font-satoshi '>Fetching...</div> :
            <div className=' col-span-2 font-satoshi '>
              No success subscriptions
            </div>
      }
    </>
  )
}

const Reject = () => {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {

    setLoading(true)
    async function getSuccess() {
      const querySnapshot = await getDocs(collection(db, "reject"));
      setData([])
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        setData((prev) => [...prev, doc.data()])
      });
      setLoading(false)
    }
    getSuccess()

  }, [])

  return (
    <>
      {
        data.length > 0 ? data.map((item, index) => {
          return (
            <Card key={index} item={item} />
          )
        })
          :
          loading ? <div className='col-span-2 font-satoshi '>Fetching...</div> :
            <div className=' col-span-2 font-satoshi '>
              no reject subscriptions
            </div>
      }
    </>

  )
}

const AllUsers = () => {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)


  useEffect(() => {

    setLoading(true)
    async function getSuccess() {
      const querySnapshot = await getDocs(collection(db, "users"));
      setData([])
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        setData((prev) => [...prev, doc.data()])
      });
      setLoading(false)
    }
    getSuccess()

  }, [])

  return (
    <>
      <p className=' font-satoshi font-bold'>{data.length}</p>
      {
        data.length > 0 ? data.map((item, index) => {
          return (
            // <div key={index} className='grid grid-cols-1 md:grid-cols-2   p-4  h-[600px] overflow-auto lg:grid-cols-4'>
              <div
               key={index}
                className="card max-w-[250px]   max-h-[280px]  outline-dashed
                   outline-amber-700 outline-1 w-96 bg-black/80  text-primary-content">
                <div className="card-body ">
                  <code className=' font-extrabold mb-2 text-2xl text-amber-700'>{item.name}</code>
                  <p className="text-sm card-title font-satoshi truncate font-normal">{item.email}</p>
                  <p className="text-sm card-title font-satoshi truncate font-normal">maxqueries : {item.maxqueries}</p>
                  <p className="text-sm card-title font-satoshi truncate font-normal">queries : {item.queries}</p>
                  <p className="text-sm card-title font-satoshi font-normal truncate">{item.uid}</p>
                </div>
              </div>
            // </div>
          )
        })
          :
          <div className='flex items-center  justify-center font-satoshi '>
            No Users
          </div>
      }
    </>
  )
}

const Card = (prop) => {
  const [loading, setLoading] = useState(false)

  const {
    user
  } = useGlobalContext()
  let query = 0
  if (prop.item.amount === 10) {
    query = 100
  }
  if (prop.item.amount === 20) {
    query = 300
  }
  if (prop.item.amount === 39) {
    query = 500
  }

  const Verify = async () => {
    setLoading(true)
    await updateDoc(doc(db, "users", prop.item.uid), {
      maxqueries: increment(query)
    }).then(async () => {
      await addDoc(collection(db, "success"), {
        name: prop.item.name,
        amount: prop.item.amount,
        date: prop.item.date,
        uid: prop.item.uid,
        screen: prop.item.screen,
      }).then(async () => {
        await updateDoc(doc(db, "subscriptions", prop.item.uid), {
          status: 'success'
        })
        setLoading(false)
      });
    }).catch((error) => {
      console.error("Error updating document: ", error);
      setLoading(false)
    });
  }
  const Reject = async () => {
    setLoading(true)

    await addDoc(collection(db, "reject"), {
      name: prop.item.name,
      amount: prop.item.amount,
      date: prop.item.date,
      uid: prop.item.uid,
      screen: prop.item.screen,
    }).then(async () => {
      await updateDoc(doc(db, "subscriptions", prop.item.uid), {
        status: 'reject'
      })
      setLoading(false)
    }).catch((error) => {
      console.error("Error updating document: ", error);
      setLoading(false)
    });
  }


  return (
    <div
      // variants={fadeIn('right', 0.4)}
      // initial='hidden'
      // whileInView={'show'}
      // viewport={{ once: false, amount: 0.7 }}
      className="card max-w-[250px]   max-h-[380px]  outline-dashed
    outline-amber-700 outline-1 w-96 bg-black/80 backdrop-blur-2xl text-primary-content">
      <div className="card-body ">
        <code className=' font-extrabold mb-2 text-2xl text-amber-700'>{prop.item.amount} MAD</code>
        <p className="text-sm card-title font-satoshi truncate font-normal">{prop.item.date}</p>
        <p className="text-sm card-title font-satoshi truncate font-normal">{prop.item.name}</p>
        <p className="text-sm card-title font-satoshi font-normal truncate">{prop.item.uid}</p>
        <a
          target='_blank'
          rel="noreferrer"
          className='text-sm card-title font-satoshi text-blue-400 font-normal' href={prop.item.screen}>screen</a>
        {prop.item.status === 'pending' && <div className="card-actions mt-4 justify-end">
          {loading ? <div className="loader ease-linear rounded-full border-8 border-t-8 border-indigo-500 h-10 w-10"></div> :
            <>
              <button onClick={Verify} className="orange_gradient_btn cursor-pointer">Verify</button>
              <button onClick={Reject} className="red_gradient_btn cursor-pointer">Reject</button>
            </>
          }

        </div>}

      </div>
    </div>
  )
}


export default Admin
