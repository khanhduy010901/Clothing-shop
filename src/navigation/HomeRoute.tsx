import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useDispatch } from 'react-redux';
import { OrderConfirmScreen } from '../screens/OrderConfirm';
import { OrderDetailScreen } from '../screens/OrderDetail';
import { OrderListScreen } from '../screens/OrderList';
import { ProductScreen } from '../screens/Product';
import { ProductDetailScreen } from '../screens/ProductDetail';
import { UpdateProfileScreen } from '../screens/UpdateProfile';
import { RouteParamList } from './RouteParamList';
import { TabRoute } from './TabRoute';
import { ProductCategoryScreen } from '../screens/ProductCategory';
import { ChangePasswordScreen } from '../screens/ChangePassword';
import { PaymentScreen } from '../screens/Payment';
import { PaymentWebviewScreen } from '../screens/PaymentWebview';

const Stack = createNativeStackNavigator<RouteParamList>();

export const HomeRoute = () => {
  const navigationRef = useNavigationContainerRef<any>();
  const dispatch = useDispatch();

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        // initialRouteName="MyQr"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="TabRoute" component={TabRoute} />

        <Stack.Screen name="Product" component={ProductScreen} />
        <Stack.Screen name="ProductCategory" component={ProductCategoryScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        <Stack.Screen name="UpdateProfile" component={UpdateProfileScreen} />
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
        <Stack.Screen name="OrderConfirm" component={OrderConfirmScreen} />
        <Stack.Screen name="OrderList" component={OrderListScreen} />
        <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="PaymentWebview" component={PaymentWebviewScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};
