const carArray = [
    {   
        type: "hatchback", 
        name: "Ford Fiesta ST", 
        description: "A nimble, front-wheel-drive pocket rocket loved for its sharp handling and turbocharged engine.", 
        year: 2013, 
        image: "images/car_1.jpg"
    },
    {
        type: "sportsCoupe", 
        name: "Porsche 911", 
        description: "A benchmark rear-engine sports car combining daily usability with track-ready performance.", 
        year: 2011, 
        image: "images/car_2.jpg"
    },
    {
        type: "grandTouringCoupe", 
        name: "Maserati GranTurismo", 
        description: "An elegant grand tourer famous for its gorgeous Italian styling and a Ferrari-developed V8 exhaust note.", 
        year: 2007, 
        image: "images/car_3.jpg"
    },
    {
        type: "suv", 
        name: "Volvo XC90 R-Design", 
        description: "A premium three-row family SUV focusing on top-tier safety technology and minimalist Scandinavian design.", 
        year: 2015, 
        image: "images/car_4.jpg"
    },
    {
        type: "coupe", 
        name: "Mercedes-Benz C-Class Coupe", 
        description: "A sleek and sophisticated luxury sports coupe blending elegant styling, a premium high-tech cabin, and a smooth, balanced ride.", 
        year: 2016, 
        image: "images/car_5.jpg"
    },
    {
        type: "coupe", 
        name: "BMW 4 Series Coupe", 
        description: "A sharp-looking, premium compact executive coupe that delivers a refined driving experience, generous cargo space, and a tech-focused cabin.", 
        year: 2014, 
        image: "images/car_6.jpg"
    },
    {
        type: "sportsCoupe", 
        name: "BMW M4 Coupe", 
        description: "A powerful twin-turbo luxury sports coupe that balances everyday comfort with high-speed highway cruising.", 
        year: 2014, 
        image: "images/car_7.jpg"
    },
    {
        type: "coupe", 
        name: "Audi A5 Coupe", 
        description: "A beautifully understated German luxury coupe featuring a modern minimalist interior, standard Quattro all-wheel drive, and crisp, elegant body lines.", 
        year: 2017, 
        image: "images/missingImage.png"
    },
    {
        type: "grandTouringCoupe", 
        name: "Lexus LC 500", 
        description: "A striking Japanese luxury flagship grand tourer known for its futuristic concept-car styling, meticulous interior craftsmanship, and a roaring, reliable naturally aspirated V8 engine.", 
        year: 2018, 
        image: "images/missingImage.png"
    },
    {
        type: "sportsCoupe", 
        name: "Chevrolet Corvette Stingray", 
        description: "A revolutionary mid-engine American sports car that offers supercar-level performance, aggressive aerodynamics, and daily-drivable comfort at a competitive price point.", 
        year: 2020, 
        image: "images/missingImage.png"
    }
];


// Note: Match the style of the featured cars list on index.html.
function displayCars(carsArray) {
    const carList = document.getElementById("carList");
    carList.textContent = "";

    carsArray.forEach(car => {
        // Start off with creating our card blueprint
        const card = document.createElement("div");
        card.classList.add("card");

        // for testing purposes, remove when you include missing image picture
        if (car.image) {
            const picture = document.createElement("picture");

            const image = document.createElement("img");
            image.src = car.image;
            image.alt = car.name;

            // Remember to append to see the changes
            picture.appendChild(image);

            card.appendChild(picture);
        }

        // For padding from our main card class styling
        const cardText = document.createElement("div");
        cardText.classList.add("card-text");

        // Car name
        const heading = document.createElement("h3");
        heading.textContent = car.name;

        // Car description
        const description = document.createElement("p");
        description.textContent = `${car.year} — ${car.description}`;

        cardText.appendChild(heading);
        cardText.appendChild(description);
        card.appendChild(cardText);
        carList.appendChild(card);
    });
}

// Add a function named listCars that performs the following:
    // Reads the current querysting parameters and gets the type value (see the sample code below).
    // If a type parameter is present, filter the array of car objects by type and pass the new array to the displayCars function.
    // If no type parameter is present, pass the unfiltered array of car objects to the displayCars function.

const params = new URLSearchParams(window.location.search);

function listCars(){

    if(params.has("Car Type")){
        const type = params.get("Car Type");
        // filter the cars array by type and call displayCars with the new array
        const filteredCars = carArray.filter(car => {
            return car.type.toLowerCase() === type.toLowerCase();
        })
        displayCars(filteredCars);
    }else{
        // call displayCars with the unfiltered cars array
        displayCars(carArray);
    }
}

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

// Wrap this in a check to see if the button exists
// If not, this will break cars.html loading
if(searchButton){
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
}

