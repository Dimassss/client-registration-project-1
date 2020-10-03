import { CssBaseline } from "@material-ui/core";
import React from "react";
import MainLayout from "../layouts/MainLayout";


function MyApp({Component, pageProps}){
    React.useEffect(() => {
        //Remove the ssr injected CSS
        const jssStyles = document.querySelector('#jss-server-side');
        if(jssStyles){
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return (
        <React.Fragment>
            <MainLayout>
                <Component {...pageProps} />
            </MainLayout>
        </React.Fragment>
    );
}

export default MyApp;