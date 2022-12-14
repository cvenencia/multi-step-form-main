import React, { createContext, useState } from 'react';

const FormContext = createContext();

function FormProvider({ children }) {
    const [formData, setFormData] = useState(null);
    const [currentSection, setCurrentSection] = useState(0);
    const [validator, setValidator] = useState();
    const [errors, setErrors] = useState({});

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
            }}
        >
            {children}
        </FormContext.Provider>
    );
}

export { FormContext, FormProvider };
