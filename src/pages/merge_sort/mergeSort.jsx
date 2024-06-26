import React, { useState } from 'react';
import Navigation from '../../common/navigation/navigation';
import Node from '../../common/node/node';
import { useArray } from '../../provider/arrayContext';
import './mergeSort.css';

const MergeSort = () => {
    const { array, setArray, addElement, removeElement } = useArray();
    const [isUpdating, setIsUpdating] = useState(false);
    const [activeIndexes, setActiveIndexes] = useState([]);
    
    const handleArrayClick = () => {
        setIsUpdating((prev) => !prev);
    };

    const handleSort = async () => {
        const arr = [...array];
        await mergeSort(arr, 0, arr.length - 1);
        setArray(arr);
    };

    const mergeSort = async (arr, left, right) => {
        if (left < right) {
            const mid = Math.floor((left + right) / 2);
            
            await mergeSort(arr, left, mid);
            await mergeSort(arr, mid + 1, right);
            
            await merge(arr, left, mid, right);
        }
    };

    const merge = async (arr, left, mid, right) => {
        const n1 = mid - left + 1;
        const n2 = right - mid;
        const leftArr = new Array(n1);
        const rightArr = new Array(n2);

        for (let i = 0; i < n1; i++) {
            leftArr[i] = arr[left + i];
        }
        for (let j = 0; j < n2; j++) {
            rightArr[j] = arr[mid + 1 + j];
        }

        let i = 0, j = 0, k = left;
        
        while (i < n1 && j < n2) {
            setActiveIndexes([left + i, mid + 1 + j]);
            await new Promise(resolve => setTimeout(resolve, 500));

            if (leftArr[i] <= rightArr[j]) {
                arr[k] = leftArr[i];
                i++;
            } else {
                arr[k] = rightArr[j];
                j++;
            }
            setArray([...arr]);  // Update the array state
            k++;
        }

        while (i < n1) {
            setActiveIndexes([left + i]);
            await new Promise(resolve => setTimeout(resolve, 500));

            arr[k] = leftArr[i];
            setArray([...arr]);  // Update the array state
            i++;
            k++;
        }

        while (j < n2) {
            setActiveIndexes([mid + 1 + j]);
            await new Promise(resolve => setTimeout(resolve, 500));

            arr[k] = rightArr[j];
            setArray([...arr]);  // Update the array state
            j++;
            k++;
        }

        setActiveIndexes([]);
    };

    return (
        <div className="MergeSort">
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
}

export default MergeSort;
