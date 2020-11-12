import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,Image,KeyboardAvoidingView } from 'react-native';

import { createAppContainer, createSwitchNavigator,} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs'
import WelcomeScreen from './screens/signUpLoginScreen'
import {AppTabNavigator} from './components/AppTabNavigator'
export default class App extends React.Component{
  render(){
    return (
      <View style={styles.container}>
        
        <AppContainer/>
      </View>
    );
  }
  
}

const switchNavigator = createSwitchNavigator({
  Login:{screen:WelcomeScreen},
  Home:{screen:AppTabNavigator}
  
})
 

const AppContainer=createAppContainer(switchNavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  
  },
});
