/*
This file is part of TUBarWeb.

TUBarWeb is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

TUBarWeb is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with TUBarWeb.  If not, see <http://www.gnu.org/licenses/>.
*/

document.getElementById("save").onclick = function() {
  var barcodes = JSON.parse(localStorage.getItem("barcodes"));
  console.log(barcodes);
  if (barcodes == null) {
    barcodes = [];
  }
  var code = document.getElementById("code").value;
  var no = parseInt(document.getElementById("no").value);
  console.log(code);
  console.log(no);
  barcodes.push(new Entry(code, no));
  console.log(barcodes);
  localStorage.setItem("barcodes", JSON.stringify(barcodes));
  $("#list").focus();
};

document.getElementById("list").onclick = function() {
  var barcodes = JSON.parse(localStorage.getItem("barcodes"));
  var element = document.getElementById("barcodes");
  var i;
  var csv = "Barcode,Quantity <br />";
  $("#barcodeTable #entry").remove();
  if (barcodes) {
    for (i = barcodes.length - 1; i >= 0; i--) {
      var barcode = barcodes[i];
  //    element.innerHTML = element.innerHTML + "<h3>Cod: " + barcode.code + "</h3>";
  //    element.innerHTML = element.innerHTML + "<h4>Cantitate: " + barcode.no + "</h4>";
  //    element.innerHTML = element.innerHTML + "<div id=\"barcode" + i + "\"></div>";
  //    $("#barcodeTable tr:last").after("<tr id=\"entry\"><td>" + (i + 1) +"</td><td>" + barcode.code + "</td><td>" + barcode.no + "</td><!--<td><div id=\"barcode" + i + "\"></div></td>--></tr>");
      $("#barcodeTable tr:last").after("<tr id=\"entry\"><td>" + (i + 1) +"</td><td>" + barcode.code + "</td><td>" + barcode.no + "</td></tr>");
      var id = "#barcode" + i;
      //$(id).barcode(barcode.code.toString(), "ean13");
      csv = csv + barcode.code + "," + barcode.no + "<br />";
    }
  }
  $("#CSVtitle").css("display", "block");
  document.getElementById("csvOutput").innerHTML = csv;
};

document.getElementById("reset").onclick = function() {
  var resp = prompt("You are about to delete all the entries. This cannot be undone!\nAre you sure?", "yes");
  if (resp == "yes") {
    resetData();
    alert("Entries have been deleted.");
  } else {
    alert("Entries haven't been deleted.");
  }
  location.reload();
};

document.getElementById("remove").onclick = function() {
  var barcodes = JSON.parse(localStorage.getItem("barcodes"));
  var response = prompt("Write the number of the row you want to delete: ", barcodes.length);
  response = parseInt(response) - 1;
  if (response >= 0 && response <= barcodes.length - 1) {
    barcodes.splice(response, 1);
    localStorage.setItem("barcodes", JSON.stringify(barcodes));
  }
  location.reload();
};

function resetData() {
  localStorage.removeItem("barcodes");
};

var Entry = function (code, no) {
  this.code = code;
  this.no = no;
};

$(document).ready(function() {
  var barcodes = JSON.parse(localStorage.getItem("barcodes"));
  var element = document.getElementById("barcodes");
  var i, iCnt;
  $("#barcodeTable #entry").remove();
  if (barcodes) {
    for (i = barcodes.length - 1, iCnt = 0; i >= 0 && iCnt < 5; i--, iCnt++) {
      var barcode = barcodes[i];
  //    element.innerHTML = element.innerHTML + "<h3>Cod: " + barcode.code + "</h3>";
  //    element.innerHTML = element.innerHTML + "<h4>Cantitate: " + barcode.no + "</h4>";
  //    element.innerHTML = element.innerHTML + "<div id=\"barcode" + i + "\"></div>";
      $("#barcodeTable tr:last").after("<tr id=\"entry\"><td>" + (i + 1) +"</td><td>" + barcode.code + "</td><td>" + barcode.no + "</td></tr>");
      var id = "#barcode" + i;
      //$(id).barcode(barcode.code.toString(), "ean13");

    }
  }
});