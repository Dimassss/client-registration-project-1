import { Button, createStyles, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, LinearProgress, makeStyles, MenuItem, Radio, RadioGroup, Select, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useRouter } from 'next/router';

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
  const router = useRouter();
  const classes = useStyle();
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    gender: 'other',
    loyaltyProgram: 'none',
    cardNumber: ''
  });
  const [open, setOpen] = React.useState(false);
  const [loadingState, setLoadingState] = React.useState(false);
  const [errorText, setErrorText] = useState({
    firstName: false,
    lastName: false,
    cardNumber: false
  });

  function validate(user){
    const err = validateUser(user);

    setErrorText({...err});

    return !Object.values(err).reduce((a,b) => a || b, false);
  }

  async function submitForm(){
    if(user.loyaltyProgram !== 'card') user.cardNumber = '';
    if(validate(user)){
      await setLoadingState(true);
      setTimeout(() => router.push('/clients'), 1000);
      console.log(user);
    }
  }

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
                onChange={e => setUser({...user, firstName: e.target.value})}
                value={user.firstName}
                error={errorText.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6} className={classes.field}>
              <TextField 
                fullWidth 
                label="Фамилия"
                error={errorText.lastName} 
                onChange={e => setUser({...user, lastName: e.target.value})} 
                value={user.lastName}
              />
            </Grid>
            <Grid item xs={12} sm={6} className={classes.field}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Пол</FormLabel>
                <RadioGroup aria-label="gender" name="gender" value={user.gender} onChange={e => setUser({...user, gender: e.target.value})}>
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
                  value={user.loyaltyProgram}
                  onChange={e => setUser({...user, loyaltyProgram: e.target.value.toString()})}
                >
                  <MenuItem value="none">недоступна</MenuItem>
                  <MenuItem value="card">пластиковая карта</MenuItem>
                  <MenuItem value="mobile">мобильное приложение</MenuItem>
                </Select>
              </FormControl>
              {user.loyaltyProgram == 'card' &&
                <TextField 
                  fullWidth 
                  label="Номер карты" 
                  value={user.cardNumber}
                  error={errorText.cardNumber}
                  onChange={e => {
                    if(e.target.value.length > 16) return;
                    setUser({...user, cardNumber: e.target.value});
                  }} 
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