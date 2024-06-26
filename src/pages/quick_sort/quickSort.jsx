import React, { useState } from 'react';
import Navigation from '../../common/navigation/navigation';
import Node from '../../common/node/node';
import { useArray } from '../../provider/arrayContext';
import './quickSort.css';

const QuickSort = () => {
    const { array, setArray, addElement, removeElement } = useArray();
    const [isUpdating, setIsUpdating] = useState(false);
    const [activeIndexes, setActiveIndexes] = useState([]);

    const handleArrayClick = () => {
        setIsUpdating((prev) => !prev);
    };

    const handleSort = () => {
        const steps = [];
        const arr = [...array];
        quickSort(arr, 0, arr.length - 1, steps);
        executeAnimation(steps);
    };

    const quickSort = (arr, low, high, steps) => {
        if (low < high) {
            const pi = partition(arr, low, high, steps);
            quickSort(arr, low, pi - 1, steps);
            quickSort(arr, pi + 1, high, steps);
        }
    };

    const partition = (arr, low, high, steps) => {
        const pivot = arr[high];
        let i = low - 1;
        for (let j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
                steps.push({ array: [...arr], activeIndexes: [i, j] });
            }
        }
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        steps.push({ array: [...arr], activeIndexes: [i + 1, high] });
        return i + 1;
    };

    const executeAnimation = (steps) => {
        steps.forEach((step, index) => {
            setTimeout(() => {
                setArray(step.array);
                setActiveIndexes(step.activeIndexes);
            }, index * 1000); // Adjust the delay as needed
        });
        setTimeout(() => {
            setActiveIndexes([]); // Clear active indexes after the animation is complete
        }, steps.length * 1000);
    };

    return (
        <div className="QuickSort">
            <Navigation onArrayClick={handleArrayClick} onReadyClick={handleSort} />
            <Node
                array={array}
                isUpdating={isUpdating}
                activeIndexes={activeIndexes}
                onAddElement={addElement}
                onRemoveElement={removeElement}
            />
        </div>
    );
};

export default QuickSort;
