import React, {useRef, useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Linking} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
// import {RNCamera} from 'react-native-camera';
import {ScanedProducts} from '../../../../utils/apis';
import {useSelector, useDispatch} from 'react-redux';
import {addToCart} from '../../../../redux/actions/cartaction/Index';
import Loader from '../../../../components/Loader/Loader';
import Color from '../../colors/colors';

const Scan = ({navigation}) => {
  const scanner = useRef(null);
  const {userCredentials} = useSelector(
    ({_userstoringReducer}) => _userstoringReducer,
  );

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
      title: 'Scan',
      headerTitleAlign: 'center',
      headerTitleStyle: {
        color: Color.orange,
        fontFamily: 'Segoe UI Semibold',
        fontSize: 18,
      },

      headerStyle: {
        // height: 70,
        backgroundColor: '#fff',
        elevation: 4,
      },
    });
  }, []);

  const action = useDispatch();
  const accessToken = userCredentials?.access_token;
  const [scan, Setscan] = useState(true);
  const [loader, setloader] = useState(false);
  const onSuccess = e => {
    Setscan(false);
    setloader(true);
    let result = e.data;
    ScanedProducts({result, accessToken}).then(res => {
      if (res.status === 'success') {
        let item = res.qr_code_product;
        action(
          addToCart({
            ...item,
            qty: 1,
            total: res.qr_code_product.price,
          }),
        );
        setloader(false);
        navigation.navigate('Prodetails', {item: res.qr_code_product});
      }
    });
  };
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      Setscan(true);
    });

    return unsubscribe;
  }, [navigation]);
  return !scan ? (
    <View>
      <Loader loader={loader} />
    </View>
  ) : (
    <QRCodeScanner
      onRead={onSuccess}
      reactivate={true}
      markerStyle={{
        borderColor: Color.orange,
      }}
      showMarker={true}
      cameraTimeout={0}
      reactivateTimeout={0}
      ref={scanner}
      bottomContent={
        <TouchableOpacity style={styles.buttonTouchable}>
          <Text style={styles.buttonText}>OK. Got it!</Text>
        </TouchableOpacity>
      }
    />
  );
};

export default Scan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: Color.orange,
  },
  buttonTouchable: {
    padding: 16,
  },
});

// import React, {Component} from 'react';
// import {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   Linking,
//   View,
// } from 'react-native';

// class ScanScreen extends Component {

//   render() {
//     return (

//     );
//   }
// }

// export default ScanScreen;

// import React, {useEffect, useState} from 'react';
// import {Image, TouchableOpacity, Text, View, FlatList} from 'react-native';
// import {Ordersstyle, Homestyle} from '../styles';
// import {useSelector} from 'react-redux';
// import Colors from '../../colors/colors';
// import Loader from '../../../../components/Loader/Loader';
// import {FavoritItemsList} from '../../../../utils/apis';
// import {SvgUri} from 'react-native-svg';

// const favorites = ({route, navigation}) => {
//   const {userCredentials} = useSelector(
//     ({_userstoringReducer}) => _userstoringReducer,
//   );

//   useEffect(() => {
//     navigation.setOptions({
//       headerTitleAlign: 'center',
//       title: 'Scan',
//       headerLeft: () => null,
//       headerStyle: {
//         height: 70,
//       },
//       headerTitleStyle: {
//         color: Colors.orange,
//         fontFamily: 'SegoeUISemiBold',
//         fontSize: 18,
//       },
//     });
//   }, []);

//   return <View style={{flex: 1, backgroundColor: '#fff'}}></View>;
// };

// export default favorites;
