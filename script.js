const pratyay=localStorage.getItem("Pratyay")
const dhatu=localStorage.getItem("Dhatu")

let pratyay_label=document.getElementById("pratyay")
let dhatu_label=document.getElementById("dhatu")
let result=document.getElementById("result")

pratyay_label.innerText=pratyay
dhatu_label.innerText=dhatu

if (dhatu=="भू"){
    
    if (pratyay == "क्त्वा"){
        result.innerHTML="भूत्वा"
    }

    else if (pratyay=="तुमुन्"){
        result.innerHTML="भवितुम्"
    }

    else if (pratyay=="क्त"){
        result.innerHTML="भूत"
    }

    else{
        result.innerHTML="भूतवत्"
    }
    console.log(result.innerHTML)
}

console.log(pratyay,dhatu)


