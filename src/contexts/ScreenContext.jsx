import React, { createContext, useEffect, useState } from 'react';

export const ScreenContext = createContext();
const ScreenContextProvider = ({ children }) => {
    const [height, setHeight] = useState(window.innerHeight);
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        window.addEventListener('resize', () => {
            console.log(window.innerHeight);
            setHeight(window.innerHeight);
            setWidth(window.innerWidth);
        });
        return () => {
            window.addEventListener('resize', () => {
                console.log(window.innerHeight);
                setHeight(window.innerHeight);
                setWidth(window.innerWidth);
            });
        };
    }, []);
    return <ScreenContext.Provider value={{ width, height }}>{children}</ScreenContext.Provider>;
};

export default ScreenContextProvider;
