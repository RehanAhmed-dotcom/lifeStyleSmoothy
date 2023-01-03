import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Authscreen from '../../../../../components/authscreen/authscreen';
import InputField from '../../../../../components/TextInputs/textInput';
import {loginStyle} from '../../../../authscreens/styles';
import Button from '../../../../../components/Button/button';
import Entypo from 'react-native-vector-icons/Entypo';
import {Changepassword} from '../../../../../utils/apis';
import Loader from '../../../../../components/Loader/Loader';
import {useSelector} from 'react-redux';
const changepassword = ({navigation}) => {
  const {userCredentials} = useSelector(
    ({_userstoringReducer}) => _userstoringReducer,
  );
  const [oldPass, setoldPass] = useState('');
  const [NewPass, setNewPass] = useState('');
  const [CNewPass, setCNewPass] = useState('');
  const {height} = Dimensions.get('window');
  const [showPass, setshowPass] = useState(false);
  const [showPass2, setshowPass2] = useState(false);
  const [showPass3, setshowPass3] = useState(false);
  const [loader, setloader] = useState(false);
  const _changePassword = () => {
    setloader(true);
    const userToken = userCredentials.access_token;
    const userdata = new FormData();
    userdata.append('old_password', oldPass);
    userdata.append('password', NewPass);
    userdata.append('confirm_password', CNewPass);
    Changepassword({userdata, userToken})
      .then(res => {
        setloader(false);
        if (res && res.status === 'success') {
          navigation.goBack();
        }
      })
      .catch(err => {
        console.log('err', err.response.data);
        setloader(false);
      });
  };
  return (
    <View style={{flex: 1}}>
      <Authscreen
        style={{
          top: height > 700 ? '30%' : '10%',
          height: height > 700 ? 455 : 440,
        }}
        navigation={navigation}>
        {loader && <Loader />}
        <View style={loginStyle.inputviews}>
          <Text style={[loginStyle.loginAccText, {fontFamily: 'Segoe UI'}]}>
            Please enter current and new password to update
          </Text>
          <Text style={[loginStyle.headingText, {marginTop: 20}]}>
            Old Password
          </Text>
          <InputField
            value={oldPass}
            onChangeText={text => setoldPass(text)}
            placeholder={'*********'}
            placeholderTextColor={'black'}
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
          <View style={{height: 15}} />
          <Text style={loginStyle.headingText}>New Password</Text>
          <InputField
            value={NewPass}
            onChangeText={text => setNewPass(text)}
            placeholder={'*********'}
            placeholderTextColor={'black'}
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
          <View style={{height: 15}} />
          <Text style={loginStyle.headingText}>Confirm New Password</Text>
          <InputField
            value={CNewPass}
            onChangeText={text => setCNewPass(text)}
            placeholder={'*********'}
            placeholderTextColor={'black'}
            secureTextEntry={!showPass3}
            RightIcon={() => (
              <TouchableOpacity onPress={() => setshowPass3(!showPass3)}>
                {showPass3 ? (
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
          <View style={{height: '15%'}} />
          <Button title={'Update'} onPress={_changePassword} />
        </View>
      </Authscreen>
    </View>
  );
};

export default changepassword;

const styles = StyleSheet.create({});
