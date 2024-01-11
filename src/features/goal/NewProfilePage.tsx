import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import MyProfileIcon from '../../../assets/svg/MyProfileIcon';
import {Center} from 'native-base';
import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {ProgressBar} from 'react-native-paper';
import {useEffect, useState} from 'react';
import {EditWeightModal} from './EditWeightModal';
import {Meal} from '../../app/api/domain';
import {getMeals} from '../../app/api/publicApi';

type NewProfilePageParams = {
  weight: number;
  selectedMetabolism: string;
  selectedValue: string;
};

const NewProfilePage = () => {
  const navigation = useNavigation();
  const [mealList, setMealList] = useState<Meal[]>([]);

  const [date, setDate] = useState(new Date());
  const [error, setError] = useState(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    async function fetchMeals(date) {
      try {
        const fetchedMeals: Meal[] = await getMeals(date);
        setMealList(fetchedMeals);
      } catch (err) {
        setError(err);
      }
    }

    if (isFocused) {
      fetchMeals(date);
    }
  }, [date, isFocused]);
  console.log('Meal List:', mealList);

  const route = useRoute<RouteProp<{params: NewProfilePageParams}, 'params'>>();

  const [weight, setWeight] = useState(0);
  const [selectedMetabolism, setSelectedMetabolism] = useState('');
  const [selectedGoal, setSelectedGoal] = useState('');

  const [tableValue, setTableValue] = useState(0);

  const [proteinsTarget, setProteinsTarget] = useState(0);
  const [carbsTarget, setCarbsTarget] = useState(0);
  const [fatsTarget, setFatsTarget] = useState(0);
  //const [fibersTarget, setFibersTarget] = useState(25);

  const [currentProteinsAmount, setCurrentProteinsAmount] = useState(0);
  const [currentCarbsAmount, setCurrentCarbsAmount] = useState(0);
  const [currentFatsAmount, setCurrentFatsAmount] = useState(0);
  //const [currentFibersAmount, setCurrentFibersAmount] = useState(NaN);

  const [totalEnergy, setTotalEnergy] = useState(0);

  const [remainingProteins, setRemainingProteins] = useState(0);
  const [remainingCarbs, setRemainingCarbs] = useState(0);
  const [remainingFats, setRemainingFats] = useState(0);
  //const [remainingFibers, setRemainingFibers] = useState(NaN);

  const [progressProteins, setProgressProteins] = useState(0);
  const [progressCarbs, setProgressCarbs] = useState(0);
  const [progressFats, setProgressFats] = useState(0);
  //const [progressFibers, setProgressFibers] = useState(NaN);

  const getPerDay = (meals: Meal[], nutriVal: string) => {
    return (
      (mealList
        .map(meal => {
          return meal.foodList
            ? meal.foodList.reduce((sum, current) => sum + current[nutriVal], 0)
            : 0;
        })
        .reduce((a, b) => a + b, 0) *
        100) /
      mealList
        .map(meal => {
          return meal.foodList
            ? meal.foodList.reduce(
                (sum, current) =>
                  sum + current.proteins + current.carbs + current.fats,
                0,
              )
            : 0;
        })
        .reduce((a, b) => a + b, 0)
    );
  };

  useEffect(() => {
    setWeight(route.params.weight);
    setSelectedMetabolism(route.params.selectedMetabolism);
    setSelectedGoal(route.params.selectedValue);

    if (selectedGoal === 'loseWeight') {
      if (selectedMetabolism === 'Slow') setTableValue(22);
      if (selectedMetabolism === 'Moderate') setTableValue(24);
      if (selectedMetabolism === 'Fast') setTableValue(26);
    }
    if (selectedGoal === 'increaseMuscleMass') {
      if (selectedMetabolism === 'Slow') setTableValue(29);
      if (selectedMetabolism === 'Moderate') setTableValue(31);
      if (selectedMetabolism === 'Fast') setTableValue(33);
    }
    if (selectedGoal === 'gainWeight') {
      if (selectedMetabolism === 'Slow') setTableValue(35);
      if (selectedMetabolism === 'Moderate') setTableValue(43);
      if (selectedMetabolism === 'Fast') setTableValue(70);
    }

    setTotalEnergy(weight * tableValue);

    setProteinsTarget(weight * 2);
    setFatsTarget(weight * 1);
    setCarbsTarget((totalEnergy - proteinsTarget * 4 - carbsTarget * 9) / 4);
  }, [weight, selectedMetabolism, selectedGoal]);

  useEffect(() => {
    setCurrentProteinsAmount(
      parseFloat(getPerDay(mealList, 'proteins').toFixed(2)),
    );
    setCurrentCarbsAmount(parseFloat(getPerDay(mealList, 'carbs').toFixed(2)));
    setCurrentFatsAmount(parseFloat(getPerDay(mealList, 'fats').toFixed(2)));
    //setCurrentFibersAmount(parseFloat(getPerDay(mealList, 'fibers').toFixed(2)));

    setRemainingProteins(proteinsTarget - currentProteinsAmount);
    setRemainingCarbs(carbsTarget - currentCarbsAmount);
    setRemainingFats(fatsTarget - currentFatsAmount);
    //setRemainingFibers(fibersTarget - currentFibersAmount);

    setProgressProteins(currentProteinsAmount / proteinsTarget);
    setProgressCarbs(currentCarbsAmount / carbsTarget);
    setProgressFats(currentFatsAmount / fatsTarget);
    //setProgressFibers(currentFibersAmount / fibersTarget);
  }, [mealList.length, proteinsTarget, carbsTarget, fatsTarget]);

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
            <Text style={style.energyText}>
              Total Energy Target: {totalEnergy} kCal
            </Text>
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
            {/* <View style={style.box}>
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
            </View> */}
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
