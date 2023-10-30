// import React, { useRef, useState } from 'react';
// import './App.css';
// import { or, addDoc, where, query, collection, serverTimestamp, FieldValue, getFirestore } from 'firebase/firestore';
// import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { useCollectionData } from 'react-firebase-hooks/firestore';
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// const firebaseConfig = {
//   apiKey: "AIzaSyDFV0VfkgwNxSmnodSI0qgqnCWuMLKZUQQ",
//   authDomain: "homeverse-397119.firebaseapp.com",
//   projectId: "homeverse-397119",
//   storageBucket: "homeverse-397119.appspot.com",
//   messagingSenderId: "977679557725",
//   appId: "1:977679557725:web:8e03dcfc8c113d0c55d9b4",
//   measurementId: "G-WN3WQTMTKE"
// }

// const app = initializeApp(firebaseConfig);
// const auth = getAuth()
// const analytics = getAnalytics(app);
// const db = getFirestore(app);

// function App() {
//   const [user] = useAuthState(auth);

//   return (
//     <div className="App">
//       <header>
//         <h1>⚛️🔥💬</h1>
//         <SignOut />
//       </header>

//       <section>
//         {user ? <ChatRoom /> : <SignIn />}
//       </section>

//     </div>
//   );
// }

// function SignIn() {

//   const signInWithGoogle = () => {
//     const provider = new GoogleAuthProvider();
//     signInWithPopup(auth, provider)
//   }

//   return (
//     <>
//       <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
//       <p>Do not violate the community guidelines or you will be banned for life!</p>
//     </>
//   )
// }

// function SignOut() {
//   return auth.currentUser && (
//     <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
//   )
// }

// function ChatRoom() {
//   const dummy = useRef();
//   const messagesRef = collection(db, 'messages')
//   const { uid, photoURL } = auth?.currentUser;
//   // const filter = query(messagesRef, where("from", "==", uid || "kCjhnPn4BjOc65kRoeJTl1vwuIQ2"))
//   // const query = messagesRef.orderBy('createdAt').limit(25);
//   // const filter = query(messagesRef, or(where('capital', '==', true),
//   //   where('population', '>=', 1000000)
//   // ))
//   const filter = query(messagesRef, where(roomIds, 'array-contains-any', [uid, "kCjhnPn4BjOc65kRoeJTl1vwuIQ2"]))

//   const [messages] = useCollectionData(filter, { idField: 'id' });
//   const [formValue, setFormValue] = useState('');

//   const sendMessage = async (e) => {
//     e.preventDefault();

//     await addDoc(messagesRef, {
//       text: formValue,
//       createdAt: serverTimestamp(),
//       from: uid,
//       to: "kCjhnPn4BjOc65kRoeJTl1vwuIQ2",
//       roomIds: [uid, "kCjhnPn4BjOc65kRoeJTl1vwuIQ2"]
//     })

//     setFormValue('');
//     dummy.current.scrollIntoView({ behavior: 'smooth' });
//   }

//   return (<>
//     <main>

//       {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

//       <span ref={dummy}></span>

//     </main>

//     <form onSubmit={sendMessage}>

//       <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

//       <button type="submit" disabled={!formValue}>🕊️</button>

//     </form>
//   </>)
// }

// function ChatMessage(props) {
//   const { text, uid, photoURL } = props.message;

//   const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

//   return (<>
//     <div className={`message ${messageClass}`}>
//       <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
//       <p>{text}</p>
//     </div>
//   </>)
// }

// export default App;
