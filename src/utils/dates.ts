import moment from 'moment';

export const getSundayOf5WeeksAgo = (currentDate?: string) => {
   const current = currentDate ? moment(currentDate, 'YYYY-MM-DD') : moment();

   const mostRecentSunday = current.clone().endOf('isoWeek');

   return mostRecentSunday.clone().subtract(5, 'weeks').format('YYYY-MM-DD');
};

export const getMondayOf5WeeksAgo = (currentDate?: string) => {
   const current = currentDate ? moment(currentDate, 'YYYY-MM-DD') : moment();

   const mostRecentMonday = current.clone().startOf('isoWeek');

   return mostRecentMonday.clone().subtract(5, 'weeks').format('YYYY-MM-DD');
};
