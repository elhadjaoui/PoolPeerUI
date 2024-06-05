/* eslint-disable react/prop-types */
import { motion } from 'framer-motion'
import { fadeIn } from '../variants'
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';

function Chat_Bubble({ from, message }) {

    function linkify(text) {
        var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi;
        return text.replace(urlRegex, function (url) {
            return "<a  className='text-amber-700 underline font-bold italic' target='_blank' href=" + url + '">' + url + '</a>';
        });
    }
    // function codify1(text) {
    //     var urlRegex = /{([^{}]+)}/g
    //         return text.replace(urlRegex, function (code) {
    //         return "<code  className=' text-amber-700  font-bold ' >" + code + '</code>';
    //     });
    // }
    // function codify2(text) {
    //     var urlRegex = /`([^`]+)`/g;
    //         return text.replace(urlRegex, function (code) {
    //         return "<code  className=' text-amber-700  font-bold ' >" + code + '</code>';
    //     });
    // }
    //sanitize html-String to prevent XSS attacks
    const cleanHtmlString = DOMPurify.sanitize(message, { USE_PROFILES: { html: true } });
    return (
        <motion.div
            // variants={fadeIn('right', 0.4)}
            // initial='hidden'
            // whileInView={'show'}
            // viewport={{ once: true, amount: 0.7 }}
            className={`chat ${from == 'ai' ? 'chat-start' : 'chat-end'} chat-start `}>
            <div className="chat-bubble chat_orange_gradient whitespace-pre-wrap">
                {
                    from == 'ai' ? parse(linkify(cleanHtmlString), {
                        trim: true
                    }) : message
                }
            </div>
        </motion.div>
    )
}

export default Chat_Bubble