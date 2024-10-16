import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  contacts: [],
  filter: '',
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action) => {
      const { id, name, number } = action.payload;
      state.contacts.push({ id, name, number });
    },
    deleteContact: (state, action) => {
      const contactId = action.payload;
      state.contacts = state.contacts.filter(
        contact => contact.id !== contactId
      );
    },
    updateFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { addContact, deleteContact, updateFilter } =
  contactsSlice.actions;

export default contactsSlice.reducer;
