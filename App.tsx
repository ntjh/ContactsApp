import React, { useState, useEffect } from "react";
import ContactListScreen from "./screens/ContactListScreen";
import ContactEditScreen from "./screens/ContactEditScreen";
import mockdata from "./data.json"

export type Contact = {
  id: string; //uuid
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
};

export default function App() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
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

  const handleSave = (updatedContact: Contact) => {
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === updatedContact.id ? updatedContact : contact
      )
    );
    setSelectedContact(null); // Navigate back to the contact list
  };

  if (selectedContact) {
    return (
      <ContactEditScreen
        contact={selectedContact}
        onSave={handleSave}
        onCancel={() => setSelectedContact(null)}
      />
    );
  }

  return (
    <ContactListScreen
      contacts={contacts}
      onSelectContact={setSelectedContact}
      onRefresh={handleRefresh}
      refreshing={refreshing}
    />
  );
}
