import React, {useState} from "react";
import Header from '../header/Header';
import {Link, useNavigate} from "react-router-dom";
import {Button, Paper} from "@mui/material";
import {TextField,Typography,Grid} from"@mui/material";
import {useSelector, useDispatch} from 'react-redux';
import {transactionManager, TransactionType} from "../stores/TodoSlice";

const TodoTransactions = () => {

    const [title, setTitle] = useState('')
    const [targetDate, setTargetDate] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const transaction = useSelector((state:any) => state.todos.transaction)
    const todo = useSelector((state:any) => state.todos.currentTodo)

    const handleSubmit = async(event:any) =>{

        event.preventDefault()
        // @ts-ignore
        dispatch(transactionManager([{id: todo?.id, title: title, targetDate: targetDate},transaction]));
        navigate("/");
    }

    return(
        <div>
            <Header/>
            <form onSubmit ={handleSubmit}  style={{minWidth: 400, width:'60%', margin:'auto',}}>
                <Grid component={Paper} style={{paddingBottom:40,}} direction="row" container rowSpacing={3} justifyContent="center" alignItems="stretch">
                    <Grid item xs={9}>
                        <Typography sx={{textAlign:'center',}} component={'h4'} variant={'h4'}>
                            {transaction === TransactionType.Add? "Add New Todo": "Update Todo"}
                        </Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <TextField fullWidth variant="filled" label="Please enter the title" placeholder="Title"
                                   defaultValue={transaction === TransactionType.Add? "": todo.title} onChange={(e:any) => setTitle(e.target.value)}/>
                    </Grid>
                    <Grid item xs={9}>
                        <TextField fullWidth variant="filled" id="filled-size-normal" type="date"
                                   defaultValue={transaction === TransactionType.Add? "": todo.targetDate} onChange={(e:any) => setTargetDate(e.target.value)}/>
                    </Grid>
                    <Grid item xs={9}>
                        <Button fullWidth disabled={transaction === TransactionType.Add? title === "" || targetDate === "": title === "" && targetDate === ""} size="large" type="submit" variant="contained" color={transaction === TransactionType.Add? "success": "info"} sx={{color:'white',}}>
                            {transaction === TransactionType.Add? "Add New Todo": "Edit"}
                        </Button>
                    </Grid>
                    <Grid item xs={9}>
                        <Link to = '/' style={{}}>
                            <Button fullWidth size="large" type="button" variant="contained"  color="error" >Back</Button>
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}
export default TodoTransactions