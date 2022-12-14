import React from 'react';
import { FormProvider } from './contexts/FormContext';
import Form from './components/Form';
import './global.scss';
import './reset.scss';

export default function App() {
    return (
        <FormProvider>
            <Form />
        </FormProvider>
    );
}
