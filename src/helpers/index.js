/* eslint-disable curly */
export const dateTimeToText = input => {
  if (!input) return '';
  return input.split('T')[0];
};
