import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const Home = ({ navigation }) => {
    const goToLogin = () => {
        navigation.navigate('Login');
    };

    const goToRegister = () => {
        navigation.navigate('Register');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to Note App</Text>
            <Pressable style={styles.button} onPress={goToLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </Pressable>
            <Pressable style={[styles.button, styles.registerButton]} onPress={goToRegister}>
                <Text style={[styles.buttonText, styles.registerButtonText]}>Register</Text>
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
    },
    title: {
        fontSize: 24,
        marginBottom: 30,
        fontWeight: 'bold',
        color: '#fff',
    },
    button: {
        backgroundColor: '#ff6ec7',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginBottom: 15,
        width: 200,
        height: 60
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    registerButton: {
        backgroundColor: '#00fff7',
    },
    registerButtonText: {
        color: '#fff',
    },
});

export default Home;
