
/* User Authentification.
Feaures : Signup user if new
          Login user y email, Google signin and Github.
          check Auth stated, isUser Login ? or not.
*/

// #####################################    Firebase.
// const firebaseConfig = {
//     apiKey: "AIzaSyDI5X8-CINcaMesGvasxVpcc7YtY6az5mk",
//     authDomain: "slot-machine-e9fc8.firebaseapp.com",
//     databaseURL: "https://slot-machine-e9fc8-default-rtdb.firebaseio.com",
//     projectId: "slot-machine-e9fc8",
//     storageBucket: "slot-machine-e9fc8.appspot.com",
//     messagingSenderId: "885775908291",
//     appId: "1:885775908291:web:afd4bd61619d14352e9176",
//     measurementId: "G-6SRVQM8EP8"   
// };
firebase.initializeApp(firebaseConfig);             // Init firebase APP.
const auth = firebase.auth();                       // Make Auth Reference.
        // Update firestore settings
const signupForm = document.querySelector('#register-form');
$('#signup-btn').click('click',(e)=>{
    e.preventDefault();
    if(formValidation() == true){
        signUpWithEmail();
    }else{
        modalMessenger('Invalid','Couldnt validate user data','black','#F9FE69')

    }
});
$('#signin-btn').click('click',(e)=>{
    e.preventDefault();
    if(Login_formValidation()){
        signInUserWithEmail();
    }else{
        modalMessenger('Invalid','Couldnt validate user data','black','#F9FE69')

    }
});
// ####### User Signup function
function signUpWithEmail(){
    const signupForm = document.querySelector('#register-form');
    // get user info
    const email = signupForm['username'].value;
    const password = signupForm['pwd1'].value;

        auth.createUserWithEmailAndPassword(email,password).then(cred=>{
            signupForm.reset();
            $('.btn-close').click();
            }).catch((e)=>{
                modalMessenger('Sign Error',e.message,'black','#F9FE69')

    });
        


}

// ####### User Signin function
function signInUserWithEmail(){
    const loginForm = document.querySelector('#login-form');

        // get user info.
        const email = loginForm['Username'].value;
        const password = loginForm['Password'].value;
        /* Data validation.
        ....
        ....
        */
        // then after data validated 
        auth.signInWithEmailAndPassword(email,password).then(cred=>{
            loginForm.reset(); // reset 
            $('.btn-close').click();
        }).catch((e)=>{
            modalMessenger('Login Failed',e.message,'black','#F9FE69');            

        });
 
}
// ####### User sign wuth Github function
function signWithGithub(){
    const provider = new firebase.auth.GithubAuthProvider();
    firebase.auth().signInWithPopup(provider).then(res=>{
        // let token = res.credential.accessToken;
        // let user = res.user;
        $('.btn-close').click();

    }).catch(e=>{
        modalMessenger('Sign Error',e.message,'black','#F9FE69')

    });
 
}
// ####### User sign wuth Google function
function signWithGoogle(){
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(res=>{
        // let token = res.credential.accessToken;
        // let user = res.user;
        $('.btn-close').click();
    }).catch(e=>{
        modalMessenger('Sign Error',e.message,'black','#F9FE69')

    });
}
// ####### Signout user function
function loggout() {  
    if (confirm("You are about to log out.")) {
        firebase.auth().signOut().then(()=>{
           //
        });
      } else {
        txt = "Cancel signout action canceled!";
      }   
}
// #############   Check userLogin status ########
    firebase.auth().onAuthStateChanged(function(user){ //Check to see if the user is currenlty logged in
        if(user){ // if the user is  logged do this.
            $('#user').hide();
            $('#no-border').show();

            userProfile(user.displayName, user.photoURL);

            //user is signed in.
            // const displayName = user.displayName;
            // const email = user.email;
            // const emailVerified = user.emailVerified;
            // const photoURL = user.photoURL;
            // const isAnonymous = user.isAnonymous;
            // const uid = user.uid;
            // const providerData =uer.providerData;
            //...
        }
        else{   // if the user is not logged.
            $('#no-border').hide();
            $('#user').show();
           
        }
    });

// Update the user profile card
function userProfile(username, userPhoto){
    $('#profile-picture').attr('src',userPhoto);
    $('#username').text(username);

}

function formValidation(){


    const signupForm = document.querySelector('#register-form');

    const identifier = signupForm['username'].value
    atpos = identifier.indexOf("@");
    dotpos = identifier.lastIndexOf(".");

     // Check for password field 1
     if( signupForm['pwd1'].value ==""){
        console.log("password "+signupForm['pwd1'].value)
        modalMessenger('Password','Please enter Password','black','#F9FE69')
        signupForm['pwd1'];
        return false;
    }
    // Check for password field 2
    if( signupForm['pwd2'].value ==""){
        modalMessenger('Password','Please confirm Password','black','#F9FE69')
        signupForm['pwd2'];
        return false;
    }
    // Check if both  password field macth
    if(signupForm['pwd2'].value != signupForm['pwd1'].value){
        modalMessenger('Password','Password Do not match','black','#F9FE69')
        signupForm['pwd2'];
        return false;
    }

    if( atpos <1 || (dotpos -atpos < 2 )){
        // Not email
        if( signupForm['username'].value ==""){
            modalMessenger('Eamil','Please enter Email','black','#F9FE69')
            signupForm['username'];
            return false;
        }else{ return true}
    }
    else{
        // is Email.
        if( signupForm['username'].value ==""){
            modalMessenger('Email','Please enter Email','black','#F9FE69')
            signupForm['username'];
            return false;
        }else{ return true}
    }

}

function Login_formValidation(){
    const loginForm = document.querySelector('#login-form');
    const identifier = signupForm['username'].value
    atpos = identifier.indexOf("@");
    dotpos = identifier.lastIndexOf(".");

     // Check for password field 1
     if( loginForm['pwd1'].value ==""){
        modalMessenger('Password','Please enter password','black','#F9FE69')
        loginForm['pwd1'];
        return false;
    }
    if( atpos <1 || (dotpos -atpos < 2 )){
        // Not email
        if( loginForm['username'].value ==""){
            modalMessenger('Username','Please enter Username or Email','black','#F9FE69')
            loginForm['username'];
            return false;
        }else{ return true}
    }
    else{
        // is Email.
        
        if( loginForm['username'].value ==""){
            modalMessenger('Username','Please enter Username or Email','black','#F9FE69')
            loginForm['username'];
            return false;
        }else{ return true}
    }

}
function modalMessenger(title,message,color,bgColor){
    $('#myModal').modal('show');
    $('#userMessage-modal-content').css({
        'background-color':bgColor,
        'font-weight':'bold',
        'color':color
    });
    $('#userMessage-modal-title').text(title);
    $('#userMessage-modal-body').text(message)
}

