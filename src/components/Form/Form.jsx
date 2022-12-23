import React, { useEffect, useState, useContext } from 'react';
import Section from './Section';
import Controls from './Controls';
import Sidebar from './Sidebar';
import { FormContext } from '../../contexts/FormContext';
import { fetchFormData } from '../../services/fakeApi';
import st from './Form.module.scss';
import ThankYou from './ThankYou';

export default function Form() {
    const [loading, setLoading] = useState(true);
    const { formData, setFormData, setSending, setSuccess } =
        useContext(FormContext);

    useEffect(() => {
        fetchFormData().then(setFormData);
    }, [setFormData]);

    useEffect(() => {
        if (formData) setLoading(false);
    }, [formData]);

    const handleSubmit = e => {
        e.preventDefault();
        setSending(true);
        // Simulate delay
        setTimeout(() => {
            const data = new FormData(e.target);
            console.log(Object.fromEntries(data));

            setSuccess(true);
            setSending(false);
        }, 2000);
    };

    return (
        <div className={`${st.megaContainer}`}>
            <div className={`${st.container} b-radius`}>
                {loading && 'Loading'}
                {!loading && (
                    <>
                        <Sidebar />
                        <form className={`${st.form}`} onSubmit={handleSubmit}>
                            {formData.map((section, index) => (
                                <Section
                                    key={`section-${index}`}
                                    index={index}
                                    data={section}
                                />
                            ))}
                            <Section data={{}} index={formData.length} />
                            <ThankYou index={formData.length + 1} />
                            <Controls />
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
