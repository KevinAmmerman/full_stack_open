const PersonForm = ({
  name,
  number,
  handleNameChange,
  handleNumberChange,
  addNewPerson,
}) => {
  return (
    <form>
      <div>
        name: <input value={name} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={number} onChange={handleNumberChange} />
      </div>
      <div>
        <button type='submit' onClick={addNewPerson}>
          add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
