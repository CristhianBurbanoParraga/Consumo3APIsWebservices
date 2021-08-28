function readJson(data) {
    document.getElementById('tbody').innerHTML = '';
    for (let i = 0; i < data.length; i++) {
        document.getElementById('tbody').innerHTML += `<tr>
                                        <th scope="row">`+ data[i].id + `</th>
                                        <td>`+ data[i].nameProduct + `</td>
                                        <td>`+ data[i].namePerson + `</td>
                                        <td>`+ data[i].quantity + `</td>
                                        <td>`+ data[i].total + `</td>
                                        <td>`+ data[i].observation + `</td></tr>`;
    }
}

function getAllSales() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/JavaBackEnd/api/sale",
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

function getSalesByClient(client) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/JavaBackEnd/api/sale/" + client,
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
    document.getElementById('product').value = '';
    document.getElementById('person').value = '';
    document.getElementById('quantity').value = '';
    document.getElementById('observation').value = '';
    document.getElementById('id').value = '';
}

function saveSale(jsonData) {
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/JavaBackEnd/api/sale/",
        contentType: 'application/json',
        dataType: "json",
        data: JSON.stringify(jsonData),
        beforeSend: function () {

        },
        success: function (data) {
            if (data['id'] > 0) {
                swal("¡Proceso correcto!", "venta registrada correctamente", "success");
                clearBox();
                getAllSales();
            } else {
                swal("¡Error!", "Error en la peticion", "error");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR + "\n" + textStatus + "\n" + errorThrown);
        }
    });
}

function updateSale(id, jsonData) {
    $.ajax({
        type: "PUT",
        url: "http://localhost:8080/JavaBackEnd/api/sale/" + parseInt(id),
        contentType: 'application/json',
        dataType: "json",
        data: JSON.stringify(jsonData),
        beforeSend: function () {

        },
        success: function (data) {
            if (data['id'] === parseInt(id)) {
                swal("Proceso correcto!", "Datos de la venta actualizados correctamente", "success");
                clearBox();
                getAllSales();
            } else {
                swal("¡Error!", "Error en la peticion", "error");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR + "\n" + textStatus + "\n" + errorThrown);
        }
    });
}

function deleteSale(id) {
    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/JavaBackEnd/api/sale/" + parseInt(id),
        beforeSend: function () {

        },
        success: function (data) {
            swal("Proceso correcto!", "Venta eliminada correctamente", "success");
            clearBox();
            getAllSales();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR + "\n" + textStatus + "\n" + errorThrown);
        }
    });
}

window.addEventListener('load', function () {
    localStorage.setItem('statusconfig', 'disabled');
    document.getElementById('config').style.display = 'none';
    getAllSales();
});

document.getElementById('search').addEventListener('click', function () {
    getSalesByClient(document.getElementById('searchsaleclient').value);
});

document.getElementById('addsale').addEventListener('click', function () {
    var jsondata = {
        nameProduct: document.getElementById('product').value,
        namePerson: document.getElementById('person').value,
        quantity: parseInt(document.getElementById('quantity').value),
        observation: document.getElementById('observation').value
    };
    saveSale(jsondata);
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

document.getElementById('updatesale').addEventListener('click', function () {
    var jsondata = {
        nameProduct: document.getElementById('product').value,
        namePerson: document.getElementById('person').value,
        quantity: parseInt(document.getElementById('quantity').value),
        observation: document.getElementById('observation').value
    };
    updateSale(parseInt(document.getElementById('id').value), jsondata);
});

document.getElementById('deletesale').addEventListener('click', function () {
    deleteSale(parseInt(document.getElementById('id').value));
});

document.getElementById('accessproduct').addEventListener('click', function () {
    location.replace('product.html');
});

document.getElementById('accessclient').addEventListener('click', function () {
    location.replace('person.html');
});

document.getElementById('return').addEventListener('click', function () {
    localStorage.clear();
    location.replace('../index.html');  
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

