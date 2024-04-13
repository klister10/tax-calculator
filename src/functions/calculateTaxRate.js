import { 
  rateByState,
  localRate,
  federalRates,
  selfEmploymentTaxRate, 
  socialSecurityEmployeeContribution,
} from "../data/taxBrackets";
import moment from "moment";

function calculateStateTax(earnedIncome, state) {
  return earnedIncome * rateByState[state];
}

function calculateLocalTax(earnedIncome) {  
  return earnedIncome * localRate;
}

function calculateFederalTax(earnedIncome) {
  let tax = 0;
  let remainingIncome = earnedIncome;
  for (const bracket of federalRates) {
    if (remainingIncome <= 0) {
      break;
    }
    const bracketMax = bracket.max || Infinity;
    const bracketIncome = Math.min(remainingIncome, bracketMax - bracket.min);
    tax += bracketIncome * bracket.rate;
    remainingIncome -= bracketIncome;
  }
  return tax;
}

function calculateSelfEmploymentTax(earnedIncome) {
  return earnedIncome * selfEmploymentTaxRate;
}

function calculateSocialSecurityTax(earnedIncome) {
  return earnedIncome * socialSecurityEmployeeContribution;
}

function calculateYearlyIncome(earnedIncome, payPeriodStart, payPeriodEnd) {
  const payPeriodPercentage = calculatePayPeriodPercentOfYear(payPeriodStart, payPeriodEnd);
  return earnedIncome / payPeriodPercentage;
}

function calculatePayPeriodPercentOfYear(payPeriodStart, payPeriodEnd) {
  console.log("in calculatePayPeriodPercentOfYear payPeriodStart: ", payPeriodStart, ", payPeriodEnd: ", payPeriodEnd);
  const payPeriodLength = moment(payPeriodEnd).diff(moment(payPeriodStart), 'days');
  console.log("payPeriodLength: ", payPeriodLength);
  console.log("returning: ", payPeriodLength / 365);
  return (payPeriodLength / 365);
}



export function calculateTotalWithholding(formValues) {
  const { earnedIncome, state, payDate, lastPayDate } = formValues;
  const yearlyIncome = calculateYearlyIncome(earnedIncome, lastPayDate, payDate);
  const taxableYearlyIncome = yearlyIncome - formValues.yearlyDeduction;
  const yearlyFederalTax = calculateFederalTax(taxableYearlyIncome);
  const yearlyStateTax = calculateStateTax(taxableYearlyIncome, state);
  const yearlyLocalTax = calculateLocalTax(taxableYearlyIncome);
  const yearlySelfEmploymentTax = formValues.selfEmployed ? calculateSelfEmploymentTax(yearlyIncome) : 0;
  const yearlySocialSecurityTax = formValues.selfEmployed ? 0 : calculateSocialSecurityTax(yearlyIncome);
  const totalYearlyTax = yearlyFederalTax + yearlyStateTax + yearlyLocalTax + yearlySelfEmploymentTax + yearlySocialSecurityTax;

  return totalYearlyTax * calculatePayPeriodPercentOfYear(lastPayDate, payDate);
}