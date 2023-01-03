import React, {useState} from 'react';
import {Text, View, Dimensions, TouchableOpacity} from 'react-native';
import {NewpassStyle, loginStyle} from '../styles';
import {ResetPassword} from '../../../utils/apis';
import Authscreen from '../../../components/authscreen/authscreen';
import InputField from '../../../components/TextInputs/textInput';
import Button from '../../../components/Button/button';
import Loader from '../../../components/Loader/Loader';
import Entypo from 'react-native-vector-icons/Entypo';
const newpass = ({navigation, route}) => {
  const [pass, setpass] = useState('');
  const [cPass, setcPass] = useState('');
  const [PassRestErr, setPassRestErr] = useState('');
  const [loader, setloader] = useState(false);
  const {height} = Dimensions.get('window');
  const {email, token} = route.params;
  const [showPass, setshowPass] = useState(false);
  const [showPass2, setshowPass2] = useState(false);

  const _updatePassword = () => {
    if (pass && cPass) {
      if (pass != cPass) {
        setPasswordErr('sad');
        setConErr('sad');
      } else {
        setloader(true);
        const data = new FormData();
        data.append('email', email);
        data.append('token', token);
        data.append('password', pass);
        data.append('confirm_password', cPass);
        ResetPassword(data)
          .then(responce => {
            setloader(false);
            if (responce) {
              navigation.navigate('Login');
            } else {
              setPassRestErr('Something went wrong!');
            }
          })
          .catch(err => {
            setloader(false);
          });
      }
    } else {
      if (!pass && !cPass) {
        setPasswordErr('asf');
        setConErr('arr');
      } else if (!pass) {
        setPasswordErr('asf');
      } else if (!cPass) {
        setPasswordErr('as');
      }
    }
  };
  return (
    <View style={NewpassStyle.container}>
      <Authscreen
        style={{
          height: height > 700 ? 400 : 390,
          top: height > 700 ? '40%' : '20%',
        }}>
        {loader && <Loader />}
        <View style={NewpassStyle.inputviews}>
          <Text style={NewpassStyle.loginAccText}>
            Please enter your new password
          </Text>
          <Text style={[NewpassStyle.headingText, {marginTop: 30}]}>
            Password
          </Text>
          <InputField
            value={pass}
            onChangeText={text => setpass(text)}
            placeholder={'password'}
            secureTextEntry={!showPass}
            RightIcon={() => (
              <TouchableOpacity onPress={() => setshowPass(!showPass)}>
                {showPass ? (
                  <Entypo
                    name={'eye'}
                    size={24}
                    color={'#979797'}
                    style={{marginRight: 8}}
                  />
                ) : (
                  <Entypo
                    name={'eye-with-line'}
                    size={24}
                    color={'#979797'}
                    style={{marginRight: 8}}
                  />
                )}
              </TouchableOpacity>
            )}
          />

          <Text style={NewpassStyle.headingText}>Confirm Password</Text>
          <InputField
            value={cPass}
            onChangeText={text => setcPass(text)}
            placeholder={'Confirm password'}
            secureTextEntry={!showPass2}
            RightIcon={() => (
              <TouchableOpacity onPress={() => setshowPass2(!showPass2)}>
                {showPass2 ? (
                  <Entypo
                    name={'eye'}
                    size={24}
                    color={'#979797'}
                    style={{marginRight: 8}}
                  />
                ) : (
                  <Entypo
                    name={'eye-with-line'}
                    size={24}
                    color={'#979797'}
                    style={{marginRight: 8}}
                  />
                )}
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={{height: '15%'}} />
        <View style={{paddingHorizontal: 12, top: 50}}>
          <Button
            title={'Update'}
            onPress={_updatePassword}
            // onPress={() => navigation.navigate('Login')}
          />
        </View>
      </Authscreen>
    </View>
  );
};

export default newpass;
