import {AppBar, IconButton, LinearProgress, Toolbar} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import {useSelector} from "react-redux";
import {reducerType} from "../../app/bll/store";
import {requestStatusType} from "../../app/bll/app-reducer";
import styles from './Header.module.css'

export const Header = () => {

    const status = useSelector<reducerType, requestStatusType>(state => state.app.status)


    return (
        <AppBar position={'static'}>
            <Toolbar>
                <IconButton edge={'start'} color={'inherit'} aria-label={'menu'}>
                    <MenuIcon/>
                </IconButton>
            </Toolbar>
           <div className={styles.progressBar}>
               {status === 'loading' && <LinearProgress color={'secondary'}/>}
           </div>
        </AppBar>
    )
}