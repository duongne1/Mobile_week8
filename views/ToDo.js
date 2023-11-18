// ToDoPage.js
import React,{useState, useEffect} from 'react';
import {View,Text,TextInput,Image,StyleSheet,FlatList,ScrollView ,TouchableOpacity,} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { EvilIcons } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons';

function ToDo({navigation,route }) {
    const { user } = route.params;
    const [todos, setTodos] = useState(user.todo || []);
    const [searchText, setSearchText] = useState('');
    const userImage = user && user.img ? { uri: user.img } : require('../assets/Rectangle.png');
   
    const deleteTodo = (userId, todoId) => {
        fetch(`http://localhost:3001/user/${userId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
            throw new Error('Failed to fetch user data');
          })
          .then((userData) => {
            const userTodo = userData.todo || [];
            const updatedTodo = userTodo.filter((todo) => todo.id !== todoId);
    
            fetch(`http://localhost:3001/user/${userId}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ ...userData, todo: updatedTodo }),
            })
              .then((res) => {
                if (res.ok) {
                  // Sử dụng hàm callback để đảm bảo sử dụng giá trị mới nhất của todos
                  updateTodos(updatedTodo);
                } else {
                  throw new Error('Failed to update user data');
                }
              })
              .catch((error) => {
                console.error('Error deleting task:', error);
              });
          })
          .catch((error) => {
            console.error('Error fetching user data:', error);
          });
      };
      const updateTodos = (updatedTodos) => {
        setTodos(updatedTodos);
      };
    

      useEffect(() => {
        fetch(`http://localhost:3001/user/${user.id}`)
          .then((res) => res.json())
          .then((userData) => {
            setTodos(userData.todo || []);
          })
          .catch((error) => {
            console.error('Error fetching user data:', error);
          });
      }, [user.id]);

      const priorityColors = {
        low: '#F0FC92',   // Màu vàng cho ưu tiên thấp
        medium: '#6EF0AD',  // Màu xanh cho ưu tiên trung bình
        high: '#F07577',     // Màu đỏ cho ưu tiên cao
      };

      const filteredTodos = todos.filter((todo) =>
      todo.work.toLowerCase().includes(searchText.toLowerCase())
      );

    return (
    <View style={styles.container}>
        <View style={{flexDirection: 'row', justifyContent:'space-between', marginBottom:20}}>
            <TouchableOpacity onPress={() => {navigation.navigate("Login")}}>
            <AntDesign name="arrowleft" size={24} color="black" />    
            </TouchableOpacity>  
            <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
            <Image style={styles.img} source={userImage}></Image>
            <View style={{marginLeft: 10, alignItems: 'center'}}>
            <Text style={styles.text1}>Hi {user.username}</Text>
            <Text style={styles.text2}>Have a good day</Text>
            </View>
            </View>
        </View>

        <View style={{alignItems: 'center',left: 15,marginBottom: 30,flexDirection: 'row', padding: 10}}>
        <TextInput
        placeholder='Search'
        style={styles.input}
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
        />
            <EvilIcons style={{position: 'absolute'}}  name="search" size={24} color="black" />
        </View>
        <ScrollView>
        <FlatList
        data = {filteredTodos}
        keyExtractor={(item) =>item.id.toString()} 
        renderItem={({item})=>(

            <View style={{}}>
            <View style={[styles.view2, { backgroundColor: priorityColors[item.priority.toLowerCase()] }]}>
            <View style={{flexDirection: 'row', marginLeft: 10}}>
                 <AntDesign  name="checksquareo" size={24} color="green" />
                <Text style={styles.txt3}>{item.work}</Text>
                </View>
                <View style={{flexDirection: 'row', marginRight: 5}}>
                    <TouchableOpacity  onPress={()=>{navigation.navigate('EditToDo', {user: user, todo: item, updateTodos: updateTodos })}}>
                        <AntDesign name="edit" size={24} color="red" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => deleteTodo(user.id, item.id)}>
                        <AntDesign style={{marginLeft: 5}} name="delete" size={22} color="red" />
                    </TouchableOpacity>
                </View>
             
            </View>
        </View>
        )}
        ></FlatList>
        </ScrollView>
        
        <TouchableOpacity style={{flex: 2,alignItems: 'center', justifyContent: 'center'}} onPress={()=>{navigation.navigate('AddToDo', {user: user, updateTodos: updateTodos })}}>
          <Ionicons name="add-circle-sharp" size={55} color="green" />
        </TouchableOpacity>

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10
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
  input:{
    width: 320,
    height: 40,
    borderWidth: 1,
    borderRadius: 5, 
    fontSize: 18,
    paddingLeft: 30

  },
  txt3: {
    fontSize: 18,
    fontWeight: 700,
    marginLeft: 10,
  },
  view2:{
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    backgroundColor: '#A1A1A1',
    height: 40, 
    alignItems: 'center', 
    justifyContent: 'center',
    borderRadius: 10,
    justifyContent: 'space-between'
  }
 
});

export default ToDo;