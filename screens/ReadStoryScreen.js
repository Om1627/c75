import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,Image,ScrollView,TextInput,TouchableOpacity,FlatList } from 'react-native';
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
dataSource:[],
lastVisibleStory:null
    }
  }
  retrieveStories=async()=>{
const query= await  db.collection('Stories').limit(100).get()
query.docs.map((doc)=>{
  this.setState({
    allStories:[...this.state.allStories,doc.data()],
    lastVisibleStory:doc
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
          dataSource:[doc.data()],
          lastVisibleStory:doc
        })
      })
       
    }
   
  }
  else if(enteredText===this.state.allStories[index].Title){
   
     if(query2!==undefined){
      query2.docs.map((doc)=>{
        this.setState({
          dataSource:[doc.data()],
          lastVisibleStory:doc
        })
      })
    
    }
    
  }
  console.log(this.state.lastVisibleStory)
  
})

  }
  fetchMoreStories=async()=>{
    var text=this.state.search
    var enteredText=text.trim().toLowerCase()
    const query=  await db.collection('Stories').where("AuthorName","==",enteredText).startAfter(this.state.lastVisibleStory).limit(10).get()
    const query2=  await db.collection('Stories').where("Title","==",enteredText).startAfter(this.state.lastVisibleStory).limit(10).get()
    
    this.state.allStories.map((data,index)=>{
      if (enteredText===this.state.allStories[index].AuthorName){
      
        
        if(query!==undefined){
          query.docs.map((doc)=>{
            this.setState({
              dataSource:[doc.data()],
              lastVisibleStory:doc
            })
          })
           
        }
       
      }
      else if(enteredText===this.state.allStories[index].Title){
       
         if(query2!==undefined){
          query2.docs.map((doc)=>{
            this.setState({
              dataSource:[doc.data()],
              lastVisibleStory:doc
            })
          })
        
        }
        
      }
      console.log(this.state.dataSource)
      
    })
    
      }

  componentDidMount(){
    this.retrieveStories()
   
 
  }

    render(){
      return (
        <View style={styles.container}>

          <View style={{flexDirection:"row"}}>
          <TextInput style={styles.searchbar} placeholder='Search' onChangeText={(text)=>{
         
           this.setState({search:text})
         }}
         value={this.state.search}
         ></TextInput>
         <TouchableOpacity style={styles.searchButton} onPress={()=>{this.searchFilter()}}>
<Text style={styles.buttonText}>Search</Text>

         </TouchableOpacity>

          </View>
<ScrollView>
     <View>

     <FlatList
                data={this.state.search === "" ?  this.state.allStories: this.state.dataSource}
                renderItem={({ item }) => (
                  <View style={{backgroundColor:'cyan'}}>
 
                  <Text style={{fontSize:25,fontWeight:'bold',marginTop:50,alignSelf:'center'}}>
                    {item.Title.toUpperCase()}
                  </Text>
                  
                  <Text style={styles.storytext}>
                  Story Title:  {item.Title.toUpperCase()}
                  </Text>
                  
                  <Text style={{backgroundColor:'pink'}}>
                   Author Name: {item.AuthorName.toUpperCase()}
                  </Text>
                  
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                onEndReached={this.fetchMoreStories()}
                onEndReachedThreshold={0.7}
                /> 
  

     </View>
     </ScrollView>
        </View>
      );
    }
    
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'grey',
    
    },
    searchbar:{
      marginTop:50,
      width:'90%',
      alignSelf:'flex-start',
      height:40,
      textAlign:'center',
      borderWidth:6,
      flexDirection:"row",
      backgroundColor:'lightgrey',
      
    },
    storytext:{
      backgroundColor:'pink',
      marginTop:50
    },
    searchButton:{
      width:80,
      height:40,
      alignSelf:'flex-end',
      padding:10,
      alignItems:'center',
      flexDirection:"row",
      backgroundColor:'orange'
  
    },
    buttonText:{
      textAlign:'center',
      fontSize:10,
      fontWeight:'bold'
      
    },
  });