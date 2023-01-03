import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {loginStyle} from '../../../../authscreens/styles';
import InutField from '../../../../../components/TextInputs/textInput';
import Button from '../../../../../components/Button/button';
import Colors from '../../../colors/colors';
import {useSelector, useDispatch} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import Loader from '../../../../../components/Loader/Loader';
const profileIcon = require('../../../../../assets/images/profile.png');
import {REGISTERING_USER} from '../../../../../redux/actions/useraction/Index';
import {Editprofile} from '../../../../../utils/apis';
const editprofile = ({navigation}) => {
  const [loader, setloader] = useState(false);
  const dispatch = useDispatch();
  const {userCredentials} = useSelector(
    ({_userstoringReducer}) => _userstoringReducer,
  );
  const [firstName, setfirstName] = useState(
    userCredentials.user.first_name ? userCredentials.user.first_name : '',
  );
  const [lastName, setlastName] = useState(
    userCredentials.user.last_name ? userCredentials.user.last_name : '',
  );
  const [contactNo, setcontactNo] = useState(
    userCredentials.user.contact_number
      ? userCredentials.user.contact_number
      : '',
  );
  const [image, setImage] = useState(
    userCredentials.user.image ? userCredentials.user.image : '',
  );
  const [updateImage, setupdateImage] = useState('');
  useEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
      title: 'Edit Profile',
      headerStyle: {
        // height: 70,
      },
      headerTitleStyle: {
        color: Colors.orange,
        fontFamily: 'Segoe UI Semibold',
        fontSize: 18,
      },
    });
  }, []);
  const _editProfile = () => {
    setloader(true);
    const userToken = userCredentials.access_token;
    const userdata = new FormData();
    userdata.append('first_name', firstName);
    userdata.append('last_name', lastName);
    userdata.append('contact_number', contactNo);
    updateImage &&
      userdata.append('image', {
        uri: updateImage,
        type: 'image/jpeg',
        name: 'image' + new Date() + '.jpg',
      });
    Editprofile({userToken, userdata})
      .then(res => {
        console.log(
          'response of edit profile +++++++++++++++++++++++++++',
          res,
        );
        setloader(false);
        if (res && res.status === 'success') {
          REGISTERING_USER(res)(dispatch);
          navigation.goBack();
        }
      })
      .catch(err => {
        setloader(false);
      });
  };
  const _addProfilepic = () => {
    ImagePicker.openPicker({
      width: 512,
      height: 512,
      cropping: false,
    }).then(img => {
      setImage(img.path);
      setupdateImage(img.path);
    });
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {loader && <Loader />}
      <View style={{flex: 5, paddingTop: 12}}>
        <ScrollView>
          <View style={{alignItems: 'center'}}>
            {image ? (
              <TouchableOpacity onPress={_addProfilepic}>
                <Image
                  source={{uri: image ? image : updateImage}}
                  style={{height: 100, width: 100, borderRadius: 50}}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={_addProfilepic}>
                <Image
                  source={
                    image?.image
                      ? {uri: image?.image}
                      : image?.image
                      ? {uri: image?.image}
                      : profileIcon
                  }
                  style={{height: 100, width: 100, borderRadius: 50}}
                />
              </TouchableOpacity>
            )}
          </View>
          <View style={[loginStyle.inputviews, {marginTop: '20%'}]}>
            <Text style={loginStyle.headingText}>First Name</Text>
            <InutField
              value={firstName}
              onChangeText={text => setfirstName(text)}
              placeholder={'Mark'}
              placeholderTextColor={'black'}
              RightIcon={() => null}
            />
          </View>
          <View style={loginStyle.inputviews}>
            <Text style={loginStyle.headingText}>Last Name</Text>
            <InutField
              value={lastName}
              onChangeText={text => setlastName(text)}
              placeholder={'Solan'}
              placeholderTextColor={'black'}
              RightIcon={() => null}
            />
          </View>
          <View style={loginStyle.inputviews}>
            <Text style={loginStyle.headingText}>Contact No</Text>
            <InutField
              value={contactNo}
              onChangeText={text => setcontactNo(text)}
              placeholder={'+92342-5000052'}
              placeholderTextColor={'black'}
              RightIcon={() => null}
            />
          </View>
          <View
            style={{
              paddingHorizontal: 12,
              marginTop: '20%',
              paddingBottom: 20,
            }}>
            <View style={{height: 15}} />
            <Button
              title={'Update'}
              onPress={_editProfile}
              // onPress={() => navigation.goBack()}
              style={{
                height: 50,
              }}
              titleTextstyle={{
                color: Colors.white,
                fontFamily: 'Segoe UI Semibold',
              }}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default editprofile;

const styles = StyleSheet.create({});
