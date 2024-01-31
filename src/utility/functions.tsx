export const txtCuter = (text: string, max: number = 50) => {
  if (text.length > max) {
    return `${text.slice(0, max)}...`;
  } else {
    return text;
  }
};
