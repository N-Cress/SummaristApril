import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import { app } from '../firebase';
import { getFirestore, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../lib/store';
import { setLogged, setUEmail, setUName } from '@/lib/features/loggedSlice';
import { setLogging } from "@/lib/features/loggingSlice";

const db = getFirestore();

const auth = getAuth(app);

type Props = {
    setLogged : React.Dispatch<React.SetStateAction<boolean>>;
    setIsLogging : React.Dispatch<React.SetStateAction<boolean>>;
    setSubLevel : React.Dispatch<React.SetStateAction<string>>;
}

const Login : React.FC<Props> = ({ setSubLevel}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<boolean>(false);

    const logged = useSelector((state: RootState) => state.logged.value)
    const logging = useSelector((state: RootState) => state.logged.value)

    const dispatch = useDispatch();
    

    const user = auth.currentUser;

      async function userPremium() {
      const userRef = doc(db, "users", user.uid);

      await updateDoc(userRef, {
        subscription: "premium",
      })
    }

    const handleLogin = async (email: string, password: string) => {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          dispatch(setLogged(true))
          dispatch(setLogging(false))
          dispatch(setUEmail(user.email))
          dispatch(setUName(user.displayName || null))
          setError(false);
        } catch (error) {
          console.error('Login failed:', error);
          setError(true);
        }
      };
    
      async function signInWithGoogle() {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
      
        try {
          const result = await signInWithPopup(auth, provider);
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const user = result.user;
     
        } catch (error) {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.customData.email;
          const credential = GoogleAuthProvider.credentialFromError(error);
     
        }
      }
    
    
      const handleBgClick  = () => {
        dispatch(setLogging(false));
      }
    
      const handleBoxClick = (e: React.MouseEvent) => {
        e.stopPropagation();
      }
    return (
    <div
      className="fixed inset-0 bg-black/75  flex items-center justify-center z-50"
      onClick={handleBgClick}
      >
      <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg w-96">
      <h2 className="text-xl font-semibold mb-4">Log in to Summarist</h2>
        <button onClick={() => handleLogin('test@email.com', "123456")} className="cursor-pointer mt-2 mb-2 w-full bg-[#25396B] text-white py-2 rounded">
          Login as a Guest
        </button>
        <div className="flex mb-2 mt-2 w-full items-center justify-center"> 
          <div className="border-1 border-gray-300 w-full mr-5"> </div>
          <div> or </div>
          <div className="border-1 border-gray-300 w-full ml-5 "> </div>
        </div>
        <button onClick={signInWithGoogle} className="w-full cursor-not-allowed mt-2 mb-2 bg-[#4285F4] text-white py-2 rounded">
          Login with Google
        </button>
        <div className="mt-2 mb-4 flex w-full items-center justify-center"> 
          <div className="border-1 border-gray-300 w-full mr-5"> </div>
          <div> or </div>
          <div className="border-1 border-gray-300 w-full ml-5 "> </div>
        </div>
      <form
        className="flex flex-col items-center bg-white pl-8 pr-8 g w-96"
        onClick={handleBoxClick}
        onSubmit={(e) => {e.preventDefault(); handleLogin(email, password);}}
      >
       
        <input
          type="email"
          placeholder="Email Address"
          className="border p-2 w-full mb-4 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-4 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-[#2BD97C] text-black cursor-pointer py-2 rounded">
          Login
        </button>
        {error && <div className="text-red-500 mt-2"> Invalid Email or Password </div>}
        <div className="text-[#1191E9] mt-4 mb-2 cursor-not-allowed"> Forgot your password?</div>
        <div className="text-[#1191E9]"> Don't have an account? </div>
      </form>
      </div>
    </div>
    )
}

export default Login;