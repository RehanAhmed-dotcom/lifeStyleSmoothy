import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Dimensions,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import PaymentView from '../../../../../components/Payment/payment';
import Button from '../../../../../components/Button/button';
import Colors from '../../../colors/colors';
import AddIcon from 'react-native-vector-icons/AntDesign';
import MinusIcon from 'react-native-vector-icons/AntDesign';
import {homesubProdeuctdetail, Homestyle} from '../../styles';
// import {Checkbox} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {
  addQuantity,
  addToCart,
  subtractQuantity,
} from '../../../../../redux/actions/cartaction/Index';
import {Wishlist} from '../../../../../utils/apis';
import Modal from 'react-native-modal';
import Loader from '../../../../../components/Loader/Loader';
const prodetails = ({route, navigation}) => {
  const {products} = useSelector(({ShoppinReducer}) => ShoppinReducer);
  const {userCredentials, isLoggedIn} = useSelector(
    ({_userstoringReducer}) => _userstoringReducer,
  );
  const {item} = route.params;
  console.log('object', products);
  const [orderDbId, setOrderDbId] = useState('');
  const [isvisible, setisvisible] = useState(false);
  const [checked, setChecked] = React.useState(false);
  const [show, setShow] = useState(false);
  const [loader, setloader] = useState(false);
  const [quan, setQua] = useState(0);
  const dispatch = useDispatch();
  const {height} = Dimensions.get('window');
  const [Quantitystorage, setQuantitystorage] = useState('');
  const price = parseInt(Quantitystorage.price);
  const quantity = Quantitystorage.qty;
  const total = item.price * quan;

  // console.log('checkDiscount', checked);
  const _placeorder = () => {
    console.log('Quantity storage in Pro details [][][][][][][][][][][', item);
    // setloader(true);
    const userToken = userCredentials?.access_token;
    const data = {
      payment_method: 'paypal',
      cart: [
        {
          product_id: item.id,
          quantity: quan,
        },
      ],
      avail_points: checked,
    };
    // console.log('product quantity', Quantitystorage.qty);
    fetch('https://lifestylesmoothie.com/api/create-order', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(responseJson => {
        // console.log('res Of Order', responseJson);
        setloader(false);
        if (responseJson.status === 'success') {
          // emptyCart()(dispatch);
          setOrderDbId(responseJson.order_id);
          console.log('responce of first api', responseJson);
          if (!item.is_payment) {
            Alert.alert('Congratulation!', responseJson.message, [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () => {
                  navigation.navigate('Home');
                  // setisvisible(true);
                },
              },
            ]);
          }
        } else if (responseJson.status === 'error') {
          console.log('Order Issue responce', responseJson);
        }
      })
      .catch(err => {
        console.log('Errr', err);
        setloader(false);
        throw err;
      });
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
      title: 'Product Detail',
      headerTitleStyle: {
        color: Colors.orange,
        fontFamily: 'Segoe UI Semibold',
        fontSize: 18,
      },
      headerTintColor: Colors.orange,
      headerStyle: {
        // height: 70,
      },
    });
  }, [isLoggedIn]);
  useEffect(() => {
    const foundValue = products.find(obj => obj.id === item.id);
    setQuantitystorage(foundValue);
  }, [products]);

  const _addFavorite = id => {
    const userToken = userCredentials?.access_token;
    const userdata = new FormData();
    userdata.append('product_id', id);
    Wishlist({userdata, userToken}).then(res => {
      if (res.status === 'success') {
        alert(res.message);
      }
    });
  };

  const onCheckStatus = async paymentResponse => {
    console.log('i am doing my work');
    setloader(true);
    let jsonResponse = JSON.parse(paymentResponse);
    console.log('resssPJsonToken', jsonResponse.token.id);
    console.log('orderid ', Quantitystorage.id);
    const data = new FormData();
    data.append('stripeToken', jsonResponse.token.id);
    data.append('order_id', orderDbId);
    console.log('payment resp', jsonResponse);
    // setisvisible(false);
    try {
      fetch('https://lifestylesmoothie.com/api/make-payment', {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'multipart/form-data',
          accept: 'application/json',
          Authorization: `Bearer ${userCredentials?.access_token}`,
        },
      })
        .then(response => response.json())
        .then(responseJson => {
          console.log(
            'responseJsons------------------------------------------------------------------',
            responseJson,
          );
          setloader(false);
          console.log('i am called twice i think');
          if (responseJson.status === 'success') {
            setisvisible(false);
            navigation.navigate('Home');
            Alert.alert('Congratulation!', responseJson.message, [
              {
                text: 'Cancel',
                // onPress: () => setisvisible(false),
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () => {
                  // setisvisible(false);
                },
              },
            ]);
            // alert(responseJson.message);
          } else if (responseJson.status === 'error') {
            console.log('errr', responseJson);
          } else {
            setloader(false);
          }
        });
    } catch (error) {
      setloader(false);
      console.log('err', error);
      throw error;
    }
  };
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: '#fff',
        paddingTop: 10,
        paddingBottom: 60,
      }}>
      {loader && <Loader />}
      <View style={homesubProdeuctdetail.container}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={{uri: item.main_image}}
            style={{
              height: 300,
              borderRadius: 10,
              width: '80%',
              resizeMode: 'contain',
            }}
          />
          <Text style={homesubProdeuctdetail.proNamestyle}>{item.title}</Text>
          <Text style={[homesubProdeuctdetail.prodescription, {width: '95%'}]}>
            {item.description}
          </Text>
        </View>
        <View
          style={{
            height: height > 700 ? 300 : 250,
            top: height > 700 ? '10%' : '10%',
            paddingHorizontal: 12,
          }}>
          <View
            style={{
              height: 50,
              backgroundColor: '#fff',
              elevation: 3,
              borderRadius: 5,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 12,
            }}>
            <Text
              style={[
                homesubProdeuctdetail.prodescription,
                {
                  textAlign: 'left',
                  fontFamily: 'Segoe UI Semibold',
                  fontSize: 16,
                },
              ]}>
              {/* ${total} */}${show ? `${total}` : `${item.price}`}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  if (quan > 0) {
                    setQua(quan - 1);
                  }
                }}
                style={homesubProdeuctdetail.cartbtnstyle}>
                <MinusIcon name={'minus'} size={18} color={'#fff'} />
              </TouchableOpacity>
              <Text
                style={{
                  fontFamily: 'Segoe UI',
                  fontSize: 14,
                  paddingHorizontal: 12,
                }}>
                {quan}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setQua(quan + 1);
                  setShow(true);
                }}
                style={homesubProdeuctdetail.cartbtnstyle}>
                <AddIcon name={'plus'} size={18} color={'#fff'} />
              </TouchableOpacity>
            </View>
          </View>
          <Button
            title={'Place The Order'}
            onPress={() => {
              quan == 0
                ? Alert.alert('Pleas Enter Quantity')
                : !item.is_payment
                ? isLoggedIn
                  ? _placeorder()
                  : Alert.alert('Alert', 'Please create account to continue', [
                      {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                      {text: 'OK', onPress: () => navigation.navigate('Login')},
                    ])
                : isLoggedIn
                ? (() => {
                    console.log('called');
                    setisvisible(true);
                    _placeorder();
                  })()
                : Alert.alert('Alert', 'Please create account to continue', [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {text: 'OK', onPress: () => navigation.navigate('Login')},
                  ]);
            }}
            style={{
              height: 50,
              marginTop: 12,
            }}
            titleTextstyle={{
              fontFamily: 'Segoe UI Semibold',
              fontSize: 16,
            }}
          />
          <View
            style={{
              height: 40,
              paddingVertical: 10,
              marginTop: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <CheckBox
              // value={checked ? 'checked' : 'unchecked'}
              value={checked}
              disabled={item.points < 100 ? true : false}
              color={Colors.orange}
              tintColors={{true: Colors.orange}}
              onCheckColor={Colors.orange}
              onTintColor={Colors.orange}
              style={{color: Colors.orange}}
              // onFillColor={Colors.orange}
              // onPress={() => {
              //   setChecked(!checked);
              // }}
              onValueChange={newValue => setChecked(!checked)}
            />
            <Text style={{fontFamily: 'Segoe UI Semibold', marginLeft: 10}}>
              Get Discount ({item.points})
            </Text>
          </View>

          <Button
            title={'Add to Favorite'}
            onPress={() =>
              userCredentials?.access_token
                ? _addFavorite(item.id)
                : Alert.alert('Alert', 'Please create account to continue', [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {text: 'OK', onPress: () => navigation.navigate('Login')},
                  ])
            }
            // onPress={() =>
            //   navigation.navigate('Fav', {
            //     screen: 'Fav',
            //     params: {item: item},
            //   })
            // }
            style={{
              backgroundColor: 'transparent',
              borderWidth: 1,
              borderColor: Colors.orange,
              height: 50,
              marginTop: 12,
            }}
            titleTextstyle={{
              color: Colors.orange,
              fontFamily: 'Segoe UI Semibold',
              fontSize: 16,
            }}
          />
        </View>
      </View>
      <Modal
        isVisible={isvisible}
        onBackButtonPress={() => setisvisible(false)}>
        <View style={{backgroundColor: '#fff', flex: 1}}>
          <AddIcon
            name="close"
            size={25}
            style={{alignSelf: 'flex-end', padding: 20}}
            onPress={() => setisvisible(false)}
          />
          <PaymentView
            title={item.title}
            qty={quan}
            price={item.price}
            subtotal={parseInt(quan) * parseInt(item.price)}
            onCheckStatus={onCheckStatus}
          />
        </View>
        {loader && <Loader />}
      </Modal>
    </ScrollView>
  );
};

export default prodetails;

const styles = StyleSheet.create({});
