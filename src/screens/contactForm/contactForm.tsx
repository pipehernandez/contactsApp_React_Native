import React, { useState } from 'react';
import { View, TextInput, Button, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { Contact } from '../contactList/contactList';

type Props = NativeStackScreenProps<RootStackParamList, 'ContactForm'>;

const ContactFormScreen: React.FC<Props> = ({ navigation, route }) => {
  const [contact, setContact] = useState<Contact>(
    route.params?.contact || { id: '', name: '', phone: '', email: '', photo: '' }
  );

  const handleSave = async () => {
    const storedContacts = await AsyncStorage.getItem('contacts');
    const contacts: Contact[] = storedContacts ? JSON.parse(storedContacts) : [];

    if (contact.id) {
      const updatedContacts = contacts.map(c => (c.id === contact.id ? contact : c));
      await AsyncStorage.setItem('contacts', JSON.stringify(updatedContacts));
    } else {
      const newContact = { ...contact, id: Date.now().toString() };
      await AsyncStorage.setItem('contacts', JSON.stringify([...contacts, newContact]));
    }
    navigation.goBack();
  };

  const handleImagePicker = () => {
    launchImageLibrary({}, (response) => {
      if (!response.didCancel && !response.errorCode) {
        setContact({ ...contact, photo: response.assets ? response.assets[0].uri : '' });
      }
    });
  };

  const handleCamera = () => {
    launchCamera({}, (response) => {
      if (!response.didCancel && !response.errorCode) {
        setContact({ ...contact, photo: response.assets ? response.assets[0].uri : '' });
      }
    });
  };

  return (
    <View>
      <TextInput
        placeholder="Name"
        value={contact.name}
        onChangeText={(text) => setContact({ ...contact, name: text })}
      />
      <TextInput
        placeholder="Phone"
        value={contact.phone}
        onChangeText={(text) => setContact({ ...contact, phone: text })}
      />
      <TextInput
        placeholder="Email"
        value={contact.email}
        onChangeText={(text) => setContact({ ...contact, email: text })}
      />
      {contact.photo ? <Image source={{ uri: contact.photo }} style={{ width: 100, height: 100 }} /> : null}
      <Button title="Pick Photo" onPress={handleImagePicker} />
      <Button title="Take Photo" onPress={handleCamera} />
      <Button title="Save Contact" onPress={handleSave} />
    </View>
  );
};

export default ContactFormScreen;
function launchImageLibrary(arg0: {}, arg1: (response: any) => void) {
    throw new Error('Function not implemented.');
}

function launchCamera(arg0: {}, arg1: (response: any) => void) {
    throw new Error('Function not implemented.');
}

