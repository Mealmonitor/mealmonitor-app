import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import ArrowBack from '../../../assets/svg/ArrowBack';
import {useNavigation} from '@react-navigation/native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import {Vibration} from 'react-native';
import {getProductByBarcode} from '../api/publicApi';
import {AddFoodModal} from '../../features/addFood/AddFoodModal';
import {Food} from '../api/domain';

const BarcodeScreen = () => {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({type, data}) => {
    setScanned(true);
    const product = await getProductByBarcode(data);
    console.log(product);
    Vibration.vibrate();
    setProduct(product);
  };

  const handleAddFood = (food: Food) => {
    navigation.navigate({
      name: 'AddMeal',
      params: {newFood: food},
      merge: true,
    });
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
                navigation.navigate('AddMeal');
              }}>
              <ArrowBack />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={style.modalLikeContainer}>
        <View style={style.centeredContainer}>
          <Text style={style.textDescription}>Scan Food Barcode</Text>

          <View
            style={
              style.barcodeBox // Your existing styles
            }>
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={StyleSheet.absoluteFillObject}
            />
          </View>
          <View style={style.bottomContainer}>
            {product && (
              <View style={style.productDetails}>
                <View style={style.productDetailRow}>
                  <Text style={style.detailLabel}>Name:</Text>
                  <Text style={style.detailValue}>{product.name || '-'}</Text>
                </View>
                <View style={style.productDetailRow}>
                  <Text style={style.detailLabel}>Brand:</Text>
                  <Text style={style.detailValue}>{product.brand || '-'}</Text>
                </View>
                <View style={style.productDetailRow}>
                  <Text style={style.detailLabel}>Calories:</Text>
                  <Text style={style.detailValue}>
                    {product.caloriesPerCent || '-'}
                  </Text>
                </View>
              </View>
            )}
            {scanned && product && (
              <View style={style.buttonContainer}>
                <TouchableOpacity
                  style={style.backButton}
                  onPress={() => {
                    setScanned(false);
                    setProduct(null);
                  }}>
                  <Text className="text-sm font-semibold text-black">
                    Retry
                  </Text>
                </TouchableOpacity>
                <AddFoodModal
                  product={product}
                  onAddFood={handleAddFood}></AddFoodModal>
              </View>
            )}
          </View>
        </View>
      </View>
    </>
  );
};

export const style = StyleSheet.create({
  textDescription: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 50,
  },
  container: {backgroundColor: 'white'},
  centeredContainer: {
    justifyContent: 'space-between', // Center children vertically
    alignItems: 'center', // Center children horizontally
    marginHorizontal: 25,
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
    justifyContent: 'space-between',
  },
  barcodeBox: {
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
    height: 310,
    width: '100%',
    overflow: 'hidden',
    borderRadius: 25,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black', // Black border color
    shadowColor: '#000', // Shadow for a "raised" effect
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productDetails: {
    marginTop: 25,
    backgroundColor: 'white', // White background
    padding: 10, // Reduced padding around the content
    borderRadius: 25, // Rounded corners
    marginVertical: 25,
    width: '100%',
    alignSelf: 'center', // Center the box horizontally
    borderWidth: 1, // Width of the border
    borderColor: 'black', // Black border color
    shadowColor: '#000', // Shadow for a "raised" effect
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productDetailRow: {
    flexDirection: 'row', // Align children in a row
    justifyContent: 'space-between', // Maximize space between children
    marginBottom: 3, // Reduced bottom margin
    marginTop: 3, // Reduced top margin
  },
  detailLabel: {
    fontSize: 14, // Slightly smaller font size
    color: '#333',
  },
  detailValue: {
    fontSize: 14, // Slightly smaller font size
    color: '#333',
    flex: 1, // Take up remaining space
    textAlign: 'right', // Align text to the right
    fontWeight: 'bold',
  },
  backButton: {
    // h-[44px] items-center justify-center rounded-lg py-3 bg-white
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',

    borderRadius: 10,
    borderColor: '#2E856E',
    borderWidth: 1,
    shadowColor: '#000', // Shadow for a "raised" effect
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexGrow: 1,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 25,
  },

  bottomContainer: {
    width: '100%',
    height: 'auto',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

export default BarcodeScreen;
