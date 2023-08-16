import React from "react";
import {Link} from "react-router-dom";
import Button from "@mui/material/Button";
import {AppBar,Typography,Box,Grid,Toolbar} from "@mui/material";
import {setTransaction, TransactionType} from "../stores/TodoSlice";
import {useDispatch} from 'react-redux';

const Header = () => {

    const dispatch = useDispatch();

    return(
        <Box sx={{flexGrow:1, mb:10}}>
            <AppBar component="nav"  position="static" color="primary" sx={{p:2, mb:3,}}>
                <Toolbar>
                    <Grid alignItems="center" justifyContent={"space-between"} spacing={20} container>
                        <Grid item>
                            <Link to='/' style={{ textDecoration: 'none', color:'white',}}>
                                <Typography variant="h4" component="div" >
                                    My Todo List
                                </Typography>
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to = '/todotransactions'>
                                <Button sx={{minWidth:250, minHeight:50,}} variant= "outlined" size="large" color="success" className="float-end"
                                        onClick={()=> {dispatch(setTransaction(TransactionType.Add))}}>
                                    + Add New Todo
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header

