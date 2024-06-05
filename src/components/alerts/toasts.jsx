

export const warning_toast = () => {
    return (
        <div className="toast w-full z-50 toast-top toast-end">
            <div className="alert  warning_toast">
                <span>you are not authorized to view this page</span>
            </div>

        </div>
    )

}

export const login_toast = (msg) => {
    return (
        <div className="toast w-full z-50 toast-top toast-end">
            <div className="alert  login_toast">
                <span>{msg}</span>
            </div>

        </div>
    )

}
export const logout_toast = (msg) => {
    return (
        <div className="toast w-full z-50 toast-top toast-end">
            <div className="alert login_toast">
                <span>{msg}</span>
            </div>

        </div>
    )

}

export const error_toast = () => {
    return (
        <div className="toast w-full z-50 toast-top toast-end">
            <div className="alert  warning_toast">
                <span>Something went wrong, please try again</span>
            </div>

        </div>
    )

}

export const error_fetching_data_toast = () => {
    return (
        <div className="toast w-full z-50 toast-top toast-end">
            <div className="alert  warning_toast">
                <span>An error occurred while fetching the data. Please try again.</span>
            </div>

        </div>
    )

}
export const error_maximum_reached_toast = () => {
    return (
        <div className="toast w-full z-50 toast-top toast-end">
            <div className="alert  warning_toast">
                <span>You have reached the maximum number of queries. Please upgrade your plan to continue.</span>
            </div>

        </div>
    )

}

export const copied_toast = (msg) => {
    return (
        <div className="toast w-full z-50 toast-top toast-end">
            <div className="alert  login_toast">
                <span>{msg}</span>
            </div>

        </div>
    )

}


export const upload_error_toast = () => {
    return (
        <div className="toast w-full z-50 toast-top toast-end">
            <div className="alert  warning_toast">
                <p>Invalid file type. Only image files are allowed OR File size exceeds the limit. Maximum file size allowed is 3 MB</p>
            </div>

        </div>
    )
}