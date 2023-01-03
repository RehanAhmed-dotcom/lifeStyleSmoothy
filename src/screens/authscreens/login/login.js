import React, {useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import Authscreen from '../../../components/authscreen/authscreen';
import InputField from '../../../components/TextInputs/textInput';
import Button from '../../../components/Button/button';
import Loader from '../../../components/Loader/Loader';
import {REGISTERING_USER} from '../../../redux/actions/useraction/Index';
import {userLogin} from '../../../utils/apis';
import {loginStyle} from '../styles';
import {useDispatch} from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';

const login = ({navigation}) => {
  const dispatch = useDispatch();
  const [email, setemail] = useState('');
  const [pass, setpass] = useState('');
  const [EmailErr, setEmailErr] = useState('');
  const [PasswordErr, setPasswordErr] = useState('');
  const [invalidEmailErr, setinvalidEmailErr] = useState('');
  const [loader, setloader] = useState(false);
  const [showPass, setshowPass] = useState(false);
  const _loginUser = () => {
    if (_validator()) {
      setloader(true);
      const userdata = new FormData();
      userdata.append('email', email);
      userdata.append('password', pass);
      userLogin(userdata)
        .then(res => {
          console.log('res of login', res);
          setloader(false);
          if (res && res.status === 'Success') {
            REGISTERING_USER(res)(dispatch);
            // setTimeout(function () {
            navigation.navigate('AppTabNavigator', {screen: 'Home'});
            // }, 1000);
          } else {
          }
        })
        .catch(err => {
          console.log('Err', err);
          setloader(false);
          setinvalidEmailErr(err.response.data.message);
        });
    }
  };

  const _validator = () => {
    if (!email && !pass) {
      setEmailErr('asd');
      setPasswordErr('asd');
      return false;
    } else if (!email) {
      setEmailErr('asd');
      return false;
    } else if (!pass) {
      setPasswordErr('asd');
      return false;
    } else if (pass.length < 8) {
      setPasswordErr('asd');
      return false;
    }
    return true;
  };

  return (
    <View style={loginStyle.container}>
      {/* <TouchableOpacity style={{marginTop:100,marginLeft:100}}>
        <Text>abc</Text>
      </TouchableOpacity> */}
      <Authscreen
        headingText={'Life Style'}
        headingTextTwo={'Smoothie'}
        navigation={navigation}>
        {loader && <Loader />}
        <View style={loginStyle.inputviews}>
          <Text style={loginStyle.loginAccText}>Login Account</Text>
          <Text style={loginStyle.headingText}>E-mail</Text>
          <InputField
            EmailEr={EmailErr}
            value={email}
            autoCaptilize={'none'}
            onChangeText={text => {
              setemail(text);
              setEmailErr('');
              setinvalidEmailErr('');
            }}
            placeholder={'Enter your Email'}
            RightIcon={() => null}
          />
        </View>
        <View style={loginStyle.inputviews}>
          <Text style={loginStyle.headingText}>Password</Text>
          <InputField
            PassEr={PasswordErr}
            value={pass}
            onChangeText={text => {
              setpass(text);
              setPasswordErr('');
              setinvalidEmailErr('');
            }}
            placeholder={'Enter your Password'}
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
          {invalidEmailErr ? (
            <Text style={{color: 'red', textAlign: 'center', top: 6}}>
              {invalidEmailErr}
            </Text>
          ) : null}
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Forgetscreen')}>
              <Text style={loginStyle.forgetText}>Forget password?</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[loginStyle.btnview, {top: 50}]}>
          <Button
            title={'Login'}
            onPress={_loginUser}
            // onPress={() => navigation.navigate('AppTabNavigator')}
          />
          <View style={loginStyle.accStyle}>
            <Text style={{fontFamily: 'Segoe UI', fontSize: 14}}>
              Don't have an account?
            </Text>
            <Text
              onPress={() => navigation.navigate('Signupscreen')}
              style={loginStyle.signupText}>
              SIGNUP
            </Text>
          </View>
        </View>
      </Authscreen>
    </View>
  );
};

export default login;
