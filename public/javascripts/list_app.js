const url = "/api/list";

fetch(url)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    appendData(data);
  })
  .catch(function (err) {
    console.log(err);
  });

function appendData(data) {
  var mainTable = document.getElementById("tbody");
  for (var i = 0; i < data.length; i++) {
    var tr = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");
    var td5 = document.createElement("td");
    var download = document.createElement("a");
    var del = document.createElement("a");
    download.className = "btn btn-success";
    download.href = `/api/download?name=${data[i].fileName}&version=${data[i].version}`;
    download.innerHTML = "Download";
    del.className = "btn btn-danger";
    del.href = "/api/delete";
    del.innerHTML = "Delete";
    td1.innerHTML = data[i].fileName;
    td2.innerHTML = data[i].version;
    td3.innerHTML = data[i].lastModified;
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    td4.appendChild(download);
    tr.appendChild(td4);
    td5.appendChild(del);
    tr.appendChild(td5);
    mainTable.appendChild(tr);
  }
}
