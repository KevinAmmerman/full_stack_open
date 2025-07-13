import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(({ notification }) => notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: notification !== '' ? '' : 'none',
    marginBottom: 20,
  }
  return <div style={style}>{notification}</div>
}

export default Notification
