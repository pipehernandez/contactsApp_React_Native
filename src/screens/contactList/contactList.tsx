import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'ContactList'>;

export type Contact = {
  id: string;
  name: string;
  phone: string;
  email: string;
  photo?: string;
};

const ContactListScreen: React.FC<Props> = ({ navigation }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    const storedContacts = await AsyncStorage.getItem('contacts');
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  };

  const deleteContact = async (id: string) => {
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    setContacts(updatedContacts);
    await AsyncStorage.setItem('contacts', JSON.stringify(updatedContacts));
  };

  return (
    <View>
      <Button title="Add Contact" onPress={() => navigation.navigate('ContactForm')} />
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name} - {item.phone}</Text>
            <Button title="Edit" onPress={() => navigation.navigate('ContactForm', { contact: item })} />
            <Button title="Delete" onPress={() => deleteContact(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

export default ContactListScreen;
