
import { useGlobalContext } from '../../context/context';



function Disclaimer() {

    const {
        setShowDisclaimer,
        showDisclaimer,
    } = useGlobalContext()

    return (
        <>
            <input type="checkbox" id="poolpeerhelp" onChange={() => { }} className="modal-toggle" checked={showDisclaimer} />
            <div className="modal">
                <div className="modal-box h-full  relative ">
                    <button onClick={() => { setShowDisclaimer(false) }} className="btn btn-sm orange_gradient_btn  btn-circle absolute  right-2 top-2">✕</button>
                    <h2 className="text-lg font-bold">Disclaimer:</h2>

                    <p>
                        <br />
                        <br />
                        <strong className='text-amber-700'> PoolPeer</strong> is an educational chatbot designed to assist students with their work. It is important to note that <strong className='text-amber-700'> PoolPeer</strong> is meant for educational purposes only. While we strive to provide accurate and helpful information, <strong className='text-amber-700'> PoolPeer</strong> cannot guarantee the completeness, accuracy, reliability, or suitability of the information provided.
                        <br />
                        <br />
                        <strong className='text-amber-700'> PoolPeer</strong> is not intended to replace human interaction and collaboration. It is designed to complement the learning experience by providing guidance and resources. However, it is essential to acknowledge that <strong className='text-amber-700'> PoolPeer</strong> cannot do the work for you or replace the valuable input and insights of your peers.
                        <br />
                        <br />
                        The use of <strong className='text-amber-700'> PoolPeer</strong> is entirely at your own risk. We do not assume any responsibility for the outcomes or consequences resulting from the use of <strong className='text-amber-700'> PoolPeer</strong>. It is crucial to exercise your own judgment and critical thinking skills when utilizing the information provided by <strong className='text-amber-700'> PoolPeer</strong>.
                        <br />
                        <br />
                        Furthermore, <strong className='text-amber-700'> PoolPeer</strong> may contain links to external websites, resources, or third-party services. We do not endorse or have control over the content, nature, or availability of these external resources. The inclusion of any links does not necessarily imply a recommendation or endorsement of the views expressed within them.
                        <br />
                        <br />
                        By using <strong className='text-amber-700'> PoolPeer</strong>, you agree to hold harmless <strong className='text-amber-700'> PoolPeer</strong> and its affiliates from any claims, damages, or liabilities that may arise from your use of the chatbot or reliance on the information provided.

                    </p>



                </div>
            </div>
        </>
    )
}

export default Disclaimer