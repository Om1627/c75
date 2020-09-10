import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,Image,TextInput,TouchableOpacity,textb} from 'react-native';
import {createAppContainer} from 'react-navigation'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {Header} from 'react-native-elements'

export default class WriteStoryScreen extends React.Component{
    constructor(){
        super()
        this.state={
            storyTitle:"",
            authorName:"",
            Story:""
        }
    }
    render(){
      return (
        <View style={styles.container}>
             <Header backgroundColor={'cyan'}
      centerComponent={{text:'Story Hub',style:{color:'#000000',fontSize:25,fontWeight:'bold',alignSelf:'center'}}}
    
      />

          <TextInput placeholder="Story Title" onChangeText={(text)=>{this.setState({storyTitle:text})}} value={this.state.storyTitle} style={styles.inputBox}/>

          <TextInput placeholder="Author Name"  onChangeText={(text)=>{this.setState({authorName:text})}} style={styles.inputBox}/>

          <TextInput placeholder="Write your story here"  onChangeText={(text)=>{this.setState({Story:text})}} style={styles.StoryBox}/>

          <TouchableOpacity style={styles.goButton}><Text style={styles.buttonText}>SUBMIT</Text></TouchableOpacity>
        </View>
      );
    }
    
  }
  const styles = StyleSheet.create({
 
    inputBox:{
      marginTop:50,
      width:300,
      alignSelf:'center',
      height:50,
      textAlign:'center',
      borderWidth:4,
   
    },
    StoryBox:{
        marginTop:50,
        width:300,
        alignSelf:'center',
        height:200,
        textAlign:'center',
        borderWidth:4,
     
      },
     goButton:{
      width:'30%',
      height:50,
      alignSelf:'center',
      padding:10,
      margin:10,
      marginTop:20,
      alignItems:'center',
      backgroundColor:'yellow',
      
     },
     buttonText:{
        textAlign:'center',
           fontSize:20,
           fontWeight:'bold'
          },
          container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
          }
        })