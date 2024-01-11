import React, {useState, useEffect} from 'react';
import {ScrollView, Text, View, StyleSheet} from 'react-native';
import {deleteMeal, getMeals, parseDate} from '../api/publicApi';
import {Meal} from '../api/domain';
import PieChart from 'react-native-pie-chart';
import CalendarIcon from '../../../assets/svg/CalendarIcon';
import ArrowBack from '../../../assets/svg/ArrowBack';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MealDetailsModal from '../../features/mealDetails/MealDetailsModal';
import DatePicker from 'react-native-date-picker';
import {useIsFocused} from '@react-navigation/native';

const subtractDaysFromDate = (currentDate, daysToSubtract) => {
  daysToSubtract = daysToSubtract || 0;
  const pastDate = new Date(currentDate);
  pastDate.setDate(pastDate.getDate() - daysToSubtract);

  return pastDate;
};

const DashboardScreen = ({mealToAdd}) => {
  const [mealList, setMealList] = useState<Meal[]>([]);
  const [error, setError] = useState(null);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

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
  }, [date, isFocused]); // Depend on both date and focus state

  const handleMealDeletion = async (meal: Meal) => {
    try {
      await deleteMeal(meal); // Assumes deleteMeal is an async function that calls your API
      setMealList(mealList.filter(lmeal => lmeal.id !== meal.id));
    } catch (error) {
      console.error('Error deleting meal:', error);
      // Handle any errors here
    }
  };

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

  const totalProteinsForToday = parseFloat(
    getPerDay(mealList, 'proteins').toFixed(2),
  );
  const totalCarbsForToday = parseFloat(
    getPerDay(mealList, 'carbs').toFixed(2),
  );
  const totalFatsForToday = parseFloat(getPerDay(mealList, 'fats').toFixed(2));

  const widthAndHeight = 200;
  const series = [totalProteinsForToday, totalCarbsForToday, totalFatsForToday];
  const sliceColor = ['#ADD8F0', '#FEEA7F', '#FF9D9F'];

  const LegendItem: React.FC<{color: string; text: string}> = ({
    color,
    text,
  }) => {
    return (
      <View style={style.legendRow}>
        <View style={[style.legendSquare, {backgroundColor: color}]} />
        <Text style={style.legendText}>{text}</Text>
      </View>
    );
  };
  return (
    <>
      <View className="pt-12">
        <View style={style.banner}>
          <View style={style.arrow}>
            <TouchableOpacity
              hitSlop={15}
              onPress={() => {
                setDate(subtractDaysFromDate(date, 1));
              }}>
              <ArrowBack />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={style.today}
            onPress={() => {
              setOpen(true);
            }}>
            <CalendarIcon color="white" size={25}></CalendarIcon>
            <Text style={style.todayText}>
              {parseDate(date) === parseDate(new Date())
                ? 'Today'
                : date.getDate().toString().padStart(2, '0') +
                  '.' +
                  (date.getMonth() + 1).toString().padStart(2, '0') +
                  '.' +
                  date.getFullYear()}
            </Text>
          </TouchableOpacity>
          <DatePicker
            maximumDate={new Date()}
            modal
            open={open}
            mode="date"
            date={date}
            onConfirm={date => {
              setOpen(false);
              setDate(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
          <View style={style.arrow}>
            <TouchableOpacity
              hitSlop={15}
              disabled={parseDate(date) === parseDate(new Date())}
              onPress={() => {
                setDate(subtractDaysFromDate(date, -1));
              }}>
              <ArrowBack
                rotated={true}
                color={
                  parseDate(date) === parseDate(new Date())
                    ? '#B8D5CD'
                    : 'white'
                }
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={style.modalLikeContainer}>
        <View style={style.centeredContainer}>
          <PieChart
            widthAndHeight={widthAndHeight}
            series={series}
            sliceColor={sliceColor}
            coverRadius={0.7}
            coverFill={'#FFF'}
          />
          <Text style={style.chartText}>
            {mealList
              .map(meal => {
                return meal.foodList
                  ? meal.foodList.reduce(
                      (sum, current) => sum + current.calories,
                      0,
                    )
                  : 0;
              })
              .reduce((a, b) => a + b, 0)}{' '}
            kCal
          </Text>
          {true && <Text style={style.chartSubText}>{'\n\n\n'}3342 left</Text>}
        </View>
        <View className="pb-8 pt-6">
          <LegendItem
            color={sliceColor[0]}
            text={`${totalProteinsForToday}% Proteins`}
          />
          <LegendItem
            color={sliceColor[1]}
            text={`${totalCarbsForToday}% Carbs`}
          />
          <LegendItem
            color={sliceColor[2]}
            text={`${totalFatsForToday}% Fats`}
          />
        </View>
        <View style={style.headerRow}>
          <Text style={style.headerText}>Meal No.</Text>
          <Text style={[style.headerTextMiddle, style.headerText]}>Time</Text>
          <Text style={style.headerText}>Energy</Text>
        </View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={style.container}>
          <View>
            {error && <Text>Error fetching meals: {error.message}</Text>}
            {mealList.map((meal, index) => {
              const date = new Date(meal.dateTime);

              return (
                <MealDetailsModal
                  index={index}
                  date={meal.dateTime}
                  meal={meal}
                  onDeleteMeal={handleMealDeletion}></MealDetailsModal>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  container: {backgroundColor: 'white'},
  mealSection: {
    backgroundColor: '#2E856E',
    paddingVertical: 12,
    paddingHorizontal: 17,
    borderRadius: 40,
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    marginVertical: 6,
    marginHorizontal: 23,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  mealSectionText: {
    color: '#B8D5CD',
    textAlign: 'center',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 24,
  },
  mealSectionTextMiddle: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    zIndex: 1,
  },
  centeredContainer: {
    justifyContent: 'center', // Center children vertically
    alignItems: 'center', // Center children horizontally
  },
  chartText: {
    position: 'absolute',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
  },
  chartSubText: {
    position: 'absolute',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: 'gray',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 5, // Add vertical padding
    borderBottomWidth: 1, // Optional bottom border
    borderBottomColor: '#B8D5CD', // Border color
    backgroundColor: 'white',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 15, // Slightly larger font size
    color: '#006A4E', // Darker text color for better contrast
  },
  headerTextMiddle: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    zIndex: 1,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 23,
  },
  legendSquare: {
    width: 18,
    height: 18,
    borderRadius: 6, // This will make the square "rounded"
    marginRight: 5, // Space between the square and the text
  },
  legendText: {
    fontSize: 15,
    fontFamily: 'Helvetica',
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 24,
    letterSpacing: -0.5,
  },
  today: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  todayText: {
    fontFamily: 'Helvetica',
    fontSize: 30,
    fontStyle: 'normal',
    fontWeight: '700',
    marginLeft: 6,
    color: 'white',
  },
  banner: {
    paddingTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    paddingBottom: 24,
  },
  arrow: {
    marginHorizontal: 23,
    justifyContent: 'center',
    alignContent: 'center',
  },
  modalLikeContainer: {
    //className="pt-10 flex-1 rounded-t-[40] bg-white"
    paddingTop: 10,
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
});

export default DashboardScreen;
