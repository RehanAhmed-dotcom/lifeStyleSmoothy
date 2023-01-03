import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../colors/colors';
import {Linking} from 'react-native';
import {AboutUs} from '../../../../utils/apis';
const aboutus = ({navigation}) => {
  const [about, setAbout] = useState({});
  useEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
      title: 'About Us',
      headerLeft: () => null,
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
  const onPressMobileNumberClick = number => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }

    Linking.openURL(phoneNumber);
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      AboutUs()
        .then(res => {
          console.log('res in about', res);
          if (res.status === 'success') {
            setAbout(res.data);
          }
        })
        .catch(err => {
          console.log('err in about', err);
        });
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  return (
    <ScrollView>
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={{flex: 1, paddingHorizontal: 16}}>
          <Text
            style={{
              fontFamily: 'Segoe UI',
              paddingTop: 16,
              fontSize: 16,
            }}>
            {about.about}
          </Text>

          <Text
            style={{
              fontFamily: 'Segoe UI Bold',
              paddingTop: 16,
              paddingBottom: 10,
              fontSize: 16,
            }}>
            Mission:
          </Text>

          <Text
            style={{
              fontFamily: 'Segoe UI',
              fontSize: 16,
              paddingBottom: 10,
            }}>
            {about.mission}
          </Text>

          <Text
            style={{
              fontFamily: 'Segoe UI Bold',
              paddingTop: 16,
              paddingBottom: 10,
              fontSize: 16,
            }}>
            Goal:
          </Text>

          <Text
            style={{
              fontFamily: 'Segoe UI',
              fontSize: 16,
              paddingBottom: 10,
            }}>
            {about.goal}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20,
            }}>
            {about.facebook && (
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(
                    // 'https://www.facebook.com/Lifestyle-Smoothie-243118260987275/',
                    about.facebook,
                  )
                }
                style={[styles.CardView, {backgroundColor: '#35A3F0'}]}>
                <View style={styles.InnerView}>
                  <Image
                    source={require('../../../../assets/images/facebook.png')}
                    style={styles.Icon}
                  />
                </View>
              </TouchableOpacity>
            )}
            {about.google && (
              <TouchableOpacity
                onPress={() => Linking.openURL(`mailto:${about.google}`)}
                style={[styles.CardView, {backgroundColor: '#DD4D39'}]}>
                <View style={styles.InnerView}>
                  <Image
                    source={require('../../../../assets/images/google-plus.png')}
                    style={styles.Icon}
                  />
                  {/* <Text style={styles.txt}>
                Gmail <Text></Text>
              </Text> */}
                </View>
              </TouchableOpacity>
            )}
            {about.instagram && (
              <TouchableOpacity
                onPress={() => Linking.openURL(about.instagram)}
                style={[styles.CardView, {backgroundColor: '#ffdd55'}]}>
                <View style={styles.InnerView}>
                  <Image
                    source={require('../../../../assets/images/instagram.png')}
                    style={styles.Icon}
                  />
                  {/* <Text style={styles.txt}>Instagram</Text> */}
                </View>
              </TouchableOpacity>
            )}
            {about.phone && (
              <TouchableOpacity
                onPress={() => {
                  onPressMobileNumberClick(about.phone);
                }}
                style={[styles.CardView, {backgroundColor: 'orange'}]}>
                <View style={styles.InnerView}>
                  <Image
                    source={require('../../../../assets/images/call.png')}
                    style={styles.Icon}
                  />
                  {/* <Text style={styles.txt}>Contact Us</Text> */}
                </View>
              </TouchableOpacity>
            )}
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: 'grey',
              alignSelf: 'center',
              width: 200,
            }}></View>
          <TouchableOpacity
            onPress={() => Linking.openURL('https://intechsol.co')}
            style={{marginTop: 20, width: '100%', alignItems: 'center'}}>
            <Text style={{fontFamily: 'Segoe UI'}}>
              Designed & Developed By
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Image
                resizeMode="contain"
                source={require('../../../../assets/images/Intech.png')}
                style={{width: 50, height: 50}}
              />
              <Text
                style={{
                  marginLeft: 10,
                  fontFamily: 'Segoe UI',
                  marginTop: 5,
                  fontSize: 16,
                }}>
                IntechSol
              </Text>
            </View>
            <Text
              style={{marginTop: 10, fontFamily: 'Segoe UI', marginBottom: 20}}>
              www.intechsol.co
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default aboutus;

const styles = StyleSheet.create({
  CardView: {
    borderWidth: 0,
    height: 50,
    width: 50,
    backgroundColor: 'red',
    flexDirection: 'row',
    borderRadius: 30,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  InnerView: {
    height: 50,
    // backgroundColor: 'yellow',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
    borderWidth: 0,
  },
  Icon: {
    height: 20,
    width: 20,
    tintColor: '#fff',
    resizeMode: 'contain',
    paddingRight: 30,
  },
  txt: {
    fontFamily: 'Segoe UI',
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});
