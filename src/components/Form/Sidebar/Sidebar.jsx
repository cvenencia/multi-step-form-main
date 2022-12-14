import React, { useContext } from 'react';
import { FormContext } from '../../../contexts/FormContext';
import { RadioInput } from '.';
import st from './Sidebar.module.scss';

export default function Sidebar() {
    const { formData } = useContext(FormContext);

    return (
        <div className={`${st.container} b-radius`}>
            {formData.map((section, index) => (
                <RadioInput key={index} data={section} index={index} />
            ))}
            <RadioInput index={formData.length} />
        </div>
    );
}
