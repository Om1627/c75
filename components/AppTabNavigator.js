import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import ReadStoryScreen from '../screens/ReadStoryScreen'
import WriteStoryScreen from '../screens/WriteStoryScreen';


export const AppTabNavigator=createBottomTabNavigator({
    WriteStory:{screen:WriteStoryScreen},
    ReadStory:{screen:ReadStoryScreen}
  },{
    defaultNavigationOptions:({navigation})=>({
      tabBarIcon:({})=>{
        const routeName=navigation.state.routeName
        if (routeName==='WriteStory'){
          return (
            <Image
            source={require('../assets/write.png')}
            style={{width:40,height:40}}
            />
          )
        }
        else if (routeName==='ReadStory'){
          return (
            <Image
            source={require('../assets/read.png')}
            style={{width:40,height:40}}
            
            />
          )
        }
      } 
    })
  })