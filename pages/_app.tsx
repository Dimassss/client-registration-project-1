import { Provider } from 'react-redux';
import React from "react";
import MainLayout from "../layouts/MainLayout";
import { createStore } from 'redux';
import storeRoot from '../store';
import Head from 'next/head';
import { CssBaseline, NoSsr, ServerStyleSheets } from '@material-ui/core';

const store = createStore(storeRoot.reducer);

function MyApp({Component, pageProps}){
    React.useEffect(() => {
        //Remove the ssr injected CSS
        const jssStyles = document.querySelector('#jss-server-side');
        if(jssStyles){
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return (
        <Provider store={store}>
            <Head>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <MainLayout>
                <CssBaseline/>
                <NoSsr>
                    <Component {...pageProps} />
                </NoSsr>
            </MainLayout>
        </Provider>
    );
}

export default MyApp;