import * as Mui from '@mui/material';
import { createContext, useState, useEffect, Fragment } from "react";

export const StatusBar = createContext() // Context used throughout the app to manipulate status bar message

function StatusBarProvider({ children }) {

    const [statusStack, setStatusStack] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [messageInfo, setMessageInfo] = useState(undefined)

    useEffect(() => {
        if (statusStack.length && !messageInfo) {
            // Set a new status bar
            setMessageInfo({ ...statusStack[0] })
            setStatusStack((prev) => prev.slice(1))
            setIsOpen(true)
        } else if (statusStack.length && messageInfo && isOpen) {
            // Close status bar if an instance is already open
            setIsOpen(false)
        }
    }, [statusStack, messageInfo, isOpen])

    // Handle closing of status bar
    const handleClose = () => setIsOpen(false)

    // Handle timeout exit of status bar
    const handleExited = () => setMessageInfo(undefined)

    // Handles the addition of incoming status messages and adds it to the status queue
    function deployStatusMessage(message, messageType = 'success') {
        setStatusStack((prev) => [...prev, { message, messageType, key: new Date().getTime() }])
    }

    return (
        <StatusBar.Provider value={{ deployStatusMessage }}>

            {children}

            <Mui.Snackbar
                key={messageInfo ? messageInfo.key : undefined}
                open={isOpen}
                autoHideDuration={5000}
                onClose={handleClose}
                TransitionProps={{ onExited: handleExited }}
                action={
                    <Fragment>
                        <Mui.Button onClick={handleClose}>
                            CLOSE
                        </Mui.Button>
                    </Fragment>
                }
            >
                <Mui.Alert
                    variant='filled'
                    severity={messageInfo ? messageInfo.messageType : undefined}
                    onClose={handleClose}
                >
                    {messageInfo ? messageInfo.message : undefined}
                </Mui.Alert>
            </Mui.Snackbar>

        </StatusBar.Provider>
    )
}

export default StatusBarProvider