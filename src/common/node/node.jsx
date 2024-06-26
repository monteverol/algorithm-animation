import React, { useState } from 'react';
import Modal from '../modal/modal';
import './node.css';

const Node = ({ array, isUpdating, activeIndexes, foundIndex, onAddElement, onRemoveElement }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [removingIndex, setRemovingIndex] = useState(null);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleAddElement = (element) => {
        onAddElement(element);
        setIsModalOpen(false);
    };

    const handleRemoveClick = (index) => {
        setRemovingIndex(index);
        setTimeout(() => {
            onRemoveElement(index);
            setRemovingIndex(null);
        }, 500); 
    } 

    return (
        <div className={`Node ${isUpdating ? 'onUpdate' : ''}`}>
            <div className="array">
                {array.map((value, index) => (
                    <div
                        className={`element ${activeIndexes.includes(index) ? 'active' : ''} ${index === removingIndex ? 'removing' : ''} ${index === foundIndex ? 'found' : ''}`}
                        key={index}
                        onClick={() => isUpdating && handleRemoveClick(index)}
                    >
                        <span>{value}</span>
                    </div>
                ))}
                {isUpdating && (
                    <div className="element add" onClick={handleOpenModal}>
                        <span>+</span>
                    </div>
                )}
            </div>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} onAddElement={handleAddElement} />
        </div>
    );
};

export default Node;