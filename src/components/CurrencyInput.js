import React from 'react';
import {
  Input
} from "@nextui-org/react";
import './currencyInput.scss';

const CurrencyInput = ({placeholder, label}) => {
  return (
    <div className="currencyInput">
      <span className="dollarPrefix">$</span>
      <Input
        placeholder={placeholder}
        type="text"
        label={label}
        labelPlacement="outside"
      />
    </div>
  );
};

export default CurrencyInput;