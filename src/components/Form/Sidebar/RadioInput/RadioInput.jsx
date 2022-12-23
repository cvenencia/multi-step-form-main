import React, { useContext } from 'react';
import { FormContext } from '../../../../contexts/FormContext';
import st from './RadioInput.module.scss';

export default function RadioInput({ data, index }) {
    const { currentSection, formData } = useContext(FormContext);

    return (
        <div className={st.container}>
            <input
                className={st.input}
                type='radio'
                name='form-stage'
                id={`radio-${index}`}
                checked={
                    index === currentSection ||
                    (currentSection === formData.length + 1 &&
                        index === formData.length)
                }
                readOnly
            />
            <label
                className={`${st.label} ${st.index}`}
                htmlFor={`radio-${index}`}
            >
                {index + 1}
            </label>
            <div className={st.labelContainer}>
                <div className={`${st.label} ${st.step}`}>
                    <label htmlFor={`radio-${index}`}>STEP {index + 1}</label>
                </div>
                <label
                    className={`${st.label} ${st.title}`}
                    htmlFor={`radio-${index}`}
                >
                    {data?.sideTitle || 'Summary'}
                </label>
            </div>
        </div>
    );
}
