import {View,Text,TextInput,Image,StyleSheet,FlatList,Picker,TouchableOpacity,} from 'react-native';
import React, { useState } from 'react';

function Login({navigation}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = async () => {
        try {
          // Gửi yêu cầu để lấy danh sách người dùng từ API
          const response = await fetch('http://localhost:3001/user');
          const data = await response.json();
          const loggedInUser = data.find(user => user.username === username && user.password === password);
          if (loggedInUser) {
            navigation.navigate("ToDo", {user: loggedInUser})
          } else {
            alert('Tên đăng nhập hoặc mật khẩu không đúng');
          }
        } catch (error) {
          console.error('Lỗi khi gửi yêu cầu đăng nhập', error);
        }
      };
  return (
    <View style={styles.container}>
        <View style={{alignItems: 'center',justifyContent: 'center',top: 30, marginBottom: 20,flex: 1}}>
            <Image style={styles.img} source={require('../assets/Image 96.png')}></Image>
            <Text style={styles.txt1}>LOGIN</Text>
        </View>
        <View style={{flex: 1, top: 60}}>
            <View style={{flexDirection: 'row', marginBottom: 10, justifyContent: 'space-evenly'}}>
                <Text style={styles.text}>UserName:</Text>
                <TextInput value={username} onChangeText={(text) => setUsername(text)}  placeholder='Nhập vào UserName' style={styles.input}></TextInput>
            </View>
            <View style={{flexDirection: 'row',justifyContent: 'space-evenly'}}>
                <Text style={styles.text}>  Password:</Text>
                <TextInput value={password} onChangeText={(text) => setPassword(text)}   placeholder='Nhập vào Password' style={styles.input}></TextInput>
            </View>
            <View style={{flexDirection: 'row',top: 10, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity style={styles.btn} onPress={handleLogin}>
            Đăng nhập
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}
            onPress={()=> {navigation.navigate("Register")}}>
            Đăng ký
            </TouchableOpacity>
        </View>
        </View>
        
       

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A5CFBE',
    padding: 20
  },
  text:{
    fontSize: 20
  },
  input:{
    width: 200,
    height: 35,
    borderWidth: 1,
    fontSize:19,
    padding: 10
  },
  txt1:{
    fontSize: 25,
    fontWeight: 700,
    top: 40

  },
  btn:{
    width: 110,
    height: 40,
    borderWidth: 1,
    backgroundColor: '#39B1ED',
    borderRadius: 5,
    justifyContent: 'center',
    fontSize : 20,
    alignItems: 'center',
    margin: 10,
    color: '#273247'
  },
  img: {
    width: 190,
    height: 170,
  }
});

export default Login;