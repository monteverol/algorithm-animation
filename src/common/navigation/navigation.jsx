import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LuBinary } from "react-icons/lu";
import { SiQuicktime } from "react-icons/si";
import { FaCodeMerge, FaCheck } from "react-icons/fa6";
import { MdDataArray } from "react-icons/md";
import './navigation.css';

const Navigation = ({ onArrayClick, onReadyClick }) => {
    // Icons Color
    const color = "#2d4040";
    const navigate = useNavigate();
    const location = useLocation();

    const handleQuickSort = () => {
        navigate('/quick-sort');
    }

    const handleBinarySearch = () => {
        navigate('/binary-search');
    }

    const handleMergeSort = () => {
        navigate('/merge-sort');
    }

    return (
        <div className="Navigation">
            <div className="upper">
                <div
                    className={`selection ${location.pathname === '/quick-sort' ? 'selected' : ''}`}
                    onClick={handleQuickSort}
                >
                    <SiQuicktime size="6em" color={color} />
                </div>
                <div
                    className={`selection ${location.pathname === '/binary-search' ? 'selected' : ''}`}
                    onClick={handleBinarySearch}
                >
                    <LuBinary size="6em" color={color} />
                </div>
                <div
                    className={`selection ${location.pathname === '/merge-sort' ? 'selected' : ''}`}
                    onClick={handleMergeSort}
                >
                    <FaCodeMerge size="6em" color={color} />
                </div>
            </div>
            <div className="lower">
                <div className="selection array" onClick={onArrayClick}>
                    <MdDataArray size="6em" color={color} />
                </div>
                <div className="selection confirm">
                    <FaCheck size="6em" color={color} onClick={onReadyClick} />
                </div>
            </div>
        </div>
    );
}

export default Navigation;
