import React, { createRef, useContext, useEffect, useRef } from 'react';
import st from './Select.module.scss';
import gSt from '../global.module.scss';
import { FormContext } from '../../../../contexts/FormContext';
import useCheckbox from '../../../ui/Checkbox/Checkbox';

export default function Select({ data, sectionIndex }) {
    const { planType, setSelectedOptions, setPlanType } =
        useContext(FormContext);
    const refs = useRef(data.options.map(() => createRef()));
    const [Checkbox, checked] = useCheckbox();

    const activateOption = e => {
        if (
            e.type === 'click' ||
            (e.type === 'keydown' && e.code === 'Enter') ||
            e.code === 'Space'
        )
            refs.current[e.target.dataset.index]?.current.click();
    };

    const handleChange = option => {
        setSelectedOptions(sections => [
            ...sections.filter(
                section => section.sectionIndex !== sectionIndex
            ),
            { sectionIndex, option },
        ]);
    };

    useEffect(() => {
        setPlanType(checked ? 'yearly' : 'monthly');
    }, [checked, setPlanType]);

    return (
        <>
            <h2 className={`${gSt.title}`}>{data.title}</h2>
            <h3 className={`${gSt.subtitle}`}>{data.subtitle}</h3>
            <div className={`${st.optionsContainer}`}>
                {data.options.map((option, index) => (
                    <React.Fragment key={index}>
                        <input
                            type='radio'
                            name={`plan-type-${sectionIndex}`}
                            id={`option-${option.label}`}
                            className='hide'
                            onChange={() => handleChange(option)}
                        />
                        <div
                            className={`${st.option} b-radius`}
                            data-index={index}
                            onClick={activateOption}
                            onKeyDown={activateOption}
                            tabIndex={0}
                        >
                            <img
                                src={option.iconURL}
                                alt={`Icon for ${option.label} option`}
                            />
                            <label
                                ref={refs.current[index]}
                                htmlFor={`option-${option.label}`}
                            >
                                {option.label}
                            </label>
                            <div className={st.price}>
                                {planType === 'monthly'
                                    ? `$${option.prices.month}/mo`
                                    : `$${option.prices.year}/yr`}
                            </div>
                            <div className={st.yearDiscount}>
                                {planType === 'yearly' && data.yearDiscount}
                            </div>
                        </div>
                    </React.Fragment>
                ))}
            </div>
            <div className={st.planSelectorContainer}>
                <label
                    className={!checked ? st.checked : undefined}
                    htmlFor='planSelector'
                >
                    Monthly
                </label>
                <Checkbox name='plan' id='planSelector' />
                <label
                    className={checked ? st.checked : undefined}
                    htmlFor='planSelector'
                >
                    Yearly
                </label>
            </div>
        </>
    );
}
