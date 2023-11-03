import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Food} from '../../../app/api/domain';

type DataRow = {
  id: number;
  column1: string;
  column2: string;
  column3: string;
};

type Props = {
  data: Food[];
};

const TableComponent: React.FC<Props> = ({data}) => {
  return (
    <ScrollView>
      <View style={style.table}>
        {/* Table Header */}
        <View style={style.tableRow}>
          <View style={[style.tableHeaderCell, style.tableHeaderFirstCell]}>
            <Text style={style.headerText}>Ingredient</Text>
          </View>
          <View style={[style.tableHeaderCell]}>
            <Text style={style.headerText}>Quantity</Text>
          </View>

          <View style={[style.tableHeaderCell, style.tableHeaderLastCell]}>
            <Text style={style.headerText}>Energy</Text>
          </View>
        </View>

        {/* Table Rows */}
        {data.map((row, index) =>
          index + 1 != data.length ? (
            <View key={row.id} style={style.tableRow}>
              <Text style={style.tableCell}>{row.name}</Text>
              <Text style={style.tableCell}>
                {row.quantity + ' ' + row.unitOfMeasurement}
              </Text>
              <Text style={style.tableCell}>{row.calories + ' kCal'}</Text>
            </View>
          ) : (
            <View key={row.id} style={style.tableRow}>
              <View style={[style.tableCell, style.tableFirstCell]}>
                <Text style={{color: '#5CA08E'}}>{row.name}</Text>
              </View>
              <View style={[style.tableCell]}>
                <Text style={{color: '#5CA08E'}}>
                  {row.quantity + ' ' + row.unitOfMeasurement}
                </Text>
              </View>

              <View style={[style.tableCell, style.tableLastCell]}>
                <Text style={{color: '#5CA08E'}}>{row.calories + ' kCal'}</Text>
              </View>
            </View>
          ),
        )}
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  table: {
    alignSelf: 'stretch',
    marginHorizontal: 20,
  },
  tableRow: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
  },
  tableRowEven: {
    backgroundColor: '#f2f2f2',
  },
  tableHeaderCell: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#5CA08E',
    backgroundColor: '#B8D5CD',
  },
  headerText: {
    fontWeight: 'bold',
    color: '#006A4E',
  },
  tableCell: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#5CA08E',
    backgroundColor: '#F8FBFA',
    color: '#5CA08E',
  },
  tableHeaderFirstCell: {
    borderTopLeftRadius: 20,
  },
  tableHeaderLastCell: {
    borderTopRightRadius: 20,
  },
  tableFirstCell: {
    borderBottomLeftRadius: 20,
  },
  tableLastCell: {
    borderBottomRightRadius: 20,
  },
});

export default TableComponent;
