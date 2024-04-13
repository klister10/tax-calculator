import React from 'react';
import {
  Input
} from "@nextui-org/react";

const CurrencyInput = ({placeholder, label, onChange, value}) => {
  const handleChange = (e) => {
    const value = e.target.value.replace(/[^0-9.]/g, ''); // Remove non-numeric characters
    const formattedValue = parseFloat(value) || 0.00;
    onChange(formattedValue);
  };

  return (
    <div className="currencyInput">
      <span className="dollarPrefix">$</span>
      <Input
        placeholder={placeholder}
        type="text"
        label={label}
        labelPlacement="outside"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default CurrencyInput;