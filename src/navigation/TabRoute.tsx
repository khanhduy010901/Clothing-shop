import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabBar } from "./components/Tabbar";
import { HomeScreen } from "../screens/Home";
import { ProfileScreen } from "../screens/Profile";
import { CartScreen } from "../screens/Cart";
import { useAppSelector, useGetNavigation } from "../helpers/hookHelper";
import { ProductScreen } from "../screens/Product";

const Tab = createBottomTabNavigator();

export const TabRoute = () => {
  const authenticationReducer = useAppSelector(
    (state) => state.AuthenticationReducer
  );
  const { navigation } = useGetNavigation();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        // tabBarBackground: () => (
        //   <View style={{ backgroundColor: 'transparent', width: '100%' }} />
        // ),
        tabBarStyle: {
          backgroundColor: "red",
          position: "absolute",
          height: 100,
        },
      }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Product" component={ProductScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};
