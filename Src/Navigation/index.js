import { createStackNavigator, createAppContainer } from "react-navigation";
import MainScreen from "../Screens/MainScreen";
import ShowScreen from "../Screens/ShowScreen";

const AppStackNavigator = createStackNavigator(
  {
    MainScreen: { screen: MainScreen },
    ShowScreen: { screen: ShowScreen }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#484c7f"
      },
      headerTintColor: "black",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  }
);

const NavigatorContainer = createAppContainer(AppStackNavigator);
export default NavigatorContainer;
