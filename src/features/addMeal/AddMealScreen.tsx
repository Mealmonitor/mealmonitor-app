import {
  Link,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  ImageBackground,
  Pressable,
  TextInput,
} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

import QRCode from 'react-native-qrcode-svg';

import {useDispatch, useSelector} from 'react-redux';
import * as Brightness from 'expo-brightness';
import {ChevronDownIcon, ChevronUpIcon} from 'native-base';
import {twFullConfig} from '../../utils/tailwindConfig';
import ArrowBack from '../../../assets/svg/ArrowBack';
import AddMealIcon from '../../../assets/svg/AddMealIcon';
import BarcodeIcon from '../../../assets/svg/BarcodeIcon';
import CloseIcon from '../../../assets/svg/CloseIcon';
import {AppDispatch, RootState} from '../../app/store/store';
import {EditFoodModal} from '../editFood/EditFoodModal';
import {Food, Meal} from '../../app/api/domain';
import {createMeal} from '../../app/api/publicApi';

interface QRCodeModal {
  route: any;
}
type AddMealScreenRouteParams = {
  newFood: Food; // replace 'string' with the actual type of 'newFood'
  // add other params here if there are any
};

const AddMealScreen: React.FC<QRCodeModal> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const route =
    useRoute<RouteProp<{params: AddMealScreenRouteParams}, 'params'>>();

  // Access route parameters

  const [foodList, setFoodList] = useState<Food[]>([]);

  const navigation = useNavigation();
  const handleBarcodePress = () => {
    dispatch({type: 'notifications/hideCoinsModal'});
    navigation.navigate('Barcode');
  };

  const handleMealCreate = async () => {
    const meal: Meal = {
      id: '',
      version: 0,
      created: undefined,
      updated: undefined,
      dateTime: new Date(),
      foodList: foodList,
    };
    await createMeal(meal);
  };

  React.useEffect(() => {
    if (route.params?.newFood) {
      setFoodList(previousFoodList => [
        ...previousFoodList,
        route.params?.newFood,
      ]);
    }
  }, [route.params?.newFood]);

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
      <View
        style={{
          ...style.modal,
          backgroundColor: '#fff',
          flexGrow: 1,
        }}>
        <View className="relative overflow-hidden flex-1 mt-4">
          <View style={style.container2}>
            <Text style={style.header}>Add Food to your Meal</Text>

            <View style={style.inputContainer}>
              <TextInput style={style.input} placeholder="Search for Food" />
              <TouchableOpacity onPress={handleBarcodePress}>
                <BarcodeIcon size={44}></BarcodeIcon>
              </TouchableOpacity>
            </View>
            <ScrollView
              overScrollMode="always"
              contentContainerStyle={style.container}>
              <View>
                {foodList.map((food: Food, index) => {
                  return (
                    <View key={index} style={style.listItem}>
                      <Text style={style.foodName}>
                        {food.name}
                        {'\n'}
                        <Text style={style.brand}>{food.brand}</Text>
                      </Text>
                      <View style={style.quantityContainer}>
                        <Text style={style.quantity}>{food.quantity}</Text>
                        <Text style={style.unitOfMeasurement}>
                          {food.unitOfMeasurement}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            </ScrollView>
            <View style={style.bottomRectangle}>
              <View style={style.energyContainer}>
                <Text style={style.energyContainerText}>Total Energy</Text>
                <Text style={style.energyContainerText}>
                  {Math.round(
                    foodList.reduce(
                      (sum, current) =>
                        sum + (current.calories * current.quantity) / 100,
                      0,
                    ),
                  )}{' '}
                  kCal
                </Text>
              </View>
              <View>
                <TouchableOpacity
                  style={style.backButton}
                  onPress={() => {
                    handleMealCreate();
                  }}>
                  <Text className="text-sm font-semibold text-black">Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  heartsAnimation: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    zIndex: -1,
  },
  icon: {
    top: -10,
  },
  container: {
    flexGrow: 1,
    overflow: 'hidden',
  },
  modal: {
    flex: 1,
    backgroundColor: twFullConfig.theme.colors.eisgrau,
    overflow: 'hidden',
    borderTopEndRadius: 40,
    borderTopStartRadius: 40,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 40,
    elevation: 5,
  },
  container2: {
    flex: 1,
    paddingTop: 12,
    backgroundColor: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 12,
    alignItems: 'center',
  },
  header: {
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 12,
  },
  input: {
    height: 40,
    width: '80%',
    borderWidth: 2,
    padding: 10,
    borderRadius: 8,
  },
  bottomRectangle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 110,
    backgroundColor: '#2E856E',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  energyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    marginTop: 10,
  },
  energyContainerText: {
    color: 'white',
    fontSize: 18,
  },
  doneButton: {
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#2E856E',
    fontSize: 16,
    fontWeight: '700',
  },
  backButton: {
    // h-[44px] items-center justify-center rounded-lg py-3 bg-white
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginHorizontal: 30,
    marginVertical: 9,
    borderRadius: 10,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc', // Add a border to separate items
  },
  foodName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  quantity: {
    fontSize: 16,
    color: '#555',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  unitOfMeasurement: {
    fontSize: 16,
    color: '#555',
    marginLeft: 5, // Add some space between quantity and unit
  },
  brand: {
    fontSize: 14,
    color: '#888',
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
});

export default AddMealScreen;
