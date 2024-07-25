// Filename: index.js
// Combined code from all files

import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button, ActivityIndicator, ScrollView } from 'react-native';
import axios from 'axios';

export default function App() {
    const [letter, setLetter] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchLetter();
    }, []);

    const fetchLetter = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://apihub.p.appply.xyz:3300/chatgpt', {
                messages: [
                    {
                        role: "system",
                        content: "Please provide a random letter for reading practice for kids."
                    },
                    {
                        role: "user",
                        content: "Give me a single random letter."
                    }
                ],
                model: 'gpt-4o'
            });
            const resultString = response.data.response.trim();
            setLetter(resultString);
        } catch (error) {
            console.error("Error fetching letter:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>Learn to Read!</Text>
                <View style={styles.letterBox}>
                    {loading ? (
                        <ActivityIndicator size="large" color="#0000ff" />
                    ) : (
                        <Text style={styles.letter}>{letter}</Text>
                    )}
                </View>
                <Button title="Next Letter" onPress={fetchLetter} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        paddingHorizontal: 16,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    letterBox: {
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#000',
        borderWidth: 2,
        padding: 40,
        marginBottom: 20,
        width: 150,
        height: 150,
    },
    letter: {
        fontSize: 48,
        fontWeight: 'bold',
    },
});