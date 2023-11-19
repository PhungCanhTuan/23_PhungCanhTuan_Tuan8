import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, Alert, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const NoteList = ({ route, navigation }) => {
    const { userId } = route.params;
    const [notes, setNotes] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            fetchNotes();
        }, [userId])
    );

    const fetchNotes = async () => {
        try {
            const apiUrl = `https://65488868dd8ebcd4ab23098d.mockapi.io/api/v1/user/${userId}/Note`;
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
            setNotes(data);
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    };

    const handleAddNote = () => {
        navigation.navigate('Add', { userId });
    };

    const handleUpdateNote = (noteId) => {
        navigation.navigate('Update', { userId, noteId });
    };

    const handleDeleteNote = async (noteId) => {
        try {
            const response = await fetch(
                `https://65488868dd8ebcd4ab23098d.mockapi.io/api/v1/user/${userId}/Note/${noteId}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            console.log(`Note ${noteId} deleted successfully`);
            fetchNotes();
        } catch (error) {
            console.error('Error deleting note:', error);
            Alert.alert('Error', 'Failed to delete note. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Note List</Text>
            <ScrollView>
                <FlatList
                    data={notes}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.noteItem}>
                            <View>
                                <Text style={styles.textStyle}>{item.name}</Text>
                                <Text style={styles.textStyle}>{item.content}</Text>
                                <Text style={styles.textStyle}>{item.status}</Text>
                            </View>
                            <View style={styles.buttonContainer}>
                                <Pressable
                                    style={[styles.button, styles.updateButton]}
                                    onPress={() => handleUpdateNote(item.id)}
                                >
                                    <Text style={[styles.buttonText, styles.updateButtonText]}>Update</Text>
                                </Pressable>
                                <Pressable
                                    style={[styles.button, styles.deleteButton]}
                                    onPress={() => handleDeleteNote(item.id)}
                                >
                                    <Text style={[styles.buttonText, styles.deleteButtonText]}>Delete</Text>
                                </Pressable>
                            </View>
                        </View>
                    )}
                />
            </ScrollView>

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

    },
    title: {
        fontSize: 33,
        marginBottom: 20,
        color: '#ff6ec7',
        fontWeight: 'bold'
    },
    addButton: {
        backgroundColor: '#00fff7',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginBottom: 10,
    },
    textStyle: {
        fontSize: 20,
        color: '#fff'
    },
    noteItem: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 300
    },
    buttonContainer: {

    },
    button: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 8,
        marginVertical: 5,
        marginLeft: 10,
        width: 'auto',
    },
    updateButton: {
        backgroundColor: '#39ff14',
    },
    deleteButton: {
        backgroundColor: '#ff0000',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    updateButtonText: {
        fontSize: 14,
    },
    deleteButtonText: {
        fontSize: 14,
    },
});
export default NoteList;
