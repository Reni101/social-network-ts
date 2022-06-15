import React from 'react';
import {store} from "./Redux/Redux-store";


const StoreContext = React.createContext(store)

export default StoreContext