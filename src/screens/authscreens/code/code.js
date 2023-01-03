import React, {useState} from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {Forgetstyle} from '../styles';
import Authscreen from '../../../components/authscreen/authscreen';
import Button from '../../../components/Button/button';
import {Codeconfirmation} from '../../../utils/apis';
import Color from '../../appscreens/colors/colors';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Loader from '../../../components/Loader/Loader';
const code = ({navigation, route}) => {
  const {height} = Dimensions.get('window');
  const {email} = route.params;
  const [token, setValue] = useState('');
  const [valueErr, setValueErr] = useState('');
  const [codeErr, setCodeErr] = useState('');
  const [loader, setLoader] = useState(false);

  const CELL_COUNT = 4;
  const ref = useBlurOnFulfill({token, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    token,
    setValue,
  });
  const _userComformationCodeFunction = () => {
    if (token) {
      setLoader(true);
      const userdata = new FormData();
      userdata.append('token', token);
      Codeconfirmation(userdata)
        .then(responce => {
          setLoader(false);
          if (responce) {
            navigation.navigate('Newpasscreen', {
              email: email,
              token: token,
            });
          } else {
            if (token.length === CELL_COUNT) {
              setCodeErr('This password reset token is invalid.');
            }
            setValueErr('ask');
          }
        })
        .catch(err => {
          setLoader(false);
        });
    } else {
      setValueErr('ask');
    }
  };
  return (
    <View style={Forgetstyle.container}>
      <Authscreen
        style={{
          height: height > 700 ? 350 : 340,
          top: height > 700 ? '40%' : '20%',
        }}>
        {loader && <Loader />}
        <View style={Forgetstyle.textcontainer}>
          <Text style={[Forgetstyle.Textstyle, {paddingHorizontal: 24}]}>
            Enter 4 digit code thats you recover on your email.
          </Text>
        </View>
        <View style={{paddingHorizontal: 16, marginTop: 30}}>
          <CodeField
            ref={ref}
            {...props}
            value={token}
            onChangeText={text => {
              valueErr ? setValueErr('') : null;
              codeErr ? setCodeErr('') : null;
              setValue(text);
            }}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            // returnKeyType="done"
            textContentType="oneTimeCode"
            renderCell={({index, symbol, isFocused}) => (
              <View
                onLayout={getCellOnLayoutHandler(index)}
                key={index}
                style={[
                  symbol
                    ? styles.cellRoot
                    : valueErr
                    ? styles.cellRoot2
                    : styles.cellRoot1,
                  isFocused && styles.focusCell,
                ]}>
                <Text
                  style={[
                    styles.cellText,
                    {color: codeErr ? 'red' : Color.orange},
                  ]}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              </View>
            )}
          />
        </View>
        <View style={{height: '24%', paddingHorizontal: 12}} />
        <View style={{paddingHorizontal: 12, top: 50}}>
          <Button
            title={'Verify'}
            onPress={_userComformationCodeFunction}
            // onPress={() => navigation.navigate('Newpasscreen')}
          />
        </View>
      </Authscreen>
    </View>
  );
};

export default code;

const styles = StyleSheet.create({
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 20},
  codeFieldRoot: {marginTop: 0},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'black',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
  cellRoot: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: Color.orange,
    borderBottomWidth: 2,
  },
  cellRoot2: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'red',
    borderBottomWidth: 2,
  },
  cellRoot1: {
    width: 60,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: Color.orange,
    borderBottomWidth: 2,
  },
  cellText: {
    color: Color.orange,
    fontSize: 25,
    textAlign: 'center',
    fontFamily: 'Segoe UI Semibold',
  },
});
