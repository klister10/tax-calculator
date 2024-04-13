import { 
  rateByState,
  deductionByState,
  localRateByState,
  federalRates,
  selfEmploymentTaxRate, 
  socialSecurityEmployeeContribution,
  standardDeduction,
} from "../data/taxBrackets";
import moment from "moment";

//TODO don't let this go negative

function calculateStateTax(earnedIncome, state) {
  return earnedIncome * rateByState[state];
}

function calculateLocalTax(earnedIncome, state) {  
  return earnedIncome * localRateByState[state];
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
  const { earnedIncome, state, payDate, lastPayDate, yearlyBusinessExpenses } = formValues;
  const yearlyIncome = Math.max(calculateYearlyIncome(earnedIncome, lastPayDate, payDate) - yearlyBusinessExpenses, 0);
  const federalTaxableYearlyIncome = Math.max(yearlyIncome - standardDeduction, 0);
  const stateTaxableYearlyIncome = Math.max(yearlyIncome - deductionByState[state], 0);
  const yearlyFederalTax = calculateFederalTax(federalTaxableYearlyIncome);
  const yearlyStateTax = calculateStateTax(stateTaxableYearlyIncome, state);
  const yearlyLocalTax = calculateLocalTax(yearlyIncome, state);
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