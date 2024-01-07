import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import MyProfileIcon from '../../../assets/svg/MyProfileIcon';
import {Center} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {ProgressBar} from 'react-native-paper';
import {useState} from 'react';
import {EditWeightModal} from './EditWeightModal';

const NewProfilePage = () => {
  const navigation = useNavigation();
  const handleAddGoalPress = () => {
    navigation.navigate('AddGoal');
  };

  const [weight, setWeight] = useState(NaN);

  const proteinsTarget = 177;
  const carbsTarget = 240;
  const fatsTarget = 240;
  const fibersTarget = 25;

  const currentProteinsAmount = 23;
  const currentCarbsAmount = 120;
  const currentFatsAmount = 74;
  const currentFibersAmount = 23;

  const remainingProteins = proteinsTarget - currentProteinsAmount;
  const remainingCarbs = carbsTarget - currentCarbsAmount;
  const remainingFats = fatsTarget - currentFatsAmount;
  const remainingFibers = fibersTarget - currentFibersAmount;

  const progressProteins = currentProteinsAmount / proteinsTarget;
  const progressCarbs = currentCarbsAmount / carbsTarget;
  const progressFats = currentFatsAmount / fatsTarget;
  const progressFibers = currentFibersAmount / fibersTarget;

  return (
    <>
      <View className="pt-12">
        <View style={style.banner}></View>
      </View>

      <View style={style.modalLikeContainer}>
        <View style={style.titleContainer}>
          <View style={style.icon}>
            <MyProfileIcon color="#2E856E" size={25}></MyProfileIcon>
          </View>

          <View style={style.profileContainer}>
            <Text style={style.profileName}>Andreea</Text>

            <TouchableOpacity style={style.logoutButton}>
              <Text style={style.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={style.weightContainer}>
          <Text style={style.weightText}>Weight: {weight} kg</Text>
          <EditWeightModal
            onEditWeight={newW => {
              setWeight(newW);
            }}></EditWeightModal>
        </View>

        <View style={style.centeredContainer}>
          <View>
            <Text style={style.energyText}>Total Energy Target: 3000 kCal</Text>
            <View style={style.box}>
              <View style={style.boxAlign}>
                <Text style={style.text2}>Proteins</Text>
                <Text style={style.text3}>Remaining</Text>
              </View>
              <View style={style.boxAlign}>
                <Text style={style.text2}>{currentProteinsAmount} g</Text>
                <Text style={style.text3}>{remainingProteins} g</Text>
              </View>
              <View style={{marginVertical: 10, marginHorizontal: 20}}>
                <ProgressBar
                  progress={progressProteins}
                  color="#FFF"
                  style={{
                    borderRadius: 10,
                    backgroundColor: '#006A4E',
                    height: 10,
                  }}
                />
              </View>
            </View>
            <View style={style.box}>
              <View style={style.boxAlign}>
                <Text style={style.text2}>Carbs</Text>
                <Text style={style.text3}>Remaining</Text>
              </View>
              <View style={style.boxAlign}>
                <Text style={style.text2}>{currentCarbsAmount} g</Text>
                <Text style={style.text3}>{remainingCarbs} g</Text>
              </View>
              <View style={{marginVertical: 10, marginHorizontal: 20}}>
                <ProgressBar
                  progress={progressCarbs}
                  color="#FFF"
                  style={{
                    borderRadius: 10,
                    backgroundColor: '#006A4E',
                    height: 10,
                  }}
                />
              </View>
            </View>
            <View style={style.box}>
              <View style={style.boxAlign}>
                <Text style={style.text2}>Fats</Text>
                <Text style={style.text3}>Remaining</Text>
              </View>
              <View style={style.boxAlign}>
                <Text style={style.text2}>{currentFatsAmount} g</Text>
                <Text style={style.text3}>{remainingFats} g</Text>
              </View>
              <View style={{marginVertical: 10, marginHorizontal: 20}}>
                <ProgressBar
                  progress={progressFats}
                  color="#FFF"
                  style={{
                    borderRadius: 10,
                    backgroundColor: '#006A4E',
                    height: 10,
                  }}
                />
              </View>
            </View>
            <View style={style.box}>
              <View style={style.boxAlign}>
                <Text style={style.text2}>Fibers</Text>
                <Text style={style.text3}>Remaining</Text>
              </View>
              <View style={style.boxAlign}>
                <Text style={style.text2}>{currentFibersAmount} g</Text>
                <Text style={style.text3}>{remainingFibers} g</Text>
              </View>
              <View style={{marginVertical: 10, marginHorizontal: 20}}>
                <ProgressBar
                  progress={progressFibers}
                  color="#FFF"
                  style={{
                    borderRadius: 10,
                    backgroundColor: '#006A4E',
                    height: 10,
                  }}
                />
              </View>
            </View>
          </View>
          <TouchableOpacity style={style.removeGoalButton}>
            <Text style={style.removeGoalButtonText}>Remove Goal</Text>
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
    //className="pt-10 flex-1 rounded-t-[40] bg-white"
    paddingTop: 10,
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  weightContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 35,
    marginTop: 5,
    borderBottomColor: '#B8D5CD',
    borderBottomWidth: 1,
  },
  weightText: {
    fontWeight: '500',
    fontSize: 18,
    color: '#5CA08E',
    marginLeft: 5,
  },
  energyText: {
    marginTop: 30,
    fontWeight: 'bold',
    fontSize: 20,
    color: '#006A4E',
    textAlign: 'center',
  },
  centeredContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '500',
  },
  text2: {
    fontWeight: '500',
    color: 'white',
  },
  text3: {
    fontWeight: '500',
    color: '#006A4E',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '72.5%',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingLeft: 15,
    marginRight: 15,
  },
  profileName: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#006A4E',
    marginTop: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginTop: 30,
    marginLeft: 30,
    backgroundColor: '#EBF7F4',
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoutButton: {
    backgroundColor: '#5CA08E',
    paddingHorizontal: 35,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 60,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  setGoalButton: {
    backgroundColor: '#2E856E',
    paddingHorizontal: 35,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  setGoalText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  box: {
    marginTop: 10,
    paddingTop: 7,
    width: 337,
    flexShrink: 0,
    borderRadius: 10,
    backgroundColor: '#5CA08E',
  },
  boxAlign: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  boxText: {
    fontSize: 20,
    marginLeft: 10,
  },
  removeGoalButton: {
    marginTop: 15,
    paddingHorizontal: 35,
    paddingVertical: 10,
    backgroundColor: '#006A4E',
    alignItems: 'center',
    borderRadius: 20,
  },
  removeGoalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default NewProfilePage;
