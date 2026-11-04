function validateSearch() {
    const errors = [];

    const carType = document.getElementById("Car Type").value;
    const todaysDate = new Date();
    
    const pickupDate = document.getElementById("Pickup Date").value;
    const pickupDateAsDate = new Date(pickupDate);

    const returnDate = document.getElementById("Return Date").value;
    const returnDateAsDate = new Date(returnDate);

    // All fields have values.
    if(!carType){
        errors.push("Must select a car type.");
    }
    if(!pickupDate){
        errors.push("Must select a pickup date.");
    }
    if(!returnDate){
        errors.push("Must select a return date.");
    }

    // The pickup date is in the future.
    if(pickupDateAsDate < todaysDate){
        errors.push("Pickup date must be in the future.");
    }

    // The return date is after the pickup date.
    if(returnDateAsDate <= pickupDateAsDate){
        errors.push("Return date must be AFTER pickup date.");
    }

    // Return error messages as an array.
    // Returns empty if no errors are detected anyways
    return(errors);
}

const searchButton = document.getElementById("submitButton");

searchButton.addEventListener("click", function(event){
    // This will remove our old error list items from our webpage
    carForm.querySelector(".errors")?.remove();
    const errors = validateSearch();

    if(errors.length > 0){
        // Prevent the form from submitting
        event.preventDefault();

        // Create out error list element
        const errorList = document.createElement("ul");
        errorList.className = "errors";

        // Create our list items for each error
        errors.forEach(function (error){
            const listItem = document.createElement("li");
            listItem.textContent = error;
            errorList.appendChild(listItem);
        });

        // Make sure we append to the dom so our changes are visible
        document.getElementById("carForm").appendChild(errorList);
    }
});