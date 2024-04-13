import * as React from "react";

import {
  NextUIProvider, 
  Input, 
  Select, 
  SelectItem,
  Checkbox
} from "@nextui-org/react";
import './App.scss';
import CurrencyInput from "./components/CurrencyInput";

// TODO: move this to a separate file
const states = [
  {label: "Kentucky", value: "KY"},
];

//TODO: control components with state

export default function App() {
  return (
    <NextUIProvider>
      <div className="app">
        <div className={"pageTitle"}>
          2024 Tax Calculator
        </div>
        <div className="formWrapper">
          <CurrencyInput placeholder="0.00" label="Earned Income Since Last Withholding"/>
          <Select 
            label="State" 
            placeholder={" " /*this is necessary because the label defaults to inside if there is no placeholder*/}
            labelPlacement="outside"
          >
            {states.map((state) => (
              <SelectItem key={state.value} value={state.value}>
                {state.label}
              </SelectItem>
            ))}
          </Select>
          <Checkbox defaultSelected>I'm self employed</Checkbox>
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
          <CurrencyInput placeholder="15,000.00" label="Yearly Deductions"/>
        </div>
        <div className="submitButton">
          Calculate Withholding
        </div>
      </div>
      
    </NextUIProvider>
  );
}

//to add to input later to control
/*onValueChange={handleCenterChange}
  value={formValues.center}*/