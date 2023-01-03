import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import {Ordersstyle, Homestyle} from '../Tabsscreens/styles';
import {useSelector} from 'react-redux';
import Colors from '../colors/colors';
import Loader from '../../../components/Loader/Loader';
import {FavoritItemsList} from '../../../utils/apis';
const Favorit = ({navigation}) => {
  const {userCredentials, isLoggedIn} = useSelector(
    ({_userstoringReducer}) => _userstoringReducer,
  );
  const [loader, setloader] = useState(false);
  const [FavItems, setFavItems] = useState([]);
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (isLoggedIn) {
        _Favoritelist();
      } else {
        checkAuth();
      }
    });

    return unsubscribe;
  }, [navigation, isLoggedIn]);
  useEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
      title: 'Favorites',
      //   headerLeft: () => null,
      headerStyle: {
        // height: 70,
      },
      headerTintColor: Colors.orange,
      headerTitleStyle: {
        color: Colors.orange,
        fontFamily: 'Segoe UI Semibold',
        fontSize: 18,
      },
    });
    // _Favoritelist();
    // checkAuth();
  }, []);
  const checkAuth = () => {
    if (!userCredentials?.access_token) {
      Alert.alert('Alert', 'Please create account to continue', [
        {
          text: 'Cancel',
          onPress: () => navigation.navigate('Home'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => navigation.navigate('Login')},
      ]);
    }
  };
  const _Favoritelist = () => {
    setloader(true);
    const userToken = userCredentials?.access_token;
    FavoritItemsList(userToken).then(res => {
      console.log('Ress', res);
      setloader(false);
      if (res.status === 'success') {
        setFavItems(res.wish_list);
      }
    });
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {loader && <Loader />}
      <FlatList
        data={FavItems}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Favoritdetails', {item: item})
              }
              style={{margin: 12}}>
              <View style={Ordersstyle.parentcontainer}>
                <View style={Ordersstyle.imageparentStyle}>
                  <View style={Ordersstyle.proImagestyle}>
                    <Image
                      source={{uri: item.main_image}}
                      style={{height: 80, width: 80, borderRadius: 5}}
                    />
                  </View>
                </View>
                <View
                  style={[
                    Ordersstyle.nameAnddescriptionstyle,
                    {marginLeft: 8},
                  ]}>
                  <View>
                    <Text style={Homestyle.pronameText}>{item.title}</Text>
                    <Text style={Homestyle.prodescription}>
                      {item.description}
                    </Text>
                  </View>
                </View>
                <View style={Ordersstyle.FavandpriceStyle}>
                  <Text style={Homestyle.priceStyle}>${item.price}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Favorit;

const styles = StyleSheet.create({});
