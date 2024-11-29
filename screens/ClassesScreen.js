import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { database } from '../firebase';
import { ref, onValue } from 'firebase/database';

const ClassesScreen = ({ route }) =>
{
    const { courseId } = route.params;
    const [classes, setClasses] = useState([]);

    useEffect(() =>
    {
        // Fetch class instances for the given course from Firebase
        const classesRef = ref(database, `courses/${courseId}/classInstances`);
        onValue(classesRef, (snapshot) =>
        {
            const data = snapshot.val();
            const classesList = data
                ? Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key],
                }))
                : [];
            setClasses(classesList);
        });
    }, [courseId]);

    return (
        <View style={styles.container}>
            <FlatList
                data={classes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Text style={styles.classTitle}>{item.teacher}</Text>
                            <Text style={styles.classDate}>{item.date}</Text>
                        </View>
                        <Text style={styles.classTime}>{item.time}</Text>
                        <Text style={styles.classDescription}>{item.description}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    card: {
        padding: 16,
        marginVertical: 8,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    classTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    classDate: {
        fontSize: 16,
        color: '#666',
    },
    classTime: {
        fontSize: 16,
        marginTop: 8,
        color: '#444',
    },
    classDescription: {
        fontSize: 14,
        marginTop: 4,
        color: '#777',
    },
});

export default ClassesScreen;
