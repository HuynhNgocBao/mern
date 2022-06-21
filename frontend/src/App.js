import {useSelector , useDispatch} from 'react-redux';
import {login} from './features/authSlice';
import axios from 'axios'
import {useEffect} from 'react'
function App() {
  const {user, isLoading} = useSelector(state=>state.auth);
  const dispatch = useDispatch();
  const handleSubmit = (e)=>{
    dispatch(login());
    console.log(user);
  }
  return (
    <button onClick={handleSubmit}>a</button>
  );
}

export default App;
