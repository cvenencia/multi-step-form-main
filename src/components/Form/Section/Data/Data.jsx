import React, {
    useRef,
    createRef,
    useEffect,
    useContext,
    useCallback,
} from 'react';
import { FormContext } from '../../../../contexts/FormContext';
import st from './Data.module.scss';
import gSt from '../global.module.scss';

export default function Data({ data, sectionIndex }) {
    const refs = useRef(data.fields.map(() => createRef()));
    const { setValidator, errors, setErrors, currentSection } =
        useContext(FormContext);

    const validator = useCallback(() => {
        const errors = {};
        refs.current.forEach((ref, index) => {
            if (!ref.current.checkValidity()) {
                errors[index] = 'This field is required';
            } else {
                delete errors[index];
            }
        });
        setErrors(errors);
    }, [setErrors]);

    useEffect(() => {
        if (currentSection === sectionIndex) setValidator(() => validator);
    }, [setValidator, currentSection, sectionIndex, validator]);

    return (
        <>
            <h2 className={`${gSt.title}`}>{data.title}</h2>
            <h3 className={`${gSt.subtitle}`}>{data.subtitle}</h3>
            <div className={`${st.container}`}>
                {data.fields.map((field, index) => (
                    <div key={index} className={`${st.inputWrapper}`}>
                        <div className={`${st.labelWrapper}`}>
                            <label htmlFor={`data-${field.label}`}>
                                {field.label}{' '}
                                {!field.required && (
                                    <span className={st.optional}>
                                        (optional)
                                    </span>
                                )}
                            </label>
                            <label
                                className={`${
                                    errors[index] ? st.errorLabel : 'hide'
                                }`}
                                htmlFor={`data-${field.label}`}
                            >
                                {errors[index]}
                            </label>
                        </div>
                        <input
                            className={errors[index] && st.errorInput}
                            ref={refs.current[index]}
                            id={`data-${field.label}`}
                            type={field.type}
                            placeholder={field.placeholder}
                            required={field.required}
                            name={field.name}
                        />
                    </div>
                ))}
            </div>
        </>
    );
}
