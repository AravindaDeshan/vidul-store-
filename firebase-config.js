// Replace with your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyB0go8IAyLXt1EDR2KzvYKokA6qLn8V0uE",
  authDomain: "test-41a35.firebaseapp.com",
  projectId: "test-41a35",
  storageBucket: "test-41a35.firebasestorage.app",
  messagingSenderId: "649052341324",
  appId: "1:649052341324:web:6284ae6661b935f7eda0e9"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

// Enable offline persistence
db.enablePersistence()
  .catch((err) => {
    console.log("Firebase persistence error:", err);
  });

// Export for use in other files
window.firebaseApp = app;
window.firestoreDB = db;
window.firebaseAuth = auth;