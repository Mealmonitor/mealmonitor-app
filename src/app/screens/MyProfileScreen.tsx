import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import MyProfileIcon from '../../../assets/svg/MyProfileIcon';
import {useNavigation} from '@react-navigation/native';
import {logout} from '../../features/auth/auth';
import {getGoal, getUserFirstName} from '../api/publicApi';
import {useContext, useEffect, useState} from 'react';
import {UserContext} from '../../features/auth/userContext';
import {auth} from '../config/config';
import {ProgressBar} from 'react-native-paper';
import {EditWeightModal} from '../../features/goal/EditWeightModal';
import {
  calculateGoal,
  getPerDay,
  getPerDayComplete,
} from '../../features/goal/goalCalculator';
import React from 'react';

const MyProfileScreen = () => {
  const navigation = useNavigation();
  const handleAddGoalPress = () => {
    navigation.navigate('AddGoal');
  };
  const {updateState, totalGoal, name, meals, weight, metabolism, goal} =
    useContext(UserContext);

  const [currentProteinsAmount, setCurrentProteinsAmount] = useState(1000);
  const [currentCarbsAmount, setCurrentCarbsAmount] = useState(1000);
  const [currentFatsAmount, setCurrentFatsAmount] = useState(1000);

  useEffect(() => {
    if (totalGoal !== null) {
      setCurrentProteinsAmount(
        parseFloat(getPerDayComplete(meals, 'proteins').toFixed(0)),
      );
      setCurrentCarbsAmount(
        parseFloat(getPerDayComplete(meals, 'carbs').toFixed(0)),
      );
      setCurrentFatsAmount(
        parseFloat(getPerDayComplete(meals, 'fats').toFixed(0)),
      );
      setCurrentProteinsAmount(
        parseFloat(getPerDayComplete(meals, 'proteins').toFixed(0)),
      );
      updateState({totalGoal: calculateGoal(weight, metabolism, goal)});
    }
  }, [
    meals.length,
    totalGoal?.targetProteins,
    totalGoal?.targetCarbs,
    totalGoal?.targetFats,
    weight,
  ]);

  const progressProteins = currentProteinsAmount / totalGoal?.targetProteins;
  const progressCarbs = currentCarbsAmount / totalGoal?.targetCarbs;
  const progressFats = currentFatsAmount / totalGoal?.targetFats;
  if (totalGoal === null || Number.isNaN(totalGoal?.targetCalories)) {
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
              <Text style={style.profileName}>{name}</Text>
            </View>
          </View>

          <View style={style.centeredContainer}>
            <Text style={style.text}>
              Hi {name + ',\n\n'}You have not currently set a goal. Choose one
              and give us some information about you to begin your health
              improvement journey!
            </Text>
            <TouchableOpacity
              style={style.setGoalButton}
              onPress={handleAddGoalPress}>
              <Text style={style.setGoalText}>Set a goal</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={style.logoutButton}
              onPress={() => {
                logout();
              }}>
              <Text style={style.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  } else {
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

            <View style={style.profileContainer2}>
              <Text style={style.profileName2}>{name}</Text>

              <TouchableOpacity
                style={style.logoutButton2}
                onPress={() => {
                  logout();
                }}>
                <Text style={style.logoutButtonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={style.weightContainer}>
            <Text style={style.weightText}>Weight: {weight} kg</Text>
            <EditWeightModal
              onEditWeight={newW => {
                updateState({
                  weight: newW,
                  totalGoal: calculateGoal(newW, metabolism, goal),
                });
              }}></EditWeightModal>
          </View>

          <View style={style.centeredContainer2}>
            <View>
              <Text style={style.energyText}>
                Total Energy Target: {totalGoal.targetCalories} kCal
              </Text>
              <View style={style.box}>
                <View style={style.boxAlign}>
                  <Text style={style.text2}>Proteins</Text>
                  <Text style={style.text3}>Remaining</Text>
                </View>
                <View style={style.boxAlign}>
                  <Text style={style.text2}>{currentProteinsAmount} g</Text>
                  <Text style={style.text3}>
                    {(totalGoal?.targetProteins - currentProteinsAmount > 0
                      ? totalGoal?.targetProteins - currentProteinsAmount
                      : 0
                    ).toFixed(0)}{' '}
                    g
                  </Text>
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
                  <Text style={style.text3}>
                    {(totalGoal?.targetCarbs - currentCarbsAmount > 0
                      ? totalGoal?.targetCarbs - currentCarbsAmount
                      : 0
                    ).toFixed(0)}{' '}
                    g
                  </Text>
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
                  <Text style={style.text3}>
                    {(totalGoal?.targetFats - currentFatsAmount > 0
                      ? totalGoal?.targetCarbs - currentCarbsAmount
                      : 0
                    ).toFixed(0)}{' '}
                    g
                  </Text>
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
            </View>
            <TouchableOpacity style={style.removeGoalButton}>
              <Text style={style.removeGoalButtonText}>Remove Goal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }
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
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '500',
  },
  profileContainer: {
    flex: 1,
    paddingTop: 30,
    paddingLeft: 15,
  },
  profileName: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#006A4E',
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
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 30,
    marginLeft: 20,
    marginRight: 250,
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
  centeredContainer2: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'space-between',
  },

  text2: {
    fontWeight: '500',
    color: 'white',
  },
  text3: {
    fontWeight: '500',
    color: '#006A4E',
  },
  profileContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '72.5%',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingLeft: 15,
    marginRight: 15,
  },
  profileName2: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#006A4E',
    marginTop: 20,
  },

  logoutButton2: {
    backgroundColor: '#5CA08E',
    paddingHorizontal: 35,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 60,
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
    marginBottom: 30,
  },
  removeGoalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default MyProfileScreen;
