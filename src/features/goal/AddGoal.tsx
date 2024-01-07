import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {RadioButton} from 'react-native-paper';

const AddGoal = () => {
  const navigation = useNavigation();

  const [selectedValue, setSelectedValue] = useState(null);

  return (
    <>
      <View className="pt-12">
        <View style={style.banner}></View>
      </View>

      <View style={style.modalLikeContainer}>
        <Text style={style.title}>Choose goal</Text>

        <View style={style.box}>
          <RadioButton
            value="loseWeight"
            status={selectedValue === 'loseWeight' ? 'checked' : 'unchecked'}
            onPress={() => setSelectedValue('loseWeight')}
            color="#2E856E"
          />
          <Text style={style.boxText}>Lose weight</Text>
        </View>
        <View style={style.box}>
          <RadioButton
            value="increaseMuscleMass"
            status={
              selectedValue === 'increaseMuscleMass' ? 'checked' : 'unchecked'
            }
            onPress={() => setSelectedValue('increaseMuscleMass')}
            color="#2E856E"
          />
          <Text style={style.boxText}>Increase muscle mass</Text>
        </View>
        <View style={style.box}>
          <RadioButton
            value="gainWeight"
            status={selectedValue === 'gainWeight' ? 'checked' : 'unchecked'}
            onPress={() => setSelectedValue('gainWeight')}
            color="#2E856E"
          />
          <Text style={style.boxText}>Gain weight</Text>
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
            style={[style.nextButton, {opacity: selectedValue ? 1 : 0.4}]}
            disabled={!selectedValue}
            onPress={() => {
              navigation.navigate('AddMetabolism');
            }}>
            <Text style={style.nextButtonText}>Next</Text>
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
    fontStyle: 'normal',
    fontWeight: 'bold',
    paddingTop: 25,
    paddingBottom: 20,
    textAlign: 'center',
  },
  box: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 30,
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#AAA',
  },
  boxText: {
    fontSize: 20,
    marginLeft: 10,
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
    fontFamily: 'Basic',
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

export default AddGoal;
