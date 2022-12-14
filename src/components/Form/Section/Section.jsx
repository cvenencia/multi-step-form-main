import React, { useRef, useContext, useEffect } from 'react';
import { Data, Select, AddOns, Summary } from '.';
import { FormContext } from '../../../contexts/FormContext';

export default function Section({ data, index }) {
    const sectionRef = useRef();
    const { currentSection } = useContext(FormContext);

    const getSection = data => {
        switch (data.type) {
            case 'data':
                return Data;
            case 'select':
                return Select;
            case 'add-ons':
                return AddOns;
            default:
                return Summary;
        }
    };

    const CustomSection = getSection(data);
    useEffect(() => {
        if (currentSection !== index) {
            sectionRef.current.classList.toggle('hide', true);
        } else {
            sectionRef.current.classList.toggle('hide', false);
        }
    }, [currentSection, index, sectionRef]);

    return (
        <section ref={sectionRef} id={`section-${index}`}>
            {CustomSection && <CustomSection data={data} />}
        </section>
    );
}
