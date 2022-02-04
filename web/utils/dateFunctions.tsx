import Moment from "react-moment";

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

export const formatDate = (timeOfLatestMessage: string | undefined) => {
  if (timeOfLatestMessage === undefined) {
    return undefined;
  }

  const latestMessageDate = new Date(timeOfLatestMessage);
  const nowDate = new Date();
  let dateFormat;

  if (isSameDay(nowDate, latestMessageDate)) {
    dateFormat = <Moment format="HH:mm">{timeOfLatestMessage}</Moment>;
  } else if (
    getDifferenceInDays(nowDate, latestMessageDate) < 1 &&
    nowDate.getDay() !== latestMessageDate.getDay()
  ) {
    dateFormat = "Yesterday";
  } else {
    dateFormat = <Moment format="DD-MM-YYYY">{timeOfLatestMessage}</Moment>;
  }

  return dateFormat;
};
