import "./contact.css";

const Contact = ({
  contactData,
  checkedIds,
  onToggleContactFromList,
  onEdit,
  onDelete,
}) => {
  return (
    <tr>
      <td>
        <input
          type="checkbox"
          onChange={(e) => onToggleContactFromList(e, contactData.id)}
          checked={checkedIds.includes(contactData.id)}
        />
      </td>
      <td>
        <i className="fa fa-trash-o" onClick={() => onDelete(contactData)} />
      </td>
      <td>
        <i className="fa fa-pencil" onClick={() => onEdit(contactData)}></i>
      </td>
      <td>{contactData.name}</td>
      <td>{contactData.phoneNumber}</td>
    </tr>
  );
};

export default Contact;
