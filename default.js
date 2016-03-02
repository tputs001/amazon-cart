var addedItems = [];

// Event Listeners
var searchButton = document.getElementById("search-button");
searchButton.addEventListener('click', function(e){
  var itemSearched = document.getElementById("input-search").value.toLowerCase();
  search(itemSearched)
  display("items")
  hide("title-container")
  e.preventDefault()
})

var searchInput2 = document.getElementById("input-search2");
searchInput2.addEventListener('keypress', function(e){
  if(e.keyCode == 13){
    search(this.value)
    e.preventDefault()
  }
})

//Checkout Event Listeners
var checkOut = document.getElementById("checkout");
checkOut.addEventListener('click', function(e){
  hide("items")
  display("payment-container")
  console.log(addedItems);
  var sub_total = 0;
  for(var i = 0; i < addedItems.length; i++){
    for(var j = 0; j < data.length; j++){
      if (addedItems[i] == data[j].id){
        var prop = data[j]
        var productName = prop.name
        var highlights = prop.highlights
        var description = prop.description
        var id = prop.id
        var image = prop.image
        sub_total += prop.price;
        createItems(productName, highlights, description, id, image, "cart")
      }
    }
  }
  updateTotal(sub_total)
  e.preventDefault();
})

//Form Submission Listener
var formSubmission = document.getElementById("formSubmit");
formSubmission.addEventListener('click', function(e){
  formData()
  alert("Form Submitted!")
  e.preventDefault()
})

//FUNCTIONS

var hide = function(id){
  var element = document.getElementById(id);
  element.className = "hidden"
}

var display = function(id){
  var element = document.getElementById(id);
  element.classList.remove("hidden")
}

//Loops through the form elements creating an object of data to be sent off and processed
var formData = function(){
  form = document.getElementById("creditCard")
  var dataObject = {}
  var elements = form.elements
  for(var i = 0; i<elements.length; i++){
    dataObject[elements[i].id] = elements[i].value;
  }
  console.log(dataObject);
  return dataObject
}
//Formatting for the numbers -- Adding commas
var formatting = function(number){
  var numToString = number.toString();
  if(numToString >= 1000){
    var formatted = '$' + numToString.charAt(0) + ',' + numToString.slice(1, numToString.length);
  } else {
    var formatted = '$' + numToString
  }
  return formatted
}

//Total price summed from within the cart
var updateTotal = function(sub_total){
  var subtotalSpan = document.getElementById("subtotal");
  var taxSpan = document.getElementById("tax");
  var shippingSpan = document.getElementById("shipping");
  var totalSpan = document.getElementById("total_sum");

  var tax = (sub_total * 0.08)
  var shipping = 25.00
  var total = (sub_total + tax + shipping)
  subtotalSpan.innerHTML = formatting(sub_total.toFixed(2));
  taxSpan.innerHTML = formatting(tax.toFixed(2));
  shippingSpan.innerHTML = formatting(shipping);
  totalSpan.innerHTML = formatting(total.toFixed(2));
}

//addEventListeners dynamically to each a tags generated by a search.
var addEvent = function(id){
  var elementId = document.getElementById(id);
  var addedCount = document.getElementById("number");
  elementId.addEventListener('click', function(e){
    addedItems.push(id);
    alert("Added to cart!")
    addedCount.innerHTML = addedItems.length;
    e.preventDefault();
  })
}

//search the data object based on the input value of the user
var search = function(item){
  for(var i = 0; i<data.length; i++){
    if(data[i].keyword == item){
      console.log("found!");
      var prop = data[i]
      var productName = prop.name
      var highlights = prop.highlights
      var description = prop.description
      var id = prop.id
      var image = prop.image
      createItems(productName, highlights, description, id, image, "display-container")
      addEvent(id);
    }
  }
}

//create several divs and columns that will append in the item container values from the data object.
var createItems = function(name, highlights, description, id ,image, elementContainer){
  var d = document
  var frag = d.createDocumentFragment();
  var rowDiv = d.createElement("div")
    , colDiv1 = d.createElement("div")
    , colDiv2 = d.createElement("div")
    , colText = d.createTextNode(name)
    , list = d.createElement("li")
    , listText = d.createTextNode(description)
    , colText2 = d.createTextNode(highlights)
    , innerContainer = d.getElementById(elementContainer);

  var rowDiv2 = d.createElement("div")
    , colDiv3 = d.createElement("div")
    , colDiv4 = d.createElement("div")
    , imgElement = d.createElement("img")
    , aLink = d.createElement("a")
    , aLinkText = d.createTextNode("Add Cart")
    , colDiv4 = d.createElement("div");

  var listFunction = function(array){
    for(i=0; i<array.length; i++){
      var list = d.createElement("li")
      var listText = d.createTextNode(array[i])
      list.appendChild(listText)
      colDiv4.appendChild(list)
    }
  }

    rowDiv.className = "row"
    colDiv1.className ="col-md-2 col-md-offset-1 padding-left"
    colDiv2.className = "col-md-4"

    colDiv1.appendChild(colText)
    colDiv2.appendChild(colText2)
    rowDiv.appendChild(colDiv1)
    rowDiv.appendChild(colDiv2)

    frag.appendChild(rowDiv)

    rowDiv2.className = "row"
    colDiv3.className = "col-md-1 col-md-offset-1 item-picture"
    colDiv4.className = "col-md-8 col-md-offset-1"
    colDiv3.appendChild(imgElement);
    imgElement.src = image

    if(elementContainer == "cart"){
      console.log("Not adding in the ADD LINK")
    } else {
      aLink.className = "padding-left"
      aLink.id = id
      aLink.href = "/";
      aLink.appendChild(aLinkText);
      colDiv3.appendChild(aLink);
    }

    listFunction(description);
    rowDiv2.appendChild(colDiv3);
    rowDiv2.appendChild(colDiv4);

    frag.appendChild(rowDiv2);

    innerContainer.appendChild(frag)
}
