import React, { useContext } from 'react';
import { AddOn } from '.';
import { FormContext } from '../../../../contexts/FormContext';
import gSt from '../global.module.scss';
import st from './AddOns.module.scss';

export default function AddOns({ data, sectionIndex }) {
    const { checkedAddOns, setCheckedAddOns } = useContext(FormContext);
    const handleChange = (addon, keep) => {
        const section = checkedAddOns.find(
            section => section.sectionIndex === sectionIndex
        );
        let addons;
        if (section) {
            addons = keep
                ? [...section.addons, addon]
                : section.addons.filter(a => a.label !== addon.label);
        } else {
            addons = keep ? [addon] : [];
        }
        setCheckedAddOns(sections => [
            ...sections.filter(
                section => section.sectionIndex !== sectionIndex
            ),
            {
                sectionIndex,
                addons: addons,
            },
        ]);
    };

    return (
        <section id={data.id}>
            <h2 className={`${gSt.title}`}>{data.title}</h2>
            <h3 className={`${gSt.subtitle}`}>{data.subtitle}</h3>
            <div className={st.container}>
                {data.addons.map((addon, index) => (
                    <AddOn
                        key={index}
                        data={addon}
                        handleChange={handleChange}
                    />
                ))}
            </div>
        </section>
    );
}
