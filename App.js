import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from "./views/Login.js"
import ToDo from "./views/ToDo.js"
import Register from "./views/Register.js"
import AddToDo from "./views/AddToDo.js"
import EditToDo from "./views/EditToDo.js"

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false, }}>
        <Stack.Screen name="Login" component={Login}  />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ToDo" component={ToDo} />
        <Stack.Screen name="AddToDo" component={AddToDo} />
        <Stack.Screen name="EditToDo" component={EditToDo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
