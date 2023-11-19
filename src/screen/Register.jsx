import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';

const Register = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleRegister = async () => {
        try {
            // Add validation for password and confirmPassword match
            if (password !== confirmPassword) {
                console.error('Password and Confirm Password do not match');
                return;
            }

            const response = await fetch('https://65488868dd8ebcd4ab23098d.mockapi.io/api/v1/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                    email,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            console.log('Registration successful:', data);

            // Update state to display success message
            setSuccessMessage('Registration successful!');

            // Optionally, you can navigate to the home screen after a short delay
            setTimeout(() => {
                navigation.navigate('Home');
            }, 2000); // 2000 milliseconds (2 seconds) delay
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
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

            />
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}

            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}

            />
            <Pressable style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Register</Text>
            </Pressable>
            {successMessage ? <Text style={styles.successMessage}>{successMessage}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1e1e1e',
        padding: 20,
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
    successMessage: {
        color: 'green',
        marginTop: 10,
    },
});

export default Register;
