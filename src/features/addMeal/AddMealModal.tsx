import {Link, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
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

interface QRCodeModal {}

const AddMealModal: React.FC<QRCodeModal> = () => {
  const windowHeight = Dimensions.get('window').height;
  const dispatch = useDispatch<AppDispatch>();

  const [foodList, setFoodList] = useState([]);

  const showModal = useSelector(
    (state: RootState) => state.notification.showCoinsModal,
  );

  const handlePress = async () => {
    dispatch({type: 'notifications/showCoinsModal'});
  };

  const navigation = useNavigation();
  const handleBarcodePress = () => {
    dispatch({type: 'notifications/hideCoinsModal'});
    navigation.navigate('Barcode');
  };

  return (
    <View>
      <TouchableOpacity
        hitSlop={{top: 5, bottom: 20, left: 20, right: 20}}
        onPress={handlePress}
        style={style.icon}
        activeOpacity={1}>
        <AddMealIcon size={55} />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {}}>
        <ScrollView
          overScrollMode="always"
          contentContainerStyle={style.container}>
          <View
            style={{
              ...style.modal,
              marginTop: windowHeight * 0.145,
              backgroundColor: '#fff',
            }}>
            <TouchableOpacity
              onPress={() => {
                dispatch({type: 'notifications/hideCoinsModal'});
                // (async () => {
                //   await Brightness.setBrightnessAsync(brightness);
                // })();
              }}
              className="mx-8 mt-8 self-end">
              <CloseIcon size={24} color={'black'} />
            </TouchableOpacity>
            <View className="relative overflow-hidden flex-1">
              <View style={style.container2}>
                <Text style={style.header}>Add Food to your Meal</Text>

                <View style={style.inputContainer}>
                  <TextInput
                    style={style.input}
                    placeholder="Search for Food"
                  />
                  <TouchableOpacity onPress={handleBarcodePress}>
                    <BarcodeIcon size={44}></BarcodeIcon>
                  </TouchableOpacity>
                </View>

                <View>
                  {/* {error && <Text>Error fetching meals: {error.message}</Text>} */}
                  {foodList.map((food, index) => {
                    return (
                      <EditFoodModal index={index} food={food}></EditFoodModal>
                    );
                  })}
                </View>

                <View style={style.bottomRectangle}>
                  <View style={style.energyContainer}>
                    <Text style={style.energyContainerText}>Total Energy</Text>
                    <Text style={style.energyContainerText}>120 kCal</Text>
                  </View>
                  <View>
                    <TouchableOpacity
                      style={style.backButton}
                      onPress={() => {}}>
                      <Text className="text-sm font-semibold text-black">
                        Done
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </Modal>
    </View>
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
});

export default AddMealModal;
