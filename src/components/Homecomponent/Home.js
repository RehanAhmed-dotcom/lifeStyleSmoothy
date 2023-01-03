import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Homestyle } from '../../screens/appscreens/Tabsscreens/styles';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/actions/cartaction/Index';
const Home = ({ item, navigation }) => {
  const action = useDispatch();

  return (
    <TouchableOpacity
      onPress={() => {
        action(
          addToCart({
            ...item,
            qty: 0,
            total: item.price,
          }),
        );
        { console.log('item in Home ', item) }
        navigation.navigate('Prodetails', { item: item });
      }}
      style={Homestyle.topView}>
      <View style={Homestyle.descrView}>
        <Text numberOfLines={2} style={Homestyle.pronameText}>
          {item.title}
        </Text>
        <Text numberOfLines={2} style={Homestyle.prodescription}>
          {item.description}
        </Text>
        <View style={{ marginTop: 14 }}>
          <Image
            source={{ uri: item.main_image }}
            style={Homestyle.promimagestyle}
          />
        </View>
      </View>
      <View style={Homestyle.priceview}>
        <Text style={Homestyle.priceStyle}>${item.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Home;
