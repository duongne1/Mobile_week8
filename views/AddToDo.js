import {View,Text,TextInput,Image,StyleSheet,FlatList,Picker,TouchableOpacity,} from 'react-native';
import React, {useState} from 'react';
import { AntDesign } from '@expo/vector-icons'; 
import { Foundation } from '@expo/vector-icons'; 


function AddToDo({navigation, route}) {
    const { user, todo, updateTodos  } = route.params;
    const [newTodo, setNewTodo] = useState('');
    
    const getMaxId = (todos) => {
      if (todos.length === 0) {
        return 0;
      }
      const maxId = Math.max(...todos.map((todo) => todo.id));
      return maxId;
    };

    const [currentId, setCurrentId] = useState(getMaxId(user.todo) + 1);
    const addTodo = () => {
      if (newTodo.trim() === '') {
        return;
      }
  
      const newTodoItem = {
        id: currentId,
        work: newTodo,
        priority: 'medium',
      };
  
      setCurrentId((prevId) => prevId + 1);
  
      // Thêm todo mới vào danh sách todos trong user
      const updatedTodos = [...user.todo, newTodoItem];
  
      // Cập nhật dữ liệu người dùng
      fetch(`http://localhost:3001/user/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...user, todo: updatedTodos }),
      })
        .then((res) => {
          if (res.ok) {
            if (updateTodos) {
              navigation.navigate('ToDo', {user: user});
              updateTodos(updatedTodos);
            }
          } else {
            throw new Error('Failed to update user data');
          }
        })
        .catch((error) => {
          console.error('Error adding task:', error);
        });
    };
  

  return (
    <View style={styles.container}>
        <View style={{flexDirection: 'row', justifyContent:'space-between', marginBottom:40}}>
            <TouchableOpacity onPress={() => {navigation.navigate("Login")}}>
            <AntDesign name="arrowleft" size={24} color="black" />    
            </TouchableOpacity>  
            <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
            <Image style={styles.img} source={{uri : user.img}}></Image>
            <View style={{marginLeft: 10, alignItems: 'center'}}>
            <Text style={styles.text1}>Hi {user.username}</Text>
            <Text style={styles.text2}>Have a good day</Text>
            </View>
            </View>
        </View>

        <View style={{alignItems: 'center', marginBottom: 30}}>
            <Text style={styles.txt3}>ADD YOUR TODO</Text>
        </View>
        
        <View style={{alignItems: 'center',left: 15,marginBottom: 30,flexDirection: 'row', padding: 10}}>
            <Foundation style={{position: 'absolute', left: 15}} name="clipboard-notes" size={30} color="green" />   
            <TextInput placeholder='input your todo' style={styles.input}
             value={newTodo}
             onChangeText={(text) => setNewTodo(text)}></TextInput>
        </View>

        <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity style={styles.btn}onPress={addTodo}>
            FINISH
            </TouchableOpacity>
        </View>
       
        <View style={{alignItems: 'center',justifyContent: 'center',top: 30, marginBottom: 20,flex: 1}}>
            <Image style={styles.img1} source={require('../assets/Image 96.png')}></Image>
        </View>

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20
  },
  img:{
    width: 50,
    height: 50,
    borderRadius: 25
  },
  text1: {
    fontSize: 18,
    fontWeight: 500
  },
  text2: {
    fontSize: 16,
    fontWeight: 700,
    color: 'gray'
  },
  txt3: {
    fontSize: 23,
    fontWeight: 700
  },
  input:{
    width: 320,
    height: 40,
    borderWidth: 1,
    borderRadius: 5, 
    fontSize: 18,
    paddingLeft: 30
  },
  btn:{
    backgroundColor: '#00BDD6',
    width: 190,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white'
  },
  img1: {
    width: 190,
    height: 170,
  }
});

export default AddToDo;