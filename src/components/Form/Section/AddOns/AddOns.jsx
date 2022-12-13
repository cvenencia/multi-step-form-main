import React from 'react';

export default function AddOns({ data }) {
    return (
        <section id={data.id}>
            <p style={{ fontWeight: 'bold' }}>Add-ons Section</p>
            {data.title} {data.subtitle}
        </section>
    );
}
