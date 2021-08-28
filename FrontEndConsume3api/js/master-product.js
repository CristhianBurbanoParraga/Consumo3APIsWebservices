function readJson(data) {
    document.getElementById('tbody').innerHTML = '';
    for (let i = 0; i < data.length; i++) {
        document.getElementById('tbody').innerHTML += `<tr>
                                        <th scope="row">`+ data[i].id + `</th>
                                        <td>`+ data[i].name + `</td>
                                        <td>`+ data[i].price + `</td>
                                        <td>`+ data[i].description + `</td></tr>`;
    }
}

function getAllProducts() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8081/VS%20php/BackEndPhp/",
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

function clearBox() {
    document.getElementById('name').value = '';
    document.getElementById('price').value = '';
    document.getElementById('description').value = '';
    document.getElementById('id').value = '';
}

function saveProduct(jsonData) {
    $.ajax({
        type: "POST",
        url: "http://localhost:8081/VS%20php/BackEndPhp/",
        contentType: 'application/json',
        dataType: "json",
        data: JSON.stringify(jsonData),
        beforeSend: function () {

        },
        success: function (data) {
            if (data['name'] === document.getElementById('name').value) {
                swal("¡Proceso correcto!", "Piqueo registrado correctamente", "success");
                clearBox();
                getAllProducts();
            } else {
                swal("¡Error!", "Error en la peticion", "error");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR + "\n" + textStatus + "\n" + errorThrown);
        }
    });
}

function updateProduct (id, jsonData) {
    $.ajax({
        type: "PUT",
        url: "http://localhost:8081/VS%20php/BackEndPhp/?id=" + parseInt(id),
        contentType: 'application/json',
        dataType: "json",
        data: JSON.stringify(jsonData),
        beforeSend: function () {

        },
        success: function (data) {
            if (data['name'] === document.getElementById('name').value) {
                swal("Proceso correcto!", "Datos del piqueo actualizados correctamente", "success");
                clearBox();
                getAllProducts();
            } else {
                swal("¡Error!", "Error en la peticion", "error");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR + "\n" + textStatus + "\n" + errorThrown);
        }
    });
}

function deleteProduct (id) {
    $.ajax({
        type: "DELETE",
        url: "http://localhost:8081/VS%20php/BackEndPhp/?id=" + parseInt(id),
        beforeSend: function () {

        },
        success: function (data) {
            swal("Proceso correcto!", "Piqueo eliminado correctamente", "success");
            clearBox();
            getAllProducts();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR + "\n" + textStatus + "\n" + errorThrown);
        }
    });
}

window.addEventListener('load', function () {
    localStorage.setItem('statusconfig', 'disabled');
    document.getElementById('config').style.display = 'none';
    getAllProducts();
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

document.getElementById('addproduct').addEventListener('click', function () {
    var jsondata = {
        name: document.getElementById('name').value,
        price: document.getElementById('price').value,
        description: document.getElementById('description').value
    };
    saveProduct(jsondata);
});

document.getElementById('updateproduct').addEventListener('click', function () {
    var jsondata = {
        name: document.getElementById('name').value,
        price: document.getElementById('price').value,
        description: document.getElementById('description').value
    };
    updateProduct(parseInt(document.getElementById('id').value), jsondata);
});

document.getElementById('deleteproduct').addEventListener('click', function () {
    deleteProduct(parseInt(document.getElementById('id').value));
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