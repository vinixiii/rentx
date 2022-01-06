import React from 'react';
import { useTheme } from 'styled-components';
import {
  Calendar as CustomCalendar,
  LocaleConfig
} from 'react-native-calendars';
import { Feather } from '@expo/vector-icons';

LocaleConfig.locales['pt-br'] = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],
  monthNamesShort: [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ],
  dayNames: [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado'
  ],
  dayNamesShort: ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'],
  today: 'Hoje',
};

LocaleConfig.defaultLocale = 'pt-br';

export function Calendar() {
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
    />
  );
};
