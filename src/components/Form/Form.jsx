import React, { useEffect, useState, useContext } from 'react';
import Section from './Section';
import Controls from './Controls';
import Sidebar from './Sidebar';
import { FormContext } from '../../contexts/FormContext';
import { fetchFormData } from '../../services/fakeApi';
import st from './Form.module.scss';
import ThankYou from './ThankYou';
import { TailSpin } from 'react-loader-spinner';

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
        <main className={`${st.megaContainer}`}>
            <h1 className='sr-only'>Dynamic Form</h1>
            <div
                className={`${st.container} ${
                    loading ? st.loading : ''
                } b-radius`}
            >
                {loading && (
                    <TailSpin
                        height='80'
                        width='80'
                        color='hsl(213, 96%, 18%)'
                        ariaLabel='tail-spin-loading'
                        radius='1'
                        wrapperStyle={{}}
                        wrapperClass=''
                        visible={true}
                    />
                )}
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
        </main>
    );
}
