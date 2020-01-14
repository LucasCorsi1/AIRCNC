import React, { useState, useEffect } from 'react';
import { withNavigation } from 'react-navigation';
import { View, StyleSheet, Text, FlatList, Image,Button, TouchableOpacity, AsyncStorage } from 'react-native';


import api from '../services/api';

function SpotList({ tech, navigation }) {
    const [spots, SetSpots] = useState([]);

    useEffect(() => {

        async function loadSpots() {

            const response = await api.get('/spots',
                {
                    params: { tech }
                })
            SetSpots(response.data)
        }

        loadSpots();
    }, []);

    function handleNavigate(id) {
        navigation.navigate('Book', { id });
    }

    function handleBackLogin() {
        AsyncStorage.clear();
        navigation.navigate('Login');

    }
    return (

        <View style={styles.container}>
            <Text style={styles.title}> Empresas que usam <Text style={styles.bold}> {tech} </Text> </Text>

       
            <FlatList
    
                style={styles.list}
                data={spots}
                keyExtractor={spot => spot._id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.listitem}>
                        <Image style={styles.thumbnail} source={{ uri: item.thumbnail_url }} />
                        <Text style={styles.company}>{item.company}</Text>
                        <Text style={styles.price}>{item.price ? `R$${item.price}/dia` : 'Gratuito'}</Text>
                        <TouchableOpacity onPress={() => handleNavigate(item._id)} style={styles.button}>
                            <Text style={styles.buttonText}> Solicitar Reserva</Text>
                       </TouchableOpacity>
                    
                    </View>

                )}
            />
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
    },
    back: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    title: {
        fontSize: 20,
        color: '#444',
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    bold: {
        fontWeight: 'bold',
    },
    list: {
        paddingHorizontal: 20,
    },
    listitem: {
        marginRight: 15,
    },
    thumbnail: {
        width: 200,
        height: 120,
        resizeMode: 'cover',
        borderRadius: 2,
    },
    company: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 5,

    },
    price: {
        fontSize: 15,
        color: '#999',
        marginTop: 5,
    },
    button: {
        height: 32,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginTop: 15,
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 15,
    },
    buttonBack: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        borderRadius: 2,
    },

});
export default withNavigation(SpotList);