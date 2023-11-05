import { useState, useEffect } from "react";
import "./modal.css";

const Modal = ({ onSetModalIsOn, onSetContacts, data, onSetContactToEdit }) => {
  const [userInput, setUserInput] = useState({
    id: null,
    name: "",
    phoneNumber: "",
  });

  const addNewContactToList = () => {
    onSetContacts((previousContacts) => {
      previousContacts.push({
        id: Math.floor(Math.random() * 1000),
        ...userInput,
      });
      localStorage.setItem("contacts", JSON.stringify(previousContacts));
      return previousContacts;
    });
    onSetModalIsOn(false);
  };

  useEffect(() => {
    if (data) setUserInput(data);
  }, [data]);

  const editContactToList = () => {
    onSetContacts((previousContacts) => {
      const index = previousContacts.findIndex(
        (contact) => contact.id === data.id
      );
      previousContacts[index] = userInput;
      localStorage.setItem("contacts", JSON.stringify(previousContacts));
      return previousContacts;
    });
    onSetContactToEdit({});
    onSetModalIsOn(false);
  };

  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <span className="close" onClick={() => onSetModalIsOn(false)}>
          &times;
        </span>
        <h2 style={{ textAlign: "center" }}>
          {data.id ? "Edit" : "Add New"} Contact
        </h2>
        <div className="userInputWrapper">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={userInput.name}
            onChange={(e) =>
              setUserInput({ ...userInput, name: e.target.value })
            }
          />
        </div>
        <div className="userInputWrapper">
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone number"
            value={userInput.phoneNumber}
            onChange={(e) =>
              setUserInput({ ...userInput, phoneNumber: e.target.value })
            }
          />
        </div>
        <div className="userInputWrapper">
          <button onClick={data.id ? editContactToList : addNewContactToList}>
            {data.id ? "Edit" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
