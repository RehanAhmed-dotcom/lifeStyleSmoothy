import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
  ScrollView,
} from 'react-native';
import Colors from '../../colors/colors';
import {Homestyle, Ordersstyle} from '../styles';
import Icon from 'react-native-vector-icons/AntDesign';
import {FlatList} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {Orderlist} from '../../../../utils/apis';
import Loader from '../../../../components/Loader/Loader';
const orders = ({route, navigation}) => {
  const {userCredentials, isLoggedIn} = useSelector(
    ({_userstoringReducer}) => _userstoringReducer,
  );
  const [ordersList, setordersList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loader, setloader] = useState(false);
  // const item = route?.params?.item;
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    const userToken = userCredentials?.access_token;
    Orderlist(userToken)
      .then(res => {
        // console.log('ressss', res);
        if (res.status === 'success') {
          setordersList(res.order_list);
        }
      })
      .finally(() => {
        setRefreshing(false);
      });
  }, [refreshing]);
  const checkAuth = () => {
    Alert.alert('Alert', 'Please create account to continue', [
      {
        text: 'Cancel',
        onPress: () => navigation.navigate('Home'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => navigation.navigate('Login')},
    ]);
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (isLoggedIn) {
        _ordersList();
      } else {
        checkAuth();
      }
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation, isLoggedIn]);
  useEffect(() => {
    navigation.setOptions({
      title: 'Orders',
      headerTitleAlign: 'center',
      headerStyle: {
        // height: 70,
      },
      headerLeft: () => null,
      headerTitleStyle: {
        color: Colors.orange,
      },
    });
    // _ordersList();
  }, []);

  const _ordersList = () => {
    setloader(true);
    const userToken = userCredentials?.access_token;
    Orderlist(userToken)
      .then(res => {
        console.log('resss of order api', res);
        setloader(false);
        if (res.status === 'success') {
          setordersList(res.order_list);
        }
      })
      .catch(err => {
        setloader(false);
      });
  };

  return (
    <View style={[Ordersstyle.container, {flex: 1}]}>
      {loader && <Loader />}
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={ordersList}
        // contentContainerStyle={{flex: 1, backgroundColor: 'blue'}}
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        // }
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => navigation.navigate('Orderdetails', {item: item})}
              style={{margin: 12}}>
              <View style={Ordersstyle.parentcontainer}>
                <View style={Ordersstyle.imageparentStyle}>
                  <View style={Ordersstyle.proImagestyle}>
                    <Image
                      source={{uri: item.main_image}}
                      style={{height: 60, width: 60, borderRadius: 5}}
                    />
                  </View>
                </View>
                <View style={Ordersstyle.nameAnddescriptionstyle}>
                  <View>
                    <Text style={Homestyle.pronameText}>{item.title}</Text>
                    <Text style={Homestyle.prodescription}>
                      {item.description}
                    </Text>
                  </View>
                </View>
                <View style={Ordersstyle.FavandpriceStyle}>
                  {/* <Icon name={'heart'} size={24} /> */}
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

export default orders;

const styles = StyleSheet.create({});
