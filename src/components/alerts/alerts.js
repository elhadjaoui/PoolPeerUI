import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const success_alert = (msg) => {

    toast.success(msg, {
        position: toast.POSITION.TOP_RIGHT,
        theme: 'colored',
    });
};
export const error_alert = () => {
    toast.error('An error occurred while fetching the data. Please try again.', {
        position: toast.POSITION.TOP_RIGHT,
        theme: 'colored',
    });
};

export const error_alert_2 = (msg) => {
    toast.error(msg,
        {
            position: toast.POSITION.TOP_RIGHT,
            theme: 'colored',
        });
};

export const info_alert = (msg) => {
    toast.info(msg, {
        position: toast.POSITION.TOP_RIGHT,
        theme: 'colored',
    });
}
