import {createSlice} from '@reduxjs/toolkit'

export enum MessageType{success,error}
export const messageSlice = createSlice({

    name:'message',
    initialState: {

        message: "",
        messageType:MessageType,
        showMessage: false,
    },
    reducers: {

        giveAlertMessage: (state,action) => {
            state.message = action.payload[0];
            state.messageType = action.payload[1]
            state.showMessage = action.payload[2];
        }
    }
})

export const {giveAlertMessage} = messageSlice.actions
export default messageSlice.reducer