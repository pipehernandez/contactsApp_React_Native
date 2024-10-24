import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ContactListScreen, { Contact } from './src/screens/contactList/contactList';
import ContactFormScreen from './src/screens/contactForm/contactForm';

export type RootStackParamList = {
  ContactList: undefined;
  ContactForm: { contact?: Contact } | undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ContactList">
        <Stack.Screen name="ContactList" component={ContactListScreen} />
        <Stack.Screen name="ContactForm" component={ContactFormScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
