import React from 'react';
import {
  Input,
  Select,
  SelectItem,
  Checkbox
} from "@nextui-org/react";
import { standardDeduction } from '../data/taxBrackets';
import CurrencyInput from "./CurrencyInput";

// TODO: move this to a separate file
const states = [
  {label: "Kentucky", value: "KY"},
];

//TODO: debounce checkbox
//TODO: make responsive for mobile


const TaxForm = ({formValues, setFormValues}) => {

  return (
    <div className="taxForm">
      <CurrencyInput 
        placeholder="0.00" 
        label="Earned Income Since Last Withholding"
        value={formValues.earnedIncome}
        onChange={(value) => {
          setFormValues({...formValues, earnedIncome: value})
        }}
      />
      <Select 
        label="State" 
        placeholder={" " /*this is necessary because the label defaults to inside if there is no placeholder*/}
        labelPlacement="outside"
        value={formValues.state}
        onChange={(event) => {
          setFormValues({...formValues, state: event.target.value})
        }}
      >
        {states.map((state) => (
          <SelectItem key={state.value} value={state.value}>
            {state.label}
          </SelectItem>
        ))}
      </Select>
      <Checkbox
        defaultSelected={formValues.selfEmployed}
        onChange={(event) => {
          setFormValues({...formValues, selfEmployed: !formValues.selfEmployed})
        }}
      >
        I'm self employed
      </Checkbox>
      <div className="dateWrapper">
        <Input
          defaultValue={new Date().toISOString().split('T')[0]}
          type="date"
          label="Pay Date"
          labelPlacement="outside"
          value={formValues.payDate}
          onChange={(event) => setFormValues({...formValues, payDate: event.target.value})}
        />
        <span className="dateSpacer"/>
        <Input
          defaultValue={new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
          type="date"
          label="Last Pay Date"
          labelPlacement="outside"
          value={formValues.lastPayDate}
          onChange={(event) => {
            setFormValues({...formValues, lastPayDate: event.target.value})
          }}
        />
      </div>

      <CurrencyInput 
        placeholder={standardDeduction.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} 
        label="Yearly Deductions"
        value={formValues.yearlyDeduction}
        onChange={(value) => {
          setFormValues({...formValues, yearlyDeduction: value})
        }}
      />
    </div>
  );
};

export default TaxForm;