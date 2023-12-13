import { Colors } from 'components/Theme';
import { height, width } from 'components/Theme/Responsive';
import React from 'react';
import { View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

const LoadingComponent = ({ isVisible }: { isVisible: boolean }) => {
  return (
    <View
      style={{
        backgroundColor: Colors.White,
        width: width(100),
        height: height(100),
      }}
    >
      <Spinner
        color={Colors.Base}
        visible={isVisible}
        textContent={'Loading...'}
        textStyle={{ color: Colors.Alternative }}
      />
    </View>
  );
};

export default LoadingComponent;
