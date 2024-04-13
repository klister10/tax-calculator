

//TODO: actually implement this function
export function calculateTotalWithholding(formValues) {
  const { earnedIncome } = formValues;
  return earnedIncome * .28;
}