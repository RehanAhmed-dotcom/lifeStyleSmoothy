import React, {useEffect, useState} from 'react';
import {Image, ScrollView, Alert, StyleSheet, Text, View} from 'react-native';
import Colors from '../../colors/colors';
import Icon from 'react-native-vector-icons/Feather';
import {loginStyle} from '../../../authscreens/styles';
import InutField from '../../../../components/TextInputs/textInput';
import Button from '../../../../components/Button/button';
import {deleteUser} from '../../../../utils/apis';
import {useDispatch, useSelector} from 'react-redux';
import {REGISTERING_USER} from '../../../../redux/actions/useraction/Index';
const profileIcon = require('../../../../assets/images/profile.png');
const profile = ({navigation}) => {
  const dispatch = useDispatch();
  const {userCredentials, isLoggedIn} = useSelector(
    ({_userstoringReducer}) => _userstoringReducer,
  );
  const checkAuth = () => {
    Alert.alert('Alert', 'Please create account to continue', [
      {
        text: 'Cancel',
        onPress: () => navigation.navigate('Home'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => navigation.navigate('Login')},
    ]);
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (isLoggedIn) {
        console.log('auth', userCredentials?.access_token);
      } else {
        checkAuth();
      }
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation, isLoggedIn]);
  useEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
      title: 'Profile',
      headerLeft: () => null,
      headerStyle: {
        // height: 70,
      },
      headerTitleStyle: {
        color: Colors.orange,
        fontFamily: 'Segoe UI Semibold',
        fontSize: 18,
      },
      headerRight: () => (
        <Icon
          name={'edit'}
          style={{marginRight: 16}}
          size={24}
          onPress={() => navigation.navigate('Editprofile')}
        />
      ),
    });
  }, []);
  const userToken = userCredentials?.access_token;
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{flex: 5, paddingTop: 12}}>
        <ScrollView>
          <View style={{alignItems: 'center', marginTop: '5%'}}>
            <Image
              source={
                userCredentials?.user?.image
                  ? {uri: userCredentials?.user?.image}
                  : userCredentials?.user?.image
                  ? {uri: userCredentials?.user?.image}
                  : profileIcon
              }
              style={{
                height: 100,
                width: 100,
                borderRadius: 50,
              }}
            />
          </View>
          <View
            style={[
              loginStyle.inputviews,
              {
                marginTop: '20%',
                borderBottomWidth: 0.3,
                marginHorizontal: 12,
                borderBottomColor: 'grey',
              },
            ]}>
            <Text style={[loginStyle.headingText, {paddingVertical: 6}]}>
              User Name
            </Text>
            <Text style={{paddingVertical: 2}}>
              {userCredentials && userCredentials?.user?.user_name}
            </Text>
          </View>
          <View
            style={[
              loginStyle.inputviews,
              {
                borderBottomWidth: 0.3,
                marginHorizontal: 12,
                borderBottomColor: 'grey',
              },
            ]}>
            <Text style={[loginStyle.headingText, {paddingVertical: 6}]}>
              Email
            </Text>
            <Text style={{paddingVertical: 2}}>
              {userCredentials && userCredentials?.user?.email}
            </Text>
          </View>
          <View
            style={[
              loginStyle.inputviews,
              {
                borderBottomWidth: 0.3,
                marginHorizontal: 12,
                borderBottomColor: 'grey',
              },
            ]}>
            <Text style={[loginStyle.headingText, {paddingVertical: 6}]}>
              Contact No
            </Text>
            <Text style={{paddingVertical: 2}}>
              {userCredentials && userCredentials?.user?.contact_number}
            </Text>
          </View>
          <View
            style={{
              paddingHorizontal: 12,
              marginTop: 90,
            }}>
            <Button
              title={'Delete User'}
              onPress={() => {
                deleteUser(userToken);
                REGISTERING_USER()(dispatch);
                navigation.navigate('Login');
              }}
              style={{
                borderWidth: 1,
                borderColor: Colors.orange,
                height: 50,
                backgroundColor: '#fff',
              }}
              titleTextstyle={{
                color: Colors.orange,
                fontFamily: 'Segoe UI',
              }}
            />
            <View style={{height: 15}} />
            <Button
              title={'Change Password'}
              onPress={() => navigation.navigate('Changepassword')}
              style={{
                borderWidth: 1,
                borderColor: Colors.orange,
                height: 50,
                backgroundColor: '#fff',
              }}
              titleTextstyle={{
                color: Colors.orange,
                fontFamily: 'Segoe UI',
              }}
            />
            <View style={{height: 15}} />
            <Button
              title={'Log Out'}
              onPress={() => {
                navigation.navigate('Login');
                REGISTERING_USER()(dispatch);
              }}
              // onPress={() => navigation.navigate('Login')}
              style={{
                height: 50,
              }}
              titleTextstyle={{
                color: Colors.white,
                fontFamily: 'Segoe UI Semibold',
              }}
            />
            <View style={{height: 15}} />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default profile;

const styles = StyleSheet.create({});
