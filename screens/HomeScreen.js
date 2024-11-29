// screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { database } from '../firebase';
import { ref, onValue } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () =>
{
    const [courses, setCourses] = useState([]);
    const navigation = useNavigation();

    useEffect(() =>
    {
        // Fetch courses from Firebase
        const coursesRef = ref(database, 'courses');
        onValue(coursesRef, (snapshot) =>
        {
            const data = snapshot.val();
            const coursesList = data
                ? Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key],
                }))
                : [];
            setCourses(coursesList);
        });
    }, []);

    const handleCoursePress = (courseId) =>
    {
        navigation.navigate('Classes', { courseId });
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={courses}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.card} onPress={() => handleCoursePress(item.id)}>
                        <Text style={styles.courseTitle}>{item.type}</Text>
                        <Text>{item.dayOfWeek} - {item.time}</Text>
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
    },
    card: {
        backgroundColor: '#fff',
        padding: 16,
        marginVertical: 8,
        borderRadius: 8,
        elevation: 4,
    },
    courseTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default HomeScreen;
