import React, { useState, useEffect } from "react";
import ContactListScreen from "./screens/ContactListScreen";
import mockdata from "./data.json"

type Contacts = {
  id: string; //uuid
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
};

export default function App() {
  const [contacts, setContacts] = useState<Contacts[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contacts | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = () => {
    setContacts(mockdata);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadContacts();
    setRefreshing(false);
  };

  const handleSave = (updatedContact: Contacts) => {
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === updatedContact.id ? updatedContact : contact
      )
    );
    setSelectedContact(null); // Navigate back to the contact list
  };

  return (
    <ContactListScreen
      contacts={contacts}
      onSelectContact={setSelectedContact}
      onRefresh={handleRefresh}
      refreshing={refreshing}
    />
  );
}
