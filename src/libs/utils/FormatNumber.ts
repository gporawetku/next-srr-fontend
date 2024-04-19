const FormatDecimal = (number: any, decimal: number) => {
  return (
    Number(number)
      .toFixed(decimal)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,") || ""
  );
};

export { FormatDecimal };
