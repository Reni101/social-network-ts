import React from 'react';
import styles from './FormsControls.module.css'
//@ts-ignore


const TextArea = ({input, meta, ...props}) => {

    return (
        <div className={styles.formControl + " " + styles.error}>
            <div><textarea     {...input} {...props}  /></div>


            {meta.touched && meta.error && <span>{meta.error}</span>}
        </div>
    );
};

export default TextArea;