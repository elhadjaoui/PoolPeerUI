import ScrollToBottom from "react-scroll-to-bottom"
import { useGlobalContext } from "../../context/context"
import Chat_Bubble from "../chat_bubble"


function CleanCode() {
    const {
        cleanCodeChat,
    } = useGlobalContext()

    return (
        <ScrollToBottom
            className=" h-full  w-full max-h-[550px] overflow-auto scrollbar-hide p-4  mt-3 outline-dashed
                    outline-amber-700 outline-1 rounded-lg ">
            {
                cleanCodeChat.map((item, index) => (
                    <Chat_Bubble key={index} from={item.from} message={item.message} />))
            }
        </ScrollToBottom>
    )
}

export default CleanCode