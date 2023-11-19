import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from "./src/screen/Home";

import Register from "./src/screen/Register";
import AddNote from "./src/screen/AddNote";
import UpdateNote from "./src/screen/UpdateNote";
import NoteList from "./src/screen/NoteList";
import Login from "./src/screen/Login";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Register' component={Register} />
        <Stack.Screen name='List' component={NoteList} />
        <Stack.Screen name='Add' component={AddNote} />
        <Stack.Screen name='Update' component={UpdateNote} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
