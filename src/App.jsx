import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import QuickSort from './pages/quick_sort/quickSort';
import BinarySearch from './pages/binary_search/binarySearch';
import MergeSort from './pages/merge_sort/mergeSort';
import { ArrayProvider } from './provider/arrayContext';
import './App.css';

function App() {
    return (
        <ArrayProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate to="/quick-sort" />} />
                    <Route path="/quick-sort" element={<QuickSort />} />
                    <Route path="/binary-search" element={<BinarySearch />} />
                    <Route path="/merge-sort" element={<MergeSort />} />
                </Routes>
            </BrowserRouter>
        </ArrayProvider>
    );
}

export default App;
