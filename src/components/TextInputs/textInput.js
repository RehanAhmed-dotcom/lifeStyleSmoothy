import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
const textInput = ({
  placeholder,
  onChangeText,
  value,
  secureTextEntry,
  keyboardType,
  editable,
  placeholderTextColor,
  firstNameEr,
  lastNameEr,
  EmailEr,
  PassEr,
  cPassEr,
  contactEr,
  right = true,
  RightIcon,
  autoCaptilize,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <TextInput
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        editable={editable}
        autoCapitalize={autoCaptilize}
        placeholderTextColor={placeholderTextColor}
        style={{
          borderBottomWidth: 0.3,
          paddingVertical: 2,
          width: '100%',
          borderBottomColor: firstNameEr
            ? 'red'
            : lastNameEr
            ? 'red'
            : EmailEr
            ? 'red'
            : PassEr
            ? 'red'
            : cPassEr
            ? 'red'
            : contactEr
            ? 'red'
            : 'grey',
          fontSize: 15,
          color: 'black',
          fontFamily: 'Segoe UI',
        }}
      />
      {right ? <View style={{right: 30}}>{<RightIcon />}</View> : null}
    </View>
  );
};

export default textInput;

const styles = StyleSheet.create({});
