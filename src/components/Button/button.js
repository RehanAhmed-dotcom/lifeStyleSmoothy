import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Color from '../../screens/appscreens/colors/colors';
const button = ({title, onPress, style, titleTextstyle}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.btnstyle, {...style}]}>
      <Text style={[styles.titlestyle, {...titleTextstyle}]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default button;

const styles = StyleSheet.create({
  btnstyle: {
    backgroundColor: Color.orange,
    height: 48,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  titlestyle: {
    color: Color.white,
    fontSize: 16,
    fontFamily: 'Segoe UI Bold',
  },
});
