import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,Image,ScrollView } from 'react-native';
import {SearchBar} from 'react-native-elements'
import {createAppContainer} from 'react-navigation'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import db from '../config'

export default class ReadStoryScreen extends React.Component{
  constructor(){
    super()
    this.state={
search:'',
allStories:[],
dataSource:[]
    }
  }
  retrieveStories=async()=>{
const query= await  db.collection('Stories').limit(10).get()
query.docs.map((doc)=>{
  this.setState({
    allStories:[...this.state.allStories,doc.data()]
  })
// console.log(this.state.allStories)
})
  


  }
  searchFilter=async()=>{
var text=this.state.search
var enteredText=text.trim().toLowerCase()
const query=  await db.collection('Stories').where("AuthorName","==",enteredText).limit(10).get()
const query2=  await db.collection('Stories').where("Title","==",enteredText).limit(10).get()

this.state.allStories.map((data,index)=>{
  if (enteredText===this.state.allStories[index].AuthorName){
  
    
    if(query!==undefined){
      query.docs.map((doc)=>{
        this.setState({
          dataSource:[doc.data()]
        })
      })
       
    }
   
  }
  else if(enteredText===this.state.allStories[index].Title){
   
     if(query2!==undefined){
      query2.docs.map((doc)=>{
        this.setState({
          dataSource:[doc.data()]
        })
      })
    
    }
  }
  console.log(this.state.dataSource)
  
})
  }
showStories=async()=>{
  if (this.state.search===''){
    
  }
}
  componentDidMount(){
    this.retrieveStories()
   
 
  }

    render(){
      return (
        <View style={styles.container}>

          <View>
          <SearchBar style={styles.searchbar} onChangeText={(text)=>{
           this.searchFilter()
           this.setState({search:text})
         }}
         value={this.state.search}
         ></SearchBar>

          </View>
<ScrollView>
     <View>

  {
    this.state.allStories.map((items,index)=>{

      return(
 
        <View style={{backgroundColor:'cyan'}}>
 
 <Text style={{fontSize:25,fontWeight:'bold',marginTop:50,alignSelf:'center'}}>
   {this.state.allStories[index].Title.toUpperCase()}
 </Text>
 
 <Text style={styles.storytext}>
 Story Title:  {this.state.allStories[index].Title.toUpperCase()}
 </Text>
 
 <Text style={{backgroundColor:'pink'}}>
  Author Name: {this.state.allStories[index].AuthorName.toUpperCase()}
 </Text>
 
 </View>
    )
   })
  } 
  

     </View>
     </ScrollView>
        </View>
      );
    }
    
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    
    },
    searchbar:{
      width:100,
      marginTop:30
    },
    storytext:{
      backgroundColor:'pink',
      marginTop:50
    }
  });