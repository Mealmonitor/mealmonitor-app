import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';

import {useDispatch} from 'react-redux';
import {twFullConfig} from '../../utils/tailwindConfig';
import CloseIcon from '../../../assets/svg/CloseIcon';
import {AppDispatch} from '../../app/store/store';
import {Meal} from '../../app/api/domain';
import TableComponent from '../navigation/components/TableComponent';
import StackedBarChartComponent from '../navigation/components/StackedBarChartComponent';

interface MealDetailsModal {
  index: number;
  date: Date;
  meal: Meal;
  onDeleteMeal: (meal: Meal) => void;
}

const LegendItem: React.FC<{color: string; text: string}> = ({color, text}) => {
  return (
    <View style={style.legendRow}>
      <View style={[style.legendSquare, {backgroundColor: color}]} />
      <Text style={style.legendText}>{text}</Text>
    </View>
  );
};

const sliceColor = ['#ADD8F0', '#FEEA7F', '#FF9D9F'];

const MealDetailsModal: React.FC<MealDetailsModal> = ({
  index,
  date,
  meal,
  onDeleteMeal,
}) => {
  const windowHeight = Dimensions.get('window').height;
  const dispatch = useDispatch<AppDispatch>();
  const [visible, setVisible] = useState(false);

  const getPerDay = (nutriVal: string) => {
    return (
      (meal.foodList.reduce((sum, current) => sum + current[nutriVal], 0) *
        100) /
      meal.foodList.reduce(
        (sum, current) => sum + current.proteins + current.carbs + current.fats,
        0,
      )
    );
  };

  const totalProteinsForToday = parseFloat(getPerDay('proteins').toFixed(0));
  const totalCarbsForToday = parseFloat(getPerDay('carbs').toFixed(0));
  const totalFatsForToday = parseFloat(getPerDay('fats').toFixed(0));

  const date2 = new Date(date);
  return (
    <View>
      <TouchableOpacity
        style={style.mealSection}
        //key={meal.id}
        onPress={() => setVisible(true)}>
        <Text style={style.mealSectionText}>{index + 1}</Text>

        <Text style={[style.mealSectionText, style.mealSectionTextMiddle]}>
          {date2.getHours().toString().padStart(2, '0')}:
          {date2.getMinutes().toString().padStart(2, '0')}
        </Text>

        <Text style={style.mealSectionText}>
          {meal.foodList.reduce((sum, current) => sum + current.calories, 0)}{' '}
          kCal
        </Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {}}>
        <ScrollView
          overScrollMode="always"
          contentContainerStyle={style.container}>
          <View
            style={{
              ...style.modal,
              marginTop: windowHeight * 0.145,
              backgroundColor: '#fff',
            }}>
            <TouchableOpacity
              onPress={() => {
                setVisible(false);
              }}
              className="mx-8 mt-8 self-end">
              <CloseIcon size={24} color={'black'} />
            </TouchableOpacity>

            <View>
              <Text style={style.mealNr}>Meal {' ' + (index + 1)}</Text>
            </View>

            <View>
              <StackedBarChartComponent data={meal.foodList} />
            </View>

            <View style={style.legendLine}>
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

            <View style={{flex: 1}}>
              <TableComponent data={meal.foodList} />
            </View>

            <View>
              <TouchableOpacity
                style={style.deleteButton}
                onPress={() => {
                  setVisible(false);
                  onDeleteMeal(meal); // Use the passed callback
                }}>
                <Text style={style.deleteButtonText}>Delete Meal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexGrow: 1,
    overflow: 'hidden',
  },
  modal: {
    flex: 1,
    backgroundColor: twFullConfig.theme.colors.eisgrau,
    overflow: 'hidden',
    borderTopEndRadius: 40,
    borderTopStartRadius: 40,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 40,
    elevation: 5,
  },
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
  mealNr: {
    fontWeight: '700',
    fontSize: 25,
    flexDirection: 'row',
    textAlign: 'center',
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  legendSquare: {
    width: 18,
    height: 18,
    borderRadius: 6,
    marginRight: 5,
  },
  legendText: {
    fontSize: 15,
    fontFamily: 'Helvetica',
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 24,
    letterSpacing: -0.5,
  },
  legendLine: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: -20,
    paddingBottom: 30,
  },
  deleteButton: {
    backgroundColor: '#2E856E',
    padding: 10,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 30,
    marginHorizontal: 100,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MealDetailsModal;
