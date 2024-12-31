import React from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  View,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Contact } from '../App';


interface ContactListScreenProps {
  contacts: Contact[];
  onSelectContact: (contact: Contact) => void;
  onRefresh: () => void;
  refreshing: boolean;
}

const ContactListScreen: React.FC<ContactListScreenProps> = ({
  contacts,
  onSelectContact,
  onRefresh,
  refreshing,
}) => {
  const renderItem = ({ item }: { item: Contact }) => (
    <TouchableOpacity style={styles.item} onPress={() => onSelectContact(item)}>
      <View style={styles.avatar}>
        {/* <Text style={styles.avatarText}>{item.firstName.charAt(0)}</Text> */}
      </View>
      <View style={styles.contactDetails}>
        <Text style={styles.name}>
          {item.firstName} {item.lastName}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content"  backgroundColor="#f8f8f8" />

      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="search" size={24} color="#ff8c00" />
        <Text style={styles.headerTitle}>Contacts</Text>
        <Ionicons name="add" size={24} color="#ff8c00" />
      </View>

      {/* Contact List */}
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={<View style={styles.empty}><Text>No contacts available</Text></View>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    color: '#000',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginLeft: 10
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 40,
    backgroundColor: '#ff8c00',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactDetails: {
    flex: 1,
  },
  name: {
    fontSize: 16,
  },
  phone: {
    color: 'gray',
    fontSize: 14,
  },
  empty: {
    padding: 20,
    alignItems: 'center',
  },
});

export default ContactListScreen;
