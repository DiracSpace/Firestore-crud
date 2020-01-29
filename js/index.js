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
    M.toast({html: 'Se agrego'})
    document.getElementById("addForm").reset();
});

document.getElementById('btnEdit').addEventListener('click', function () {
    const db = firebase.firestore();
    var user = db.collection("users");

    user.where("id", "==", $('#idEdit').val()).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            var data = doc.data();
            console.log(data.username);
            $("#editName").val(data.username);
            $("#editPhone").val(data.phone);
            $("#editEmail").val(data.email);
        });
    })
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
    M.toast({html: 'Se edito'})
    document.getElementById("editForm").reset();
});

document.getElementById('btnDelete').addEventListener('click', function () {
    const db = firebase.firestore();
    var user = db.collection("users");

    user.doc($('#idDelete').val()).delete().then(function () {
        M.toast({html: 'Se elimino'})
        document.getElementById("deleteForm").reset();
    }).catch(function (error) {
        M.toast({html: 'Error al eliminar'})
    });
});