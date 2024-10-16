import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm.jsx';
import ContactList from './ContactList.jsx';
import Filter from './Filter.jsx';
import style from './Contact.module.css';
import {
  addContact,
  deleteContact,
  updateFilter,
} from '../redux/contactsSlice.js';

const App = () => {
  const contacts = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.contacts.filter);
  const dispatch = useDispatch();

  const handleAddContact = (name, number) => {
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const newContact = { id: nanoid(), name, number };
    dispatch(addContact(newContact));
  };

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  const handleFilterChange = event => {
    dispatch(updateFilter(event.target.value));
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const filteredContacts = getFilteredContacts();

  return (
    <div className={style.container}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleAddContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={handleDeleteContact}
      />
    </div>
  );
};

export default App;
