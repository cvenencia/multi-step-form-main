import React from 'react';

export default function Select({ data }) {
    return (
        <section id={data.id}>
            <p style={{ fontWeight: 'bold' }}>Select Section</p>
            {data.title} {data.subtitle}
        </section>
    );
}
