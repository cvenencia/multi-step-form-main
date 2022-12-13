import React from 'react';
import { FormProvider } from './contexts/FormContext';
import Form from './components/Form';

export default function App() {
    return (
        <FormProvider>
            <Form />
        </FormProvider>
    );
}
