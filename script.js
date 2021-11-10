let red_slider = document.querySelector("#red-slider");
let green_slider = document.querySelector("#green-slider"); 
let blue_slider = document.querySelector("#blue-slider");
let opacity_slider = document.querySelector("#opacity-slider")
let window_1 = document.querySelector(".window-1");

// change color of bars and text
red_slider.addEventListener("input", changeRed);
green_slider.addEventListener("input", changeGreen);
blue_slider.addEventListener("input", changeBlue);
opacity_slider.addEventListener("input", changeOpacity);

// change color for circle and background
red_slider.addEventListener("input", changeColor);
green_slider.addEventListener("input", changeColor);
blue_slider.addEventListener("input", changeColor);
opacity_slider.addEventListener("input", changeColor);

let color_storage = [];

// add a color
document.querySelector(".save-color-button").addEventListener("click", addColor);

// reveal/hide the color storage
document.querySelector(".click-to-reveal").addEventListener("click", toggleStorage);

//remove a color container on click, use non specific event listener since element has not been created
document.addEventListener("click", removeColor);

function toggleStorage() {
    let storage = document.querySelector(".store-color-container");
    if (storage.style.display === `none` ) {
        storage.style.display = `block`;
        document.querySelector(".click-to-reveal p").innerHTML = `Hide Stored Colors`
        document.querySelector(".slider-container").style.margin = `50px 50px auto auto`;
    }
    else {
        storage.style.display = `none`;
        document.querySelector(".click-to-reveal p").innerHTML = `Reveal Stored Colors`
        document.querySelector(".slider-container").style.margin = `50px auto`;
    }
}

function addColor() {
    let red = red_slider.value;
    let green = green_slider.value;
    let blue = blue_slider.value;
    let opacity = opacity_slider.value;

    let rgba_val = `rgba(${red}, ${green}, ${blue}, ${opacity})`;

    if (!color_storage.includes(rgba_val)) {
        color_storage.push(rgba_val);
        addSavedColorClass();
    }
    else {
        alert("Duplicate color found, color not stored.");
    }
    
}

function removeColor(event) {
    let element = event.target;
    if (element.classList.contains("remove-icon") && element.src !== "" ) {
        let p_of_p = document.getElementById(`${element.id}`).parentElement.parentElement;
        let parent = document.getElementById(`${element.id}`).parentElement
        let index = parseInt(element.id);
        removeFromArray(color_storage, index);
        p_of_p.removeChild(parent);
        updateColorList();
    }
}

function addSavedColorClass() {
    let container = document.createElement("div");
    let color_icon = document.createElement("div");
    let para = document.createElement("p");
    let remove_icon = document.createElement("img"); 


    container.append(color_icon, para, remove_icon);
    container.classList.add("selected-colors"); //container styles
    color_icon.classList.add("color-icon"); //color_icons styles
    para.classList.add("color-style"); //para styles
    remove_icon.classList.add("remove-icon"); //remove-icon styles
    remove_icon.setAttribute("id", `${color_storage.length - 1}`); //id specific to the index in the array

    color_icon.style.backgroundColor = `${color_storage[color_storage.length - 1]}`; //set the color icon color to the respective chosen color

    remove_icon.src = `./images/delete-button.svg`;

    para.innerHTML = `${color_storage[color_storage.length - 1]}`;
    document.querySelector(".store-color-container").appendChild(container);
}

function removeFromArray(array, index) {
    array.splice(index, 1);
}

// update the id index
function updateColorList() {
    let index = 0
    document.querySelectorAll(".remove-icon").forEach(function(element) {
        element.id = `${index}`;
        ++index;
    });
    
    console.log(color_storage);
}

function changeColor() {
    let red = red_slider.value;
    let green = green_slider.value;
    let blue = blue_slider.value;
    let opacity = opacity_slider.value;
    window_1.style.backgroundColor = `rgba(${red}, ${green}, ${blue}, ${opacity})`;
    document.body.style.backgroundColor = `rgba(${red}, ${green}, ${blue}, ${opacity})`;
}


function changeRed() {
    red_slider_val = document.getElementById("red-slider-val");
    red_slider_val.innerHTML = red_slider.value;
    red_slider_val.style.color = `rgba(${red_slider.value}, 0, 0, 1)`;
    red_slider.style.backgroundColor = `rgba(${red_slider.value}, 0, 0, 1)`;

    red_name = document.getElementById("red-name")
    red_name.style.color = `rgba(${red_slider.value}, 0, 0, 1)`;
}

function changeGreen() {
    green_slider_val = document.querySelector("#green-slider-val");
    green_slider_val.innerHTML = green_slider.value;
    green_slider_val.style.color = `rgba(0, ${green_slider.value}, 0, 1)`;
    green_slider.style.backgroundColor = `rgba(0, ${green_slider.value}, 0, 1)`;

    green_name = document.querySelector("#green-name")
    green_name.style.color = `rgba(0, ${green_slider.value}, 0, 1)`;
}

function changeBlue() {
    blue_slider_val = document.querySelector("#blue-slider-val");
    blue_slider_val.innerHTML = blue_slider.value;
    blue_slider_val.style.color = `rgba(0, 0, ${blue_slider.value}, 1)`;
    blue_slider.style.backgroundColor = `rgba(0, 0, ${blue_slider.value}, 1)`;

    blue_name = document.querySelector("#blue-name")
    blue_name.style.color = `rgba(0, 0, ${blue_slider.value}, 1)`;
}

function changeOpacity() {
   opacity_slider_val = document.querySelector("#opacity-slider-val");
   opacity_slider_val.innerHTML = opacity_slider.value;
   opacity_slider_val.style.color = `rgba(0, 0, 0, ${opacity_slider.value})`;
   opacity_slider.style.backgroundColor = `rgba(0, 0, 0, ${opacity_slider.value})`;

   opacity_name = document.querySelector("#opacity-name");
   opacity_name.style.color = `rgba(0, 0, 0, ${opacity_slider.value})`;
}