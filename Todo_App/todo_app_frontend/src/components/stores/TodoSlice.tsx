import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import api from "../../api/axiosConfig";
import {giveAlertMessage, MessageType} from "./MessageSlice";

export enum FilterType{All, Completed,Uncompleted}


export const fetchTodos = createAsyncThunk(

    'todos/fetchTodos',
    async(filterType:any = FilterType.All) => {

        let response;

        switch(filterType){

            case FilterType.All:
                response = await api.get("/api/v1/todo");
                return response.data;

            case FilterType.Completed:
                response = await api.post(`/api/v1/todo/filter?isCompleted=${true}`);
                return response.data;

            case FilterType.Uncompleted:
                response = await api.post(`/api/v1/todo/filter?isCompleted=${false}`);
                return response.data;

        }
});

export enum TransactionType{Add, Update,Complete,Delete}

export const transactionManager = createAsyncThunk(
    'todos/transactionManager',
    async(todoAndTransaction:any,thunkAPI)=> {

        const todo = todoAndTransaction[0];
        const transaction = todoAndTransaction[1];
        let response;

        switch(transaction){
            case TransactionType.Add:
                response = await thunkAPI.dispatch(addTodo(todo));
                break;
            case TransactionType.Update:
                response = await thunkAPI.dispatch(updateTodo(todo));
                break;
            case TransactionType.Complete:
                response = await thunkAPI.dispatch(updateTodoState(todo));
                break;
            case TransactionType.Delete:
                response = await thunkAPI.dispatch(deleteTodo(todo));
                break;
        }
        // @ts-ignore
        thunkAPI.dispatch(fetchTodos());
        return response;
    }
);

const addTodo = createAsyncThunk(
    'todos/addTodo',
    async(todo: any,thunkAPI)=> {
        try{
            const response = await api.post(`/api/v1/todo`,{title: todo.title, targetDate: todo.targetDate})
            console.log(response.data)
        }
        catch(error){
            thunkAPI.dispatch(giveAlertMessage(['An error occured while adding this todo: '+ error, MessageType.error, true]))
        }
        finally {
            thunkAPI.dispatch(giveAlertMessage([`"${todo.title}" todo added successfully`, MessageType.success, true]))
        }
    }
);

const updateTodo = createAsyncThunk(
    'todos/updateTodo',
    async(todo:any,thunkAPI)=> {
        try{
            const response = await api.put(`/api/v1/todo/${todo.id}`, {title: todo.title, targetDate: todo.targetDate})
            console.log(response.data)
        }
        catch(error){
            thunkAPI.dispatch(giveAlertMessage(['An error occured while updating this todo: '+ error, MessageType.error, true]))
        }
        finally{
            thunkAPI.dispatch(giveAlertMessage([`"${todo.title}" todo updated successfully`, MessageType.success, true]))
        }
    }
);

const updateTodoState = createAsyncThunk(
    'todos/updateTodoState',
    async(todo:any)=> {

        try{
            const response = await api.post(`/api/v1/todo/${todo.id}?isCompleted=${todo.completed}`)
            console.log (response.data);
        }
        catch(error){
            console.error("Error updating todo state", error);
        }
    }
);

const deleteTodo = createAsyncThunk(
    'todos/delete',
    async(todo:any,thunkAPI)=> {

        try{
            const response = await api.delete(`/api/v1/todo/${todo.id}`)
            console.log (response.data);
        }
        catch(error){
            thunkAPI.dispatch(giveAlertMessage([`There is an error occurred while deleting this todo: `+ error,MessageType.error, true]))
        }
        finally{
            thunkAPI.dispatch(giveAlertMessage([`"${todo.title}" todo deleted successfully`,MessageType.success, true]))
        }

    }
);

export const todoSlice = createSlice({

    name:'todos',
    initialState: {
        todos:[],
        status:'idle',
        error: '',
        currentTodo: undefined,
        transaction: TransactionType,
    },
    reducers: {

        setCurrentTodo:(state,action) => {
            state.currentTodo = action.payload;
        },
        setTransaction:(state,action) =>{
            state.transaction = action.payload;
        },
    },
    extraReducers:(builder) => {
        builder
            .addCase(fetchTodos.pending,(state) => {
                state.status = 'loading';
            })
            .addCase(fetchTodos.fulfilled,(state,action) => {
                state.status = 'succeeded';
                state.todos = action.payload;
            })
            .addCase(fetchTodos.rejected,(state,action) => {
                state.status = 'failed';
                state.error = action.error.message?
                    state.error = action.error.message:
                    state.error = '';
            });
    },
})

export const selectAllTodos = (state: any) => state.todos.todos;
export const getTodosStatus = (state: any) => state.todos.status;

export const {setCurrentTodo} = todoSlice.actions
export const {setTransaction} = todoSlice.actions
export default todoSlice.reducer;