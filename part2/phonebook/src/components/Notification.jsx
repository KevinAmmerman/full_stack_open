const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return (
    <div
      style={!message[1] ? { color: 'red' } : {}}
      className='notification'
    >
      {message}
    </div>
  );
};

export default Notification;
