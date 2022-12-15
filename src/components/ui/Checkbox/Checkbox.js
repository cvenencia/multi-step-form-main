import React, { useCallback, useState } from 'react';
import st from './Checkbox.module.scss';

export default function useCheckbox() {
    const [checked, setChecked] = useState(false);
    const Checkbox = useCallback(
        ({ name, id }) => (
            <label className={st.switch}>
                <input
                    className={st.input}
                    type='checkbox'
                    name={name}
                    id={id}
                    onChange={e => setChecked(e.target.checked)}
                />
                <span className={`${st.slider} ${st.round}`}></span>
            </label>
        ),
        []
    );
    return [Checkbox, checked];
}
