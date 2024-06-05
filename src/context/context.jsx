/* eslint-disable no-constant-condition */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext, createContext, useState, useEffect } from "react";

import PoolPeer from "../components/Poolpeer/poolpeer";

import { signInWithPopup, GoogleAuthProvider, setPersistence, signOut, browserLocalPersistence } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { doc, getDoc, setDoc, updateDoc, increment, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { error_alert, error_alert_2, success_alert } from "../components/alerts/alerts";
import Cammando from "../components/Cammando/cammando";
import Codegenius from "../components/Codegenius/codegenius";
import Exam from "../components/Exam/exam";



const max = 8;

const AppContext = createContext();

// for dev mode use http://localhost:3006
const Poolpeer_API = 'https://poolpeer.tech/poolpeer';
const Commando_API = 'https://poolpeer.tech/commando';
const CodeGenius_API = 'https://poolpeer.tech/codegenius';
const Exam_API = 'https://poolpeer.tech/exam';

const AppProvider = ({ children }) => {

  const [page, setPage] = useState(0);
  const [showPay, setShowPay] = useState(false);
  const [amount, setAmount] = useState(75);
  const [uploaded, setUploaded] = useState(false);
  const [uploadErrorToast, setUploadErroToast] = useState(false);
  const [textCopy, setTextCopy] = useState(false);
  const [play, setPlay] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [showexercise, setShowExercise] = useState(false);
  const [exercisecontent, setExerciseContent] = useState('');
  const [exercisename, setExerciseName] = useState('');

  const [userid, setUserId] = useState(() => {
    const storedUser = localStorage.getItem('userid');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [user, setUser] = useState(
    {
      uid: '',
      email: '',
      name: '',
      // accessToken: '',
      plan: 'starter',
      queries: 0,
      maxqueries: 20,
    }
  )


  //**************************** PoolPeerChat ***************************/
  const [input, setInput] = useState('');
  const [hideWarningToast, setHideWarningToast] = useState(false);
  const [hideLoginToast, setHideLoginToast] = useState(false);
  const [hideLogoutToast, setHideLogoutToast] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);
  const [errorFetchingData, setErrorFetchingData] = useState(false);
  const [maximumReached, setMaximumReached] = useState(false);
  const [poolpeerloading, setPoolpeerLoading] = useState(false);
  const [loginloading, setLoginLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showhelp, setShowhelp] = useState(false);
  const [poolpeerChat, setPoolPeerChat] = useState(
    {
      0: {
        messages: [
          {
            message: " <p> Hey there! I'm your friend <strong  > PoolPeer </strong>, ready to assist you with all your <strong  > Day 00 </strong> inquiries. <p> Don't hesitate to ask me anything about pool projects.</p> <p>Let's dive in together and have a <strong>splashing</strong> good time! Wishing you all the best and success on your pool endeavors!</p> </p>",
            from: "ai",
          },
          {
            message: " <h1> Here are some examples to help you get started: </h1>",
            from: "ai",
          },
          {
            message: `
            <p><strong  >- explain  Chapter V Exercise 02 : testDay00  in Day00 step by step with examples like  I'm 6 </strong> </p>
            <p><strong  >- I would like to gain a deeper understanding of Chapter XI Exercise 08 : diff . Could you provide me with some resources and links to learn more about it? </strong> </p>
            <p><strong  >- Can you share a few links that provide resources for learning the C language</strong> </p>
            `,
            from: "ai",
          },
        ],
      },
      1: {
        messages: [
          {
            message: " <p> Hey there! I'm your friend <strong  > PoolPeer </strong>, ready to assist you with all your <strong  > Day 01 </strong>  inquiries. <p> Don't hesitate to ask me anything about pool projects.</p> <p>Let's dive in together and have a <strong>splashing</strong> good time! Wishing you all the best and success on your pool endeavors!</p> </p>",
            from: "ai",
          },
          {
            message: " <h1> Here are some examples to help you get started: </h1>",
            from: "ai",
          },
          {
            message: `
            <p><strong  >- explain Chapter V Exercise 02 : find_sh, step by step with examples like  I'm 6 </strong> </p>
            <p><strong  >- I would like to gain a deeper understanding of Chapter VI Exercise 03 : count_files. Could you provide me with some resources and links to learn more about it? </strong> </p>
            <p><strong  >- Can you share a few links that provide resources for learning the C language</strong> </p>
            `,
            from: "ai",
          },
        ],
      },
      2: {
        messages: [
          {
            message: " <p> Hey there! I'm your friend <strong  > PoolPeer </strong>, ready to assist you with all your <strong  > Day 02 </strong>  inquiries. <p> Don't hesitate to ask me anything about pool projects.</p> <p>Let's dive in together and have a <strong>splashing</strong> good time! Wishing you all the best and success on your pool endeavors!</p> </p>",
            from: "ai",
          },
          {
            message: " <h1> Here are some examples to help you get started: </h1>",
            from: "ai",
          },
          {
            message: `
            <p><strong  >- explain Chapter III Exercise 00 : ft_print_alphabet, step by step with examples like  I'm 6 </strong> </p>
            <p><strong  >- I would like to gain a deeper understanding of Chapter VI Exercise 03: ft_is_negative. Could you provide me with some resources and links to learn more about it? </strong> </p>
            <p><strong  >- Can you share a few links that provide resources for learning the C language</strong> </p>
            `,
            from: "ai",
          },
        ],
      },
      3: {
        messages: [
          {
            message: " <p> Hey there! I'm your friend <strong  > PoolPeer </strong>, ready to assist you with all your <strong  > Day 03 </strong>  inquiries. <p> Don't hesitate to ask me anything about pool projects.</p> <p>Let's dive in together and have a <strong>splashing</strong> good time! Wishing you all the best and success on your pool endeavors!</p> </p>",
            from: "ai",
          },
          {
            message: " <h1> Here are some examples to help you get started: </h1>",
            from: "ai",
          },
          {
            message: `
            <p><strong  >- explain Chapter IV Exercise 01 : ft_ultimate_ft, step by step with examples like  I'm 6 </strong> </p>
            <p><strong  >- I would like to gain a deeper understanding of Chapter V Exercise 02 : ft_swap. Could you provide me with some resources and links to learn more about it? </strong> </p>
            <p><strong  >- Can you share a few links that provide resources for learning the C language</strong> </p>
            `,
            from: "ai",
          },
        ],
      },
      4: {
        messages: [
          {
            message: " <p> Hey there! I'm your friend <strong  > PoolPeer </strong>, ready to assist you with all your <strong  > Day 04 </strong>  inquiries. <p> Don't hesitate to ask me anything about pool projects.</p> <p>Let's dive in together and have a <strong>splashing</strong> good time! Wishing you all the best and success on your pool endeavors!</p> </p>",
            from: "ai",
          },
          {
            message: " <h1> Here are some examples to help you get started: </h1>",
            from: "ai",
          },
          {
            message: `
            <p><strong  >- explain Chapter V Exercise 02 : ft_iterative_power , step by step with examples like  I'm 6 </strong> </p>
            <p><strong  >- I would like to gain a deeper understanding of Chapter VII Exercise 04 : ft_fibonacci . Could you provide me with some resources and links to learn more about it? </strong> </p>
            <p><strong  >- Can you share a few links that provide resources for learning the C language</strong> </p>
            `,
            from: "ai",
          },
        ],
      },
      5: {
        messages: [
          {
            message: " <p> Hey there! I'm your friend <strong  > PoolPeer </strong>, ready to assist you with all your <strong  > Day 05 </strong>  inquiries. <p> Don't hesitate to ask me anything about pool projects.</p> <p>Let's dive in together and have a <strong>splashing</strong> good time! Wishing you all the best and success on your pool endeavors!</p> </p>",
            from: "ai",
          },
          {
            message: " <h1> Here are some examples to help you get started: </h1>",
            from: "ai",
          },
          {
            message: `
            <p><strong  >- explain Chapter III Exercise 00 : ft_putstr , step by step with examples like  I'm 6 </strong> </p>
            <p><strong  >- I would like to gain a deeper understanding of Chapter IV Exercise 01 : ft_putnbr . Could you provide me with some resources and links to learn more about it? </strong> </p>
            <p><strong  >- Can you share a few links that provide resources for learning the C language</strong> </p>
            `,
            from: "ai",
          },
        ],
      },
      6: {
        messages: [
          {
            message: " <p> Hey there! I'm your friend <strong  > PoolPeer </strong>, ready to assist you with all your <strong  > Day 06 </strong>  inquiries. <p> Don't hesitate to ask me anything about pool projects.</p> <p>Let's dive in together and have a <strong>splashing</strong> good time! Wishing you all the best and success on your pool endeavors!</p> </p>",
            from: "ai",
          },
          {
            message: " <h1> Here are some examples to help you get started: </h1>",
            from: "ai",
          },
          {
            message: `
            <p><strong  >- explain Chapter III Exercise 00 : libft , step by step with examples like  I'm 6 </strong> </p>
            <p><strong  I-  would like to gain a deeper understanding of Chapter VII Exercise 04 : ft_sort_params . Could you provide me with some resources and links to learn more about it? </strong> </p>
            <p><strong  >- Can you share a few links that provide resources for learning the C language</strong> </p>
            `,
            from: "ai",
          },
        ],
      },
      7: {
        messages: [
          {
            message: " <p> Hey there! I'm your friend <strong  > PoolPeer </strong>, ready to assist you with all your <strong  > Day 07 </strong>  inquiries. <p> Don't hesitate to ask me anything about pool projects.</p> <p>Let's dive in together and have a <strong>splashing</strong> good time! Wishing you all the best and success on your pool endeavors!</p> </p>",
            from: "ai",
          },
          {
            message: " <h1> Here are some examples to help you get started: </h1>",
            from: "ai",
          },
          {
            message: `
            <p><strong  >- explain Chapter X Exercise 07 : ft_split , step by step with examples like  I'm 6 </strong> </p>
            <p><strong  I-  would like to gain a deeper understanding of Chapter IV Exercise 01 : ft_range . Could you provide me with some resources and links to learn more about it? </strong> </p>
            <p><strong  >- Can you share a few links that provide resources for learning the C language</strong> </p>
            `,
            from: "ai",
          },
        ],
      },
      8: {
        messages: [
          {
            message: " <p> Hey there! I'm your friend <strong  > PoolPeer </strong>, ready to assist you with all your <strong  > Day 08 </strong>  inquiries. <p> Don't hesitate to ask me anything about pool projects.</p> <p>Let's dive in together and have a <strong>splashing</strong> good time! Wishing you all the best and success on your pool endeavors!</p> </p>",
            from: "ai",
          },
          {
            message: " <h1> Here are some examples to help you get started: </h1>",
            from: "ai",
          },
          {
            message: `
            <p><strong  >- explain Chapter V Exercise 02 : ft_boolean.h , step by step with examples like  I'm 6 </strong> </p>
            <p><strong  >- I would like to gain a deeper understanding of Chapter VI Exercise 03 : ft_abs.h . Could you provide me with some resources and links to learn more about it? </strong> </p>
            <p><strong  >- Can you share a few links that provide resources for learning the C language</strong> </p>
            `,
            from: "ai",
          },
        ],
      },
      9: {
        messages: [
          {
            message: " <p> Hey there! I'm your friend <strong  > PoolPeer </strong>, ready to assist you with all your <strong  > Day 10 </strong>  inquiries. <p> Don't hesitate to ask me anything about pool projects.</p> <p>Let's dive in together and have a <strong>splashing</strong> good time! Wishing you all the best and success on your pool endeavors!</p> </p>",
            from: "ai",
          },
          {
            message: " <h1> Here are some examples to help you get started: </h1>",
            from: "ai",
          },
          {
            message: `
            <p><strong  >- explain Chapter III Exercise 00 : Makefile , step by step with examples like  I'm 6 </strong> </p>
            <p><strong  >- I would like to gain a deeper understanding of Chapter V Exercise 02 : ft_map . Could you provide me with some resources and links to learn more about it? </strong> </p>
            <p><strong  >- Can you share a few links that provide resources for learning the C language</strong> </p>
            `,
            from: "ai",
          },
        ],
      },
      10: {
        messages: [
          {
            message: " <p> Hey there! I'm your friend <strong  > PoolPeer </strong>, ready to assist you with all your <strong  > Day 11 </strong>  inquiries. <p> Don't hesitate to ask me anything about pool projects.</p> <p>Let's dive in together and have a <strong>splashing</strong> good time! Wishing you all the best and success on your pool endeavors!</p> </p>",
            from: "ai",
          },
          {
            message: " <h1> Here are some examples to help you get started: </h1>",
            from: "ai",
          },
          {
            message: `
            <p><strong  >- explain Chapter VI Exercice 03 : ft_list_size , step by step with examples like  I'm 6 </strong> </p>
            <p><strong  >- I would like to gain a deeper understanding of Chapter VII Exercice 04 : ft_list_last . Could you provide me with some resources and links to learn more about it? </strong> </p>
            <p><strong  >- Can you share a few links that provide resources for learning the C language</strong> </p>
            `,
            from: "ai",
          },
        ],

      },
      11: {
        messages: [
          {
            message: " <p> Hey there! I'm your friend <strong  > PoolPeer </strong>, ready to assist you with all your <strong  > Day 12 </strong>  inquiries. <p> Don't hesitate to ask me anything about pool projects.</p> <p>Let's dive in together and have a <strong>splashing</strong> good time! Wishing you all the best and success on your pool endeavors!</p> </p>",
            from: "ai",
          },
          {
            message: " <h1> Here are some examples to help you get started: </h1>",
            from: "ai",
          },
          {
            message: `
            <p><strong  >- explain Chapter III Exercise 00 : display_file , step by step with examples like  I'm 6 </strong> </p>
            <p><strong  >- I would like to gain a deeper understanding of Chapter IV Exercise 01 : cat . Could you provide me with some resources and links to learn more about it? </strong> </p>
            <p><strong  >- Can you share a few links that provide resources for learning the C language</strong> </p>
            `,
            from: "ai",
          },
        ],
      },
      12: {
        messages: [
          {
            message: " <p> Hey there! I'm your friend <strong  > PoolPeer </strong>, ready to assist you with all your <strong  > proj01 </strong>  inquiries. <p> Don't hesitate to ask me anything about pool projects.</p> <p>Let's dive in together and have a <strong>splashing</strong> good time! Wishing you all the best and success on your pool endeavors!</p> </p>",
            from: "ai",
          },
          {
            message: " <h1> Here are some examples to help you get started: </h1>",
            from: "ai",
          },
          {
            message: `
            <p><strong  >- explain Chapter III match , step by step with examples like  I'm 6 </strong> </p>
            <p><strong  >- I would like to gain a deeper understanding of Chapter IV nmatch . Could you provide me with some resources and links to learn more about it? </strong> </p>
            <p><strong  >- Can you share a few links that provide resources for learning the C language</strong> </p>
            `,
            from: "ai",
          },
        ],

      },
      13: {
        messages: [
          {
            message: " <p> Hey there! I'm your friend <strong  > PoolPeer </strong>, ready to assist you with all your <strong  > proj02 </strong>  inquiries. <p> Don't hesitate to ask me anything about pool projects.</p> <p>Let's dive in together and have a <strong>splashing</strong> good time! Wishing you all the best and success on your pool endeavors!</p> </p>",
            from: "ai",
          },
          {
            message: " <h1> Here are some examples to help you get started: </h1>",
            from: "ai",
          },
          {
            message: `
            <p><strong  >- explain Chapter III, step by step with examples like  I'm 6 </strong> </p>
            <p><strong  >- Can you share a few links that provide resources for learning the C language</strong> </p>
            `,
            from: "ai",
          },
        ],
      },
      14: {
        messages: [
          {
            message: " <p> Hey there! I'm your friend <strong  > PoolPeer </strong>, ready to assist you with all your <strong> Rush </strong>  inquiries. <p> Don't hesitate to ask me anything about pool projects.</p> <p>Let's dive in together and have a <strong>splashing</strong> good time! Wishing you all the best and success on your pool endeavors!</p> </p>",
            from: "ai",
          },
          {
            message: " <h1> Here are some examples to help you get started: </h1>",
            from: "ai",
          },
          {
            message: `
            <p><strong  >- explain Chapter VI Rush 02 , step by step with examples like  I'm 6 </strong> </p>
            <p><strong  >- I would like to gain a deeper understanding of Chapter VII Rush 03 . Could you provide me with some resources and links to learn more about it? </strong> </p>
            <p><strong  >- Can you share a few links that provide resources for learning the C language</strong> </p>
            `,
            from: "ai",
          },
        ],
      },



    }

  );
  const getCurrentUser = () => {
    const user = auth.currentUser;
    return user;
  };
  useEffect(() => {

    onAuthStateChanged(auth, (currentuser) => {
      if (currentuser) {
        const data = {
          uid: currentuser.uid,
          email: currentuser.email,
          name: currentuser.displayName,
          accessToken: currentuser.accessToken,
          plan: user.plan,
          queries: user.queries,
          maxqueries: user.maxqueries,
        }
        setUser(data)
      } else {
        setUser(null)
      }
    });
    // return () => {
    //   unsubscribe(); // Unsubscribe from the listener when the component is unmounted
    // };
  }, [])

  useEffect(() => {
    if (!userid) return
    const unsubscribe = onSnapshot(doc(db, "users", userid), (doc) => {
      const data = doc.data();
      setUser(data)
    }
    );
    // Cleanup function
    return () => {
      unsubscribe(); // Stop listening for updates whenever the component unmounts
    };
  }, []);

  const HandleInput = (e) => {
    setInput(e.target.value)
  }
  const PoolPeerAddMessage = async (id) => {
    // e.preventDefault();
    setError(null);

    if (user.queries >= user.maxqueries) {
      setMaximumReached(true)
      setTimeout(() => {
        setMaximumReached(false)
      }, 4000);
      return;
    }
    if (!input) {
      alert('Please input a question');
      return;
    }
    const question = input.trim();
    setPoolPeerChat((old) => ({
      ...old,
      [id]: {
        // ...old[id],
        messages: [
          ...old[id].messages,
          {
            from: 'user',
            message: question,
          },
        ],
      }
    }));
    setPoolpeerLoading(true);
    setInput('');
    try {
      const res = await fetch(Poolpeer_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          question,
          id,
        }),
      });
      const reader = res.body.getReader();
      setPoolPeerChat((old) => ({
        ...old,
        [id]: {
          ...old[1],
          messages: [
            ...old[id].messages,
            {
              from: 'ai',
              message: '',
            },
          ],
        }
      })); // this line is to add a new message from the ai to the chat before the while loop for the streaming to work
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        const text = new TextDecoder().decode(value);
        setPoolPeerChat((old) => ({
          ...old,
          [id]: {
            ...old[id],
            messages: [
              ...old[id].messages.map((messageObj, index) => {
                if (index === old[id].messages.length - 1) {
                  return {
                    ...messageObj,
                    message: messageObj.message + text,
                  };
                }
                return messageObj;
              }),
            ],
          }          
        }));
       
      }
      // Automatically increment the queries of the user by 1.
      await updateDoc(doc(db, "users", user.uid), {
        queries: increment(1)
      })
      // const data = await res.json();
      // if (data.error) {
      //   setError(data.error);
      // } else {

      //   // Automatically increment the queries of the user by 1.
      //   await updateDoc(doc(db, "users", user.uid), {
      //     queries: increment(1)
      //   })
      //   setPoolPeerChat((old) => ({
      //     ...old,
      //     [id]: {
      //       ...old[1],
      //       messages: [
      //         ...old[id].messages,
      //         {
      //           from: 'ai',
      //           message: data.text,
      //         },
      //       ],
      //     }
      //   }));
      // }
      setPoolpeerLoading(false);
    } catch (error) {
      setPoolpeerLoading(false);
      setError('An error occurred while fetching the data. Please try again.');
      setErrorFetchingData(true)
      setTimeout(() => {
        setErrorFetchingData(false)
      }, 4000);
      // error_alert()
    }

  };

  //****************************  ****************************************/
  //**************************** CommandoChat ***************************/
  const [text2commandLoading, setText2commandLoading] = useState(false);
  const [explaincommandLoading, setExplaincommandLoading] = useState(false);

  const [text2commandChat, setText2commandChat] = useState([
    {
      message: " <h1> Hey there! I'm your friend <strong  > Commando. </strong> </h1>",
      from: "ai",
    },
    {
      message: " <h1> Here are some examples to help you get started: </h1>",
      from: "ai",
    },
    {
      message: `-<strong  > How can I list all the files in a directory? </strong>
      <p><strong  >-  I want to search for a specific string within a file. </strong> </p>
      <p><strong  >-  I need to create a new directory in the terminal. </strong> </p>
      <p><strong  >-  How can I compress a directory into a tar.gz file in the terminal? </strong> </p>
      <p><strong  >-  كيف يمكنني نسخ مجلد إلى مسار آخر في الطرفية ؟</strong> </p>
      <p><strong  >-  ؟ كيف يمكنني ضغط مجلد في ملف tar.gz في الطرفية</strong> </p>
      `,
      from: "ai",
    },
  ]
  );
  const [explaincommandChat, setExplaincommandChat] = useState([
    {
      message: " <h1> Hey there! I'm your friend <strong  > Commando. </strong> </h1>",
      from: "ai",
    },
    {
      message: " <h1> Here are some examples to help you get started: </h1>",
      from: "ai",
    },
    {
      message: `-<strong  > Explain the 'grep' command. </strong>
      <p><strong  >-  Explain the purpose of the 'rm' command. </strong> </p>
      <p><strong  >-  Can you provide an explanation for the 'chmod' command? </strong> </p>
      <p><strong  >-  Explain the purpose of the 'rm' command. </strong> </p>
      <p><strong  >- ماذا يفعل أمر 'mkdir'؟</strong> </p>
      `,
      from: "ai",
    },
  ]
  );

  const Text2commandAddMessage = async (e) => {
    e.preventDefault();
    setError(null);

    if (user.queries >= user.maxqueries) {
      setMaximumReached(true)
      setTimeout(() => {
        setMaximumReached(false)
      }, 4000);
      return;
    }
    if (!input) {
      alert('Please input a question');
      return;
    }
    const question = input.trim();
    setText2commandChat(old => ([...old, { from: 'user', message: question }]))
    setText2commandLoading(true);
    setInput('');
    try {
      const res = await fetch(Commando_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          question,
          from: 0 // Text2command = 0, Explaincommand = 1
        }),
      });
      const reader = res.body.getReader();
      setText2commandChat(old => ([...old, { from: 'ai', message: '' }])) // this line is to add a new message from the ai to the chat before the while loop for the streaming to work
      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        const text = new TextDecoder().decode(value);
        setText2commandChat(old => {
          const lastItem = old[old.length - 1];
          const updatedItem = { ...lastItem, message: lastItem.message + text };
          return [...old.slice(0, -1), updatedItem];
        });
      }
      // Automatically increment the queries of the user by 1.
      await updateDoc(doc(db, "users", user.uid), {
        queries: increment(1)
      })
     
      setText2commandLoading(false);
    } catch (error) {
      setText2commandLoading(false);
      setError('An error occurred while fetching the data. Please try again.');
      setErrorFetchingData(true)
      setTimeout(() => {
        setErrorFetchingData(false)
      }, 4000);
    }

  }
  const ExplaincommandAddMessage = async (e) => {
    e.preventDefault();
    setError(null);

    if (user.queries >= user.maxqueries) {
      setMaximumReached(true)
      setTimeout(() => {
        setMaximumReached(false)
      }, 4000);
      return;
    }
    if (!input) {
      alert('Please input a question');
      return;
    }
    const question = input.trim();
    // const from = 1; // Text2command = 0, Explaincommand = 1
    setExplaincommandChat(old => ([...old, { from: 'user', message: question }]))
    setExplaincommandLoading(true);
    setInput('');
    try {
      const res = await fetch(Commando_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          question,
          from: 1 // Text2command = 0, Explaincommand = 1
        }),
      });
      const reader = res.body.getReader();
   
      setExplaincommandChat(old => ([...old, { from: 'ai', message: '' }])) // this line is to add a new message from the ai to the chat before the while loop for the streaming to work
      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }
        const text = new TextDecoder().decode(value);
        setExplaincommandChat(old => {
          const lastItem = old[old.length - 1];
          const updatedItem = { ...lastItem, message: lastItem.message + text };
          return [...old.slice(0, -1), updatedItem];
        });
      }
      // Automatically increment the queries of the user by 1.
      await updateDoc(doc(db, "users", user.uid), {
        queries: increment(1)
      })
      setExplaincommandLoading(false);
    } catch (error) {
      console.log(error);
      setExplaincommandLoading(false);
      setError('An error occurred while fetching the data. Please try again.');
      setErrorFetchingData(true)
      setTimeout(() => {
        setErrorFetchingData(false)
      }, 4000);
    }

  }
  //****************************  ****************************************/


  //**************************** CodeGenius ***************************/
  const [codeGeneratorLoading, setCodeGeneratorLoading] = useState(false);
  const [cleanCodeLoading, setCleanCodeLoading] = useState(false);
  const [Line25Loading, setLine25Loading] = useState(false);

  const [codeGeneratorChat, setCodeGeneratorChat] = useState([
    {
      message: " <h1> Hey there! I'm your friend <strong  > CodeGenius. </strong> </h1>",
      from: "ai",
    },
    {
      message: " <h1> I'm here to assist you in generating C programming code snippets based on your input. Whether you need help with a specific algorithm, function, or even an entire program, I'm here to provide you with reliable code solutions.</h1>",
      from: "ai",
    },
    {
      message: " <h1> Here are some examples to help you get started: </h1>",
      from: "ai",
    },
    {
      message: `-<strong  > I need a C program to calculate the factorial of a number. </strong>
        <p><strong  >-  Please generate a C function to find the maximum element in an array. </strong> </p>
        <p><strong  >-  I want a C program that checks if a number is prime. </strong> </p>
        <p><strong  >-  Can you help me create a C program to reverse a string? </strong> </p>
        <p><strong  >-  أريد برنامج C يتحقق ما إذا كان العدد أوليًا.</strong> </p>
        <p><strong  >-  من فضلك أنشئ وظيفة C للعثور على أكبر عنصر في مصفوفة </strong> </p>
        `,
      from: "ai",
    },
  ]
  );
  const [cleanCodeChat, setCleanCodeChat] = useState([
    {
      message: " <h1> Hey there! I'm your friend <strong  > CodeGenius. </strong> </h1>",
      from: "ai",
    },
    {
      message: " <h1> I'm here to assists you in improving the quality and readability of your C programming code. By analyzing your code input, I provide suggestions and transformations to enhance the structure, formatting, and overall cleanliness of the code. I aim to promote best practices and adherence to coding standards, leading to more maintainable and efficient C programs.</h1>",
      from: "ai",
    },
  ]
  );
  const [line25Chat, setLine25Chat] = useState([
    {
      message: " <h1> Hey there! I'm your friend <strong  > CodeGenius. </strong> </h1>",
      from: "ai",
    },
    {
      message: " <h1>I help coders create concise functions within <strong  > 25 lines. </strong> enhancing readability and maintainability. Write clean code effortlessly and boost your productivity. </h1>",
      from: "ai",
    },
  ]
  );
  const CodeGeneratorAddMessage = async (e) => {
    e.preventDefault();
    setError(null);

    if (user.queries >= user.maxqueries) {
      setMaximumReached(true)
      setTimeout(() => {
        setMaximumReached(false)
      }, 4000);
      return;
    }
    if (!input) {
      alert('Please input a question');
      return;
    }
    const question = input.trim();
    setCodeGeneratorChat(old => ([...old, { from: 'user', message: question }]))
    setCodeGeneratorLoading(true);
    setInput('');
    try {
      const res = await fetch(CodeGenius_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question,
          from: 0 // CodeGenerator = 0, CleanCode = 1, Line25 = 2
        }),
      });
      const reader = res.body.getReader();
      setCodeGeneratorChat(old => ([...old, { from: 'ai', message: '' }])) // this line is to add a new message from the ai to the chat before the while loop for the streaming to work
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        const text = new TextDecoder().decode(value);
        setCodeGeneratorChat(old => {
          const lastItem = old[old.length - 1];
          const updatedItem = { ...lastItem, message: lastItem.message + text };
          return [...old.slice(0, -1), updatedItem];
        });
      }
      // Automatically increment the queries of the user by 1.
      await updateDoc(doc(db, "users", user.uid), {
        queries: increment(1)
      })
      setCodeGeneratorLoading(false);
    } catch (error) {
      setCodeGeneratorLoading(false);
      setError('An error occurred while fetching the data. Please try again.');
      setErrorFetchingData(true)
      setTimeout(() => {
        setErrorFetchingData(false)
      }, 4000);
    }

  }
  const CleanCodeAddMessage = async (e) => {
    e.preventDefault();
    setError(null);

    if (user.queries >= user.maxqueries) {
      setMaximumReached(true)
      setTimeout(() => {
        setMaximumReached(false)
      }, 4000);
      return;
    }
    if (!input) {
      alert('Please input a question');
      return;
    }
    const question = input.trim();
    setCleanCodeChat(old => ([...old, { from: 'user', message: question }]))
    setCleanCodeLoading(true);
    setInput('');
    try {
      const res = await fetch(CodeGenius_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question,
          from: 1 // CodeGenerator = 0, CleanCode = 1, Line25 = 2
        }),
      });
      const reader = res.body.getReader();
      setCleanCodeChat(old => ([...old, { from: 'ai', message: '' }])) // this line is to add a new message from the ai to the chat before the while loop for the streaming to work
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        const text = new TextDecoder().decode(value);
        setCleanCodeChat(old => {
          const lastItem = old[old.length - 1];
          const updatedItem = { ...lastItem, message: lastItem.message + text };
          return [...old.slice(0, -1), updatedItem];
        });
      }
      // Automatically increment the queries of the user by 1.
      await updateDoc(doc(db, "users", user.uid), {
        queries: increment(1)
      })
      setCleanCodeLoading(false);
    } catch (error) {
      setCleanCodeLoading(false);
      setError('An error occurred while fetching the data. Please try again.');
      setErrorFetchingData(true)
      setTimeout(() => {
        setErrorFetchingData(false)
      }, 4000);
    }

  }

  const Line25AddMessage = async (e) => {
    e.preventDefault();
    setError(null);

    if (user.queries >= user.maxqueries) {
      setMaximumReached(true)
      setTimeout(() => {
        setMaximumReached(false)
      }, 4000);
      return;
    }
    if (!input) {
      alert('Please input a question');
      return;
    }
    const question = input.trim();
    setLine25Chat(old => ([...old, { from: 'user', message: question }]))
    setLine25Loading(true);
    setInput('');
    try {
      const res = await fetch(CodeGenius_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question,
          from: 2 // CodeGenerator = 0, CleanCode = 1, Line25 = 2
        }),
      });
      const reader = res.body.getReader();
      setLine25Chat(old => ([...old, { from: 'ai', message: '' }])) // this line is to add a new message from the ai to the chat before the while loop for the streaming to work
      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        const text = new TextDecoder().decode(value);
        setLine25Chat(old => {
          const lastItem = old[old.length - 1];
          const updatedItem = { ...lastItem, message: lastItem.message + text };
          return [...old.slice(0, -1), updatedItem];
        });
      }
      // Automatically increment the queries of the user by 1.
      await updateDoc(doc(db, "users", user.uid), {
        queries: increment(1)
      })
      setLine25Loading(false);
    } catch (error) {
      setLine25Loading(false);
      setError('An error occurred while fetching the data. Please try again.');
      setErrorFetchingData(true)
      setTimeout(() => {
        setErrorFetchingData(false)
      }, 4000);
    }

  }
  //****************************  ****************************************/

  //**************************** Exam ***************************/
  const [examLoading, setExamLoading] = useState(false);
  const [examChat, setExamChat] = useState([
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
      <p><strong  >-  Can you provide a step-by-step breakdown of the exercise? </strong> </p>
      <p><strong  >-  Could you provide me with the probability percentage of this exercise being included in the exam? </strong> </p>
      <p><strong  >-  ساعدني لحل هذا التمرين</strong> </p>
      `,
      from: "ai",
    },
  ]
  );
  const ExamAddMessage = async (exercise) => {
    setError(null);

    if (user.queries >= user.maxqueries) {
      setMaximumReached(true)
      setTimeout(() => {
        setMaximumReached(false)
      }, 4000);
      return;
    }
    if (!input) {
      alert('Please input a question');
      return;
    }
    setExamLoading(true);
    const question = input.trim();
    setExamChat(old => ([...old, { from: 'user', message: question }]))
    setInput('');
    try {
      const res = await fetch(Exam_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          question,
          exercise
        }),
      });
      const reader = res.body.getReader();
      setExamChat(old => ([...old, { from: 'ai', message: '' }])) // this line is to add a new message from the ai to the chat before the while loop for the streaming to work
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        const text = new TextDecoder().decode(value);
        setExamChat(old => {
          const lastItem = old[old.length - 1];
          const updatedItem = { ...lastItem, message: lastItem.message + text };
          return [...old.slice(0, -1), updatedItem];
        });
      }
      // Automatically increment the queries of the user by 1.
      await updateDoc(doc(db, "users", user.uid), {
        queries: increment(1)
      })
      setExamLoading(false);
    } catch (error) {
      setError('An error occurred while fetching the data. Please try again.');
      setExamLoading(false);
      setErrorFetchingData(true)
      setTimeout(() => {
        setErrorFetchingData(false)
      }, 4000);
    }

  }
  //****************************  ****************************************/
  //**************************** Authentication ********************************/
  const formatUser = async (user) => {
    let plan = 'starter'
      , queries = 0
      , maxqueries = max;

    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    if (docSnap.exists()) {
      plan = data.plan;
      queries = data.queries;
      maxqueries = data.maxqueries;
    } else {
      // docSnap.data() will be undefined in this case
    }
    return {
      uid: user.uid,
      email: user.email,
      name: user.displayName,
      accessToken: user.accessToken,
      plan: plan,
      queries: queries,
      maxqueries: maxqueries,
    }
  }
  async function createUser(uid, data) {
    await setDoc(doc(db, "users", uid), data, { merge: true });
  }
  const handleUser = async (rawUser) => {
    if (rawUser) {
      const user = await formatUser(rawUser)

      createUser(user.uid, user)
      localStorage.setItem('userid', JSON.stringify(user.uid))
      setUser(user)
      return user
    } else {
      setUser(false)
      return false
    }
  }
  const provider = new GoogleAuthProvider();


  const Logout = () => {
    signOut(auth)
      .then(() => {
        setHideLogoutToast(true)
        setTimeout(() => {
          setHideLogoutToast(false)
        }, 4000);
        // success_alert('Sorry to see you go...')
        handleUser(false)
      })
  }
  const login = () => {
    setLoginLoading(true);
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        return signInWithPopup(auth, provider)
          .then(async (result) => {
            const user = result.user;
            await handleUser(user);
            // success_alert('good to see you ' + user.displayName)
            setHideLoginToast(true)
            setTimeout(() => {
              setHideLoginToast(false)
            }, 4000);
            setLoginLoading(false);
          }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorLogin(true)
            setTimeout(() => {
              setErrorLogin(false)
            }, 4000);
            // error_alert_2('Something went wrong, please try again')

            setLoginLoading(false);
          });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
      });


  }
  //****************************  ****************************************/

  let View;
  if (page == 0) {
    View = <PoolPeer />
  }
  else if (page == 1) {
    View = <Cammando />
  }
  else if (page == 2) {
    View = <Codegenius />
  }
  else if (page == 3) {
    View = <Exam />
  }

  return (
    <AppContext.Provider
      value={{
        page,
        setPage,
        View,
        play,
        setPlay,
        poolpeerChat,
        setPoolPeerChat,
        PoolPeerAddMessage,
        HandleInput,
        input,
        setInput,
        error,
        showhelp,
        setShowhelp,
        login,
        Logout,
        poolpeerloading,
        user,
        setUser,
        setShowDisclaimer,
        showDisclaimer,
        loginloading,
        setLoginLoading,
        hideWarningToast,
        setHideWarningToast,
        hideLoginToast,
        hideLogoutToast,
        setHideLoginToast,
        setHideLogoutToast,
        errorLogin,
        setErrorLogin,
        errorFetchingData,
        setErrorFetchingData,
        maximumReached,
        showPay,
        setShowPay,
        textCopy,
        setTextCopy,
        uploaded,
        setUploaded,
        amount,
        setAmount,
        text2commandChat,
        setText2commandChat,
        explaincommandChat,
        setExplaincommandChat,
        text2commandLoading,
        setText2commandLoading,
        Text2commandAddMessage,
        explaincommandLoading,
        setExplaincommandLoading,
        ExplaincommandAddMessage,
        userid,
        setUserId,
        codeGeneratorLoading,
        setCodeGeneratorLoading,
        cleanCodeLoading,
        setCleanCodeLoading,
        Line25Loading,
        setLine25Loading,
        codeGeneratorChat,
        setCodeGeneratorChat,
        cleanCodeChat,
        setCleanCodeChat,
        line25Chat,
        setLine25Chat,
        CodeGeneratorAddMessage,
        CleanCodeAddMessage,
        Line25AddMessage,
        uploadErrorToast,
        setUploadErroToast,
        setShowExercise,
        showexercise,
        exercisecontent,
        setExerciseContent,
        exercisename,
        setExerciseName,
        examLoading,
        setExamLoading,
        examChat,
        setExamChat,
        ExamAddMessage,

      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

export const useGlobalContext = () => {
  return useContext(AppContext);
};
