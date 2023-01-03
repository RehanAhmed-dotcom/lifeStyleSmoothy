import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Keyboard,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Color from '../../../src/screens/appscreens/colors/colors';
const data = ['', ''];
const Authscreen = ({
  children,
  style,
  headingText,
  headingTextTwo,
  navigation,
}) => {
  const {height} = Dimensions.get('window');

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => Keyboard.dismiss()}
      style={styles.container}>
      {data.map((item, index) => {
        return (
          <View style={[styles.item]}>
            <View
              style={{
                backgroundColor: index === 0 ? Color.orange : '#fff',
                flex: 1,
                // height: index === 0 ? '100%' : 0,
                borderBottomLeftRadius: index === 0 ? 10 : 0,
                marginTop: index === 1 ? 0 : 0,
                // overflow: 'hidden',

                borderTopLeftRadius: index === 1 ? 0 : 0,
              }}></View>
          </View>
        );
      })}

      <View
        style={{
          height: height > 700 ? 500 : 450,
          // flex: 1,
          margin: 12,
          alignSelf: 'center',
          width: '90%',
          borderRadius: 6,
          backgroundColor: Color.white,
          elevation: 3,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.5,
          shadowRadius: 2,
          // elevation: 2,
          marginBottom: 50,
          zIndex: 3,
          // bottom: 0,
          position: 'absolute',
          top: height > 700 ? '28%' : '20%',
          ...style,
        }}>
        <View>{children}</View>
      </View>
      <View
        style={{
          position: 'absolute',
          top: '10%',
          height: '100%',
          bottom: 0,
          left: 0,
          alignSelf: 'center',
          alignItems: 'center',
          right: 0,
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 16,
            color: '#fff',
            fontFamily: 'Segoe UI Bold',
          }}>
          {headingText}
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 22,
            color: '#fff',

            fontFamily: 'Segoe UI Bold',
          }}>
          {headingTextTwo}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    height: '80%',
    borderBottomLeftRadius: 150,
    borderBottomRightRadius: 150,
    marginTop: -50,
    overflow: 'hidden',
  },
});

export default Authscreen;
