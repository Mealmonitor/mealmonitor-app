import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import ArrowBack from '../../../assets/svg/ArrowBack';
import {useNavigation} from '@react-navigation/native';
import {style} from './BarcodeScreen';
import {BarCodeScanner} from 'expo-barcode-scanner';

export const BarcodeScreen = () => {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({type, data}) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

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
