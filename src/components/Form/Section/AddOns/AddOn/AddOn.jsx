import React, { useContext, useRef } from 'react';
import { FormContext } from '../../../../../contexts/FormContext';
import st from './AddOn.module.scss';

export default function AddOns({ data, handleChange }) {
    const { planType } = useContext(FormContext);
    const labelRef = useRef();
    const inputRef = useRef();

    return (
        <div
            className={`${st.container} ${
                inputRef.current?.checked ? st.checked : ''
            } b-radius`}
            onClick={() => labelRef.current.click()}
        >
            <div className={st.checkbox}>
                <input
                    className='hide'
                    type='checkbox'
                    name={data.name}
                    id={`addon-${data.label}`}
                    ref={inputRef}
                    onChange={() =>
                        handleChange(data, inputRef.current?.checked)
                    }
                />
                <label ref={labelRef} htmlFor={`addon-${data.label}`}></label>
            </div>
            <div className={st.label}>
                <label htmlFor={`addon-${data.label}`}>{data.label}</label>
                <p>{data.description}</p>
            </div>
            <div className={st.price}>
                +$
                {planType === 'monthly' ? data.prices.month : data.prices.year}/
                {planType === 'monthly' ? 'mo' : 'yr'}
            </div>
        </div>
    );
}
