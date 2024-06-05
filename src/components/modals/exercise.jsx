
import { useGlobalContext } from '../../context/context';



function Exercise() {

    const {
        setShowExercise,
        showexercise,
        exercisecontent,
        exercisename,
    } = useGlobalContext()

    return (
        <>
            <input type="checkbox" id="poolpeerhelp" onChange={() => { }} className="modal-toggle" checked={showexercise} />
            <div className="modal">
                <div className="modal-box   relative ">
                    <button onClick={() => { setShowExercise(false) }} className="btn btn-sm orange_gradient_btn  btn-circle absolute  right-2 top-2">✕</button>
                    <h2 className="text-lg font-bold mb-4">Exercise: {exercisename}</h2>

                    <code className='whitespace-pre-wrap select-none'>
                        {exercisecontent}
                    </code>
                </div>
            </div>
        </>
    )
}

export default Exercise