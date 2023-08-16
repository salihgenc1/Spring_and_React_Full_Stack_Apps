import React from "react";
import TodoTable from "../todotable/TodoTable";
import Header from "../header/Header";
import Snackbar from "../SnackBar";

const Home = () => {



    return(
        <div>

            <Header/>
            <TodoTable/>
            <Snackbar/>

        </div>
    )
}

export default Home