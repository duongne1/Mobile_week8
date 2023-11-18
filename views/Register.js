// ToDoPage.js
import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, FlatList, Picker, TouchableOpacity, } from 'react-native';


function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async () => {
        try {
          if (password !== confirmPassword) {
            alert('Mật khẩu và xác nhận mật khẩu không khớp.');
            return;
          }
      
             // Gửi yêu cầu để lấy danh sách người dùng từ API
        const response = await  fetch('http://localhost:3001/user');
        const data = await response.json();
          // Kiểm tra xem tên người dùng đã tồn tại hay chưa
          const userExists = data.some(user => user.username === username);
          if (userExists) {
            alert('Tên người dùng đã tồn tại.');
            return;
          }
      
          // Gửi yêu cầu đăng ký đến API
          const signUpResponse = await fetch('http://localhost:3001/user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: username,
              password: password,
              img: '',
              todo: []
            }),
          });
      
          if (signUpResponse.status === 201) {
            navigation.navigate('Login');
          } 
        } catch (error) {
          console.log(error)
        }
      };

    return (
        <View style={styles.container}>
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 20, marginBottom: 20, flex: 1 }}>
                <Image style={styles.img} source={require('../assets/Image 96.png')}></Image>
                <Text style={styles.txt1}>REGISTER</Text>
            </View>
            <View style={{ flex: 1, top: 40 }}>
                <View style={{ flexDirection: 'row', marginBottom: 15, justifyContent: 'space-evenly' }}>
                    <Text value={username} style={styles.text}>UserName:</Text>
                    <TextInput placeholder='Username' placeholderTextColor={'#978B8B'} style={styles.input} onChangeText={(text) => setUsername(text)}></TextInput>
                   
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 15, justifyContent: 'space-evenly' }}>
                    <Text style={styles.text}>  Password:</Text>
                    <TextInput
                        placeholder='Password'
                        style={styles.input}
                        placeholderTextColor={'#978B8B'}
                        secureTextEntry={true}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
        ></TextInput>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.text}>  ConfirmPass:</Text>
                    <TextInput
                        placeholder='ConfirmPassword'
                        style={styles.input}
                        placeholderTextColor={'#978B8B'}
                        secureTextEntry={true}
                        value={confirmPassword}
                        onChangeText={(text) => setConfirmPassword(text)}
                    ></TextInput>
                </View>
                <View style={{ flexDirection: 'row', top: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={styles.btn}
                        onPress={handleRegister}>
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
    text: {
        fontSize: 20
    },
    input: {
        width: 200,
        height: 35,
        borderWidth: 1,
        fontSize: 19,
        padding: 10,
        marginLeft: 20,
        marginRight: -8
    },
    txt1: {
        fontSize: 25,
        fontWeight: 700,
        top: 40

    },
    btn: {
        width: 110,
        height: 40,
        borderWidth: 1,
        backgroundColor: '#39B1ED',
        borderRadius: 5,
        justifyContent: 'center',
        fontSize: 20,
        alignItems: 'center',
        margin: 10,
        color: '#273247'
    },
    img: {
        width: 190,
        height: 170,
    }
});

export default Register;