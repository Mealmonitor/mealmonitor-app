import {Food} from '../../app/api/domain';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Alert,
} from 'react-native';

interface EditFoodModal {
  index: number;
  food: Food;
}

export const EditFoodModal: React.FC<EditFoodModal> = ({index, food}) => {
  return <Text>{food.brand}</Text>;
};
