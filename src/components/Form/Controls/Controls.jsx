import React, { useContext } from 'react';
import { FormContext } from '../../../contexts/FormContext';
import st from './Controls.module.scss';

export default function Controls() {
    const { formData, currentSection, setCurrentSection } =
        useContext(FormContext);
    return (
        <div className={`${st.container}`}>
            <button
                className={`${currentSection === 0 ? 'hide' : st.back} ${
                    st.button
                }`}
                type='button'
                onClick={() => setCurrentSection(c => c - 1)}
            >
                Go back
            </button>
            <button
                className={`${
                    currentSection === formData.length ? st.confirm : st.next
                } ${st.button} b-radius`}
                type='button'
                onClick={() => setCurrentSection(c => c + 1)}
            >
                {currentSection === formData.length ? 'Confirm' : 'Next Step'}
            </button>
        </div>
    );
}
