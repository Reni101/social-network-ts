import React from 'react';

type PropsType = {
    ContactTitle: string
    ContactValue: string | null
}

export const Contact = (props: PropsType) => {
    return (
        <div>
            <b>{props.ContactTitle} :</b>{props.ContactValue}
        </div>
    );
};
