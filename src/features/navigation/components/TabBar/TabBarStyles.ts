import {StyleSheet} from 'react-native';

export const tabBarStyle = StyleSheet.create({
  tabBar: {
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderColor: '#B8D5CD',
    borderTopWidth: 1,
  },
  iconBorderActive: {
    borderColor: '#2E856E',
    borderTopWidth: 4,
    paddingTop: 6,
  },
  iconBorderInactive: {
    borderColor: '#2E856E',
    borderTopWidth: 0,
    paddingTop: 10,
  },
});
