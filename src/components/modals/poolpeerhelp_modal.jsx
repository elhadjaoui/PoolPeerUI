
import { useGlobalContext } from '../../context/context';

const eg1 = ` [e.g. "explain [Chapter] [Exercise Number] : [Exercise Name] in [Day Number]  step by step with examples like  I'm 6"]`
const examp1 = `explain  Chapter V Exercise 02 : testDay00  in Day00 step by step with examples like  I'm 6`
const  examp2 = `Could you assist me in comprehending Chapter IV, Exercise 01: ft_ultimate_ft in day 03? I would appreciate a step-by-step explanation with examples like I'm 6`
const examp3  = `I would like to gain a deeper understanding of Chapter V, Exercise 02: ft_atoi in day 05. Could you provide me with some resources and links to learn more about it?`
const  examp4 = `What is the topic or objective of Chapter X Exercise 07: ft_split in Day07? in bullet points`
const examp5 = `Can you share a few links that provide resources for learning the C language`
const descriptors = `"let's think step by step" "in Bullet Point" "explain like I'm 6" `
const str = `

To enhance your interaction with PoolPeer and achieve your desired results, consider
utilizing descriptors. By appending a word or two to your question, you can influence
the interpretation and response of PoolPeer. Experiment with adjectives like:
`
const str2 = `Remember, always be specific with your questions: `
function Poolpeerhelp_Modal() {

    const {
        setInput,
        showhelp,
        setShowhelp,
    } = useGlobalContext()
    return (
        <>
            <input type="checkbox" id="poolpeerhelp" onChange={()=> {}} className="modal-toggle" checked={showhelp} />
            <div className="modal">
                <div className="modal-box  relative ">
                    <button onClick={()=> {setShowhelp(false)}} className="btn btn-sm orange_gradient_btn  btn-circle absolute  right-2 top-2">✕</button>
                    <h2 className="text-lg font-bold">Help:</h2>

                    {/* <ul className=" list-decimal py-4 list-inside">
                        <li onClick={() => { setInput(examp1); setShowhelp(false) }} className="  py-2 text-amber-700 cursor-pointer">{examp1}</li>
                        <li onClick={() => { setInput(examp2); setShowhelp(false) }} className="  py-2 text-amber-700 cursor-pointer">{examp2}</li>
                        <li onClick={() => { setInput(examp3); setShowhelp(false) }} className="  py-2 text-amber-700 cursor-pointer">{examp3}</li>
                        <li onClick={() => { setInput(examp4); setShowhelp(false) }} className="  py-2 text-amber-700 cursor-pointer">{examp4}</li>
                        <li onClick={() => { setInput(examp5); setShowhelp(false) }} className="  py-2 text-amber-700 cursor-pointer">{examp5}</li>
                    </ul> */}
                    <p>
                        {str}
                        <strong className=' text-amber-700'>{descriptors}</strong>
                        and more at the end of your question to get the best results.
                    </p>
                    <br />
                    <p>
                        <strong>{str2}</strong>
                    </p>
                    <p>
                        <strong className=' text-amber-700'>{eg1}</strong>
                    </p>


                </div>
            </div>
        </>
    )
}

export default Poolpeerhelp_Modal