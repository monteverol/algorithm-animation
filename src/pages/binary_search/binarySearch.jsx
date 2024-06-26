import React, { useState } from 'react';
import Navigation from '../../common/navigation/navigation';
import Node from '../../common/node/node';
import { useArray } from '../../provider/arrayContext';
import './binarySearch.css';

const BinarySearch = () => {
    const { array, addElement, removeElement } = useArray();
    const [isUpdating, setIsUpdating] = useState(false);
    const [activeIndexes, setActiveIndexes] = useState([]);
    const [foundIndex, setFoundIndex] = useState(null);

    const handleArrayClick = () => {
        setIsUpdating((prev) => !prev);
    };

    const handleSearch = (target) => {
        const sortedArray = [...array].sort((a, b) => a - b);
        binarySearch(sortedArray, target);
    };

    const binarySearch = async (sortedArray, target) => {
        setFoundIndex(null);
        let left = 0;
        let right = sortedArray.length - 1;
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            setActiveIndexes([mid]);

            await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 500ms

            if (sortedArray[mid] === target) {
                setFoundIndex(mid);
                setActiveIndexes([]);
                await new Promise(resolve => setTimeout(resolve, 3000)); // Wait for 3 seconds
                setFoundIndex(null);
                return;
            } else if (sortedArray[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        setActiveIndexes([]);
    };

    return (
        <div className="BinarySearch">
            <Navigation onArrayClick={handleArrayClick} onReadyClick={() => handleSearch(parseInt(prompt('Enter value to search:')))} />
            <Node
                array={array}
                isUpdating={isUpdating}
                activeIndexes={activeIndexes}
                foundIndex={foundIndex}
                onAddElement={addElement}
                onRemoveElement={removeElement}
            />
        </div>
    );
};

export default BinarySearch;
