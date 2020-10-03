import { AppBar, Button, Collapse, createStyles, CssBaseline, Hidden, IconButton, makeStyles, NoSsr, Toolbar } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import Link from 'next/link';
import React, { useState } from "react";

const useStyle = makeStyles((theme) => createStyles({
    btnPC: {
        flexGrow: 1
    },
    btnTelephone: {
        display: 'block'
    },
    menuBtn: {
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2)
    }
}))

function ResponsiveDrawer({children}) {
    const data = {
        menu: [
            {
                href: '/clients',
                title: 'Clients'
            },
            {
                href: '/registration',
                title: 'Register me!'
            },
            {
                href: '/about',
                title: 'About Author'
            }
        ]
    };
    const classes = useStyle();
    const [showMenu, setShowMenu] = useState(false);

    return (<>
        <CssBaseline/>
        <AppBar color="transparent" position="static" onBlur={() => setShowMenu(false)}>
            <NoSsr>
                <Toolbar variant="dense" disableGutters={true}>
                    <Hidden smDown>
                        {data.menu.map((btn, i) => (
                            <Link href={btn.href} key={i}>
                                <Button className={classes.btnPC}>{btn.title}</Button>
                            </Link>
                        ))}
                    </Hidden>
                    <Hidden mdUp>
                        <IconButton 
                            edge="start" 
                            className={classes.menuBtn} 
                            color="inherit" 
                            aria-label="menu"
                            onClick={() => setShowMenu(!showMenu)}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Hidden>
                </Toolbar>
                <Hidden mdUp>
                    <Collapse collapsedHeight={0} in={showMenu}>
                        {data.menu.map((btn, i) => (
                            <Link href={btn.href} key={i}>
                                <Button 
                                    onClick={() => setShowMenu(false)}
                                    className={classes.btnTelephone}
                                >{btn.title}</Button>
                            </Link>
                        ))}
                    </Collapse>
                </Hidden>
            </NoSsr>
        </AppBar>
        <main>
            {children}
        </main>
    </>);
}

export default ResponsiveDrawer;