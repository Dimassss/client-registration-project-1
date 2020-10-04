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
      <ClientTable clients={[
        {id: 1, firstName: 'dfasdf', lastName: 'ghdfg', registrationTime: '7237247'},
        {id: 2, firstName: 'gjfgggfd', lastName: 'jhxcvnfyt', registrationTime: '6234667'},
        {id: 3, firstName: ',hgj,mh', lastName: 'sfhsdjajs', registrationTime: '46236'},
        {id: 4, firstName: 'gherhsf', lastName: 'lifghmns', registrationTime: '45234'},
        {id: 5, firstName: 'd4234fasdf', lastName: 'ghdfg', registrationTime: '7237247'},
        {id: 6, firstName: 'ghehdsffrhsf', lastName: 'lifghhmns', registrationTime: '45234'}
      ]}/>
    </Grid>
  </Grid>);
}