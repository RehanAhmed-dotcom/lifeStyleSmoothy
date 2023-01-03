import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import {homesubProdeuctdetail} from '../../styles';
import Button from '../../../../../components/Button/button';
import Colors from '../../../colors/colors';
import {RemovefromFavorite} from '../../../../../utils/apis';
import {useSelector} from 'react-redux';
const Favdetails = ({route, navigation}) => {
  const {userCredentials} = useSelector(
    ({_userstoringReducer}) => _userstoringReducer,
  );
  const item = route.params;
  console.log('item', item);
  const {height} = Dimensions.get('window');
  useEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
      title: 'Favorite Detail',
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
  }, []);

  const _RemovefromFav = id => {
    const userToken = userCredentials.access_token;
    const userdata = new FormData();
    userdata.append('product_id', id);
    RemovefromFavorite({userdata, userToken}).then(res => {
      if (res.status === 'success') {
        alert(res.message);
        navigation.goBack();
      }
    });
  };
  return (
    <ScrollView style={{flex: 1}}>
      <View style={homesubProdeuctdetail.container}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={{uri: item.item.main_image}}
            style={{
              height: 300,
              borderRadius: 10,
              width: '80%',
              resizeMode: 'contain',
            }}
          />
          <Text style={homesubProdeuctdetail.proNamestyle}>
            {item.item.title}
          </Text>
          <Text style={[homesubProdeuctdetail.prodescription, {width: '95%'}]}>
            {item.item.description}
          </Text>
        </View>
        <View
          style={{
            height: height > 700 ? 300 : 220,
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
              justifyContent: 'center',
              paddingHorizontal: 12,
            }}>
            <Text style={{fontFamily: 'Segoe UI Semibold'}}>Price</Text>
            <Text style={{fontFamily: 'Segoe UI'}}>
              {'   '}({item.item.price})
            </Text>
          </View>
          <View style={{height: 20}} />
          <Button
            title={'Remove from favorite'}
            onPress={() => _RemovefromFav(item.item.product_id)}
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
        {/* </View> */}
      </View>
    </ScrollView>
  );
};

export default Favdetails;

const styles = StyleSheet.create({});
