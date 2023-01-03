import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Image,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Color from '../../colors/colors';
import {Homestyle} from '../styles';
import Homecomponent from '../../../../components/Homecomponent/Home';
import {HomeProducts, FCMtokenhandle} from '../../../../utils/apis';
import {useSelector, useDispatch} from 'react-redux';
import Loader from '../../../../components/Loader/Loader';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import {FCM_handler} from '../../../../redux/actions/fcmtoken/index';
const Home = ({navigation}) => {
  const {userCredentials, isLoggedIn} = useSelector(
    ({_userstoringReducer}) => _userstoringReducer,
  );
  const [Homelist, setHomelist] = useState([]);
  const [loader, setloader] = useState(false);
  const dispatch = useDispatch();
  console.log('userCredentials', userCredentials, isLoggedIn);
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
      headerTitleAlign: 'center',
      headerTitleStyle: {
        color: Color.orange,
        fontFamily: 'Segoe UI Semibold',
        fontSize: 18,
      },
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Favori')}>
          <Image
            source={require('../../../../assets/images/favorite.png')}
            style={{height: 20, width: 20, marginRight: 20}}
          />
        </TouchableOpacity>
        // <Text onPress={() => navigation.navigate('Favori')}>Right Text</Text>
      ),
      headerStyle: {
        // height: 70,
        backgroundColor: '#fff',
        elevation: 4,
      },
    });
  }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      _HomescreenData();
    });

    return unsubscribe;
  }, [navigation]);

  const _HomescreenData = () => {
    setloader(true);
    const userToken = userCredentials?.access_token;
    HomeProducts(userToken)
      .then(res => {
        // console.log('res of home', res);
        setloader(false);
        if (res.status === 'success') {
          setHomelist(res.products);
        }
      })
      .catch(err => {
        console.log('Errrrr', err.response);
        setloader(false);
      });
  };

  useEffect(() => {
    // Platform.OS === 'android' && StatusBar.setTranslucent(true);
    getToken();
    getNotifications();
    _createChannel();
    const unsubscribe = messaging().onMessage(async remoteMessage => {});
    return unsubscribe;
  }, []);
  const getToken = async () => {
    let fcmToken = await messaging().getToken();
    if (fcmToken) {
      FCM_handler(fcmToken)(dispatch);
    }

    messaging().onTokenRefresh(token => {
      _updateToken(token);
    });
  };
  const _updateToken = token => {
    const userToken = userCredentials?.access_token;
    const userdata = new FormData();
    userdata.append('fcm_token', token);
    FCMtokenhandle({userdata, userToken}).then(res => {
      // console.log('res', res);
    });
  };

  const _createChannel = () => {
    PushNotification.createChannel(
      {
        channelId: 'fcm_fallback_notification_channel', // (required)
        channelName: 'fcm_fallback_notification_channel', // (required)
        channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      created => ({}), // (optional) callback returns whether the channel was created, false means it already existed.
    );
  };

  const getNotifications = async () => {
    await messaging().onNotificationOpenedApp(remoteMessage => {});
    await messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
        }
      });
  };
  return (
    <View style={Homestyle.container}>
      <View>
        {loader && <Loader />}
        <FlatList
          numColumns={2}
          data={Homelist}
          contentContainerStyle={{margin: 6}}
          renderItem={({item}) => {
            return (
              <View style={{flex: 1, paddingBottom: 10, alignItems: 'center'}}>
                <Homecomponent navigation={navigation} item={item} />
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
