import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {ScrollViewProps} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { Mixin } from '../../helpers';
import { theme } from '../../utils/styles/theme';

interface IContainerProps extends ScrollViewProps {}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    // height: Mixin.device_height,
    // justifyContent: 'center',
    backgroundColor: theme.colors?.backgroundItem,
    flex: 1,
    height: Mixin.device_height,
  },
  container: {
    width: Mixin.device_width,
    flex: 1,
    height: Mixin.device_height,
  },
});

const Container = (props: IContainerProps) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={() => Keyboard.dismiss()}>
      <KeyboardAwareScrollView
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
        scrollEnabled={props.scrollEnabled}
        contentContainerStyle={styles.contentContainer}>
        {props.children}
      </KeyboardAwareScrollView>
    </TouchableOpacity>
  );
};

export default Container;
