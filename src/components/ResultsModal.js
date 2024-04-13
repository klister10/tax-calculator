import React from 'react';
import {calculateTotalWithholding} from "../functions/calculateTaxRate";

const ResultsModal = ({formValues, closeResultsModal}) => {
  const amountToWithhold = calculateTotalWithholding(formValues);
  const amountRemaining = formValues.earnedIncome - amountToWithhold;
  return (
    <div className='resultsModal'>
      <span className='closeButton' onClick={closeResultsModal}>x</span>
      <div className='resultsTitle'>
        Amount to Withhold
      </div>
      <div className='withholdingAmount'>
        {amountToWithhold.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
      </div>
      <div className='details'>
        <div className='detailItem'>
          <span className='title'>Amount Remaining:</span>
          <span className='value'>
            {amountRemaining.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
          </span>
        </div>
        <div className='detailItem'>
          <span className='title'>Total Tax Percent:</span>
          <span className='value'>
            {(amountToWithhold / formValues.earnedIncome * 100).toFixed(2)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default ResultsModal;