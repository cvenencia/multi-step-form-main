import React, { useContext, useEffect, useState } from 'react';
import { FormContext } from '../../../contexts/FormContext';
import st from './Controls.module.scss';

export default function Controls() {
    const { formData, currentSection, setCurrentSection, validator, errors } =
        useContext(FormContext);
    const [action, setAction] = useState();

    const handleNext = () => {
        setAction('next');
        validator();
    };

    useEffect(() => {
        if (Object.keys(errors).length === 0 && action === 'next') {
            setCurrentSection(c => c + 1);
        }
    }, [errors, action, setCurrentSection]);

    useEffect(() => {}, [errors]);

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
                type={currentSection === formData.length ? 'submit' : 'button'}
                onClick={handleNext}
            >
                {currentSection === formData.length ? 'Confirm' : 'Next Step'}
            </button>
        </div>
    );
}
