import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import ArrowBack from '../../../assets/svg/ArrowBack';
import {useNavigation} from '@react-navigation/native';
import {twFullConfig} from '../../utils/tailwindConfig';
import AddMealIcon from '../../../assets/svg/AddMealIcon';

const BarcodeScreen = () => {
  const navigation = useNavigation();
  return (
    <>
      <View className="pt-12">
        <View style={style.banner}>
          <View style={style.arrow}>
            <TouchableOpacity
              hitSlop={15}
              onPress={() => {
                navigation.navigate('Public');
              }}>
              <ArrowBack />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={style.modalLikeContainer}>
        <View style={style.centeredContainer}>
          <Text style={style.textDescription}>Scan Food Barcode</Text>
        </View>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  textDescription: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 50,
  },
  container: {backgroundColor: 'white'},
  centeredContainer: {
    justifyContent: 'center', // Center children vertically
    alignItems: 'center', // Center children horizontally
  },

  headerTextMiddle: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    zIndex: 1,
  },
  banner: {
    paddingTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    paddingBottom: 24,
  },
  arrow: {
    marginHorizontal: 23,
    justifyContent: 'center',
    alignContent: 'center',
  },
  modalLikeContainer: {
    paddingTop: 10,
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
});

export default BarcodeScreen;
