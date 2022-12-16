import React, { createContext, useState } from 'react';

const FormContext = createContext();

function FormProvider({ children }) {
    const [formData, setFormData] = useState(null);
    const [currentSection, setCurrentSection] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [checkedAddOns, setCheckedAddOns] = useState([]);
    const [validator, setValidator] = useState();
    const [errors, setErrors] = useState({});
    const [planType, setPlanType] = useState('monthly');

    return (
        <FormContext.Provider
            value={{
                formData,
                setFormData,
                currentSection,
                setCurrentSection,
                validator,
                setValidator,
                errors,
                setErrors,
                planType,
                setPlanType,
                selectedOptions,
                setSelectedOptions,
                checkedAddOns,
                setCheckedAddOns,
            }}
        >
            {children}
        </FormContext.Provider>
    );
}

export { FormContext, FormProvider };
