//Event Listeners
var searchButton = document.getElementById("search-button");
searchButton.addEventListener('click', function(e){
  var itemSearched = document.getElementById("input-search").value;
  searchItem(itemSearched);
  e.preventDefault();
})

//Functions
var searchItem = function(item){
  for (var property in data){
    if(property == item) {
      for(var itemName in data[item]){
        var prop = data[item][itemName]
        var productName = prop.name
        var titleDetail = prop.processor
        var description = prop.gpu
        var image = "images/test.png"
        createItems(productName, titleDetail, description, image)
      }
    }
  }
};


var createItems = function(name, titleDetail, description, image){
  var d = document
  var frag = d.createDocumentFragment();
  var rowDiv = d.createElement("div")
    , colDiv1 = d.createElement("div")
    , colDiv2 = d.createElement("div")
    , colText = d.createTextNode(name)
    , colText2 = d.createTextNode(titleDetail)
    , innerContainer = d.getElementById('subItem-container');

  var rowDiv2 = d.createElement("div")
    , colDiv3 = d.createElement("div")
    , colDiv4 = d.createElement("div")
    , colText3 = d.createTextNode(description)
    , imgElement = d.createElement("img")
    , aLink = d.createElement("a")
    , aLinkText = d.createTextNode("Add Cart")
    , colDiv4 = d.createElement("div");

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
    aLink.href = "/"
    aLink.id = "item 1"

    colDiv3.appendChild(imgElement);
    imgElement.src = image
    aLink.appendChild(aLinkText)
    colDiv3.appendChild(aLink);
    colDiv4.appendChild(colText3);
    rowDiv2.appendChild(colDiv3);
    rowDiv2.appendChild(colDiv4);

    frag.appendChild(rowDiv2);

    innerContainer.appendChild(frag)
}
