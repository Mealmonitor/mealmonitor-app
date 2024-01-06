import {useEffect, useState} from 'react';
import {Food, ProductDto} from '../../app/api/domain';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import CloseIcon from '../../../assets/svg/CloseIcon';
import UnitOfMeasurementDropdown from './UnitOfMeasurementDropdown';
import {useNavigation} from '@react-navigation/native';

interface AddFoodModal {
  product: ProductDto;
  onAddFood: (food: Food) => void;
}
export const dropdownData = [
  {label: 'g', value: 'g'},
  {label: 'ml', value: 'ml'},
];
export const AddFoodModal: React.FC<AddFoodModal> = ({product, onAddFood}) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [unitOfMeasurement, setUnitOfMeasurement] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [formComplete, setFormComplete] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    setFormComplete(!Number.isNaN(quantity) && unitOfMeasurement);
  }, [quantity, unitOfMeasurement]);

  return (
    <View style={style.acceptContainer}>
      <TouchableOpacity
        style={style.acceptButton}
        onPress={() => {
          setShowEditModal(true);
        }}>
        <Text className="text-sm font-semibold text-[#B8D5CD]">Accept</Text>
      </TouchableOpacity>

      <Modal animationType="fade" transparent={true} visible={showEditModal}>
        <View style={style.modalContainer}>
          <View style={style.modal}>
            <TouchableOpacity
              onPress={() => {
                setShowEditModal(false);
              }}
              className="mx-2 mt-2 self-end">
              <CloseIcon size={24} color={'black'} />
            </TouchableOpacity>
            <View className="">
              <Text className="color-[#006A4E] font-bold text-2xl text-center mb-4">
                Add {product.name}
              </Text>
              <View style={style.inputContainer}>
                <TextInput
                  keyboardType="numeric"
                  style={style.input}
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
                style={style.doneButton}
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
                }}>
                <Text className="text-sm font-semibold text-[#B8D5CD]">
                  Done
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  acceptButton: {
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2E856E',

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
  doneButton: {
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
  acceptContainer: {
    flexGrow: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  modal: {
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
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 12,
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: '80%',
    borderWidth: 2,
    padding: 10,
    borderRadius: 8,
  },
  dropdownStyle: {},
});
