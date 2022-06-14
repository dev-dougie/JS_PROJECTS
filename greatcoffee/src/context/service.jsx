import React, { useState } from 'react';
import { useEffect } from 'react';

export const DeviceContext = React.createContext();

const DeviceContextProvider = ({ children }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(
        () => {
            let deviceWidth = window.screen.width;
            deviceWidth <= 1024 && setIsMobile(true)
            return;
        }, []
    )

    return (
        <DeviceContext.Provider value={{ isMobile }}>
            {children}
        </DeviceContext.Provider>
    )
}

export default DeviceContextProvider;

