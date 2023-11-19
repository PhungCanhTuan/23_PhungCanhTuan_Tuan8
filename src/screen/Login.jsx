import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';

const Login = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const allUsersResponse = await fetch('https://65488868dd8ebcd4ab23098d.mockapi.io/api/v1/user');
            if (!allUsersResponse.ok) {
                throw new Error(`HTTP error! Status: ${allUsersResponse.status}`);
            }

            const allUsersData = await allUsersResponse.json();

            const user = allUsersData.find((u) => u.username === username && u.password === password);

            if (!user) {
                throw new Error('Invalid username or password');
            }

            console.log('Login successful:', user);

            navigation.navigate('List', { userId: user.id });
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={(text) => setUsername(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
            />
            <Pressable style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        padding: 20,
        gap: 15,
    },
    title: {
        fontSize: 33,
        marginBottom: 20,
        fontWeight: 'bold',
        color: '#ff6ec7',
    },
    input: {
        backgroundColor: '#000',
        height: 60,
        width: '80%',
        borderColor: '#fff',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        color: '#fff',
    },
    button: {
        backgroundColor: '#00fff7',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 8,
        width: '60%',
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Login;
