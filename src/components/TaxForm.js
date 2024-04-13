import React from 'react';
import {
  Input,
  Select,
  SelectItem,
  Checkbox
} from "@nextui-org/react";
import CurrencyInput from "./CurrencyInput";

// TODO: move this to a separate file
const states = [
  {label: "Kentucky", value: "KY"},
];

//TODO: control components with state

const TaxForm = ({formValues, setFormValues}) => {
  // Component logic goes here

  return (
    <div className="taxForm">
      <CurrencyInput 
        placeholder="0.00" 
        label="Earned Income Since Last Withholding"
        value={formValues.earnedIncome}
        onChange={(value) => setFormValues({...formValues, earnedIncome: value})}
      />
      <Select 
        label="State" 
        placeholder={" " /*this is necessary because the label defaults to inside if there is no placeholder*/}
        labelPlacement="outside"
        value={formValues.state}
        onChange={(value) => setFormValues({...formValues, state: value})}
      >
        {states.map((state) => (
          <SelectItem key={state.value} value={state.value}>
            {state.label}
          </SelectItem>
        ))}
      </Select>
      <Checkbox
        defaultSelected={formValues.selfEmployed}
        onChange={(value) => setFormValues({...formValues, selfEmployed: value})}
      >
        I'm self employed
      </Checkbox>
      <div className="dateWrapper">
        <Input
          defaultValue={new Date().toISOString().split('T')[0]}
          type="date"
          label="Pay Date"
          labelPlacement="outside"
        />
        <span className="dateSpacer"/>
        <Input
          defaultValue={new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
          type="date"
          label="Last Pay Date"
          labelPlacement="outside"
        />
      </div>
    </div>
  );
};

export default TaxForm;