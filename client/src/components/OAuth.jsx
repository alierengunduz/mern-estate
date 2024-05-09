import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import {useDispatch} from 'react-redux';
import {signInSuccess} from '../redux/user/userSlice';
import {useNavigate} from 'react-router-dom';

const OAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
 const handleGoogleClick = async () => {
    try {
        const provider = new GoogleAuthProvider();
        const auth = getAuth(app);
        const result = await signInWithPopup(auth, provider);
        const res = await fetch('/api/auth/google', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: result.user.displayName, email: result.user.email,photo: result.user.photo}),
        });
        const data = await res.json();
        dispatch(signInSuccess(data));
        navigate('/');
     } catch (error) {
        console.log("could not sign in with google",error);
    }
 }

  return (
    <button type="button" onClick={handleGoogleClick} className='bg-red-600 text-white py-2 rounded-md hover:bg-red-700 hover:translate-x-1 transition-all duration-300 uppercase'>Continue With Google</button>
  )
}

export default OAuth