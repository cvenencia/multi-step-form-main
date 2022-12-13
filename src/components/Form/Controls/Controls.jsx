import React, { useContext } from 'react';
import { FormContext } from '../../../contexts/FormContext';

export default function Controls() {
    const { setCurrentSection } = useContext(FormContext);
    return (
        <div>
            <button type='button' onClick={() => setCurrentSection(c => c - 1)}>
                Go back
            </button>
            <button type='button' onClick={() => setCurrentSection(c => c + 1)}>
                Next step
            </button>
        </div>
    );
}
