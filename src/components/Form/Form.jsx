import React, { useEffect, useState, useContext } from 'react';
import Section from './Section';
import Controls from './Controls';
import Sidebar from './Sidebar';
import { FormContext } from '../../contexts/FormContext';
import { fetchFormData } from '../../services/fakeApi';

export default function Form() {
    const [loading, setLoading] = useState(true);
    const { formData, setFormData } = useContext(FormContext);

    useEffect(() => {
        fetchFormData().then(setFormData);
    }, [setFormData]);

    useEffect(() => {
        if (formData) setLoading(false);
    }, [formData]);

    return (
        <div className='container'>
            {loading && 'Loading'}
            {!loading && (
                <>
                    <Sidebar />
                    <form>
                        {formData.map((section, index) => (
                            <Section
                                key={`section-${index}`}
                                index={index}
                                data={section}
                            />
                        ))}
                        <Section data={{}} index={formData.length} />
                        <Controls />
                    </form>
                </>
            )}
        </div>
    );
}
