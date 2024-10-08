document.getElementById("showForm").addEventListener("click", function() {
    document.getElementById("div1").classList.remove("hidden");
    document.getElementById("div2").classList.remove("hidden");
});
document.getElementById("hideForm").addEventListener("click", function() {
    document.getElementById("div1").classList.add("hidden");
    document.getElementById("div2").classList.add("hidden");
});

function openOverlay() {
    document.getElementById('overlay').classList.add('active');
}

function closeOverlay() {
    document.getElementById('overlay').classList.remove('active');
}

function showDate() {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const today = new Date();
    const dayName = days[today.getDay()];
    const monthName = months[today.getMonth()];
    const date = today.getDate();
    document.getElementById('date').textContent =`${dayName}, ${monthName} ${date}`;
}

function swap(){
    var fromInput = document.getElementById('from');
    var toInput = document.getElementById('to');
    var temp = fromInput.value;
    fromInput.value = toInput.value;
    toInput.value = temp;
}

function filter() {
    var type = document.getElementById('normal');
    var noTrips= document.getElementById('noTripDiv');
    var card=document.getElementById('resultCard');
    if (!type.checked) {
        showDate();
        document.getElementById('resultCount').textContent = '0 result';
        noTrips.style.display = 'block';
        card.style.opacity='0';
    } else {
        document.getElementById('resultCount').textContent = '1 result';
        noTrips.style.display = 'none';
        card.style.opacity='1';
    }
}

function search() {
    var resultsDiv = document.getElementById('searchResults');
    var noTrips = document.getElementById('noTripDiv');
    var loadDiv = document.getElementById('intitalDiv');
    const userInput1 = document.getElementById('from').value.trim();
    const userInput2 = document.getElementById('to').value.trim();
    var card = document.getElementById('resultCard');
    if(userInput1=="" || userInput2==""){
        document.getElementById('intitalDiv').style.display = 'flex';
        card.style.opacity = '0';
        resultsDiv.style.opacity = '0'; 
    }
    else{
        fetch(`../Services/getPrice.php?start_location=${userInput1}&end_location=${userInput2}`)
        .then(response => response.text())
        .then(price => {
            if (price!='0') {
                document.getElementById('start').textContent = userInput1;
                document.getElementById('end').textContent = userInput2;
                document.getElementById('bus_infoCount').textContent = document.getElementById('counter').innerText;
                let counterValue = parseInt(document.getElementById('counter').innerText, 10);
                document.getElementById('intitalDiv').style.display = 'none';
                noTrips.style.display = 'none';
                card.style.opacity = '1';

                if (document.getElementById('counter').innerText == 1) {
                    document.getElementById('bus_infoText').textContent = 'person';
                } else {
                    document.getElementById('bus_infoText').textContent = 'persons';
                }

                resultsDiv.style.opacity = '1'; 
                document.getElementById('showTicketPrice').textContent=(price*counterValue);
            } else {
                document.getElementById('resultCount').textContent = '0 result';
                noTrips.style.display = 'block';
                showDate();
                resultsDiv.style.opacity = '1';
                card.style.opacity = '0';
                loadDiv.style.opacity = '0';
            }
        })
    }    
}

function popular1() {
    const var1 = 'Colombo Fort';
    const var2 = 'Anuradhapura New Bus Stand';
    window.location.href = `../Pages/pricechecker.php?clicked=true&var1=${var1}&var2=${var2}`;
}

function popular2() {
    const var1 = 'Colombo Fort';
    const var2 = 'Galle';
    window.location.href = `../Pages/pricechecker.php?clicked=true&var1=${var1}&var2=${var2}`;
}

function popular3() {
    const var1 = 'Colombo Fort';
    const var2 = 'Kandy';
    window.location.href = `../Pages/pricechecker.php?clicked=true&var1=${var1}&var2=${var2}`;
}

function popular4() {
    const var1 = 'Colombo Fort';
    const var2 = 'Hatton';
    window.location.href = `../Pages/pricechecker.php?clicked=true&var1=${var1}&var2=${var2}`;
}

function popular5() {
    const var1 = 'Colombo Fort';
    const var2 = 'Jaffna';
    window.location.href = `../Pages/pricechecker.php?clicked=true&var1=${var1}&var2=${var2}`;
}

function popular6() {
    const var1 = 'Colombo Fort';
    const var2 = 'Mannar';
    window.location.href = `../Pages/pricechecker.php?clicked=true&var1=${var1}&var2=${var2}`;
}

function removeAlert() {
    var div = document.getElementById('alertBar');
    div.style.display = 'none'; 
}

function submitForm(event){
    event.preventDefault();

    var name=document.getElementById('name').value;
    var email=document.getElementById('email').value;
    var message=document.getElementById('message').value;

    validity=true;

    document.getElementById('empty-name').style.display="none";
    document.getElementById('empty-email').style.display="none";
    document.getElementById('empty-message').style.display="none";
    document.getElementById('invalid-name').style.display="none";
    document.getElementById('invalid-email').style.display="none";
    document.getElementById('name').style.border="#20415b solid 1px";
    document.getElementById('email').style.border="#20415b solid 1px";
    document.getElementById('message').style.border="#20415b solid 1px";

    if(email==""){
        document.getElementById('empty-email').style.display="block";
        document.getElementById('email').style.border="red solid 1px";
        validity=false;
    }else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
        document.getElementById('invalid-email').style.display="block";
        document.getElementById('email').style.border="red solid 1px";
        validity=false;
    }
    if(name==""){
        document.getElementById('empty-name').style.display="block";
        document.getElementById('name').style.border="red solid 1px";
        validity=false;
    }else if(!/^[A-Za-z\s]+$/.test(name)){
        document.getElementById('invalid-name').style.display="block";
        document.getElementById('name').style.border="red solid 1px";
        validity=false;     
    }
    if(message==""){
        document.getElementById('empty-message').style.display="block";
        document.getElementById('message').style.border="red solid 1px";
        validity=false;
    }
    if (validity) {
        let formData = new FormData(document.querySelector('form'));
        fetch('contact.php', {
            method: 'POST',
            body: formData
        });
        document.getElementById('submitStatus').style.display = 'block';
        setTimeout(() => {
            window.location.reload();
        }, 600);
    }
}

