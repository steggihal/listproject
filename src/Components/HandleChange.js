import React from 'react';

const HandleChange = (props) => {

    const handleNameChange = function(e) {
    props(e.target.value)
  }
};

export default HandleChange;