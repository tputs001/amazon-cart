var addedItems = [];

// Event Listeners
var searchButton = document.getElementById("search-button");
searchButton.addEventListener('click', function(e){
  var itemSearched = document.getElementById("input-search").value.toLowerCase();
  search(itemSearched);
  e.preventDefault();
})

//FUNCTIONS

//addEventListeners to each a tags by ID
var addEvent = function(id){
  var elementId = document.getElementById(id);
  var addedCount = document.getElementById("number");
  elementId.addEventListener('click', function(e){
    addedItems.push(id);
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
      createItems(productName, highlights, description, id, image)
      addEvent(id);
    }
  }
}

//create several divs and columns that will append in the item container values from the data object.
var createItems = function(name, highlights, description, id ,image){
  var d = document
  var frag = d.createDocumentFragment();
  var rowDiv = d.createElement("div")
    , colDiv1 = d.createElement("div")
    , colDiv2 = d.createElement("div")
    , colText = d.createTextNode(name)
    , list = d.createElement("li")
    , listText = d.createTextNode(description)
    , colText2 = d.createTextNode(highlights)
    , innerContainer = d.getElementById('subItem-container');

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
    colDiv1.className ="col-md-2 col-md-offset-1 align-center"
    colDiv2.className = "col-md-4"

    colDiv1.appendChild(colText)
    colDiv2.appendChild(colText2)
    rowDiv.appendChild(colDiv1)
    rowDiv.appendChild(colDiv2)

    frag.appendChild(rowDiv);

    rowDiv2.className = "row"
    colDiv3.className = "col-md-1 col-md-offset-1 item-picture"
    colDiv4.className = "col-md-8 col-md-offset-1"
    aLink.className = "align-center"
    aLink.id = id
    aLink.href = "/"

    colDiv3.appendChild(imgElement);
    imgElement.src = image
    aLink.appendChild(aLinkText);
    colDiv3.appendChild(aLink);
    listFunction(description);
    rowDiv2.appendChild(colDiv3);
    rowDiv2.appendChild(colDiv4);

    frag.appendChild(rowDiv2);

    innerContainer.appendChild(frag)
}
