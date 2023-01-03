import React, {useEffect} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import Colors from '../../../colors/colors';
import {orderdetailsStyle} from '../../styles';
const orderdetails = ({navigation, route}) => {
  const {item} = route.params;
  useEffect(() => {
    navigation.setOptions({
      title: 'Order Detail',
      headerTitleAlign: 'center',
      headerTintColor: Colors.orange,
      headerStyle: {
        // height: 70,
      },
    });
  }, []);
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1, backgroundColor: '#fff'}}>
      <View style={orderdetailsStyle.container}>
        <View style={orderdetailsStyle.topViewstyle}>
          <View style={orderdetailsStyle.imageview}>
            <Image
              source={{uri: item.main_image}}
              style={orderdetailsStyle.imagestyle}
            />
          </View>
          <Text
            style={{
              fontFamily: 'Segoe UI',
              color: 'black',
              fontSize: 16,
              textAlign: 'center',
            }}>
            {item.description}
          </Text>
        </View>
        <View style={orderdetailsStyle.endViewstyle}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontFamily: 'Segoe UI Semibold',
                color: 'black',
                fontSize: 18,
              }}>
              Quanitity
            </Text>
            <Text style={orderdetailsStyle.quanityAndpriceTextstyle}>
              {item.quantity}
            </Text>
          </View>
          <View style={{height: 10}} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: 12,
            }}>
            <Text
              style={{
                fontFamily: 'Segoe UI Semibold',
                color: 'black',
                fontSize: 18,
              }}>
              Price
            </Text>
            <Text
              style={{
                fontFamily: 'Segoe UI',
                color: 'black',
                fontSize: 16,
              }}>
              ${item.price}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={[
                orderdetailsStyle.statusesText,
                {fontFamily: 'Segoe UI Semibold', fontSize: 18},
              ]}>
              Status
            </Text>

            <Text
              style={{
                fontFamily: 'Segoe UI',
                fontSize: 16,
                color: Colors.orange,
              }}>
              {item.status}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default orderdetails;

const styles = StyleSheet.create({});
