// In App.js in a new project

import React, {Fragment} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Loginscreen from '../../screens/authscreens/login/login';
import Signupscreen from '../../screens/authscreens/signup/signup';
import Forgetscreen from '../../screens/authscreens/forget/forget';
import Codescreen from '../../screens/authscreens/code/code';
import Newpasscreen from '../../screens/authscreens/newpass/newpass';
import AppTabNavigator from '../tabsnav/tabsnav';
import Color from '../../screens/appscreens/colors/colors';
import Splash from '../../Splash/splashscreen';
import {useSelector} from 'react-redux';
import Favorit from '../../screens/appscreens/Tabsscreens/Favorit';
import Favdetails from '../../screens/appscreens/Tabsscreens/Favorites/Favsubscreens/Favdetails';

const Stack = createStackNavigator();

function Authnav() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'AppTabNavigator'}>
        <Fragment>
          <Stack.Screen
            name="Login"
            component={Loginscreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Signupscreen"
            component={Signupscreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Forgetscreen"
            component={Forgetscreen}
            options={{
              headerStyle: {
                elevation: 0,
                backgroundColor: Color.orange,
              },
              headerTitleAlign: 'center',
              headerTintColor: 'white',
              title: 'Forgot password',
              headerTitleStyle: {
                fontFamily: 'Segoe UI Semibold',
              },
            }}
          />
          <Stack.Screen
            name="Codescreen"
            component={Codescreen}
            options={{
              headerStyle: {
                elevation: 0,
                backgroundColor: Color.orange,
              },
              headerTitleAlign: 'center',
              headerTintColor: 'white',
              title: 'Forgot password',
              headerTitleStyle: {
                fontFamily: 'Segoe UI Semibold',
              },
            }}
          />
          <Stack.Screen
            name="Newpasscreen"
            component={Newpasscreen}
            options={{
              headerStyle: {
                elevation: 0,
                backgroundColor: Color.orange,
              },
              headerTitleAlign: 'center',
              headerTintColor: 'white',
              title: 'Forgot password',
              headerTitleStyle: {
                fontFamily: 'Segoe UI Semibold',
              },
            }}
          />

          <Stack.Screen
            name={'AppTabNavigator'}
            component={AppTabNavigator}
            options={{headerShown: false}}
          />
          <Stack.Screen name={'Favori'} component={Favorit} />
          <Stack.Screen name={'Favoritdetails'} component={Favdetails} />
        </Fragment>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Authnav;
