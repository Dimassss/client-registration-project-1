import { useSelector } from 'react-redux';
import { Button, createStyles, Grid, makeStyles, LinearProgress } from "@material-ui/core";
import React, { useEffect } from "react";
import {useDispatch} from 'react-redux';
import Link from 'next/link';
import ClientTable from "../components/table/ClientTable";
import { loadClients } from '../store/table/clients/actions.async';

const useStyles = makeStyles(theme => createStyles({
  btnContainer: {
    padding: theme.spacing(1) 
  },
  btn: {
    marginTop: theme.spacing(2)
  },
  randomDataBlock: {
    padding: theme.spacing(3)
  }
}));

function LoadingBar({show} : {show: boolean}){
  return show ? <LinearProgress/> : null;
}

export default function BasicTextFields() {
  const classes = useStyles();
  const state = useSelector(state => state.table.clients);
  const randomData = useSelector(state => state.app.client.random);
  const dispatch = useDispatch();
  const load = ({count, offset}) => loadClients(dispatch, {count, offset}); 
  
  const handle = {
    lastPage({rowsPerPage = 20} = {rowsPerPage:20}){
      if(!state.isLoading) load({count: 2*rowsPerPage, offset: state.clients.length});
    }
  }

  useEffect(() => {
    if(!state.clients.length) handle.lastPage();
    return () => {}
  }, [])

  return (<Grid container>
    <Grid item xs={12} className={classes.btnContainer}>
      <Link href={'/registration'}>
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth
          className={classes.btn}
        >
          Зарегистрировать пользователя
        </Button>
      </Link>
    </Grid>
    <Grid item xs={12}>
      <LoadingBar show={state.isLoading}/>
      <ClientTable clients={state.clients} onLastPage={(data) => handle.lastPage(data)}/>
      <LoadingBar show={state.isLoading}/>
    </Grid>
    <Grid item xs={12} className={classes.randomDataBlock}>
      <p>Random Data from <a href="https://meowfacts.herokuapp.com/">meowfacts.herokuapp.com</a></p>
      <p>{randomData.map(str => (<React.Fragment key={str}>{str}<br/></React.Fragment>))}</p>
    </Grid>
  </Grid>);
}