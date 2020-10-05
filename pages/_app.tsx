import { Provider } from 'react-redux';
import React from "react";
import MainLayout from "../layouts/MainLayout";
import { createStore } from 'redux';
import storeRoot from '../store';

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
            <MainLayout>
                <Component {...pageProps} />
            </MainLayout>
        </Provider>
    );
}

export default MyApp;