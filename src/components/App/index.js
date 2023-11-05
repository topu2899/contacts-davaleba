import { useState } from "react";
import ContactList from "../ContactList";
import Modal from "../Modal";
import "./index.css";

const App = () => {
  const [modalIsOn, setModalIsOn] = useState(false);
  const contactsDefaultState = localStorage.getItem("contacts")
    ? JSON.parse(localStorage.getItem("contacts"))
    : [];
  const [contacts, setContacts] = useState(contactsDefaultState);
  const [contactEdit, setContactEdit] = useState({});

  const handleEditClick = (contact) => {
    setModalIsOn(true);
    setContactEdit(contact);
  };

  const handleDeleteClick = (contact) => {
    setContacts((previousContacts) => {
      const filteredList = previousContacts.filter(
        (item) => item.id !== contact.id
      );
      localStorage.setItem("contacts", JSON.stringify(filteredList));
      return filteredList;
    });
  };

  return (
    <>
      <button onClick={() => setModalIsOn(true)} id="add-new-contact">
        Add Contact
      </button>
      <ContactList
        contacts={contacts}
        onSetContacts={setContacts}
        onSetModalIsOn={setModalIsOn}
        setContactToEdit={setContactEdit}
        handleEditClick={handleEditClick}
        handleDeleteClick={handleDeleteClick}
      />
      {modalIsOn && (
        <Modal
          onSetModalIsOn={setModalIsOn}
          onSetContacts={setContacts}
          data={contactEdit}
          onSetContactToEdit={setContactEdit}
        />
      )}
    </>
  );
};

export default App;
