import React, { createContext, useContext, useState, useEffect } from 'react';

const ArrayContext = createContext();

export const ArrayProvider = ({ children }) => {
    const [array, setArray] = useState(() => {
        const savedArray = localStorage.getItem('array');
        return savedArray ? JSON.parse(savedArray) : [1, 3, 5, 4];
    });

    useEffect(() => {
        localStorage.setItem('array', JSON.stringify(array));
    }, [array]);

    const addElement = (element) => {
        setArray((prevArray) => [...prevArray, element]);
    };

    const removeElement = (index) => {
        setArray((prevArray) => prevArray.filter((_, i) => i !== index));
    };

    return (
        <ArrayContext.Provider value={{ array, setArray, addElement, removeElement }}>
            {children}
        </ArrayContext.Provider>
    );
};

export const useArray = () => {
    return useContext(ArrayContext);
};
