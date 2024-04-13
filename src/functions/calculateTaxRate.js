import { 
  rateByState,
  deductionByState,
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
  const federalTaxableYearlyIncome = yearlyIncome - formValues.yearlyDeduction;
  const stateTaxableYearlyIncome = yearlyIncome - deductionByState[state];
  const yearlyFederalTax = calculateFederalTax(federalTaxableYearlyIncome);
  const yearlyStateTax = calculateStateTax(stateTaxableYearlyIncome, state);
  const yearlyLocalTax = calculateLocalTax(yearlyIncome);
  const yearlySelfEmploymentTax = formValues.selfEmployed ? calculateSelfEmploymentTax(yearlyIncome) : 0;
  const yearlySocialSecurityTax = formValues.selfEmployed ? 0 : calculateSocialSecurityTax(yearlyIncome);
  const totalYearlyTax = yearlyFederalTax + yearlyStateTax + yearlyLocalTax + yearlySelfEmploymentTax + yearlySocialSecurityTax;

  console.log(
    "yearlyIncome: ", yearlyIncome,
    "federalTaxableYearlyIncome: ", federalTaxableYearlyIncome,
    "stateTaxableYearlyIncome: ", stateTaxableYearlyIncome,
    "yearlyFederalTax: ", yearlyFederalTax,
    "yearlyStateTax: ", yearlyStateTax,
    "yearlyLocalTax: ", yearlyLocalTax,
    "yearlySelfEmploymentTax: ", yearlySelfEmploymentTax,
    "yearlySocialSecurityTax: ", yearlySocialSecurityTax,
    "totalYearlyTax: ", totalYearlyTax,
    "calculatePayPeriodPercentOfYear(lastPayDate, payDate): ", calculatePayPeriodPercentOfYear(lastPayDate, payDate)
  )
  return totalYearlyTax * calculatePayPeriodPercentOfYear(lastPayDate, payDate);
}