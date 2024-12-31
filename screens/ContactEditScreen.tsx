import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";

import { Contact } from "../App";

interface ContactEditScreenProps {
  contact: Contact;
  onSave: (contact: Contact) => void;
  onCancel: () => void;
}

const ContactEditScreen: React.FC<ContactEditScreenProps> = ({
  contact,
  onSave,
  onCancel,
}) => {
  const [firstName, setFirstName] = useState(contact.firstName);
  const [lastName, setLastName] = useState(contact.lastName);
  const [phone, setPhone] = useState(contact.phone);
  const [email, setEmail] = useState(contact.email);

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");

  // Refs for the TextInputs
  const lastNameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);

  const handleSave = () => {
    //validation check for empty string
    if (firstName.trim() === "") {
      setFirstNameError("First Name is required.");
      return;
    }

    if (lastName.trim() === "") {
      setLastNameError("Last Name is required.");
      return;
    }

    onSave({ ...contact, firstName, lastName, phone, email });
  };

  const validateField = (
    field: string,
    fieldName: string,
    setError: (error: string) => void
  ) => {
    if (field.trim() === "") {
      setError(`${fieldName} is required.`);
    } else {
      setError("");
    }
  };

  return (
    <>
      <SafeAreaView>
        <StatusBar barStyle="dark-content" backgroundColor="#f8f8f8" />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onCancel}>
            <Text style={styles.headerActionText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSave}>
            <Text style={styles.headerActionText}>Save</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Profile Picture Placeholder */}
        <View style={styles.profileContainer}>
          <View style={styles.profilePicture}></View>
        </View>

        {/* Main Information Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Main Information</Text>
        </View>
        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>First Name</Text>
          <View style={{ flex: 1 }}>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
              onBlur={() =>
                validateField(firstName, "First Name", setFirstNameError)
              }
              returnKeyType="next"
              onSubmitEditing={() => lastNameRef.current?.focus()} // Go to Last Name
            />
            {firstNameError ? (
              <Text style={styles.errorText}>{firstNameError}</Text>
            ) : null}
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>Last Name</Text>
          <View style={{ flex: 1 }}>
            <TextInput
              ref={lastNameRef}
              style={styles.input}
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
              onBlur={() =>
                validateField(lastName, "Last Name", setLastNameError)
              }
              returnKeyType="next"
              onSubmitEditing={() => emailRef.current?.focus()} // Go to Email
            />
            {lastNameError ? (
              <Text style={styles.errorText}>{lastNameError}</Text>
            ) : null}
          </View>
        </View>

        {/* Sub Information Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Sub Information</Text>
        </View>
        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            ref={emailRef}
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={() => phoneRef.current?.focus()} // Go to Phone
          />
        </View>
        <View style={styles.divider} />
        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>Phone</Text>
          <TextInput
            ref={phoneRef}
            style={styles.input}
            placeholder="Phone"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            returnKeyType="done" // Close the keyboard
          />
        </View>
        <View style={styles.divider} />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f8f8f8"
  },
  headerActionText: {
    fontSize: 18,
    color: "#ff8c00",
    fontWeight: "600",
  },
  profileContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#ff8c00",
  },
  sectionHeader: {
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 10,
    borderRadius: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 5,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15,
    marginRight: 20,
  },
  inputLabel: {
    width: 100,
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 5,
    marginLeft: 10,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});

export default ContactEditScreen;
