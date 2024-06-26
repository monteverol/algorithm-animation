import React, { useState } from 'react';
import './modal.css';

const Modal = ({ isOpen, onClose, onAddElement }) => {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = () => {
        onAddElement(Number(inputValue));
        setInputValue('');
    };

    const handleAddElement = (e) => {
        if (e.length <= 3) {
            setInputValue(e)
        }
    }

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Add New Element</h2>
                <div className="bottom">
                    <input
                        type="number"
                        value={inputValue}
                        onChange={(e) => handleAddElement(e.target.value)}
                        placeholder="Value"
                        maxLength="3"
                    />
                    <button onClick={handleSubmit} className="add">Add</button>
                    <button onClick={onClose} className="close">Close</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
