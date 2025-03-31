const PersonForm = ({
  name,
  number,
  handleNameChange,
  handleNumberChange,
  handleContactSubmit,
}) => {
  return (
    <form>
      <div>
        name:{' '}
        <input
          value={name}
          onChange={handleNameChange}
        />
      </div>
      <div>
        number:{' '}
        <input
          value={number}
          onChange={handleNumberChange}
        />
      </div>
      <div>
        <button
          type='submit'
          onClick={handleContactSubmit}
        >
          add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
