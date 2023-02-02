import React from 'react';
import {Spin} from "antd";
const Preloader = () => {

    return (
        <div  >
            <Spin tip="Loading" size="large">
            </Spin>
        </div>
    );
};

export default Preloader;