import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  format,
  parseISO,
} from 'date-fns';

/**
 * Returns an array of all days in the current month.
 */
export const getCurrentMonthDays = () => {
  const today = new Date();
  const start = startOfMonth(today);
  const end = endOfMonth(today);
  return eachDayOfInterval({ start, end });
};

/**
 * Formats a date object to a readable string (e.g. "12 Aug 2025")
 */
export const formatDate = (date) => {
  return format(date, 'dd MMM yyyy');
};

/**
 * Gets all events for a specific date
 */
export const getEventsForDate = (events, date) => {
  return events.filter((event) =>
    isSameDay(parseISO(event.date), date)
  );
};
