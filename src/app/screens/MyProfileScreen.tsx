import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import MyProfileIcon from '../../../assets/svg/MyProfileIcon';
import {useNavigation} from '@react-navigation/native';
import Keycloak from 'react-native-keycloak-plugin';
import {TokensUtils} from 'react-native-keycloak-plugin';

const MyProfileScreen = () => {
  const navigation = useNavigation();
  const handleAddGoalPress = () => {
    navigation.navigate('AddGoal');
  };

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
          </View>
        </View>

        <View style={style.centeredContainer}>
          <Text style={style.text}>
            Hi Andreea,{'\n\n'}You have not currently set a goal. Choose one and
            give us some information about you to begin your health improvement
            journey!
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
              const config = {
                realm: 'mealmonitor',
                'auth-server-url': 'https://keycloak.mealmonitor.galitianu.com',
                'ssl-required': 'external',
                resource: 'mealmonitor-app',
                credentials: {
                  secret: 'Aaw0AH4MVx8XsPFPWJjq4TJX6RwyccIH',
                },
              };
              Keycloak.login(config, 'andrei@galitia.nu', '12345678')
                .then(response => {
                  console.log('Login Success');
                })
                .catch(error => {
                  console.log('Login Failed' + error);
                });
            }}>
            <Text style={style.logoutButtonText}>Logout</Text>
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
});

export default MyProfileScreen;
