import { Button, createStyles, Grid, makeStyles, Paper } from "@material-ui/core";
import React from "react";
import Head from 'next/head';

const useStyles = makeStyles(theme => createStyles({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        marginBottom: theme.spacing(3)
    },
    link: {
        padding: theme.spacing(1)
    },
    linkContainer: {
        padding: theme.spacing(5)
    }
}))

export default function BasicTextFields() {
    const classes = useStyles();
    const data = {
        links: [
            { href: 'https://t.me/grejtal', title: 'Telegram' },
            { href: 'https://github.com/Dimassss', title: 'Github' },
            { href: 'https://www.linkedin.com/in/pilevoid/', title: 'LinkedIn' },
            { href: '/static/Dmytro_Karpus_CV.pdf', title: 'My CV' }
        ]
    }

    return (
    <Grid 
        container 
        direction="row"
        justify="center"
        alignItems="flex-start"
    >
        <Head>
            <title>Обо мне</title>
        </Head>
        <Grid item xs={12}>
            <Paper className={classes.paper}>
                All information about me you can get in LinkedIn or from my CV pdf file.
            </Paper>
        </Grid>
        <Grid item xs={12}>
            <Grid
                container
                direction="row"
                justify="space-between"
                className={classes.linkContainer}
            >   
                {data.links.map((link, i) => (<Grid item key={i} xs={12} sm={6} md={3} className={classes.link}>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        href={link.href} 
                        target="_blank" 
                        fullWidth
                    >
                        {link.title}
                    </Button>
                </Grid>))}
            </Grid>
        </Grid>
    </Grid>
    );
  }