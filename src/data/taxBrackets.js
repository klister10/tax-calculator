export const rateByState = {
  KY: .04,
  NM: .05,
}

export const deductionByState = {
  KY: 3160,
  NM: 12550,
}

// TODO: this is just for louisville. make this something the user can change
export const localRateByState = {
  KY: .022,
  NM: .03813,
}; 

// these rates come from here https://www.irs.gov/newsroom/irs-provides-tax-inflation-adjustments-for-tax-year-2024
// and represent an individual earner's tax rate, which is the same as 1/2 of a married couple's rate
// except for in the very highest bracket
export const federalRates = [
  {min: 0, max: 11600, rate: .1},
  {min: 11600.01, max: 47150, rate: .12},
  {min: 47150.01, max: 100525, rate: .22},
  {min: 100525.01, max: 191950, rate: .24},
  {min: 191950.01, max: 243725, rate: .32},
  {min: 243725.01, max: 609350, rate: .35},
  {min: 609350.01, max: null, rate: .37},
];

export const selfEmploymentTaxRate = .153;

export const socialSecurityEmployeeContribution = .0765;

export const standardDeduction = 14600;