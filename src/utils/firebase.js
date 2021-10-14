// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDBFCSHlH6mrLTkZd7cglgRqJ1SyPvQdp8",
	authDomain: "nygmamachine.firebaseapp.com",
	projectId: "nygmamachine",
	storageBucket: "nygmamachine.appspot.com",
	messagingSenderId: "470207725039",
	appId: "1:470207725039:web:5d9d517fbf4d0ed86b8a1a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const realtime = getDatabase(app)

export default realtime