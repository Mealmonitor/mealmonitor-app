import React, {useState, useEffect} from 'react';
import {ScrollView, Text, View, StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {WebView} from 'react-native-webview';
import {getMeals} from '../api/publicApi';
import {Meal} from '../api/domain';

const DashboardScreen = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMeals() {
      try {
        const fetchedMeals: Meal[] = await getMeals();
        setMeals(fetchedMeals);
      } catch (err) {
        setError(err);
      }
    }
    fetchMeals();
  }, []);
  console.log(meals);
  return (
    <View className="top-10 ">
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={style.container}
        className="pt-4">
        <View className="bg-weiss rounded-t-[40px] flex-1 flex-grow p-6 top-10">
          {error && <Text>Error fetching meals: {error.message}</Text>}
          {meals.map(meal => {
            const date = new Date(meal.dateTime);
            console.log(date.getHours());
            return (
              <View style={style.mealSection} key={meal.id}>
                <Text style={style.mealSectionText}>1</Text>

                <Text style={style.mealSectionText}>
                  {date.getHours()}:{date.getMinutes()}
                </Text>

                <Text style={style.mealSectionText}>
                  {meal.foodList.reduce(
                    (sum, current) => sum + current.calories,
                    0,
                  )}
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  mealSection: {
    backgroundColor: '#2E856E',
    padding: 15,
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
    marginHorizontal: 23,
  },
  mealSectionText: {
    color: '#B8D5CD',
    textAlign: 'center',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 24,
  },
});

export default DashboardScreen;
