import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {Platform} from 'react-native';
import Homescreen from '../../screens/appscreens/Tabsscreens/Home/home';
import Ordersscreen from '../../screens/appscreens/Tabsscreens/Orders/orders';
import Favscreen from '../../screens/appscreens/Tabsscreens/Favorites/Scan';
import Aboutscreen from '../../screens/appscreens/Tabsscreens/About/aboutus';
import Profilescreen from '../../screens/appscreens/Tabsscreens/Profile/profile';
import Color from '../../screens/appscreens/colors/colors';
import Prodetails from '../../screens/appscreens/Tabsscreens/Home/homesubscreens/prodetails';
import Orderdetails from '../../screens/appscreens/Tabsscreens/Orders/ordersubscreens/orderdetails';
import Editprofile from '../../screens/appscreens/Tabsscreens/Profile/profilesubscreens/editprofile';
import Changepassword from '../../screens/appscreens/Tabsscreens/Profile/profilesubscreens/changepassword';
import {Image, View, Text} from 'react-native';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
const Tab = createBottomTabNavigator();
const Home = createStackNavigator();
const Order = createStackNavigator();
const Fav = createStackNavigator();
const About = createStackNavigator();
const Profile = createStackNavigator();
const Homestack = () => (
  <Home.Navigator>
    <Home.Screen name={'Home'} component={Homescreen} />
    <Home.Screen name={'Prodetails'} component={Prodetails} />
  </Home.Navigator>
);
const OrderStack = () => (
  <Order.Navigator>
    <Order.Screen name={'Orders'} component={Ordersscreen} />
    <Order.Screen name={'Orderdetails'} component={Orderdetails} />
  </Order.Navigator>
);
const Favstack = () => (
  <Fav.Navigator>
    <Fav.Screen name={'Fav'} component={Favscreen} />
  </Fav.Navigator>
);
const Aboutstack = () => (
  <About.Navigator>
    <About.Screen name={'About'} component={Aboutscreen} />
  </About.Navigator>
);
const Profilestack = () => (
  <Profile.Navigator>
    <Profile.Screen name={'Profile'} component={Profilescreen} />
    <Profile.Screen name={'Editprofile'} component={Editprofile} />
    <Profile.Screen
      name={'Changepassword'}
      component={Changepassword}
      options={{
        headerStyle: {
          elevation: 0,
          backgroundColor: Color.orange,
        },
        headerTitleAlign: 'center',
        headerTintColor: 'white',
        title: 'Change Password',
        headerTitleStyle: {
          fontFamily: 'Segoe UI Semibold',
        },
      }}
    />
  </Profile.Navigator>
);

const Appnav = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          // height: Platform.OS == 'ios' ? 60 : 60,
        },
        activeTintColor: Color.orange,
        inactiveTintColor: 'grey',
        labelStyle: {
          fontSize: 10,
          marginLeft: 6,
          //   paddingVertical: 4,
          //   bottom: 4,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Homestack}
        options={({route}) => ({
          tabBarLabel: ({focused}) => (
            <View
              style={{
                borderBottomWidth: focused ? 2 : 0,
                borderBottomColor: focused ? Color.orange : 'grey',
                marginBottom: 6,
              }}>
              <Text
                style={{
                  color: focused ? Color.orange : 'grey',
                  fontFamily: 'Segoe UI Semibold',
                  fontSize: 12,
                }}>
                Home
              </Text>
            </View>
          ),

          tabBarIcon: ({focused}) =>
            focused ? (
              <Image
                source={require('../../assets/images/home.png')}
                style={{
                  height: 20,
                  width: 20,
                  tintColor: Color.orange,
                  resizeMode: 'contain',
                }}
              />
            ) : (
              <Image
                source={require('../../assets/images/home.png')}
                style={{height: 20, width: 20, resizeMode: 'contain'}}
              />
            ),
          tabBarVisible: (route => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? '';
            if (routeName === 'Prodetails') {
              return false;
            }
            return true;
          })(route),
        })}
      />
      <Tab.Screen
        name="Orders"
        component={OrderStack}
        options={({route}) => ({
          tabBarLabel: ({focused}) => (
            <View
              style={{
                borderBottomWidth: focused ? 2 : 0,
                borderBottomColor: focused ? Color.orange : 'grey',
                marginBottom: 6,
              }}>
              <Text
                style={{
                  color: focused ? Color.orange : 'grey',
                  fontFamily: 'Segoe UI Semibold',
                  fontSize: 12,
                }}>
                Orders
              </Text>
            </View>
          ),

          tabBarIcon: ({focused}) =>
            focused ? (
              <Image
                source={require('../../assets/images/orders.png')}
                style={{
                  height: 20,
                  width: 20,
                  tintColor: Color.orange,

                  resizeMode: 'contain',
                }}
              />
            ) : (
              <Image
                source={require('../../assets/images/orders.png')}
                style={{height: 20, width: 20, resizeMode: 'contain'}}
              />
            ),
          tabBarVisible: (route => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? '';
            if (routeName === 'Orderdetails') {
              return false;
            }
            return true;
          })(route),
        })}
      />
      <Tab.Screen
        name="Fav"
        component={Favstack}
        options={({route}) => ({
          tabBarLabel: ({focused}) => (
            <View
              style={{
                borderBottomWidth: focused ? 2 : 0,
                borderBottomColor: focused ? Color.orange : 'grey',
                marginBottom: 6,
              }}>
              <Text
                style={{
                  color: focused ? Color.orange : 'grey',
                  fontFamily: 'Segoe UI Semibold',
                  fontSize: 12,
                }}>
                {/* Favorite */}
                Scan
              </Text>
            </View>
          ),
          tabBarIcon: ({focused}) =>
            focused ? (
              <Image
                source={require('../../assets/images/scaner.png')}
                style={{
                  height: 20,
                  width: 20,
                  tintColor: Color.orange,
                  resizeMode: 'contain',
                }}
              />
            ) : (
              <Image
                source={require('../../assets/images/scaner.png')}
                style={{height: 20, width: 20, resizeMode: 'contain'}}
              />
            ),
          tabBarVisible: (route => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? '';
            if (routeName === 'Favdetails') {
              return false;
            }
            return true;
          })(route),
        })}
      />

      <Tab.Screen
        name="About us"
        component={Aboutstack}
        options={({route}) => ({
          tabBarLabel: ({focused}) => (
            <View
              style={{
                borderBottomWidth: focused ? 2 : 0,
                borderBottomColor: focused ? Color.orange : 'grey',
                marginBottom: 6,
              }}>
              <Text
                style={{
                  color: focused ? Color.orange : 'grey',
                  fontFamily: 'Segoe UI Semibold',
                  fontSize: 12,
                }}>
                About Us
              </Text>
            </View>
          ),
          tabBarIcon: ({focused}) =>
            focused ? (
              <Image
                source={require('../../assets/images/about.png')}
                style={{
                  height: 20,
                  width: 20,
                  tintColor: Color.orange,
                  resizeMode: 'contain',
                }}
              />
            ) : (
              <Image
                source={require('../../assets/images/about.png')}
                style={{height: 20, width: 20, resizeMode: 'contain'}}
              />
            ),
          //   tabBarVisible: (route => {
          //     const routeName = getFocusedRouteNameFromRoute(route) ?? '';
          //     if (routeName === 'Changepass') {
          //       return false;
          //     } else if (routeName === 'Editprofile') {
          //       return false;
          //     }
          //     return true;
          //   })(route),
        })}
      />
      <Tab.Screen
        name="Profile"
        component={Profilestack}
        options={({route}) => ({
          tabBarLabel: ({focused}) => (
            <View
              style={{
                borderBottomWidth: focused ? 2 : 0,
                borderBottomColor: focused ? Color.orange : 'grey',
                marginBottom: 6,
              }}>
              <Text
                style={{
                  color: focused ? Color.orange : 'grey',
                  fontFamily: 'Segoe UI Semibold',
                  fontSize: 12,
                }}>
                Profile
              </Text>
            </View>
          ),
          tabBarIcon: ({focused}) =>
            focused ? (
              <Image
                source={require('../../assets/images/user.png')}
                style={{
                  height: 20,
                  width: 20,
                  resizeMode: 'contain',
                  tintColor: Color.orange,
                }}
              />
            ) : (
              <Image
                source={require('../../assets/images/user.png')}
                style={{height: 20, width: 20, resizeMode: 'contain'}}
              />
            ),
          tabBarVisible: (route => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? '';
            if (routeName === 'Editprofile') {
              return false;
            } else if (routeName === 'Changepassword') {
              return false;
            }
            return true;
          })(route),
        })}
      />
    </Tab.Navigator>
  );
};

export default Appnav;
