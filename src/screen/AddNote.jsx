import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';

const AddNote = ({ route, navigation }) => {
    const { userId } = route.params;
    const [name, setName] = useState('');
    const [content, setContent] = useState('');
    const [status, setStatus] = useState('');

    const handleAddNote = async () => {
        try {
            const response = await fetch(`https://65488868dd8ebcd4ab23098d.mockapi.io/api/v1/user/${userId}/Note`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    content,
                    status,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            navigation.goBack('List');
        } catch (error) {
            console.error('Error adding note:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add Note</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={(text) => setName(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Content"
                value={content}
                onChangeText={(text) => setContent(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Status"
                value={status}
                onChangeText={(text) => setStatus(text)}
            />
            <Pressable style={styles.addButton} onPress={handleAddNote}>
                <Text style={styles.buttonText}>Add Note</Text>
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
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        color: '#ff6ec7',
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        width: '80%',
        borderColor: '#fff',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        color: '#fff',
    },
    addButton: {
        backgroundColor: '#00fff7',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default AddNote;
