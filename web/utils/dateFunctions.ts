export const getDifferenceInDays = (date1: Date, date2: Date) => {
  const diffInMs = Math.abs(date2.getTime() - date1.getTime());
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  return diffInDays;
};

export const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};
