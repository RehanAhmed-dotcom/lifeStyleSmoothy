import React, {useEffect} from 'react';
import {StyleSheet, Text, Image, View} from 'react-native';

const splashscreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login');
    }, 1000);
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Image
        source={require('../assets/images/splasha.png')}
        style={{height: '100%', width: '100%', resizeMode: 'stretch'}}
      />
      <View
        style={{
          height: '100%',
          width: '100%',
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          // backgroundColor: 'red',
        }}>
        <Image
          source={require('../assets/images/mainLogo.jpg')}
          style={{width: 250, resizeMode: 'contain', height: 150}}
        />
      </View>
    </View>
  );
};

export default splashscreen;

const styles = StyleSheet.create({});
