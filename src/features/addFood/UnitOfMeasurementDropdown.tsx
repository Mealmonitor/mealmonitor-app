import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import useDropdownScroll from '../../utils/useDropdownScroll';

const UnitOfMeasurementDropdown = React.forwardRef((props: any, ref: any) => {
  const {handleDropdownFocus, scrollY} = useDropdownScroll(
    ref,
    props.scrollViewRef,
  );

  const renderDataItem = (item: any) => {
    return (
      <View style={styles.item}>
        <Text style={styles.selectedTextStyle}>{item.label}</Text>
      </View>
    );
  };

  return (
    <View ref={ref} collapsable={false}>
      <Dropdown
        style={styles.dropdown}
        containerStyle={
          ref && {
            position: 'absolute',
            top: scrollY,
            width: '100%',
          }
        }
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={props.data} // Set the dropdown data
        labelField="label"
        valueField="value"
        placeholder={'Select unit'}
        value={props.values}
        onChange={item => {
          props.setValues(item.value); // Ensure this function handles the selected value properly
        }}
        renderItem={renderDataItem}
        onFocus={ref && handleDropdownFocus}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  dropdown: {
    height: 40,
    width: 50,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingLeft: 8,
    borderColor: 'black',
    borderWidth: 2,
  },

  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },

  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: 'white',
    shadowColor: '#000',
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 16,
  },
});

export default UnitOfMeasurementDropdown;
