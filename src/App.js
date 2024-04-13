import * as React from "react";

import {NextUIProvider, Input} from "@nextui-org/react";
import './App.scss';

export default function App() {
  return (
    <NextUIProvider>
      <div className="app">
        <div className={"pageTitle"}>
          2024 Tax Calculator
        </div>
        <Input
          type="number"
          label="Earned Income Since Last Withholding"
          placeholder={" " /*this is necessary because the label defaults to inside if there is no placeholder*/}
          labelPlacement="outside"
        />
      </div>
    </NextUIProvider>
  );
}

//to add to input later to control
/*onValueChange={handleCenterChange}
  value={formValues.center}*/