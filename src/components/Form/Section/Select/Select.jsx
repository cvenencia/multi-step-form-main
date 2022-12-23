import React, {
    createRef,
    useCallback,
    useContext,
    useEffect,
    useRef,
} from 'react';
import st from './Select.module.scss';
import gSt from '../global.module.scss';
import { FormContext } from '../../../../contexts/FormContext';
import useCheckbox from '../../../ui/Checkbox/Checkbox';

export default function Select({ data, sectionIndex }) {
    const {
        planType,
        selectedOptions,
        setSelectedOptions,
        setPlanType,
        setValidator,
        currentSection,
        errors,
        setErrors,
    } = useContext(FormContext);
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

    const validator = useCallback(() => {
        if (selectedOptions.length === 0) {
            setErrors({ message: 'Select a plan' });
        } else {
            setErrors({});
        }
    }, [selectedOptions, setErrors]);

    useEffect(() => {
        setPlanType(checked ? 'yearly' : 'monthly');
    }, [checked, setPlanType]);

    useEffect(() => {
        if (currentSection === sectionIndex) setValidator(() => validator);
    }, [setValidator, currentSection, sectionIndex, validator]);

    return (
        <>
            <h2 className={`${gSt.title}`}>{data.title}</h2>
            <h3 className={`${gSt.subtitle}`}>{data.subtitle}</h3>
            <div className={`${st.optionsContainer}`}>
                {data.options.map((option, index) => (
                    <React.Fragment key={index}>
                        <input
                            type='radio'
                            name={data.name}
                            id={`option-${option.label}`}
                            className='hide'
                            onChange={() => handleChange(option)}
                            value={option.value}
                        />
                        <div
                            className={`${st.option} ${
                                errors.message ? st.error : ''
                            } b-radius`}
                            data-index={index}
                            onClick={activateOption}
                            onKeyDown={activateOption}
                            tabIndex={0}
                        >
                            <img
                                src={option.iconURL}
                                alt={`Icon for ${option.label} option`}
                            />
                            <div>
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
                        </div>
                    </React.Fragment>
                ))}
            </div>
            {errors.message ? (
                <div className={st.errorMessage}>{errors.message}</div>
            ) : undefined}
            <div className={st.planSelectorContainer}>
                <label
                    className={`${!checked ? st.checked : undefined} ${
                        st.plan
                    }`}
                    htmlFor='planSelector'
                >
                    Monthly
                </label>
                <Checkbox name='planType' id='planSelector' value='yearly' />
                <label
                    className={`${checked ? st.checked : undefined} ${st.plan}`}
                    htmlFor='planSelector'
                >
                    Yearly
                </label>
            </div>
        </>
    );
}
