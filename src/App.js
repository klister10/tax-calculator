import React, {useState} from "react";

import {
  NextUIProvider
} from "@nextui-org/react";
import './App.scss';
import TaxForm from "./components/TaxForm";
import ResultsModal from "./components/ResultsModal";

//TODO: add UI to show breakdown



export default function App() {
  const [formValues, setFormValues] = useState({
    state: "KY",
    earnedIncome: 0,
    selfEmployed: true,
    payDate: new Date().toISOString().split('T')[0],
    lastPayDate: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    yearlyBusinessExpenses: 0,
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