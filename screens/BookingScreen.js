// BookingScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { firebase } from '../firebase'; // Adjust path to your Firebase configuration file
import CustomerClassesAdapter from '../adapters/CustomerClassesAdapter'; 

export default function BookingScreen()
{
    const [classes, setClasses] = useState([]);
    const [filteredClasses, setFilteredClasses] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch class instances from Firebase
    useEffect(() =>
    {
        const fetchClasses = async () =>
        {
            try
            {
                const classRef = firebase.database().ref('/courses');
                classRef.on('value', (snapshot) =>
                {
                    const classList = [];
                    snapshot.forEach((childSnapshot) =>
                    {
                        const course = childSnapshot.val();
                        const classInstances = course.classInstances;
                        if (classInstances)
                        {
                            Object.values(classInstances).forEach((instance) =>
                            {
                                classList.push(instance);
                            });
                        }
                    });
                    setClasses(classList);
                    setFilteredClasses(classList);
                });
            } catch (error)
            {
                console.error("Error fetching classes:", error);
            }
        };

        fetchClasses();
    }, []);

    // Filter classes based on search query
    useEffect(() =>
    {
        if (searchQuery.trim() === '')
        {
            setFilteredClasses(classes);
        } else
        {
            const lowercasedQuery = searchQuery.toLowerCase();
            const filtered = classes.filter((classInstance) =>
                classInstance.teacher.toLowerCase().includes(lowercasedQuery) ||
                classInstance.date.toLowerCase().includes(lowercasedQuery) ||
                classInstance.comments?.toLowerCase().includes(lowercasedQuery)
            );
            setFilteredClasses(filtered);
        }
    }, [searchQuery, classes]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Book a Yoga Class</Text>
            <TextInput
                style={styles.searchBar}
                placeholder="Search by day, time, or teacher..."
                value={searchQuery}
                onChangeText={(text) => setSearchQuery(text)}
            />
            <CustomerClassesAdapter classInstances={filteredClasses} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    searchBar: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingLeft: 8,
        marginBottom: 15,
        borderRadius: 5,
    },
});
