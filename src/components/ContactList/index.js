import { useState } from "react";
import Contact from "../Contact";
import "./contactList.css";

const ContactList = ({
  contacts,
  onSetContacts,
  handleEditClick,
  handleDeleteClick,
}) => {
  const [checkedIds, setCheckedIds] = useState([]);

  const checkAll = (e) => {
    const { checked } = e.target;
    if (checked) {
      const checkedIdsArray = contacts.map((contact) => contact.id);
      setCheckedIds(checkedIdsArray);
    } else setCheckedIds([]);
  };

  const toggleContactFromList = (e, contactId) => {
    const { checked } = e.target;
    if (!checked) {
      setCheckedIds((ids) => {
        const newIdsArray = ids.filter((id) => contactId !== id);
        return newIdsArray;
      });
    } else {
      setCheckedIds((ids) => {
        const withNewId = [...ids, contactId];
        return withNewId;
      });
    }
  };

  const handleDeleteChecked = () => {
    if (checkedIds.length === contacts.length) {
      onSetContacts([]);
      localStorage.clear();
    } else {
      onSetContacts((contacts) => {
        const filteredList = contacts.filter(
          (contact) => !checkedIds.includes(contact.id)
        );
        localStorage.setItem("contacts", JSON.stringify(filteredList));
        return filteredList;
      });
    }
    setCheckedIds([]);
  };

  return (
    <table>
      <caption>Contacts</caption>
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              onChange={checkAll}
              checked={
                checkedIds.length && checkedIds.length === contacts.length
              }
            />
          </th>
          <th>
            <i
              className="fa fa-trash-o delete-all"
              onClick={handleDeleteChecked}
            />
          </th>
          <th></th>
          <th>Name</th>
          <th>Phone number</th>
        </tr>
      </thead>
      <tbody>
        {contacts.map((contact, i) => (
          <Contact
            onToggleContactFromList={toggleContactFromList}
            checkedIds={checkedIds}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
            contactData={contact}
            key={`contact-${i}`}
          />
        ))}
      </tbody>
    </table>
  );
};

export default ContactList;
