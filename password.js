function isStrongPassword(password){

    let isValidLength = password.length >= 12;

    let hasUppercase = !!password.match(/[A-Z]/);

    let hasLowerCase = !!password.match(/[a-z]/);

    let hasNumber = !!password.match(/[0-9]/);
    
    let hasSpecialCharacter = !!password.match(/[!@#$%^&*()_+{}[\]|/<>?]/);

    let doesNotContainPassword = !password.toLowerCase().includes("password");

    let isValidPassword = 
        isValidLength &&
        hasUppercase &&
        hasLowerCase &&
        hasNumber &&
        hasSpecialCharacter &&
        doesNotContainPassword

    if(isValidPassword){
        console.log("Strong Password");
    }else{
        console.log("Weak Password");
    }

    return isValidPassword;
    
}

let password = prompt("Enter a password.")

isStrongPassword(password);