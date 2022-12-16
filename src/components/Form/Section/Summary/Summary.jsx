import React, { useContext, useEffect, useState } from 'react';
import { FormContext } from '../../../../contexts/FormContext';
import st from './Summary.module.scss';
import gSt from '../global.module.scss';

export default function Summary() {
    const { selectedOptions, checkedAddOns, planType, setCurrentSection } =
        useContext(FormContext);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        let total = 0;
        selectedOptions.forEach(section => {
            const monthly = section.option.prices.month;
            const yearly = section.option.prices.year;
            total += planType === 'monthly' ? monthly : yearly;
        });
        checkedAddOns.forEach(section => {
            section.addons.forEach(addon => {
                const monthly = addon.prices.month;
                const yearly = addon.prices.year;
                total += planType === 'monthly' ? monthly : yearly;
            });
        });
        setTotal(total);
    }, [planType, selectedOptions, checkedAddOns]);

    return (
        <>
            <h2 className={`${gSt.title}`}>Finishing up</h2>
            <h3 className={`${gSt.subtitle}`}>
                Double-check everything looks OK before confirming.
            </h3>
            <div className={`${st.container} b-radius`}>
                {selectedOptions.map((section, index) => (
                    <React.Fragment key={index}>
                        <div className={st.selectContainer}>
                            <div>
                                <p>
                                    {section.option.label}{' '}
                                    {planType === 'monthly'
                                        ? '(Monthly)'
                                        : '(Yearly)'}
                                </p>
                                <button
                                    type='button'
                                    onClick={() =>
                                        setCurrentSection(section.sectionIndex)
                                    }
                                >
                                    Change
                                </button>
                            </div>
                            <div className={st.price}>
                                $
                                {planType === 'monthly'
                                    ? section.option.prices.month
                                    : section.option.prices.year}
                                /{planType === 'monthly' ? 'mo' : 'yr'}
                            </div>
                        </div>
                        <hr />
                    </React.Fragment>
                ))}

                {checkedAddOns.map((section, index) => (
                    <React.Fragment key={index}>
                        <div className={st.addOnsContainer}>
                            {section.addons.map((addon, index) => (
                                <div key={index} className={st.addOnContainer}>
                                    <p>{addon.label}</p>
                                    <div className={st.price}>
                                        +$
                                        {planType === 'monthly'
                                            ? addon.prices.month
                                            : addon.prices.year}
                                        /{planType === 'monthly' ? 'mo' : 'yr'}
                                    </div>
                                </div>
                            ))}
                        </div>
                        {index !== checkedAddOns.length - 1 ? (
                            <hr />
                        ) : undefined}
                    </React.Fragment>
                ))}
            </div>

            <div className={st.totalContainer}>
                <div className={st.label}>
                    Total (per {planType === 'monthly' ? 'month' : 'year'})
                </div>
                <div className={st.total}>
                    ${total}/{planType === 'monthly' ? 'mo' : 'yr'}
                </div>
            </div>
        </>
    );
}
