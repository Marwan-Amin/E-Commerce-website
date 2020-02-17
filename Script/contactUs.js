let form = document.getElementById( "contactUsForm" );
  
form.addEventListener( "submit", function ( event ) {
  event.preventDefault();
  var name = document.getElementById("name");
  let nameValue = name.value ; 
  
  var email = document.getElementById("email");
  let emailValue = email.value ;
  
  var subject = document.getElementById("subject");
  let subjectValue = subject.value;
  
  var message = document.getElementById("message");
  let messageValue = message.value ; 
  const data = { name: nameValue ,  email: emailValue , subject: subjectValue , message: messageValue };
  
  const URL ='https://afternoon-falls-30227.herokuapp.com/api/v1/contact_us?fbclid=IwAR1wirgClpFBj8LUf94_9S6AFNuMzIp1j4DH9EHSL6vZx_Rbn-ddFvlSzKE' ;

  fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then((response) => response.json())
  .then((data) => {
    console.log('Success', data);
  })
  .catch((error) => {
    console.error('Error', error);
  });
});
