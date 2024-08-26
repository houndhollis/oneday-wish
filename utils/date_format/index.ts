import {
  format,
  formatDistanceToNow,
  parseISO,
  isToday,
  isYesterday,
} from "date-fns";
import { ko } from "date-fns/locale";

export const dateFormatter = (isoDateString) => {
  const date = parseISO(isoDateString);

  const distance = formatDistanceToNow(date, { addSuffix: true, locale: ko });

  const isTodayDate = isToday(date);
  const isYesterdayDate = isYesterday(date);

  let formattedDate;
  if (isTodayDate) {
    formattedDate = distance;
  } else if (isYesterdayDate) {
    formattedDate = `어제 ${format(date, "HH:mm", { locale: ko })}`;
  } else {
    formattedDate = format(date, "yy-MM-dd", { locale: ko });
  }

  return formattedDate;
};
