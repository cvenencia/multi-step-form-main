import React, { useContext, useEffect, useState } from 'react';
import { FormContext } from '../../../contexts/FormContext';
import st from './Controls.module.scss';

export default function Controls() {
    const {
        formData,
        currentSection,
        setCurrentSection,
        validator,
        errors,
        sending,
        success,
    } = useContext(FormContext);
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

    const nextBtnClassName =
        currentSection === formData.length
            ? st.confirm
            : currentSection === formData.length + 1
            ? 'hide'
            : st.next;

    return (
        !sending &&
        !success && (
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
                    className={`${nextBtnClassName} ${st.button} b-radius`}
                    type={
                        currentSection === formData.length ? 'submit' : 'button'
                    }
                    onClick={handleNext}
                >
                    {currentSection === formData.length
                        ? 'Confirm'
                        : 'Next Step'}
                </button>
            </div>
        )
    );
}
