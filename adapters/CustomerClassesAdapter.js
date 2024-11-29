// CustomerClassesAdapter.js
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Card } from 'react-native-paper';

const CustomerClassesAdapter = ({ classInstances }) =>
{
    const renderItem = ({ item }) => (
        <Card style={styles.card}>
            <View style={styles.container}>
                <Text style={styles.date}>Date: {item.date}</Text>
                <Text style={styles.teacher}>Teacher: {item.teacher}</Text>
                <Text style={styles.comments}>Comments: {item.comments ? item.comments : "No comments available"}</Text>
            </View>
        </Card>
    );

    return (
        <FlatList
            data={classInstances}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
        />
    );
};

const styles = StyleSheet.create({
    card: {
        marginVertical: 10,
        padding: 15,
        borderRadius: 10,
    },
    container: {
        flexDirection: 'column',
    },
    date: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5,
    },
    teacher: {
        fontSize: 14,
        marginBottom: 5,
    },
    comments: {
        fontSize: 14,
    },
});

export default CustomerClassesAdapter;
