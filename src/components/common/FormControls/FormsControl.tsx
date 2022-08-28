import React from 'react';
import styles from './FormsControls.module.css'
//@ts-ignore


const TextArea = ({input, meta, ...props}) => {
        return (
        <div className={styles.formControl + " " + styles.error }>
            <textarea     {...input} {...props}  />


        </div>
    );
};

export default TextArea;