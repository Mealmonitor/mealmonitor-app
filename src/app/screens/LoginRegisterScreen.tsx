import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LoginComponent from '../components/LoginComponent';

const LoginRegisterScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={style.app}>
      <View className="pt-12">
        <View style={style.banner}>
          <View style={style.arrow}></View>
        </View>
      </View>

      <View style={style.modalLikeContainer}>
        <LoginComponent></LoginComponent>
      </View>
    </View>
  );
};

export const style = StyleSheet.create({
  app: {flex: 1, backgroundColor: '#5CA08E'},
  textDescription: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 50,
  },
  container: {backgroundColor: 'white'},
  centeredContainer: {
    justifyContent: 'space-between', // Center children vertically
    alignItems: 'center', // Center children horizontally
    marginHorizontal: 25,
    width: '100%',
  },

  headerTextMiddle: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    zIndex: 1,
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
    paddingTop: 10,
    flexGrow: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    justifyContent: 'space-between',
  },
  barcodeBox: {
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
    height: 310,
    width: '100%',
    overflow: 'hidden',
    borderRadius: 25,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black', // Black border color
    shadowColor: '#000', // Shadow for a "raised" effect
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productDetails: {
    marginTop: 25,
    backgroundColor: 'white', // White background
    padding: 10, // Reduced padding around the content
    borderRadius: 25, // Rounded corners
    marginVertical: 25,
    width: '100%',
    alignSelf: 'center', // Center the box horizontally
    borderWidth: 1, // Width of the border
    borderColor: 'black', // Black border color
    shadowColor: '#000', // Shadow for a "raised" effect
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productDetailRow: {
    flexDirection: 'row', // Align children in a row
    justifyContent: 'space-between', // Maximize space between children
    marginBottom: 3, // Reduced bottom margin
    marginTop: 3, // Reduced top margin
  },
  detailLabel: {
    fontSize: 14, // Slightly smaller font size
    color: '#333',
  },
  detailValue: {
    fontSize: 14, // Slightly smaller font size
    color: '#333',
    flex: 1, // Take up remaining space
    textAlign: 'right', // Align text to the right
    fontWeight: 'bold',
  },
  backButton: {
    // h-[44px] items-center justify-center rounded-lg py-3 bg-white
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',

    borderRadius: 10,
    borderColor: '#2E856E',
    borderWidth: 1,
    shadowColor: '#000', // Shadow for a "raised" effect
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexGrow: 1,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 25,
  },

  bottomContainer: {
    width: '100%',
    height: 'auto',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

export default LoginRegisterScreen;
