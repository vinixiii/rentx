import { eachDayOfInterval, format } from 'date-fns';

import { IMarkedDateProps, IDateDataProps } from '.';
import { getPlatformDate } from '../../utils/getPlatformDate';

import theme from '../../global/styles/theme';

export function generateInterval(start: IDateDataProps, end: IDateDataProps) {
  let interval: IMarkedDateProps = {};

  const teste = eachDayOfInterval({ start: new Date(start.timestamp), end: new Date(end.timestamp) })
    .forEach((item) => {
      const date = format(getPlatformDate(item), 'yyyy-MM-dd');

      interval = {
        ...interval,
        [date]: {
          color: start.dateString === date || end.dateString === date
            ? theme.colors.main : theme.colors.mainLight,
          textColor: start.dateString === date || end.dateString === date
            ? theme.colors.secondaryBackground : theme.colors.main,
        },
      };
    });

  return interval;
};
