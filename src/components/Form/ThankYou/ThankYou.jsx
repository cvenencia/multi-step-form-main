import React, { useContext } from 'react';
import { FormContext } from '../../../contexts/FormContext';
import st from './ThankYou.module.scss';
import { TailSpin } from 'react-loader-spinner';

export default function ThankYou({ index }) {
    const { currentSection, success, sending } = useContext(FormContext);

    return (
        index === currentSection && (
            <div className={`${st.container}`}>
                {sending ? (
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
                ) : success ? (
                    <>
                        <img src='/images/icon-thank-you.svg' alt='Thank you' />
                        <h2>Thank you!</h2>
                        <p>
                            Thanks for confirming your subscription! We hope you
                            have fun using our platform. If you ever need
                            support, please feel free to email us at
                            support@loremgaming.com.
                        </p>
                    </>
                ) : (
                    'Error'
                )}
            </div>
        )
    );
}
