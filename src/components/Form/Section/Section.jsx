import React, { useRef, useContext, useEffect } from 'react';
import { Data, Select, AddOns, Summary } from '.';
import { FormContext } from '../../../contexts/FormContext';
import st from './Section.module.scss';

import globalStyles from '../../../global.module.scss';

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
            sectionRef.current.classList.toggle(globalStyles.hide, true);
        } else {
            sectionRef.current.classList.toggle(globalStyles.hide, false);
        }
    }, [currentSection, index, sectionRef]);

    return (
        <section
            className={`${st.container}`}
            ref={sectionRef}
            id={`section-${index}`}
        >
            {CustomSection && <CustomSection data={data} />}
            {!CustomSection && 'ola'}
        </section>
    );
}
