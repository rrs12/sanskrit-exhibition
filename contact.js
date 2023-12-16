function sendMail(){
    var params={
        name: document.getElementById("name").value,
        message: document.getElementById("message").value,
    }

    const ServiceID= "service_xzj659x"
    const templateID="template_1mpwz1h"
   
    emailjs.send(ServiceID,templateID, params)
    .then(
       (res) =>{
           document.getElementById("name").value=""
           document.getElementById("message").value=""
           console.log(res)
   
           alert("Message sent successfully")
           window.open("https://rrs12.github.io/sanskrit-exhibition/index.html","_self");

       }
    )
    .catch((err) => console.log(err))
 }