  //Global Scope :(
var displayId = document.getElementById("display-box")
var deleteItem = document.getElementById("cart")
var addedObjects = []
var itemsFound = [];
var tempVar;

// EVENT DELEGATION
document.body.addEventListener('click', function(e){
  var target = e.target
  console.log(e)
  if(target.id == "searchClick" ){ mainSearch(e) }
  if(target.id == "findClick" ){ secondarySearch(e) }
  if(target.textContent == "Add Cart"){ addItems(e) }
  if(target.textContent == "Delete") { deleteItems(e) }
  if(target.textContent == "Buy Now!") { addItems(e)}
  if(target.id == "checkout") { checkOut(e) }
  if(target.id == "formSubmit") { formData(e) }
  if(target.id == "back" || inClass(target.classList, "home")) { toggleDisplay(e, "title") }
  if(inClass(target.classList, "back") && inClass(target.classList, "item-page")) { mainSearch(e) }
  if(target.nodeName == "BUTTON" && isTrue(target.textContent, "read")){ reviewItems(e) }
  if(target.nodeName == "BUTTON" && isTrue(target.textContent, "write")){ reviewItems(e); tempVar = target.id }
  if(target.id == "reviewSubmit"){ writeSubmit(e, tempVar) }
  if(target.nodeName == "IMG" && inClass(target.classList, "imgProduct")){ showProduct(e, "product" )}
  if(inClass(target.classList, "sort")){ sortRating(e, itemsFound) };
})

var mainSearch = function(e){
  var itemSearched = e.target.parentElement.parentElement.firstElementChild.lastElementChild.value
  clearDom(displayId)
  searchItem(itemSearched)
  toggleDisplay(e, "items")
  e.preventDefault()
}

var secondarySearch = function(e){
  var itemSearched = e.target.parentElement.firstElementChild.value
    clearDom(displayId)
    searchItem(itemSearched)
    e.preventDefault()
}

//Add Items to the Cart
var addItems = function(e){
  console.log("trigger?")
  var addedCount = document.getElementById("number")
  var elementId = e.target.id
  if(e.target.innerText == "Buy Now!"){
    var itemObject = {
      id : elementId,
      quantity: 1
    }
  } else {
    var itemObject = {
      id: elementId,
      quantity: parseInt(e.target.offsetParent.childNodes[3].value)
    }
  }

  if(addedObjects.length == 0){
    addedObjects.push(itemObject)
  } else if(valueCheck(addedObjects, elementId)){
    addedObjects.forEach(function(items){
      if(items.id == elementId){
        items.quantity += itemObject.quantity
        return;
      }
    })
  } else {
    addedObjects.push(itemObject)
  }
  addedCount.innerHTML = objectAddProperty(addedObjects, "quantity")
  console.log(addedObjects)
  e.preventDefault()
}

//Delete Items from the Cart
var deleteItems = function(e){
    var elementId = e.target.id
    var itemToRemove = elementId.slice(0, (elementId.length - 6))
    addedObjects.forEach(function(items){
      var selectedQuantity = e.target.offsetParent.childNodes[3].value
      if(items.id == itemToRemove){
        if(items.quantity == selectedQuantity){
            var objectPosition = objectIndexOf(addedObjects, itemToRemove, "id")
            addedObjects.splice(objectPosition, 1)
        } else {
          items.quantity -= selectedQuantity
        }
      }
    })
    clearDom(deleteItem)
    itemsInCart("cart")
}

//Show Product Page for reach item
var showProduct = function(e, state){
  var productContainer = document.getElementById("productPage")
  var index = ((e.target.id.length - 3) * -1)
  var name = e.target.id.slice(index)
  var highContainer = document.getElementById("highlights")
  var imageContainer = document.getElementById("productImage")
  var descriptionContainer = document.getElementById("productDescription")
  var buy = document.getElementById("productBuy")
  var reviewBuy = document.getElementById("reviewBuy")
  var containers = [highContainer, imageContainer, descriptionContainer, buy, reviewBuy]
  for(var i = 0; i<containers.length; i++){
    clearDom(containers[i])
  }
  toggleDisplay(e, state)
  var imgAppending = function(div, image){
    var img = document.createElement("img")
    img.src = image
    img.id = "imageProduct"
    img.className = "img-responsive center-block"
    div.appendChild(img)
  }
  for(var i = 0; i < data.length; i++) {
    if(data[i].id == name){
      var highlights = data[i].highlights
      var productImage = data[i].productImage
      var buyId = data[i].id
      var reviewId = 'review' + data[i].id
      highContainer.insertAdjacentHTML('beforeend', highlights )
      imgAppending(imageContainer, productImage)
      list(data[i].description, descriptionContainer)
      links("Buy Now!", buyId, "", buy)
      links("Read a review", reviewId, "", reviewBuy, "modal", "#myModal")
    }
  }
}

//OnClick will send you to the checkout page
var checkOut = function(e){
  clearDom(deleteItem)
  itemsInCart("cart");
  toggleDisplay(e, "payment-box")
  e.preventDefault();
}

//Append the reviews and ratings on the hidden modal
var appendModal = function(rowClass, colClass, col2Class, itemRating, itemReview){
  var modalBody = document.getElementById("modalContainer")
  var modalContainer = document.createElement("div")
  var modalStar = document.createElement("div")
  var modalReview = document.createElement("div")
  var starText = document.createTextNode(itemRating)
  var reviewText = document.createTextNode(itemReview)
  var hr = document.createElement("hr")
  ratings(modalStar, itemRating, "blah")
  modalContainer.className = rowClass
  modalStar.className = colClass
  modalReview.className = col2Class
  modalReview.appendChild(reviewText)
  modalContainer.appendChild(modalStar)
  modalContainer.appendChild(modalReview)
  modalBody.appendChild(modalContainer)
  modalBody.appendChild(hr)
}

//Call all the reviews from the object
var reviewItems = function(e){
  clearDom(modalContainer)
  var index = ((e.target.id.length - 6) * -1)
  var clickType = e.target.id.slice(e.target.id, 6)
  var clickName = e.target.id.slice(index)
  if(clickType == "review"){
    data.forEach(function(items){
      if(items.id == clickName){
        items["review"].forEach(function(review){
          appendModal("row","col-md-4", "col-md-8", review.rating, review.review)
        })
      }
    })
  }
}

//Write a review and save it to the object
var writeSubmit = function(e, id) {
  var review = document.getElementById("reviewText")
  var radio = document.getElementsByName("inlineRadioOptions")
  var quantity = 0;
  var index = ((id.length - 6) * -1)
  var clickName = id.slice(index)
  var reviewObject = {}
  for(var i = 0; i<radio.length; i++){
    if(radio[i].checked){
      quantity = radio[i].value
    }
  }
  data.forEach(function(items){
    if(items.id == clickName){
      reviewObject = {rating: quantity, review: review.value}
      items.review.push(reviewObject)
      reviewObject = {}
      review.value = ""
    }
  })
}

//Display star ratings
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

//Search the data object based on the input value of the user
var searchItem = function(item){
  var grabData = function(i){
    var property = data[i]
    var name = property.name
    var highlights = property.highlights
    var description = property.description
    var id = property.id
    var image = property.image
    var price = property.price
    var stars = property.stars
    itemsFound.push(data[i]);
    createItems(name, highlights, description, id, image, price, "display-box", stars)
  }
  for(var i = 0; i<data.length; i++){
    if( item == undefined || item.trim().length == 0){
      grabData(i)
    } else if((data[i].category).indexOf(item) !== -1 || data[i].keyword == item){
      grabData(i)
    }
  }
}

//Create several divs and columns that will append in the item container values from the data object.
var createItems = function(name, highlights, description, id ,image, price, elementContainer, stars, quantity){
  var d = document
  var rowDiv = d.createElement("div")
  var colDiv1 = d.createElement("div")
  var colDiv2 = d.createElement("div")
  var hr = d.createElement("hr")
  var strong = d.createElement("strong")
  var strong2 = d.createElement("strong")
  var colText = d.createTextNode(name)
  var colText2 = d.createTextNode(highlights)
  var colText3 = d.createTextNode("$" + price + "   -   ")
  var innerContainer = d.getElementById(elementContainer)
  var columnClass = "col-md-8 col-md-offset-1"
  var imgClass = "col-md-2 text-center"
  var rowClass = "row"

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
      select.className = "quantity form-control select-tp"
      optionName.appendChild(d.createTextNode(i))
      select.appendChild(optionName)
      colDiv.appendChild(select)
    }
  }

  var img = function(image, col, id){
    var element = d.createElement("img")
    var imgLink = d.createElement("a")
    imgLink.href = "#"
    imgLink.appendChild(element)
    col.appendChild(imgLink)
    element.src = image
    element.id = "img" + id
    element.className = "img-responsive imgProduct"
    if(elementContainer == "display-box"){
      links("Add Cart", id, "divLink", col)
      select(9, col)

    } else {
      var deleteId = (id + "delete")
      links("Delete", deleteId, "divLink", col)
      select(quantity, col)
    }
  }
  var review = function(id) {
    var reviewId = "review" + id
    var writeId = "create" + id
    links("Read a review", reviewId, "divLink", colDiv2, "modal", "#myModal")
    links("Write a review", writeId, "divLink", colDiv2, "modal", "#writeModal")
  }

  strong2.appendChild(colText)
  strong.appendChild(colText3)
  append(rowDiv, colDiv1, rowClass, imgClass, strong2)
  append(rowDiv, colDiv2, rowClass, columnClass, strong)
  append(rowDiv, colDiv2, rowClass, columnClass, colText2)
  img(image, colDiv1, id)
  list(description, colDiv2)
  ratings(colDiv1, stars, "starContainer")
  review(id)
  innerContainer.appendChild(rowDiv)
  innerContainer.appendChild(hr)
}

//Checks items added to the cart
var itemsInCart = function(idTarget){
  var subTotal = 0;
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
        subTotal += (price * addedObjects[i].quantity)
        createItems(name, highlights, description, id, image, price, idTarget, stars, addedObjects[i].quantity)
      }
    }
  }
  updateTotal(subTotal)
}

//Loops through the form elements creating an object of data to be processed for payment
var formData = function(e){
  toggleDisplay(e, "confirmation")
  var form = e.target.form.elements
  var dataObject = {}
  for(var i = 0; i<form.length; i++){
    dataObject[form[i].id] = form[i].value;
  }
  var infoPanel =  document.getElementById("personal-info")
  var creditPanel =  document.getElementById("credit-Info")
  var name =  document.getElementById("name")
  var fullName = dataObject.firstName + ' ' + dataObject.lastName;
  var address = dataObject.address
  var city = dataObject.city + ' ' + dataObject.state
  var email = dataObject.email
  var credit = dataObject.credit

  var personalInfo = fullName + '<br>' + address + '<br>' + city + '<br>' + email + '<br>'
  var creditInfo = "Credit # " + credit + '<br>' + email

  infoPanel.insertAdjacentHTML('beforeend', personalInfo)
  creditPanel.insertAdjacentHTML('beforeend', creditInfo)
  return dataObject
  e.preventDefault()
}

//Update the number of items in the cart
var updateTotal = function(subTotal){
  var subtotalSpan = document.getElementById("subtotal")
  var taxSpan = document.getElementById("tax")
  var shippingSpan = document.getElementById("shipping")
  var totalSpan = document.getElementById("total_sum")
  var tax = (subTotal * 0.08)
  var shipping = 25.00
  var total = (subTotal + tax + shipping)
  subtotalSpan.innerHTML = formatting(subTotal.toFixed(2))
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

//To toggle between states for which page the user is currently on.
var toggleDisplay = function(e, state){
  var containers = document.getElementsByClassName("container")
  var titleBox = containers[0]
  var itemBox = containers[1]
  var paymentBox = containers[2]
  var productBox = containers[3]
  var confirmBox = containers[4]
  var toggle = function(box1, box2, box3, box4, box5){
    box1.classList.add("hide")
    box2.classList.add("hide")
    box3.classList.add("hide")
    box4.classList.add("hide")
    box5.classList.remove("hide")
  }

  if(state == "title"){
    toggle(itemBox, paymentBox, productBox, confirmBox, titleBox)
  } else if(state == "items"){
    toggle(titleBox, paymentBox, productBox, confirmBox, itemBox)
  } else if(state == "confirmation"){
    toggle(titleBox, itemBox, paymentBox, productBox, confirmBox)
  } else if(state == "product"){
    toggle(titleBox, itemBox, paymentBox, confirmBox, productBox)
  } else {
    toggle(titleBox, itemBox, confirmBox, productBox, paymentBox)
  }
  e.preventDefault()
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

//Check to see if a word is within a string
var isTrue = function(stringName, word){
  var string = stringName.toLowerCase()
  var substring = word
  return (string.indexOf(substring) > -1)
}

//Check to see if an element is in an array.
var inClass = function(classes, name){
  for(var i = 0; i< classes.length; i++){
    if(classes[i] == name){
      return true
    }
  }
}

//Append items in an array to a list on the Dom
var list = function(array, div){
  for(i=0; i<array.length; i++){
    var list = document.createElement("li")
    var space = document.createElement("br")
    var listText = document.createTextNode(array[i])
    list.appendChild(listText)
    div.appendChild(list)
  }
  div.appendChild(space)
}

//Create Links with buttons and appends it to the dom
var links = function(text, id, className, col, modal, modalId){
  var linkText = document.createTextNode(text)
  var divContainer = document.createElement("div")
  var element = document.createElement("button")
  element.type = "button"
  element.className = "btn btn-primary btn-sm"
  divContainer.className = className
  element.id = id
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

//Recommendation
var appendCar = function(car){
  var carContainer = document.getElementById(car)
  var carRow = document.createElement("div")
  carRow.className = "row"
  var track = [];
  for( var i = 0; i < 4; i++ ){
    var number = Math.floor((Math.random() * 9));
    if(track.length == 0){
      track.push(number);
    } else {
      while(track.indexOf(number) >= 0 ) {
        number = Math.floor((Math.random() * 9))
      }
      track.push(number);
    }
    var thumb = document.createElement("div")
    var link = document.createElement("a")
    var image = document.createElement('img')

    thumb.className = "col-sm-3 col-md-3 col-xs-3 thumbnail"
    link.href="#"
    image.src = data[number].carImage
    image.alt = "image"
    image.className = "img-responsive imgProduct"
    image.id = data[number].carId
    link.appendChild(image)
    thumb.appendChild(link)
    carRow.appendChild(thumb)
  }
    carContainer.appendChild(carRow)
}
appendCar("car-tp")

//Sort By Rating
var sortRating = function(e, items){
  clearDom(displayId)
  console.log(e.target.id)
  if(e.target.id == "sort-rating"){ var collection = _.sortBy(items, "stars").reverse() }
  if(e.target.id == "sort-low") { var collection = _.sortBy(items, "price") }
  if(e.target.id == "sort-high") { var collection = _.sortBy(items, "price").reverse() }
  for(var i  =0; i<collection.length; i++){
    var property = collection[i]
    var name = property.name
    var highlights = property.highlights
    var description = property.description
    var id = property.id
    var image = property.image
    var price = property.price
    var stars = property.stars
    createItems(name, highlights, description, id, image, price, "display-box", stars)
  }
}
