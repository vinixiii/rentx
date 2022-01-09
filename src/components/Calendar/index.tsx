import React from 'react';
import { useTheme } from 'styled-components';
import {
  Calendar as CustomCalendar,
  LocaleConfig,
  DateData
} from 'react-native-calendars';
import { Feather } from '@expo/vector-icons';

import { ptBR } from './localeConfig';
import { generateInterval } from './generateInterval';

LocaleConfig.locales['pt-br'] = ptBR

LocaleConfig.defaultLocale = 'pt-br';

type IMarkedDateProps = {
  [date: string]: {
    color: string;
    textColor: string;
    disbaled?: boolean;
    disableTouchEvent?: boolean;
  };
};

interface ICalendarProps {
  markedDates: IMarkedDateProps;
  onDayPress: (date: DateData) => void;
}

function Calendar({ markedDates, onDayPress } : ICalendarProps) {
  const theme = useTheme();

  return(
    <CustomCalendar
      renderArrow={(direction) => 
        <Feather
          name={`chevron-${direction}`}
          size={24}
          color={theme.colors.text}
        />
      }
      headerStyle={{
        backgroundColor: theme.colors.secondaryBackground,
        borderBottomWidth: 0.5,
        borderBottomColor: theme.colors.textDetail,
        paddingBottom: 10,
        marginBottom: 10,
      }}
      theme={{
        textDayFontFamily: theme.fonts.primary400,
        textDayHeaderFontFamily: theme.fonts.primary500,
        textDayHeaderFontSize: 10,
        textMonthFontFamily: theme.fonts.secondary600,
        textMonthFontSize: 20,
        monthTextColor: theme.colors.title,
        arrowStyle: {
          marginHorizontal: -15,
        },
      }}
      firstDay={1}
      minDate={String(new Date())}
      markingType="period"
      markedDates={markedDates}
      onDayPress={onDayPress}
    />
  );
};

export {
  Calendar,
  IMarkedDateProps,
  DateData as IDateDataProps,
  generateInterval
}
