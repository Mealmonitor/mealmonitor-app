import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import UnitOfMeasurementDropdown from '../addFood/UnitOfMeasurementDropdown';
import MetabolismDropdown from './MetabolismDropdown';

const AddMetabolism = () => {
  const navigation = useNavigation();

  const [selectedMetabolism, setSelectedMetabolism] = useState(null);
  const [weight, setWeight] = useState(NaN);

  const [formComplete, setFormComplete] = useState(false);

  useEffect(() => {
    setFormComplete(!Number.isNaN(weight) && selectedMetabolism != null);
  }, [weight, selectedMetabolism]);

  const dropdownData = [
    {label: 'Slow', value: 'Slow'},
    {label: 'Moderate', value: 'Moderate'},
    {label: 'Fast', value: 'Fast'},
  ];

  return (
    <>
      <View className="pt-12">
        <View style={style.banner}></View>
      </View>

      <View style={style.modalLikeContainer}>
        <Text style={style.title}>Complete Profile</Text>

        <View style={style.container}>
          <Text style={style.containerText}>Weight</Text>
          <View style={style.box}>
            <TextInput
              keyboardType="numeric"
              style={style.input}
              placeholder="0"
              onChangeText={newText => setWeight(parseInt(newText))}
            />
          </View>
        </View>
        <View style={style.container}>
          <Text style={style.containerText}>Metabolism</Text>

          <MetabolismDropdown
            data={dropdownData}
            values={selectedMetabolism}
            setValues={setSelectedMetabolism}></MetabolismDropdown>
        </View>

        <View style={style.ButtonContainer}>
          <TouchableOpacity
            style={style.backButton}
            onPress={() => {
              navigation.goBack();
            }}>
            <Text style={style.backButtonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[style.nextButton, {opacity: formComplete ? 1 : 0.4}]}
            disabled={!formComplete}
            onPress={() => {
              navigation.navigate('NewProfilePage');
            }}>
            <Text style={style.nextButtonText}>Finish</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  banner: {
    paddingTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    paddingBottom: 24,
  },

  modalLikeContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  title: {
    color: '#2E856E',
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 25,
    paddingBottom: 20,
    textAlign: 'center',
  },
  container: {
    flexDirection: 'column',
    marginHorizontal: 70,
    marginVertical: 10,
  },
  containerText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#444444',
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#AAA',
  },
  boxText: {
    fontSize: 20,
    marginLeft: 10,
  },
  input: {
    padding: 10,
    flexGrow: 1,
    fontWeight: '400',
    fontSize: 20,
  },
  picker: {
    height: 20,
    width: 250,
  },

  ButtonContainer: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
  },
  backButton: {
    flexDirection: 'row',
    height: 44,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    flex: 1,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#2E856E',
  },
  backButtonText: {
    color: '#2E856E',
    textAlign: 'center',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 24,
  },
  nextButton: {
    flex: 1,
    height: 44,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    borderRadius: 8,
    opacity: 0.4,
    backgroundColor: '#2E856E',
  },
  nextButtonText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 24,
  },
});

export default AddMetabolism;
