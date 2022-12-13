import React, { createContext, useState } from 'react';

const FormContext = createContext();

function FormProvider({ children }) {
    const [formData, setFormData] = useState(null);
    const [currentSection, setCurrentSection] = useState(0);

    return (
        <FormContext.Provider
            value={{ formData, setFormData, currentSection, setCurrentSection }}
        >
            {children}
        </FormContext.Provider>
    );
}

export { FormContext, FormProvider };
