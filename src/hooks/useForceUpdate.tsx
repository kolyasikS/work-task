import React, {useState} from 'react';

const UseForceUpdate = () => {
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update state to force render
};

export default UseForceUpdate;