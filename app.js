var storedvalue;
if (typeof(Storage !== "undefined")) {
	if (localStorage.getItem("original")) {
		storedvalue = localStorage.getItem("original");
	    original.value = storedvalue;
	}
} else {
	alert("Your Browser does not support the web storage APIs");
}

function storeValue() {
    var newname = document.getElementById("original").value;

    if (localStorage.getItem("original")) {
        var storedvalue = localStorage.getItem("original");

        if (confirm("Your value is already stored as " + 
                    storedvalue + 
                    ". Are you sure you want to change it to " + 
                    newvalue + "?")) {
            localStorage.setItem("original", newvalue);
            alert("Your value was updated, reload the page to get it done!");
        } else {
            alert("OK, I'll keep calling you " + storedvalue);
        }

    } else {
        localStorage.setItem("original", newvalue);
        alert("Your value has been stored as: " + 
              newvalue + 
              ". Reload the page to get it done!");
    }
}


function clearLocalStorage() {
    window.localStorage.removeItem("original");
    alert("reload the page");
}
