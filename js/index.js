// load all components
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
    $('#icon_telephone').mask('000-000-0000');
});

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
        username: $('#icon_prefix').val(),
        phone: $('#icon_telephone').val(),
        email: $('#email').val()
    });
    alert('Se agrego nuevo usuario');
    setTimeout(() => { location.reload(); }, 1500);
});

document.getElementById('btnEdit').addEventListener('click', function () {
    const db = firebase.firestore();
    var user = db.collection("users");

    user.where("id", "==", $('#idEdit').val()).get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            if (querySnapshot.empty) {
                alert('No existe registro');
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
    alert('Se edito usuario');
    setTimeout(() => { location.reload(); }, 1500);
});

document.getElementById('btnDelete').addEventListener('click', function () {
    const db = firebase.firestore();
    var user = db.collection("users");

    user.doc($('#idDelete').val()).delete().then(function() {
        alert('Registro se elimino');
        setTimeout(() => { location.reload(); }, 1500);
    }).catch(function(error) {
        alert('Error al eliminar');
    });
});