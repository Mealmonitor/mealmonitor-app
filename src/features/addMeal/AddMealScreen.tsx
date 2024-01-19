import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  TextInput,
  Modal,
} from 'react-native';

import {useDispatch} from 'react-redux';
import {twFullConfig} from '../../utils/tailwindConfig';
import ArrowBack from '../../../assets/svg/ArrowBack';
import BarcodeIcon from '../../../assets/svg/BarcodeIcon';
import {AppDispatch} from '../../app/store/store';
import {Food, Meal, ProductDto} from '../../app/api/domain';
import {createMeal, searchProduct} from '../../app/api/publicApi';
import UnitOfMeasurementDropdown from '../addFood/UnitOfMeasurementDropdown';
import CloseIcon from '../../../assets/svg/CloseIcon';
import {dropdownData} from '../addFood/AddFoodModal';
import {UserContext} from '../auth/userContext';

interface QRCodeModal {
  route: any;
}
type AddMealScreenRouteParams = {
  newFood: Food;
};

const AddMealScreen: React.FC<QRCodeModal> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const route =
    useRoute<RouteProp<{params: AddMealScreenRouteParams}, 'params'>>();

  const [foodList, setFoodList] = useState<Food[]>([]);
  const [resultList, setResultList] = useState<ProductDto[]>([]);
  const [query, setQuery] = useState<string>('');
  const [unitOfMeasurement, setUnitOfMeasurement] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [formComplete, setFormComplete] = useState(false);
  const [product, setProduct] = useState<ProductDto>(null);
  const navigation = useNavigation();
  const {updateState, meals, totalGoal, date} = useContext(UserContext);

  const handleBarcodePress = () => {
    navigation.navigate('Barcode');
  };
  useEffect(() => {
    setFormComplete(!Number.isNaN(quantity) && unitOfMeasurement);
  }, [quantity, unitOfMeasurement]);
  const handleMealCreate = async () => {
    const meal: Meal = {
      id: '',
      version: 0,
      created: undefined,
      updated: undefined,
      dateTime: date,
      foodList: foodList,
    };
    await createMeal(meal);
    navigation.navigate('Public');
  };

  React.useEffect(() => {
    if (route.params?.newFood) {
      setFoodList(previousFoodList => [
        ...previousFoodList,
        route.params?.newFood,
      ]);
    }
  }, [route.params?.newFood]);

  const [showEditModal, setShowEditModal] = useState(false);

  React.useEffect(() => {
    const foo = async () => {
      if (query.length >= 3) {
        const rez = await searchProduct(query);
        setResultList(rez);
      }
    };
    foo();
  }, [query]);

  function onAddFood(newFood: Food) {
    setFoodList(previousFoodList => [...previousFoodList, newFood]);
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
              <TextInput
                style={style.input}
                onChangeText={newText => setQuery(newText)}
                placeholder="Search for Food"
              />
              <TouchableOpacity onPress={handleBarcodePress}>
                <BarcodeIcon size={44}></BarcodeIcon>
              </TouchableOpacity>
            </View>

            {query.length >= 3 && (
              <ScrollView>
                <View style={style.searchResults}>
                  {resultList.map((result: ProductDto, index) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          setProduct(result);
                          setShowEditModal(true);
                        }}>
                        <Text style={style.resultTitle}>
                          {result.name + ' by ' + result.brand}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                  <View>
                    <Text style={style.resultNotFound}>
                      My Food is not on the list
                    </Text>
                  </View>
                </View>
              </ScrollView>
            )}
            <Modal
              animationType="fade"
              transparent={true}
              visible={showEditModal}>
              <View style={style.modalContainer}>
                <View style={style.modal2}>
                  <TouchableOpacity
                    onPress={() => {
                      setShowEditModal(false);
                    }}
                    className="mx-2 mt-2 self-end">
                    <CloseIcon size={24} color={'black'} />
                  </TouchableOpacity>
                  <View className="">
                    <Text className="color-[#006A4E] font-bold text-2xl text-center mb-4">
                      Add Product
                    </Text>
                    <View style={style.inputContainer}>
                      <TextInput
                        keyboardType="numeric"
                        style={style.input2}
                        placeholder="0"
                        onChangeText={newText => setQuantity(parseInt(newText))}
                      />
                      <View style={style.dropdownStyle}>
                        <UnitOfMeasurementDropdown
                          data={dropdownData}
                          values={unitOfMeasurement}
                          setValues={
                            setUnitOfMeasurement
                          }></UnitOfMeasurementDropdown>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={style.doneButton2}
                      disabled={!formComplete}
                      onPress={() => {
                        setShowEditModal(false);
                        const newFood: Food = {
                          id: '',
                          version: 0,
                          created: undefined,
                          updated: undefined,
                          barCode: product.barcode,
                          name: product.name,
                          brand: product.brand,
                          unitOfMeasurement: unitOfMeasurement,
                          quantity: quantity,
                          calories: product.caloriesPerCent,
                          proteins: product.proteinsPerCent,
                          carbs: product.carbsPerCent,
                          fats: product.fatsPerCent,
                        };
                        onAddFood(newFood);
                        setQuery('');
                      }}>
                      <Text className="text-sm font-semibold text-[#B8D5CD]">
                        Done
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
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
  input2: {
    height: 40,
    width: '77%',
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
  searchResults: {
    display: 'flex',
    padding: 16,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 16,
    borderRadius: 8,
    borderWidth: 2,
    backgroundColor: 'white',
    marginHorizontal: 12,
  },
  resultTitle: {
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 24,
  },
  resultNotFound: {
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 24,
    textDecorationLine: 'underline',
    color: '#2E856E',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  modal2: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 40,
    elevation: 5,
    width: '90%',
  },
  dropdownStyle: {},
  doneButton2: {
    // h-[44px] items-center justify-center rounded-lg py-3 bg-white
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2E856E',
    marginHorizontal: 10,
    marginVertical: 15,
    borderRadius: 10,
    shadowColor: '#000', // Shadow for a "raised" effect
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default AddMealScreen;
