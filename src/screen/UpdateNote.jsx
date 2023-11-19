import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';

const UpdateNote = ({ route, navigation }) => {
    const { userId, noteId } = route.params;
    const [name, setName] = useState('');
    const [content, setContent] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        fetchNoteDetails();
    }, [userId, noteId]);

    const fetchNoteDetails = async () => {
        try {
            const apiUrl = `https://65488868dd8ebcd4ab23098d.mockapi.io/api/v1/user/${userId}/Note/${noteId}`;
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            setName(data.name);
            setContent(data.content);
            setStatus(data.status);
        } catch (error) {
            console.error('Error fetching note details:', error);
        }
    };

    const handleUpdateNote = async () => {
        try {
            const apiUrl = `https://65488868dd8ebcd4ab23098d.mockapi.io/api/v1/user/${userId}/Note/${noteId}`;
            const response = await fetch(apiUrl, {
                method: 'PUT',
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
            console.error('Error updating note:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Update Note</Text>
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
            <Pressable style={styles.updateButton} onPress={handleUpdateNote}>
                <Text style={styles.buttonText}>Update Note</Text>
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
        fontSize: 33,
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
    updateButton: {
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

export default UpdateNote;
