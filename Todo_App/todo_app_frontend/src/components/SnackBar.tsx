import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';
import {useSelector, useDispatch} from 'react-redux';
import {giveAlertMessage,MessageType} from "./stores/MessageSlice";

const SnackBar = () => {

        const message = useSelector((state:any) => state.message.message)
        const messageType = useSelector((state:any) => state.message.messageType)
        const showMessage = useSelector((state:any) => state.message.showMessage)
        const dispatch = useDispatch()

        const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
            if (reason === 'clickaway') {
                return;
            }

            dispatch(giveAlertMessage(["", false]))
        };

        return (
            <Snackbar open={showMessage} autoHideDuration={3000} onClose={handleClose} sx={{width: '60%', minWidth: 300,}}>
                <Alert onClose={handleClose} severity={messageType == MessageType.success? "success" : "error"} variant={"filled"} sx={{width: '100%', fontSize: 16, color:'white',}}>
                    {message}
                </Alert>
            </Snackbar>
        );
}

export default SnackBar