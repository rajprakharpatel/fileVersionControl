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
    if (data[i].name === undefined) {
      continue;
    }
    var tr = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");
    var td5 = document.createElement("td");
    var download = document.createElement("a");
    var del = document.createElement("a");
    download.className = "btn btn-success";
    download.href = `/api/download?name=${data[i].name}&version=${data[i].version}`;
    download.innerHTML = "Download";
    const delurl = `/api/delete?name=${data[i].name}&version=${data[i].version}`;
    del.className = "btn btn-danger";
    // del.href = "/api/delete";
    del.onclick = function () {
      fetch(delurl, {
        method: "DELETE",
      })
        .then((res) => res.json)
        .then((_data) => {
          alert("File Deleted Succesfully");;
					window.location.reload();
        })
        .catch((err) => console.log(err));
    };

    del.innerHTML = "Delete";
    td1.innerHTML = data[i].name;
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
