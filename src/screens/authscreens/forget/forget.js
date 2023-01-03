import React, {useState} from 'react';
import {Text, View, Dimensions} from 'react-native';
import Authscreen from '../../../components/authscreen/authscreen';
import InputField from '../../../components/TextInputs/textInput';
import {Forgetstyle, loginStyle} from '../styles';
import Button from '../../../components/Button/button';
import Loader from '../../../components/Loader/Loader';
import {Forgetpass} from '../../../utils/apis';
const forget = ({navigation}) => {
  const [email, setemail] = useState('');
  const {height} = Dimensions.get('window');
  const [loader, setloader] = useState(false);
  const [forgotErr, setforgotErr] = useState('');
  const _emailVerification = () => {
    setloader(true);
    const userdata = new FormData();
    userdata.append('email', email);
    Forgetpass(userdata)
      .then(res => {
        console.log('res', res);
        setloader(false);
        if (res) {
          navigation.navigate('Codescreen', {email: email});
        } else if (res.status === 'error') {
          setforgotErr(res.message);
        }
      })
      .catch(Err => {
        console.log('Err', Err.response.data);
        setforgotErr(Err.response.data.message);
        setloader(false);
      });
  };
  return (
    <View style={Forgetstyle.container}>
      <Authscreen
        style={{
          height: height > 700 ? 350 : 360,
          top: height > 700 ? '40%' : '20%',
        }}>
        {loader && <Loader />}
        <View style={Forgetstyle.textcontainer}>
          <Text style={Forgetstyle.Textstyle}>
            Enter your e-mail for the verification proccess. We will send a 4
            digits code to your e-mail
          </Text>
        </View>
        <View style={loginStyle.inputviews}>
          <Text style={[loginStyle.headingText, {marginTop: 30}]}>E-mail</Text>
          <InputField
            value={email}
            onChangeText={text => {
              setemail(text);
              setforgotErr('');
            }}
            placeholder={'Enter your Email'}
            RightIcon={() => null}
          />
        </View>
        {forgotErr ? (
          <Text style={{color: 'red', textAlign: 'center'}}>{forgotErr}</Text>
        ) : null}
        <View style={[loginStyle.btnview, {top: 50}]}>
          <Button
            title={'Send'}
            onPress={() => _emailVerification()}
            // onPress={() => navigation.navigate('Codescreen')}
          />
        </View>
      </Authscreen>
    </View>
  );
};

export default forget;
