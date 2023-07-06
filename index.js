class FINALOBJECT {
  groups = {};
}

class OBJECTPROP {
  constructor(name, value) {
    this.name = name;
    this.value = value;
  }
}
class OBJECTGROUP {
  constructor(name, sortOrder) {
    this.name = name;
    this.sortOrder = sortOrder;
  }
  props = [];
}

function toJSON(obj) {
  let objJSON = JSON.stringify(obj);
  return objJSON;
}

function toObject() {
  let obj = new FINALOBJECT();
  let fullTable = document.querySelectorAll(".spec-row");
  fullTable.forEach((group, sortOrder) => {
    // creates a group
    let name = group.querySelector(".h4").innerHTML;
    obj.groups[name] = new OBJECTGROUP(name, sortOrder);
    let propertyPairs = group.querySelectorAll("tr"); // gets all the properties of that group
    propertyPairs.forEach((pairs) => {
      let pair = pairs.querySelectorAll("td");
      let prop = new OBJECTPROP(pair[0].innerHTML, pair[1].innerHTML);
      obj.groups[name].props.push(prop);
    });
  });
  return toJSON(obj);
}

let transform = document.getElementById("transform");
transform.addEventListener("click", (e) => {
  e.preventDefault();
  let htmlContent = document.getElementById("htmltable").value;
  let HTMLdisplay = document.getElementById("HTMLdisplay");
  let JSONresult = document.getElementById("JSONresult");
  HTMLdisplay.innerHTML = htmlContent;
  JSONresult.innerHTML = toObject();
});
