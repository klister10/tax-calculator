import React, {useState} from "react";

import {
  NextUIProvider
} from "@nextui-org/react";
import './App.scss';
import TaxForm from "./components/TaxForm";
import ResultsModal from "./components/ResultsModal";
import moment from "moment";



export default function App() {
  const [formValues, setFormValues] = useState({
    state: "KY",
    earnedIncome: 0,
    selfEmployed: true,
    payDate: moment().toDate(),
    lastPayDate: moment().subtract(7, 'days').toDate(),
  });

  const [showResults, setShowResults] = useState(false);

  const openResultsModal = () => {
    setShowResults(true);
  }

  const closeResultsModal = () => {
    setShowResults(false);
  }

  return (
    <NextUIProvider>
      <div className="app">
        <div className={"pageTitle"}>
          2024 Tax Calculator
        </div>
        {!showResults &&
          <TaxForm formValues={formValues} setFormValues={setFormValues}/>
        }
        {showResults &&
          <ResultsModal formValues={formValues} closeResultsModal={closeResultsModal}/>
        }
        <div className="submitButton" onClick={openResultsModal}>
          Calculate Withholding
        </div>
      </div>
      
    </NextUIProvider>
  );
}

//to add to input later to control
/*onValueChange={handleCenterChange}
  value={formValues.center}*/