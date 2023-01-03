import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Authscreen from '../../../components/authscreen/authscreen';
import InputField from '../../../components/TextInputs/textInput';
import Button from '../../../components/Button/button';
import {_RegisterHandler} from '../../Functions/Index';
import {signupstyle} from '../styles';
import {useDispatch} from 'react-redux';
import {userRegister} from '../../../utils/apis';
import {REGISTERING_USER} from '../../../redux/actions/useraction/Index';
import Loader from '../../../components/Loader/Loader';
import Entypo from 'react-native-vector-icons/Entypo';

const signup = ({navigation}) => {
  const dispatch = useDispatch();
  const {height} = Dimensions.get('window');
  console.log(height);
  const [showPass, setshowPass] = useState(false);
  const [showPass2, setshowPass2] = useState(false);

  const [loader, setloader] = useState(false);
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [email, setemail] = useState('');
  const [pass, setpass] = useState('');
  const [Cpass, setCpass] = useState('');
  const [contact, setcontact] = useState('');
  const [userName, setuserName] = useState('');
  const [firstNameErr, setfirstNameErr] = useState('');
  const [lastNameErr, setlastNameErr] = useState('');
  const [emailErr, setemailErr] = useState('');
  const [passErr, setpassErr] = useState('');
  const [CpassErr, setCpassErr] = useState('');
  const [contactErr, setcontactErr] = useState('');
  const [passConfirmationErr, setpassConfirmationErr] = useState('');
  const [emailExistErr, setemailExistErr] = useState('');
  const [passlengthErr, setpasslengthErr] = useState('');
  const [userNameErr, setuserNameErr] = useState('');
  const _RegisterHandler = () => {
    if (_validator()) {
      setloader(true);
      const userdata = new FormData();
      userdata.append('first_name', firstName);
      userdata.append('last_name', lastName);
      userdata.append('email', email);
      userdata.append('password', pass);
      userdata.append('confirm_password', Cpass);
      userdata.append('contact_number', contact);
      userdata.append('user_name', userName);
      userRegister(userdata)
        .then(responce => {
          setloader(false);
          if (responce && responce.status === 'Success') {
            REGISTERING_USER(responce)(dispatch);
            navigation.navigate('AppTabNavigator', {screen: 'Home'});
          }
        })
        .catch(err => {
          setloader(false);
          if (err.response.data.failed.email[0]) {
            setemailExistErr(err.response.data.failed.email[0]);
          } else if (err.response.data.failed.confirm_password[0]) {
            setpassConfirmationErr(
              err.response.data.failed.confirm_password[0],
            );
          }
          throw err;
        });
    }
  };

  const _validator = () => {
    if (
      !userName &&
      !firstName &&
      !lastName &&
      !email &&
      !pass &&
      !Cpass &&
      !contact
    ) {
      setuserNameErr('asd');
      setfirstNameErr('asd');
      setlastNameErr('asd');
      setemailErr('asd');
      setpassErr('asd');
      setCpassErr('asd');
      setcontactErr('asd');
      return false;
    } else if (!userName) {
      setuserNameErr('asd');
      return false;
    } else if (!firstName) {
      setfirstNameErr('asd');
      return false;
    } else if (!lastName) {
      setlastNameErr('asd');
      return false;
    } else if (!email) {
      setemailErr('asd');
      return false;
    } else if (emailExistErr) {
      setemailExistErr(emailExistErr);
      return false;
    } else if (!pass) {
      setpassErr('asd');
      return false;
    } else if (!Cpass) {
      setCpassErr('asd');
      return false;
    } else if (pass.length < 8 || Cpass.length < 8) {
      setpasslengthErr('asd');
      return false;
    } else if (!contact) {
      setcontactErr('asd');
      return false;
    }
    return true;
  };

  return (
    <View style={signupstyle.container}>
      <Authscreen
        style={{
          top: height > 700 ? '20%' : '18%',
          height: height > 700 ? 620 : 450,
        }}
        headingText={'Life Style'}
        headingTextTwo={'Smoothie'}>
        {loader && <Loader />}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={signupstyle.inputviews}>
            <Text style={signupstyle.loginAccText}>Registration</Text>
            <Text style={signupstyle.headingText}>User name</Text>
            <InputField
              firstNameEr={userNameErr}
              value={userName}
              // placeholderTextColor={'black'}
              onChangeText={text => {
                setuserName(text);
                setuserNameErr('');
              }}
              placeholder={'User name'}
              RightIcon={() => null}
            />
          </View>
          <View style={signupstyle.inputviews}>
            <Text style={signupstyle.headingText}>First name</Text>
            <InputField
              firstNameEr={firstNameErr}
              value={firstName}
              onChangeText={text => {
                setfirstName(text);
                setfirstNameErr('');
              }}
              placeholder={'First name'}
              RightIcon={() => null}
            />
          </View>
          <View style={signupstyle.inputviews}>
            <Text style={signupstyle.headingText}>Last name</Text>
            <InputField
              lastNameEr={lastNameErr}
              value={lastName}
              onChangeText={text => {
                setlastName(text);
                setlastNameErr('');
              }}
              placeholder={'Last name'}
              RightIcon={() => null}
            />
          </View>
          <View style={signupstyle.inputviews}>
            <Text style={signupstyle.headingText}>E-mail</Text>
            <InputField
              EmailEr={emailErr}
              value={email}
              onChangeText={text => {
                setemail(text);
                setemailErr('');
                setemailExistErr('');
              }}
              placeholder={'E-mail'}
              RightIcon={() => null}
            />
          </View>
          <View style={signupstyle.inputviews}>
            <Text style={signupstyle.headingText}>Password</Text>
            <InputField
              PassEr={passErr}
              value={pass}
              onChangeText={text => {
                setpass(text);
                setpassErr('');
                setpasslengthErr('');
              }}
              placeholder={'Password'}
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
          </View>
          <View style={signupstyle.inputviews}>
            <Text style={signupstyle.headingText}>Confirm Password</Text>
            <InputField
              cPassEr={CpassErr}
              value={Cpass}
              onChangeText={text => {
                setCpass(text);
                setCpassErr('');
                setpasslengthErr('');
              }}
              placeholder={'Confirm Password'}
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
          <View style={signupstyle.inputviews}>
            <Text style={signupstyle.headingText}>Contact number</Text>
            <InputField
              contactEr={contactErr}
              value={contact}
              keyboardType={'number-pad'}
              onChangeText={text => {
                setcontact(text);
                setcontactErr('');
              }}
              placeholder={'Contact number'}
              RightIcon={() => null}
            />
          </View>
          <View style={{height: 40}} />
          {emailExistErr ? (
            <Text style={{textAlign: 'center', color: 'red', marginTop: '5%'}}>
              {emailExistErr}
            </Text>
          ) : null}
          {passlengthErr ? (
            <Text
              style={{
                fontSize: 12,
                color: 'red',
                marginTop: '5%',
                textAlign: 'center',
              }}>
              Password length should be greater than 8
            </Text>
          ) : null}
          {passConfirmationErr ? (
            <Text
              style={{
                fontSize: 12,
                marginTop: '5%',
                textAlign: 'center',
                color: 'red',
              }}>
              {passConfirmationErr}
            </Text>
          ) : null}
          <View style={signupstyle.btnview}>
            <Button title={'Sign Up'} onPress={() => _RegisterHandler()} />
            <View style={signupstyle.accStyle}>
              <Text style={{fontFamily: 'Segoe UI'}}>
                Already have an account?
              </Text>
              <Text
                onPress={() => navigation.navigate('Login')}
                style={signupstyle.signupText}>
                LOGIN
              </Text>
            </View>
          </View>
        </ScrollView>
      </Authscreen>
    </View>
  );
};

export default signup;
