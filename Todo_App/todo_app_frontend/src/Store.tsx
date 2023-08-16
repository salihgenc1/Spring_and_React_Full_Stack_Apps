import{configureStore} from "@reduxjs/toolkit";
import messageSliceReducer from "./components/stores/MessageSlice";
import todoSliceReducer from "./components/stores/TodoSlice";

export default configureStore({
    reducer: {
        message: messageSliceReducer,
        todos: todoSliceReducer,
    },
})