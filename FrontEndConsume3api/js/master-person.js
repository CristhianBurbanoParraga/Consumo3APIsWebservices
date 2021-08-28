function clearBox() {
    document.getElementById('firstname').value = '';
    document.getElementById('lastname').value = '';
    document.getElementById('id').value = '';
}

function readJson(data) {
    document.getElementById('tbody').innerHTML = '';
    for (let i = 0; i < data.length; i++) {
        document.getElementById('tbody').innerHTML += `<tr>
                                        <th scope="row">`+ data[i].id + `</th>
                                        <td>`+ data[i].firstname + `</td>
                                        <td>`+ data[i].lastname + `</td>
                                        <td>Cliente activo</td></tr>`;
    }
}

function getAllPerson() {
    $.ajax({
        type: "GET",
        url: "https://localhost:44330/api/person",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (data) {
            readJson(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR + "\n" + textStatus + "\n" + errorThrown);
        }
    });
}

function savePerson(jsonData) {
    $.ajax({
        type: "POST",
        url: "https://localhost:44330/api/person",
        contentType: 'application/json',
        //dataType: "json",
        data: JSON.stringify(jsonData),
        beforeSend: function () {

        },
        success: function (data) {
            swal("¡Proceso correcto!", "Cliente registrado correctamente", "success");
            clearBox();
            getAllPerson();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR + "\n" + textStatus + "\n" + errorThrown);
        }
    });
}

function updatePerson (id, jsonData) {
    $.ajax({
        type: "PUT",
        url: "https://localhost:44330/api/person/" + parseInt(id),
        contentType: 'application/json',
        //dataType: "json",
        data: JSON.stringify(jsonData),
        beforeSend: function () {

        },
        success: function (data) {
            swal("¡Proceso correcto!", "Datos del cliente actualizado correctamente", "success");
            clearBox();
            getAllPerson();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR + "\n" + textStatus + "\n" + errorThrown);
        }
    });
}

function deletePerson (id) {
    $.ajax({
        type: "DELETE",
        url: "https://localhost:44330/api/person/" + parseInt(id),
        //contentType: 'application/json',
        //dataType: "json",
        //data: JSON.stringify(jsonData),
        beforeSend: function () {

        },
        success: function (data) {
            swal("¡Proceso correcto!", "Cliente eliminado correctamente", "success");
            clearBox();
            getAllPerson();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR + "\n" + textStatus + "\n" + errorThrown);
        }
    });
}

window.addEventListener('load', function () {
    localStorage.setItem('statusconfig', 'disabled');
    document.getElementById('config').style.display = 'none';
    getAllPerson();
});

document.getElementById('return').addEventListener('click', function () {
    localStorage.clear();
    location.replace('sale.html');
});

document.getElementById('btnconfig').addEventListener('click', function () {
    if (localStorage.getItem('statusconfig') === 'disabled') {
        localStorage.setItem('statusconfig', 'enabled');
        document.getElementById('config').style.display = 'block';
    } else {
        localStorage.setItem('statusconfig', 'disabled');
        document.getElementById('config').style.display = 'none';
    }
});

document.getElementById('addperson').addEventListener('click', function () {
    var jsondata = {
        firstname: document.getElementById('firstname').value,
        lastname: document.getElementById('lastname').value,
        role: 'C'
    };
    savePerson(jsondata);
});

document.getElementById('updateperson').addEventListener('click', function () {
    var jsondata = {
        id: parseInt(document.getElementById('id').value),
        firstname: document.getElementById('firstname').value,
        lastname: document.getElementById('lastname').value,
        role: 'C'
    };
    updatePerson(parseInt(document.getElementById('id').value), jsondata);
});

document.getElementById('deleteperson').addEventListener('click', function () {
    deletePerson(parseInt(document.getElementById('id').value));
});

/*
  /¯¯¯¯¯¯¯| |¯¯¯¯¯¯¯¯¯\   |¯¯¯|  /¯¯¯¯¯¯¯¯¯¯¯¯|  /¯¯¯¯¯¯¯¯¯¯¯¯|
 /   /¯¯¯¯  |   |¯¯\   \  |   | |   /¯¯¯¯¯¯¯¯¯  |   /¯¯¯¯¯¯¯¯¯
|   |       |   |   |   | |   | |   \           |   \
|   |       |   |__/   /  |   |  \   ¯¯¯¯¯¯¯¯\   \   ¯¯¯¯¯¯¯¯\
|   |       |    __   /   |   |   ¯¯¯¯¯¯¯¯\   |   ¯¯¯¯¯¯¯¯\   |
 \   \____  |   |  \   \  |   |  _________/   |  _________/   |
  \_______| |___|   \___\ |___| |____________/  |____________/  O O O
*/