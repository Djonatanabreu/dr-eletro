import { Icon } from 'components/Icon/Icon';
import { Text } from 'components/Text/Text';
import { width } from 'components/Theme/Responsive';
import React, { useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { defaultTheme } from 'styles/default';

interface ICalendarDateProps {
  onSwitchDate: (date: Date) => void;
}

const Calendar = ({ onSwitchDate }: ICalendarDateProps) => {
  const [date, setDate] = useState(new Date());

  const dateRef = useRef();

  const onIncrementDay = () => {
    const incrementDay = new Date(date);
    incrementDay.setDate(date.getDate() + 1);
    setDate(incrementDay);
    onSwitchDate(incrementDay);
  };

  const onDecrementDay = () => {
    const decrementDay = new Date(date);
    decrementDay.setDate(date.getDate() - 1);
    setDate(decrementDay);
    onSwitchDate(decrementDay);
  };
  // const formmatedDate = date.toLocaleString('pt-BR', {
  //   year: 'numeric',
  //   month: 'long',
  //   day: 'numeric',
  // });

  return (
    <View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          onTouchStart={() => onSwitchDate}
          style={{
            flexDirection: 'row',
            marginBottom: 10,
            justifyContent: 'space-between',
            width: '60%',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity onPress={onDecrementDay}>
            <Icon name="ArrowBack" />
          </TouchableOpacity>
          <Text textTransform="capitalize" size={24} color={'MediumGrey'}>
            {date
              .toLocaleDateString('pt-BR', {
                weekday: 'long',
              })
              .slice(0, 3)}
          </Text>
          <TouchableOpacity onPress={onIncrementDay}>
            <Icon name="ArrowForward" />
          </TouchableOpacity>
        </View>

        <View
          id="schedule-container"
          style={{
            width: width(80),
            backgroundColor: defaultTheme.secondary,
            height: width(60),
            borderRadius: 22,
            alignItems: 'center',
            gap: width(2),
            marginBottom: 10,
          }}
        >
          <Text color="White" size={width(24)}>
            {date.getDate()}
          </Text>
          <Text color="White" size={width(8)}>
            {date.toLocaleDateString('pt-BR', {
              month: 'long',
            })}
          </Text>
          <Text color="White" size={width(6)}>
            {date.getFullYear()}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Calendar;
