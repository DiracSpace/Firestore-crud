// load all components of materialize
document.addEventListener('DOMContentLoaded', function () {
    M.AutoInit();
});

// generate unique id
$(function () {
    var text = "";
    var char_list = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 10; i++) {
        text += char_list.charAt(Math.floor(Math.random() * char_list.length));
    }
    $("#disabled").val(text);
});

// give phone format 
$(function () {
    $('#addPhone').mask('000-000-0000');
    $('#editPhone').mask('000-000-0000');
});

// give permission to edit
$('#btnEdit').click(function (event) {
    $('#editName').prop("disabled", false);
    $('#editPhone').prop("disabled", false);
    $('#editEmail').prop("disabled", false);
});

// firestore functions
document.getElementById('btnSubmit').addEventListener('click', function () {
    const db = firebase.firestore();
    var user = db.collection("users");

    user.doc($('#disabled').val()).set({
        id: $('#disabled').val(),
        username: $('#addUsuario').val(),
        phone: $('#addPhone').val(),
        email: $('#addEmail').val()
    });
    M.toast({ html: 'Se agregó' })
    document.getElementById("addForm").reset();
});

document.getElementById('btnEdit').addEventListener('click', function () {
    const db = firebase.firestore();
    var user = db.collection("users");

    user.where("id", "==", $('#idEdit').val()).get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            if (querySnapshot.empty) {
                M.toast({ html: 'No existe' })
            }
            var data = doc.data();
            $("#editName").val(data.username);
            $("#editPhone").val(data.phone);
            $("#editEmail").val(data.email);
        });
    })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
        });
});

document.getElementById('btnEditSubmit').addEventListener('click', function () {
    const db = firebase.firestore();
    var user = db.collection("users");

    user.doc($('#idEdit').val()).set({
        id: $('#idEdit').val(),
        username: $('#editName').val(),
        phone: $('#editPhone').val(),
        email: $('#editEmail').val()
    });
    M.toast({ html: 'Se editó' })
    document.getElementById("editForm").reset();
});

document.getElementById('btnDelete').addEventListener('click', function () {
    const db = firebase.firestore();
    var user = db.collection("users");

    user.doc($('#idDelete').val()).delete().then(function () {
        M.toast({ html: 'Se eliminó' })
        document.getElementById("deleteForm").reset();
    }).catch(function (error) {
        M.toast({ html: 'Error al eliminar' })
    });
});

// filling the modal
function loadData() {
    const db = firebase.firestore();
    var user = db.collection("users");
    user.get().then(snapshot => {
        setupGuides(snapshot.docs);
    });
}

// DOM elements
const guideList = document.querySelector('.guides');

// setup guides
const setupGuides = (data) => {

    let html = '';
    data.forEach(doc => {
        const userInfo = doc.data();
        const li = `
      <li>
        <div class="collapsible-header grey lighten-4"><i class="material-icons">person</i>${userInfo.id}</div>
        <div class="collapsible-body">
                        <span>
                            ID: ${userInfo.id}<br>
                            Name: ${userInfo.username}<br>
                            Email: ${userInfo.email}<br>
                            Phone: ${userInfo.phone}<br>
                        </span>
                    </div>
      </li>
    `;
        html += li;
    });
    guideList.innerHTML = html

};