var displayId = document.getElementById("display-container")
var searchButton = document.getElementById("search-button")
var searchInput2 = document.getElementById("input-search2")
var checkOut = document.getElementById("checkout")
var deleteItem = document.getElementById("cart")
var formSubmission = document.getElementById("formSubmit")
var back = document.getElementById("back")
var back2 = document.getElementById("back2")
var home = document.getElementById("home")
var reviewSubmit = document.getElementById("reviewSubmit")
var review = document.getElementById("reviewText")
// var review = document.getElementById("review")
var addedObjects = []

// EVENT LISTENERS
searchButton.addEventListener('click', function(e){
  var itemSearched = document.getElementById("input-search").value.toLowerCase();
  clearDom(displayId)
  searchItem(itemSearched)
  toggleDisplay("items")
  reviewListener()
  e.preventDefault()
})

searchInput2.addEventListener('keypress', function(e){
  if(e.keyCode == 13){
    clearDom(displayId)
    searchItem(this.value)
    reviewListener()
    e.preventDefault()
  }
})

checkOut.addEventListener('click', function(e){
  clearDom(deleteItem)
  itemsInCart("cart");
  toggleDisplay("payment-container")
  e.preventDefault();
})

formSubmission.addEventListener('click', function(e){
  formData()
  e.preventDefault()
})

back.addEventListener('click', function(e){
  toggleDisplay("title")
  e.preventDefault()
})

back2.addEventListener('click', function(e){
  toggleDisplay("items")
  e.preventDefault()
})

var appendModal = function(rowClass, colClass, col2Class, itemRating, itemReview){
  var modalBody = document.getElementById("modalContainer")
  var modalContainer = document.createElement("div")
  var modalStar = document.createElement("div")
  var modalReview = document.createElement("div")
  var starText = document.createTextNode(itemRating)
  var reviewText = document.createTextNode(itemReview)
  var hr = document.createElement("hr")

  var fullStars = itemRating
  for(var i = 0; i < 5; i++){
    var element = document.createElement("i")
    if(fullStars > 0){
      element.className = "fa fa-star fa-2x stars"
      fullStars -= 1;
    } else {
      element.className = "fa fa-star-o fa-2x stars"
    }
    modalStar.appendChild(element)
  }

  modalContainer.className = rowClass
  modalStar.className = colClass
  modalReview.className = col2Class
  modalReview.appendChild(reviewText)
  modalContainer.appendChild(modalStar)
  modalContainer.appendChild(modalReview)
  modalBody.appendChild(modalContainer)
  modalBody.appendChild(hr)
}

var reviewListener = function(){
  var reviewClass = document.getElementsByClassName("divLink")
  for(var i = 0; i<reviewClass.length; i++){
    reviewClass[i].addEventListener('click', function(e){
      clearDom(modalContainer)
      var index = ((e.target.id.length - 6) * -1)
      var clickType = e.target.id.slice(e.target.id, 6)
      var clickName = e.target.id.slice(index)
      console.log(clickType)
      if(clickType == "review"){
        data.forEach(function(items){
          if(items.id == clickName){
            items["review"].forEach(function(review){
              appendModal("row","col-md-4", "col-md-8", review.rating, review.review)
            })
          }
        })
      } else if (clickType == "create"){
        console.log(clickName)
        var reviewObject = {}
        var dataFunction = function(event){
          data.forEach(function(items){
            if(items.id == clickName){
              reviewObject = {rating: 5, review: review.value}
              items.review.push(reviewObject)
              reviewObject = {}
              review.value = ""
            }
          })
          reviewSubmit.removeEventListener('click', dataFunction, false)
        }
        reviewSubmit.addEventListener('click', dataFunction, false)
      }
    })
  }
}
var ratings = function(col, rating, id){
  var divRating = document.createElement("div")
  divRating.id = id
  var fullStars = rating
  for(var i = 0; i < 5; i++){
    var element = document.createElement("i")
    if(fullStars > 0){
      element.className = "fa fa-star fa-2x stars"
      fullStars -= 1;
    } else {
      element.className = "fa fa-star-o fa-2x stars"
    }
    divRating.appendChild(element)
  }
  col.appendChild(divRating)
}

//FUNCTIONS
//MAIN TITLE CONTAINER PAGE
//Search the data object based on the input value of the user
var searchItem = function(item){
  for(var i = 0; i<data.length; i++){
    if((data[i].category).indexOf(item) !== -1 || data[i].keyword == item){
      var prop = data[i]
      var name = prop.name
      var highlights = prop.highlights
      var description = prop.description
      var id = prop.id
      var image = prop.image
      var price = prop.price
      var stars = prop.stars
      createItems(name, highlights, description, id, image, price, "display-container", stars)
      addCart(id)
    }
  }
}

//ITEM DESCRIPTION PAGE
//Create several divs and columns that will append in the item container values from the data object.
var createItems = function(name, highlights, description, id ,image, price, elementContainer, stars, quantity){
  var d = document
    , rowDiv = d.createElement("div")
    , colDiv1 = d.createElement("div")
    , colDiv2 = d.createElement("div")
    , hr = d.createElement("hr")
    , strong = d.createElement("strong")
    , colText = d.createTextNode(name)
    , colText2 = d.createTextNode(highlights)
    , colText3 = d.createTextNode("$" + price + "   -   ")
    , colText4 = d.createTextNode("**********")
    , innerContainer = d.getElementById(elementContainer)
    , columnClass = "col-md-8 col-md-offset-1"
    , imgClass = "col-md-2 align-center box-size"
    , rowClass = "row"
  var list = function(array){
    for(i=0; i<array.length; i++){
      var list = d.createElement("li")
      var space = d.createElement("br")
      var listText = d.createTextNode(array[i])
      list.appendChild(listText)
      colDiv2.appendChild(list)
    }
    colDiv2.appendChild(space)
  }
  var append = function(row, col, rowClass, colClass, colText){
    row.className = rowClass
    col.className = colClass
    col.appendChild(colText)
    row.appendChild(col)
  }
  var select = function(value, colDiv){
    var select = d.createElement("select")
    for(var i = 1; i<= value; i++){
      var optionName = "option" + i
      var optionName = d.createElement("option")
      optionName.value = i
      select.className = "quantity"
      optionName.appendChild(d.createTextNode(i))
      select.appendChild(optionName)
      colDiv.appendChild(select)
    }
  }
  var links = function(text, id, className, href, col, modal, modalId){
    var element = d.createElement("a")
    var linkText = d.createTextNode(text)
    var divContainer = d.createElement("div")
    divContainer.className = className
    element.id = id
    element.href = "#"
    if(modal != undefined){
      var dataAttr = document.createAttribute("data-toggle")
      var dataAttr1 = document.createAttribute("data-target")
      dataAttr.value = modal
      dataAttr1.value = modalId
      element.setAttributeNode(dataAttr)
      element.setAttributeNode(dataAttr1)
    }
    element.appendChild(linkText)
    divContainer.appendChild(element)
    col.appendChild(divContainer)
  }
  var img = function(image, col, id){
    var element = d.createElement("img")
    col.appendChild(element)
    element.src = image
    element.className = "img-responsive img-test"
    if(elementContainer == "display-container"){
      links("Add Cart", id, "divLink", '#', col)
      select(9, col)

    } else {
      var deleteId = (id + "delete")
      links("Delete", deleteId, "divLink", "#", col)
      select(quantity, col)
    }
  }
  var review = function(id) {
    var reviewId = "review" + id
    var writeId = "create" + id
    links("Read a review", reviewId, "divLink", "#", colDiv2, "modal", "#myModal")
    links("Write a review", writeId, "divLink", "#", colDiv2, "modal", "#writeModal")
  }

  strong.appendChild(colText3)
  append(rowDiv, colDiv1, rowClass, imgClass, colText)
  append(rowDiv, colDiv2, rowClass, columnClass, strong)
  append(rowDiv, colDiv2, rowClass, columnClass, colText2)
  img(image, colDiv1, id)
  list(description)
  ratings(colDiv1, stars, "starContainer")
  review(id)
  innerContainer.appendChild(rowDiv)
  innerContainer.appendChild(hr)
}

//AddEventListeners dynamically to each <a> tags generated by a search.
var addCart = function(id){
  var elementId = document.getElementById(id)
  var addedCount = document.getElementById("number")
  var itemObject = {}
  elementId.addEventListener('click', function(e){
    itemObject = {
      id: id,
      quantity: parseInt(e.target.offsetParent.childNodes[3].value)
    }
    if(addedObjects.length == 0){
      addedObjects.push(itemObject)
      console.log("added first item")
    } else if(valueCheck(addedObjects, id)){
      addedObjects.forEach(function(items){
        if(items.id == id){
          items.quantity += itemObject.quantity
          console.log("updated quantity")
          return;
        }
      })
    } else {
      addedObjects.push(itemObject)
      console.log("no item found, pushed new data")
    }
    console.log(addedObjects)
    addedCount.innerHTML = objectAddProperty(addedObjects, "quantity")
    e.preventDefault()
  })
}

//PAYMENT-CONTAINER PAGE
//checks items added to the cart
var itemsInCart = function(id_target){
  var sub_total = 0;
  for(var i = 0; i < addedObjects.length; i++){
    for(var j = 0; j < data.length; j++){
      if (addedObjects[i].id == data[j].id){
        var prop = data[j]
        var name = prop.name
        var highlights = prop.highlights
        var description = prop.description
        var id = prop.id
        var image = prop.image
        var price = prop.price
        var stars = prop.stars
        sub_total += (price * addedObjects[i].quantity)
        createItems(name, highlights, description, id, image, price, id_target, stars, addedObjects[i].quantity)
        deleteEvent(id + 'delete')
      }
    }
  }
  updateTotal(sub_total)
}

//addDelete Event Listener to each delete link elements.
var deleteEvent = function(id){
  var elementId = document.getElementById(id);
  elementId.addEventListener('click', function(e){
    if(e.target.nodeName == "A"){
      var id = e.target.id
      var itemToRemove = id.slice(0, (id.length - 6))
      removeItem(e, id, itemToRemove)
    }
    clearDom(deleteItem)
    itemsInCart("cart")
  })
}

//Remove items from the cart
var removeItem = function(e, id, itemToRemove){
  addedObjects.forEach(function(items){
    if(items.id == itemToRemove){
      if(items.quantity == e.target.nextSibling.value){
          var objectPosition = objectIndexOf(addedObjects, itemToRemove, "id")
          addedObjects.splice(objectPosition, 1)
      } else {
        items.quantity -= e.target.nextSibling.value
      }
    }
  })
  console.log(addedObjects)
}

//Loops through the form elements creating an object of data to be sent off and processed
var formData = function(){
  form = document.getElementById("creditCard")
  var dataObject = {}
  var elements = form.elements
  for(var i = 0; i<elements.length; i++){
    dataObject[elements[i].id] = elements[i].value;
  }
  return dataObject
}

//Total price summed from within the cart
var updateTotal = function(sub_total){
  var subtotalSpan = document.getElementById("subtotal")
  var taxSpan = document.getElementById("tax")
  var shippingSpan = document.getElementById("shipping")
  var totalSpan = document.getElementById("total_sum")

  var tax = (sub_total * 0.08)
  var shipping = 25.00
  var total = (sub_total + tax + shipping)
  subtotalSpan.innerHTML = formatting(sub_total.toFixed(2))
  taxSpan.innerHTML = formatting(tax.toFixed(2))
  shippingSpan.innerHTML = formatting(shipping)
  totalSpan.innerHTML = formatting(total.toFixed(2))
}

//UTILITY FUNCTIONS

//Clear all childNodes as a new search is entered.
var clearDom = function(clearId){
  while(clearId.hasChildNodes()){
    clearId.removeChild(clearId.lastChild)
  }
}

//Formatting for the numbers by adding commas
var formatting = function(number){
  var numToString = number.toString();
  var formatted = numToString >= 1000 ? '$' + numToString.charAt(0) + ',' + numToString.slice(1, numToString.length) : '$' + numToString
  return formatted
}

//Function for indexOf Objects
var objectIndexOf = function(objectArray, id, property){
  for(var i = 0; i < objectArray.length; i++){
    if(objectArray[i][property] == id){
      return i
    }
  }
  return -1
}

//Sums up the total value of the specified object value
var objectAddProperty = function(objectArray, property){
  var sum = 0
  for(var i = 0; i < objectArray.length; i++){
    sum += parseInt(objectArray[i][property])
  }
  return sum
}

//Function to determine if a class exists within an element classList.
var classExist  = function(array, name){
  for(var i = 0; i<array.length; i++){
    if(array[i] == name){
      return true
    }
  }
  return false
}

//Function to addClass hidden onto the main containers elements
var addClass = function(array, name){
  if(classExist(array, name)){
    return "container hidden"
  } else {
    var string = name + ' '
    for(var i=0; i<array.length; i++){
      string += array[i]
    }
    return string
  }
}

//To toggle between states for which page the user is currently on.
var toggleDisplay = function(state){
  var containers = document.getElementsByClassName("container")
  var titleClasses = containers[0]
  var itemClasses = containers[1]
  var paymentClasses = containers[2]

  if(state == "title"){
    itemClasses.className = addClass(itemClasses.classList, "hidden")
    paymentClasses.className = addClass(paymentClasses.classList, "hidden")
    titleClasses.classList.remove("hidden")
  } else if(state == "items"){
    titleClasses.className = addClass(titleClasses.classList, "hidden")
    paymentClasses.className = addClass(paymentClasses.classList, "hidden")
    itemClasses.classList.remove("hidden")
  } else {
    titleClasses.className = addClass(titleClasses.classList, "hidden")
    itemClasses.className = addClass(itemClasses.classList, "hidden")
    paymentClasses.classList.remove("hidden")
  }
}

//Checks to see if a value exists
var valueCheck = function(object, id){
  var status = false;
  object.forEach(function(items){
    if(items.id === id){
      status = true
    }
  })
  return status
}
