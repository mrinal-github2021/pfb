const firebase= require('firebase');
// Required for side-effects
require('firebase/firestore');



  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyA2g_78MTEakxz2byDhbS1MxeS-iXtdf74",
    authDomain: "pfb-assignment.firebaseapp.com",
    databaseURL: "https://pfb-assignment-default-rtdb.firebaseio.com",
    projectId: "pfb-assignment",
    storageBucket: "pfb-assignment.appspot.com",
    messagingSenderId: "68175699754",
    appId: "1:68175699754:web:534dc1531c2e6fc0f28853",
    measurementId: "G-M68KDLB3QK"
  };
  var db = firebase.firestore();
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();



// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

// Take the text parameter passed to this HTTP endpoint and insert it into 
// Firestore under the path /messages/:documentId/original
exports.addMessage = functions.https.onRequest(async (req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  // Push the new message into Firestore using the Firebase Admin SDK.
  const writeResult = await admin.firestore().collection('messages').add({original: original});
  // Send back a message that we've successfully written the message
  res.json({result: `Message with ID: ${writeResult.id} added.`});
});

// Listens for new messages added to /messages/:documentId/original and creates an
// uppercase version of the message to /messages/:documentId/uppercase
exports.makeUppercase = functions.firestore.document('/messages/{documentId}')
    .onCreate((snap, context) => {
      // Grab the current value of what was written to Firestore.
      const original = snap.data().original;

      // Access the parameter `{documentId}` with `context.params`
      functions.logger.log('Uppercasing', context.params.documentId, original);
      
      const uppercase = original.toUpperCase();
      
      // You must return a Promise when performing asynchronous tasks inside a Functions such as
      // writing to Firestore.
      // Setting an 'uppercase' field in Firestore document returns a Promise.
      return snap.ref.set({uppercase}, {merge: true});
    });
	
	


function sendInfo(){
	alert("this is a test");
	
	firebase.database().ref().set()({
		name:"Piyu",
		userId:11,
		age:34,
		hobbies:"singing",
		interests:"computer"
	});
/*const addUserInputsUI = document.getElementsByClassName("user-input");
// this object will hold the new user information 
let newUser = {};
// loop through View to get the data for the model 
for (let i = 0, len = addUserInputsUI.length; i < len; i++) {
    let key = addUserInputsUI[i].getAttribute('data-key');
    let value = addUserInputsUI[i].value;
    newUser[key] = value;
	//alert(value);
}//*/

db.collection("users").add({
	userId: 676,
    name: "Test Name",
    age: 45,
    hobbies: "dancing",
	interests: "laptop"
});
	return false;
}