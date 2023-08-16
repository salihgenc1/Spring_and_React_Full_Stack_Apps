import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import ConfirmModal from "../ConfirmModal";
import {Button, FormControl, Grid, InputLabel, MenuItem, Typography} from "@mui/material";
import {Table, TableContainer, TableBody, TableHead, TableRow, Paper, styled} from "@mui/material";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {useSelector, useDispatch} from 'react-redux';
import {getTodosStatus, fetchTodos, selectAllTodos, setCurrentTodo, setTransaction,
    TransactionType, FilterType, transactionManager} from "../stores/TodoSlice";

const StyledTableCell = styled(TableCell)(({ theme }) => ({

    [`&.${tableCellClasses.head}`]: {

        backgroundColor: '#2f3542',
        color: theme.palette.common.white,
        textAlign:'center',
        border: '1px solid #444',
        fontSize:18,
    },

    [`&.${tableCellClasses.body}`]: {

        fontSize: 16,
        textAlign:'center',
        border: '1px solid #dfe4ea',
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
}));

const TodoTable = () => {

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [todoId, setTodoId] = useState(0);
    const [todoTitle, setTodoTitle] = useState();
    const dispatch = useDispatch();
    const todos = useSelector(selectAllTodos);
    const todosStatus = useSelector(getTodosStatus);

    useEffect(() =>{
        if(todosStatus ==='idle'){
            // @ts-ignore
            dispatch(fetchTodos());
        }
    },[todosStatus,dispatch]);

    const updateTodoState = async(todoId:bigint, isCompleted:boolean)=>{

        // @ts-ignore
        dispatch(transactionManager([{id: todoId, completed: isCompleted},TransactionType.Complete]));
    }

    const deleteTodo = async()=>{

        // @ts-ignore
        dispatch(transactionManager([{id: todoId, title: todoTitle},TransactionType.Delete]));
        setShowConfirmModal(false);
    }

    const handleDelete = async(todoId:number ,todoTitle: any) => {

        setShowConfirmModal(true)
        setTodoId(todoId)
        setTodoTitle(todoTitle)
    }

    const handleCancel = async() => {

        setShowConfirmModal(false)
    }

    const handleFilter = (event:SelectChangeEvent) => {

        // @ts-ignore
        dispatch(fetchTodos(event.target.value));
    };

    const handleUpdate = (todo: any) => {
        dispatch(setTransaction(TransactionType.Update))
        dispatch(setCurrentTodo(todo))
    };

    return(

        <div className= "container-lg" style={{minWidth: 600, width:'90%', margin:'auto',}}>

            <Grid justifyContent={"end"} container>
                <Grid item>
                    <FormControl variant="filled" sx={{ mb: 1, minWidth: 300,}}>

                        <InputLabel>Add Filter</InputLabel>
                        <Select onChange={handleFilter}>
                            <MenuItem value={FilterType.All}>
                                All
                            </MenuItem>
                            <MenuItem value={FilterType.Completed}>
                                Completed
                            </MenuItem>
                            <MenuItem value={FilterType.Uncompleted}>
                                Uncompleted
                            </MenuItem>
                        </Select>

                    </FormControl>
                </Grid>
            </Grid>

            <TableContainer component={Paper} >
                <Table  aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Title</StyledTableCell>
                            <StyledTableCell>Target Date</StyledTableCell>
                            <StyledTableCell>State</StyledTableCell>
                            <StyledTableCell>Mark Complete</StyledTableCell>
                            <StyledTableCell>Update</StyledTableCell>
                            <StyledTableCell>Delete</StyledTableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {todos == "" &&
                            <StyledTableCell colSpan={6}>
                                <Grid direction="column" container rowSpacing={3} justifyContent="center" alignItems="stretch">
                                    <Grid item>
                                        <Typography variant="h5" component="div" >
                                            Looks like there is nothing to do
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Link to = '/todotransactions'>
                                            <Button sx={{minWidth:250, minHeight:50, color:'white',}} variant= "contained" size="large" color="success" className="float-end"
                                                    onClick={()=> {dispatch(setTransaction(TransactionType.Add))}}>
                                                Add New Todo
                                            </Button>
                                        </Link>
                                    </Grid>
                                </Grid>
                            </StyledTableCell>
                        }
                        {todos?.map((todo: any) => (
                            <StyledTableRow style={{backgroundColor: todo.completed? '#e5f4e2':''}} key={todo.id} >
                                <StyledTableCell>{todo.title}</StyledTableCell>
                                <StyledTableCell>{todo.targetDate}</StyledTableCell>
                                <StyledTableCell>{todo.completed ? 'Completed' : 'Uncompleted'}</StyledTableCell>
                                <StyledTableCell><Button size="large" sx={{color:'white',}} variant="contained" color={todo.completed ? 'secondary':'success'} onClick={() => updateTodoState(todo.id, todo.completed)}>{todo.completed ? 'Undo':'Complete'}</Button></StyledTableCell>
                                <StyledTableCell><Link to='/todotransactions'><Button onClick={() => handleUpdate(todo)} size="large" variant="contained" color="info">Edit</Button></Link></StyledTableCell>
                                <StyledTableCell><Button size="large" variant="contained" color="error" onClick={() => handleDelete(todo.id, todo.title)}>Delete</Button></StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {
                showConfirmModal &&(

                    <ConfirmModal
                        message  = {`Are you sure you want to delete this "${todoTitle}" todo?`}
                        onCancel = {handleCancel}
                        onDelete = {deleteTodo}
                    />
                )
            }
        </div>
    )
}
export default TodoTable