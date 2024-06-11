import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { extendTheme } from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react';
import { drawerTheme } from './theme/components/drawer';

const config = {
    initialColorMode: 'light',
    useSystemColorMode: false,
};
const styles = {
    global: (props) => ({
        //   'html, body': {
        //     fontSize: 'sm',
        //     color: props.colorMode === 'dark' ? 'white' : 'gray.600',
        //     lineHeight: 'tall',
        //   },
        //   a: {
        //     color: props.colorMode === 'dark' ? 'teal.300' : 'teal.500',
        //   },
    }),
};
const theme = extendTheme({
    config,
    styles,
    components: {
        Drawer: drawerTheme,
    },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <App />
        </ChakraProvider>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
