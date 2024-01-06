import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {CheckBox} from 'react-native-checkbox';

const AddGoal = () => {
  const navigation = useNavigation();

  const handlePublicPress = () => {
    navigation.navigate('Public');
  };

  const [isSelected, setSelection] = useState(false);

  return (
    <>
      <View className="pt-12">
        <View style={style.banner}></View>
      </View>

      <View style={style.modalLikeContainer}>
        <Text style={style.title}>Choose goal:</Text>

        <View style={style.box}>
          <CheckBox
            value={isSelected}
            onValueChange={setSelection}
            style={style.checkbox}
          />

          <Text style={style.boxText}>Lose weight</Text>
        </View>
        <View style={style.box}>
          <Text style={style.boxText}>Increas muscle mass</Text>
        </View>
        <View style={style.box}>
          <Text style={style.boxText}>Gain weight</Text>
        </View>

        <View style={style.ButtonContainer}>
          <TouchableOpacity
            style={style.backButton}
            onPress={handlePublicPress}>
            <Text style={style.backButtonText}>Back</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={[style.nextButton, {opacity: isSelected ? 1 : 0.4}]}
            disabled={!isSelected}>
            <Text style={style.nextButtonText}>Next</Text>
          </TouchableOpacity> */}
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
    marginLeft: 45,
    paddingBottom: 20,
  },
  box: {
    display: 'flex',
    padding: 10,
    marginHorizontal: 30,
    alignItems: 'flex-start',
    marginVertical: 8,
    alignSelf: 'stretch',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#AAA',
  },
  boxText: {
    fontSize: 20,
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
    fontFamily: 'Basic',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 24,
  },
  checkbox: {
    alignSelf: 'center',
  },
});

export default AddGoal;
