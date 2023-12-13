import { ChangeEvent, useEffect, useRef, useState } from 'react';
import {
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
  View,
} from 'react-native';
import { Icon } from '../Icon/Icon';

import { styles } from './styles';

import { Colors } from 'components/Theme';
import { TextInput } from 'react-native-gesture-handler';

interface checkBoxProps {
  title: string;
  time: string;
  onPressInputs: (editable: boolean) => void;
  onCheck: (checked: boolean) => void;
  onChangeTitle: (value: string) => void;
  onChangeHour: (value: string) => void;
  isComplete: boolean;
}

export const CheckBox = ({
  onCheck,
  onPressInputs,
  isComplete = false,
  title,
  time,
  onChangeTitle,
  onChangeHour,
}: checkBoxProps) => {
  const [checked, setChecked] = useState(false);

  const [editable, setEditable] = useState(false);

  const checkBoxRef = useRef<any>();

  useEffect(() => {
    if (isComplete) {
      setChecked(!checked);
    }
  }, []);

  const onPressChecker = () => {
    setChecked(!checked);
    onCheck(!checked);
  };
  const onPressEditable = () => {
    // NOT EDITIBLE
    // setEditable(!editable);
    // onPressInputs(!editable);
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback ref={checkBoxRef} onPress={onPressChecker}>
        <View
          style={[
            styles.checkBoxStyle,
            {
              backgroundColor: 'transparent',
              borderColor: checked ? Colors.White : Colors.White,
            },
          ]}
        >
          {checked && <Icon name="CheckMark" />}
        </View>
      </TouchableWithoutFeedback>
      <View onTouchStart={onPressEditable} style={styles.inputsContainer}>
        <TextInput
          style={{
            width: '90%',
            fontSize: 24,
            fontWeight: '500',
            color: Colors.White,
          }}
          value={title}
          editable={editable}
          onChangeText={onChangeTitle}
        />

        <TextInput
          style={{
            width: '90%',
            fontSize: 16,
            fontWeight: '400',
            color: Colors.White,
          }}
          editable={editable}
          value={time}
          onChangeText={onChangeHour}
        />
      </View>
    </View>
  );
};
