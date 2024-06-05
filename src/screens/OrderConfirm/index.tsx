import React, {useState} from 'react';
import {View} from 'react-native';

import {ErrorModal} from '../../components/atoms/ErrorModal';
import AppHeader from '../../components/atoms/Header';
import {HookHelper} from '../../helpers';
import {useAppSelector, useGetNavigation} from '../../helpers/hookHelper';
import useStyles from './styles';
import AppInput from '../../components/atoms/AppInput';
import AppButton from '../../components/atoms/Button';

export const OrderConfirmScreen = () => {
  const {theme, dispatch} = HookHelper.useBaseHook();
  const {navigation, route} = useGetNavigation<'OrderConfirm'>();
  const authenticationReducer = useAppSelector(
    state => state.AuthenticationReducer,
  );
  const styles = useStyles(theme);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState<{title: string; description?: string}>();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  // const {onAddOrder, resetCart} = useOrder();

  const tryAgain = () => {
    setShowError(false);
    setError(undefined);
  };

  const createOrder = async () => {
    if (phoneNumber === '' || fullName === '' || address === '') {
      setShowError(true);
      setError({
        title: 'Please fill in all the fields',
        description: 'Please fill in all the fields',
      });
      return;
    }

    // await onAddOrder(phoneNumber, fullName, address, route.params?.productList);
    // await resetCart();
    // navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <AppHeader title={'Order'} />

      <AppInput
        label={'Phone number'}
        value={phoneNumber}
        maxLength={100}
        keyboardType="default"
        onChangeText={text => setPhoneNumber(text)}
        style={styles.inputText}
        labelStyle={styles.inputText}
        containerStyles={styles.inputContainer}
      />
      <AppInput
        label={'Full name'}
        value={fullName}
        maxLength={100}
        keyboardType="default"
        onChangeText={text => setFullName(text)}
        style={styles.inputText}
        labelStyle={styles.inputText}
        containerStyles={styles.inputContainer}
      />
      <AppInput
        label={'Address'}
        value={address}
        maxLength={100}
        keyboardType="default"
        onChangeText={text => setAddress(text)}
        style={styles.inputText}
        labelStyle={styles.inputText}
        containerStyles={styles.inputContainer}
      />
      <View style={styles.buttonContainer}>
        <AppButton title={'Create Order'} onPress={() => createOrder()} />
      </View>
      <ErrorModal
        confirmTitle={'Try Again'}
        onConfirm={() => tryAgain()}
        isVisible={showError}
        title={error?.title || ''}
        description={error?.description}
      />
    </View>
  );
};
