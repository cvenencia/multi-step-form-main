import React from 'react';

export default function Data({ data }) {
    return (
        <>
            <p style={{ fontWeight: 'bold' }}>Data Section</p>
            {data.title} {data.subtitle}
        </>
    );
}
