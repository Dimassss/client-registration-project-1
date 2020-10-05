import { Button, createStyles, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, LinearProgress, makeStyles, MenuItem, Radio, RadioGroup, Select, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import gender from "../abstractions/type/model/gender";
import loyaltyProgram from "../abstractions/type/model/loyaltyProgram";
import { ClientInterface } from "../abstractions/interface/model/Client";
import {actions} from '../store';

const useStyle = makeStyles(theme => createStyles({
  form: {
    margin: theme.spacing(3)
  },
  field: {
    padding: theme.spacing(1),
    paddingBottom: theme.spacing(3)
  }
}));

export function validateUser(user){
  const err = {firstName: false, lastName: false, cardNumber: false};

  err.firstName = user.firstName !== null && user.firstName.length < 2;
  err.lastName = user.lastName !== null && user.lastName.length < 2;
  err.cardNumber = user.loyaltyProgram == 'card' && !(user.cardNumber !== null && user.cardNumber.match(/\d{16}/));

  return err;
}

export default function BasicTextFields() {
  const client = useSelector(state => state.app.client);
  const dispatch = useDispatch();
  const router = useRouter();
  const classes = useStyle();
  const setClient = (newClient: ClientInterface) => dispatch(actions.app.client.setClient(newClient));
  const addToClients = (newClient: ClientInterface) => dispatch(actions.table.clients.update([{...newClient, id: Math.round(Math.random()*100000)}]));
  const [open, setOpen] = React.useState(false);
  const [loadingState, setLoadingState] = React.useState(false);
  const [errorText, setErrorText] = useState({
    firstName: false,
    lastName: false,
    cardNumber: false
  });

  function validate(client){
    const err = validateUser(client);
    setErrorText({...err});
    return !Object.values(err).reduce((a,b) => a || b, false);
  }

  async function submitForm(){
    if(client.loyaltyProgram !== 'card') client.cardNumber = '';

    if(validate(client)){
      await setLoadingState(true);
      addToClients(client);
      setClient(null);
      router.push('/clients');
    }
  }

  const handler = {
    field: {
      firstName(name: string){
        setClient(Object.assign(client, {firstName: name}));
      },
      lastName(name: string){
        setClient(Object.assign(client, {lastName: name}));
      },
      gender(gender: gender){
        setClient(Object.assign(client, {gender}));
      },
      loyaltyProgram(loyaltyProgram: loyaltyProgram){
        setClient(Object.assign(client, {loyaltyProgram}));
      },
      cardNumber(cardNumber: string){
        if(cardNumber.length > 16) return;
        setClient(Object.assign(client, {cardNumber}));
      }
    }
  };

  return (<>
    {loadingState && <LinearProgress/>}
    <Grid
      container
    >
      <Grid item xs={12}>
        <form 
          autoComplete="off" 
          className={classes.form} 
        >
          <Grid container>
            <Grid item xs={12} sm={6} className={classes.field}>
              <TextField 
                fullWidth 
                label="Имя" 
                onChange={e => handler.field.firstName(e.target.value)}
                value={client.firstName}
                error={errorText.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6} className={classes.field}>
              <TextField 
                fullWidth 
                label="Фамилия"
                error={errorText.lastName} 
                onChange={e => handler.field.lastName(e.target.value)} 
                value={client.lastName}
              />
            </Grid>
            <Grid item xs={12} sm={6} className={classes.field}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Пол</FormLabel>
                <RadioGroup 
                  aria-label="gender" 
                  name="gender" 
                  value={client.gender} 
                  onChange={
                    e => handler.field.gender(e.target.value as gender)
                  }
                >
                  <FormControlLabel value="female" control={<Radio />} label="Female"/>
                  <FormControlLabel value="male" control={<Radio />} label="Male"/>
                  <FormControlLabel value="other" control={<Radio />} label="Other"/>
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.field}>
              <FormControl fullWidth>
                <InputLabel id="loyalty-program-field-label">Программа лояльности</InputLabel>
                <Select
                  labelId="loyalty-program-field-label"
                  id="loyalty-program-field"
                  open={open}
                  onClose={e => setOpen(false)}
                  onOpen={e => setOpen(true)}
                  value={client.loyaltyProgram}
                  onChange={e => handler.field.loyaltyProgram(e.target.value.toString() as loyaltyProgram)}
                >
                  <MenuItem value="none">недоступна</MenuItem>
                  <MenuItem value="card">пластиковая карта</MenuItem>
                  <MenuItem value="mobile">мобильное приложение</MenuItem>
                </Select>
              </FormControl>
              {client.loyaltyProgram == 'card' &&
                <TextField 
                  fullWidth 
                  label="Номер карты" 
                  value={client.cardNumber}
                  error={errorText.cardNumber}
                  onChange={e => handler.field.cardNumber(e.target.value)} 
                />
              }
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={() => submitForm()}>
                Зарегистрироваться
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  </>
  );
}