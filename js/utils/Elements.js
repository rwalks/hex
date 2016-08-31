//text boxes and buttons
function TextElement(className, text, x, y, center, func) {

  var element = document.createElement("div");
  element.className = className;
  element.style.left = Math.round(x) + "px";
  element.style.top = Math.round(y) + "px";
  element.style.margin = 'auto';
  if ( center ) {
    element.style.width = '100%';
    element.style.textAlign = "center";
  }
  if (func) {
    var buttonElement= document.createElement("div");
    buttonElement.className = "text_button";
    buttonElement.onclick = func;
    buttonElement.textContent = text;
    element.appendChild(buttonElement);
  } else {
    element.textContent = text;
  }
  document.body.appendChild(element);

  this.remove = function() {
    element.parentElement.removeChild(element);
  }

  this.setOutline = function(color) {
    element.style.webkitTextStrokeColor = color;
  }

}

function TitleElement(text, x, y) { TextElement.call(this, "game_title", text, x, y, false, false); }
function TitleElementCenter(text, x, y) { TextElement.call(this, "game_title", text, x, y, true, false); }
function MsgElement(text, x, y, func) { TextElement.call(this, "game_msg", text, x, y, false, func); }
function MsgElementCenter(text, x, y, func) { TextElement.call(this, "game_msg", text, x, y, true, func); }
function HeaderElement(text, x, y) { TextElement.call(this, "game_header", text, x, y, true, false); }

function DualButtons(leftText, leftFunc, rightText, rightFunc, y) {
  var element = document.createElement("div");
  element.className = "select_holder";
  element.style.top = Math.round(y) + "px";
  element.style.margin = 'auto';
  element.style.width = '100%';
  element.style.textAlign = "center";
  // left toggle
  var leftElement = document.createElement("div");
  leftElement.className = "left_button";
  leftElement.textContent = leftText;
  leftElement.onclick = leftFunc;
  leftElement.style.width = '12%';
  leftElement.style.marginRight = '3%';
  leftElement.style.borderRadius = "20px";
  // right toggle
  var rightElement = document.createElement("div");
  rightElement.className = "right_button";
  rightElement.textContent = rightText;
  rightElement.onclick = rightFunc;
  rightElement.style.width = '12%';
  rightElement.style.marginLeft = '3%';
  rightElement.style.borderRadius = "20px";
  element.appendChild(leftElement);
  element.appendChild(rightElement);
  document.body.appendChild(element);

  this.remove = function() {
    element.parentElement.removeChild(element);
  }
}

//Selector
function SelectorButtons(items, y, toggleFunc) {
  var This = this;
  var itemIndex = 0;

  var element = document.createElement("div");
  element.className = "select_holder";
  element.style.top = Math.round(y) + "px";
  element.style.margin = 'auto';
  element.style.width = '100%';
  element.style.textAlign = "center";
  // left toggle
  var leftElement = document.createElement("div");
  leftElement.className = "left_button";
  leftElement.textContent = "<<";
  leftElement.onclick = leftArrow;
  // right toggle
  var rightElement = document.createElement("div");
  rightElement.className = "right_button";
  rightElement.textContent = ">>";
  rightElement.onclick = rightArrow;
  // center element
  var centerElement = document.createElement("div");
  centerElement.className = "center_button";
  centerElement.textContent = items[itemIndex];
  //assemble
  element.appendChild(leftElement);
  element.appendChild(centerElement);
  element.appendChild(rightElement);
  document.body.appendChild(element);

  function leftArrow() {
    itemIndex -= 1;
    itemIndex = itemIndex < 0 ? items.length - 1 : itemIndex;
    centerElement.textContent = items[itemIndex];
    if ( toggleFunc ) {
      toggleFunc(This.getValue());
    }
  }

  function rightArrow() {
    itemIndex += 1;
    itemIndex = itemIndex % items.length;
    centerElement.textContent = items[itemIndex];
    if ( toggleFunc ) {
      toggleFunc(This.getValue());
    }
  }

  this.getValue = function() {
    return items[itemIndex];
  }

  this.setValue = function(val) {
    itemIndex = items.indexOf(val);
    centerElement.textContent = items[itemIndex];
    if ( toggleFunc ) {
      toggleFunc(This.getValue());
    }
  }

  this.setValues = function(newItems) {
    items = newItems;
    itemIndex = 0;
    centerElement.textContent = items[itemIndex];
  }

  this.remove = function() {
    element.parentElement.removeChild(element);
  }
}
