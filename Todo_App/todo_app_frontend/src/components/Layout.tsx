import { Outlet } from "react-router-dom";
import React from 'react';
import {useSelector} from 'react-redux';
import SnackBar from "./SnackBar";

const Layout = () => {

    const showMessage = useSelector((state:any) => state.message.showMessage)

    return(
        <main>
            <Outlet/>
            {
                showMessage &&(

                    <SnackBar/>
                )

            }
        </main>
    )
}

export default Layout