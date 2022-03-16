export const humanizePrice = (value: any) => {
  const floatValue = parseFloat(value);
  const twoHouses = floatValue.toFixed(2);
  const valueString = twoHouses.toString();
  return valueString.replace('.', ',');
};

export const maxWords = (value: string) => {
  const valueSplited = value.split(' ');
  if (valueSplited.length >= 2) {
    return `${valueSplited[0]} ${valueSplited[1]}...`;
  } else {
    return value;
  }
};
