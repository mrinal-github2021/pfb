  // Your web app's Firebase configuration
var userRef=""; 
 var firebaseConfig = {
    apiKey: "AIzaSyBEaUj4oK4imMWg35L3gZQppuhnYNA9ObM",
    authDomain: "pfb-assignment-6c011.firebaseapp.com",
    databaseURL: "https://pfb-assignment-6c011-default-rtdb.firebaseio.com",
    projectId: "pfb-assignment-6c011",
    storageBucket: "pfb-assignment-6c011.appspot.com",
    messagingSenderId: "969050201601",
    appId: "1:969050201601:web:913dc77450fd0f62aeaa00"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var db = firebase.firestore();

function deleteData(doc_id){
	alert(doc_id);
	return false;
}



function getData(){
	//$('#userTable').remove();
	
	 db.collection("users").get().then((querySnapshot) => {
  

  
    querySnapshot.forEach((doc) => {
		
	var content = '';
        // doc.data() is never undefined for query doc snapshots
			
			var userId = doc.data().userId;
            var name= doc.data().name;
            var age= doc.data().age;
            var hobbies= doc.data().hobbies;
            var interests= doc.data().interests;
			userRef = name +'-'+userId;
			//alert(userRef);
            content += '<tr class="row100 body">';
            content += '<td class="cell100 column1">' + userId + '</td>'; 
            content += '<td class="cell100 column2">' + name + '</td>';
            content += '<td class="cell100 column3">' + age + '</td>';
            content += '<td class="cell100 column4">' + hobbies + '</td>';
            content += '<td class="cell100 column5">' + interests + '</td>';
            content += '<td class="cell100 column6"> <a href="index.html?id='+userId+'&name='+name+'">Edit <a> | <a href="javascript:void(0)" onclick="return deleteRecord(\''+userRef+'\')">Delete</a>  </td>';//column2
            content += '</tr>';//*/
			//alert(content);
			$('#userTable').append(content);
		
    });
});//*/
  
}


function getUserData(){
	const params = new URLSearchParams(window.location.search)
	if(params.has('id') && params.has('name') ){
		//alert(params.get('id'));
		var docc =params.get('name')+'-'+params.get('id')
		
		var docRef = db.collection("users").doc(docc);

docRef.get().then((doc) => {
    if (doc.exists) {
        console.log("Document data:", doc.data());
		document.getElementById("frmUserId").value = doc.data().userId;
		document.getElementById("frmName").value= doc.data().name;
		document.getElementById("frmAge").value = doc.data().age;
		document.getElementById("frmHobbies").value = doc.data().hobbies;
		document.getElementById("frmInterests").value = doc.data().interests;
		document.getElementById("btnSubmit").innerHTML="Update";
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});
	}
}


function sendInfo(){
	 //event.preventDefault();
	//alert("this is a test");
	var btnText = document.getElementById("btnSubmit").innerHTML;
	
	const user_id = document.getElementById("frmUserId").value;
const user_name = document.getElementById("frmName").value;
const user_age = document.getElementById("frmAge").value;
const user_hobbies = document.getElementById("frmHobbies").value;
const user_interests= document.getElementById("frmInterests").value;
 if(btnText == "Add"){

/*db.collection("users").add({
	userId: 676,
    name: "Test Name",
    age: 45,
    hobbies: "dancing",
	interests: "laptop"
});//*/ // WORKING CODE




/*db.collection("users").add({
	userId: user_id,
    name: user_name,
    age: user_age,
    hobbies: user_hobbies,
	interests: user_interests
});//*/ // WORKING CODE

/*db.collection("users").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    });
});//*/
	//window.Location('index.html');
	
	var docData ={
		userId: user_id,
		name: user_name,
		age: user_age,
		hobbies: user_hobbies,
		interests: user_interests
	};
	db.collection("users").doc(user_name+'-'+user_id).set(docData) .then(function() {
		alert("Record added successfully");
		window.location="users_list.html";
         console.log("Doc successful");
     })
     .catch(function(error) {
        console.error("Error writing doc", error);
     });
 }
 else if(btnText == "Update"){
	 const params = new URLSearchParams(window.location.search)
		if(params.has('id') && params.has('name') ){
		//alert(params.get('id'));
		var docc =params.get('name')+'-'+params.get('id');
		
		db.collection("users").doc(docc).update({
		userId: user_id,
		name: user_name,
		age: user_age,
		hobbies: user_hobbies,
		interests: user_interests
	}).then(function(){
		alert("Record updated successfully");
		window.location="users_list.html";
	})
	.catch(function(error){
		console.error("Error writing doc", error);
	});
		}
	

 }
	return false;
}


function deleteRecord(user_id){
	
	var recId=user_id.trim();
	
	db.collection("users").doc(recId).delete().then(() => {
	alert("Record deleted successfully");
    console.log("Document successfully deleted!");
	location.reload();
}).catch((error) => {
    console.error("Error removing document: ", error);
});
}

function loadDoc(){
	alert("Hello")
}