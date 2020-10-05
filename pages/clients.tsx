import { useSelector } from 'react-redux';
import { Button, createStyles, Grid, makeStyles } from "@material-ui/core";
import React from "react";
import Link from 'next/link';
import ClientTable from "../components/table/ClientTable";

const useStyles = makeStyles(theme => createStyles({
  btnContainer: {
    padding: theme.spacing(3) 
  },
  btn: {
    marginTop: theme.spacing(5)
  }
}));

export default function BasicTextFields() {
  const classes = useStyles();
  const clients = useSelector(state => state.table.clients);

  return (<Grid container>
    <Grid item xs={12} className={classes.btnContainer}>
      <Link href={'/registration'}>
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth
          className={classes.btn}
        >
          Register Me!
        </Button>
      </Link>
    </Grid>
    <Grid item xs={12}>
      <ClientTable clients={clients}/>
    </Grid>
  </Grid>);
}