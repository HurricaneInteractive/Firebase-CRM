import React from 'react';

export const CustomerSingle = ({ match }) => {
    return <h1>Hello {match.params.uid}!</h1>
}