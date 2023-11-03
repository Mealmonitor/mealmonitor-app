import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
} from 'react-native';
import BarcodeIcon from '../../../assets/svg/BarcodeIcon';

const AddMealScreen: React.FC = () => {
  return (
    <View style={style.container}>
      <Text style={style.header}>Add Food to your Meal</Text>

      <View style={style.inputContainer}>
        <TextInput style={style.input} placeholder="Search for Food" />
        <BarcodeIcon size={44}></BarcodeIcon>
      </View>

      <View style={style.bottomRectangle}>
        <View style={style.energyContainer}>
          <Text style={style.energyContainerText}>Total Energy</Text>
          <Text style={style.energyContainerText}>120 kCal</Text>
        </View>
        <View style={style.doneButton}>
          <TouchableOpacity
            style={style.doneButton}
            onPress={() => console.log('Done pressed!')}>
            <Text style={style.buttonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 120,
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
    height: 100,
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
});

export default AddMealScreen;
