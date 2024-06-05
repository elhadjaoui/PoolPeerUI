/* eslint-disable no-unused-vars */
import { useGlobalContext } from '../../context/context';
import { useState } from 'react';
import { tick, copy } from '../../assets'
import { storage } from '../../config/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { db } from '../../config/firebase';


const RIB = '230794840533921102150050'
const CIH = '8405339211021500'

function Pay() {

    const {
        showPay,
        setShowPay,
        amount
    } = useGlobalContext()

    return (
        <>
            <input type="checkbox" id="pay" onChange={() => { }} className="modal-toggle" checked={showPay} />
            <div className="modal">
                <div className="modal-box  relative ">
                    <button onClick={() => { setShowPay(false) }} className="btn btn-sm orange_gradient_btn  btn-circle absolute  right-2 top-2">✕</button>
                    <h1 className=' font-satoshi font-bold text-lg'>Bank Transfer ({amount} MAD)</h1>
                    {/* <div className="tabs ">
                        <div onClick={() => setActiveTab(0)} className={`tab tab-lifted text-base  ${activeTab === 0 ? "tab-active text-amber-700 font-bold  " : ""} `}>Bank</div>
                        <div onClick={() => setActiveTab(1)} className={`tab  tab-lifted  text-base ${activeTab === 1 ? "tab-active text-amber-700 font-bold " : ""} `}>BANK</div>
                    </div> */}



                    <BANK />
                </div>
            </div>
        </>
    )
}

const BANK = () => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [percent, setPercent] = useState(0);
    const [showPercent, setShowPercent] = useState(false);

    const {
        setTextCopy,
        user,
        setUploaded,
        setShowPay,
        setUploadErroToast,
        amount,
    } = useGlobalContext()

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleUpload = (e) => {
        e.preventDefault();
        if (selectedFile && selectedFile.type.startsWith('image/') && selectedFile.size <= 3 * 1024 * 1024) {

            const storageRef = ref(storage, `/${user.uid}/${selectedFile.name}`);
            // progress can be paused and resumed. It also exposes progress updates.
            // Receives the storage reference and the selectedFile to upload.
            const uploadTask = uploadBytesResumable(storageRef, selectedFile);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const percent = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    // update progress
                    setPercent(percent);
                    setShowPercent(true);
                },
                (err) => console.log(err),
                async () => {
                    setUploaded(true);
                    setShowPay(false);
                    setShowPercent(false);
                    setSelectedFile(null)
                    setTimeout(() => {
                        setUploaded(false);
                    }, 4000);
                    // download url
                    const url = await getDownloadURL(uploadTask.snapshot.ref);
                    const data = {
                        screen: url,
                        status: 'pending',
                        date: new Date().toLocaleString(),
                        amount: amount,
                        uid: user.uid,
                        name: user.name,
                    };
                    // getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    //     console.log(url);
                    // });
                    await setDoc(doc(db, "subscriptions", user.uid), data, { merge: true });
                }
            );
        } else {
            setShowPay(false);
            setSelectedFile(null)
            setUploadErroToast(true)
            setTimeout(() => {
                setUploadErroToast(false)
            }, 4000);
        }
    };






    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setTextCopy(true);
        setTimeout(() => {
            setTextCopy(false);
        }, 2000);
    };
    return (
        < >
            {/* <h1 className=' font-satoshi font-bold'>PAYMENT METHODS</h1> */}
            <ul className='list-inside list-decimal mt-3'>

                <li className='   '> <span className=' font-satoshi text-base '>Copy the bank account</span></li>
                <li className='   '> <span className=' font-satoshi text-base '>Transfer the specified amount to the provided bank account.</span></li>
                <li className='   '> <span className=' font-satoshi text-base '>Send us a screenshot of the payment confirmation </span> </li>
            </ul>
            <form onSubmit={handleUpload} >

                <ul className='  list-inside list-disc m-5'>
                    <li className='   '>
                        <span className='text-sm   truncate font-medium font-satoshi'>CIH BANK:  </span>
                        <span> <code onClick={() => { copyToClipboard(CIH) }} className=' cursor-pointer font-bold text-amber-700'>{CIH}</code></span>
                    </li>
                    <li className='   '>
                        <span className='text-sm  truncate font-medium font-satoshi'>RIB: </span>
                        <span> <code onClick={() => { copyToClipboard(RIB) }} className=' cursor-pointer font-bold text-amber-700'>{RIB}</code></span>
                    </li>
                    <li className='mt-4'>
                        <input type="file" onChange={handleFileChange} accept=' image/png,image/jpeg,image/jpg,application/pdf,' required className="file-input   file-input-bordered file-input-sm w-full max-w-xs" />
                    </li>
                </ul>
                <p className='text-sm font-bold font-satoshi'>Once your payment is verified, you can expect to receive your queries within a few hours</p>
                <p className='text-sm mt-3 font-bold text-red-600 font-satoshi'><strong>PS: </strong>Providing inaccurate information will result in the immediate blocking of your account.</p>
                <div className="modal-action">
                    {/* if there is a button in form, it will close the modal */}
                    {showPercent ? <button className="orange_gradient_btn">{percent} %</button> :
                        <button type='submit' className="orange_gradient_btn">Confirm</button>}

                </div>
            </form>


        </>
    )
}




export default Pay




/*
   const handleUpload = (e) => {
        e.preventDefault()

        if (selectedFile) {
            const reader = new FileReader();

            reader.onload = (e) => {
                // Get the file type
                console.log(e);

                const fileType = e.target.result.split('/')[1].split(';')[0];

                // Check if the file type is an image
                if (fileType === 'image') {
                    // Upload the file to Firebase Storage
                    const storageRef = storage.storage().ref();
                    const fileRef = storageRef.child(selectedFile.name);

                    fileRef.put(selectedFile).then((snapshot) => {
                        console.log('Image uploaded successfully.');
                    }).catch((error) => {
                        console.error('Error uploading image:', error);
                    });
                } else {
                    console.error('Selected file is not an image.');
                }
            };

            reader.readAsDataURL(selectedFile);
        }
    };
*/