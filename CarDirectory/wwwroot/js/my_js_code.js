var cars = [];
var histores = [];

// Получение истории
async function GetHistores() {
    // отправляет запрос и получаем ответ
    const response = await fetch("/api/DataBaseHistoriesapi", {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    });
    if (response.ok === true) {
        // если запрос прошел нормально
        // получаем данные
        histores = await response.json();
        histores.forEach(history => {

            //СОЗДАНИЕ СТОЛБИКА
            var tr = document.createElement("tr");
            //СОЗДАНИЕ ЭЛЕМЕНТОВ
            var th_id = document.createElement("th");
            var td_date = document.createElement("td");
            var td_indo = document.createElement("td");
            // НАПОЛНЯЕМ ИНФОРМАЦИЕЙ
            th_id.append(history.id);
            td_date.append(history.changeDate);
            td_indo.append(history.information);
            // УСТАНОВКА ТЕГА ДЛЯ НУМИРАЦИИ
            th_id.scope = "row";
            //ВВЕДЕНИЕ ЭДЕМЕНТОВ В СТОЛБЕЦ
            tr.append(th_id, td_date, td_indo);
            //ВВЕДЕНИЕ СТОЛБИКА В ТАБЛИЦУ
            document.getElementById("tbody").append(tr);


        });
    }

}



// Получение машин
async function GetCars() {
    // отправляет запрос и получаем ответ
    const response = await fetch("/api/carsapi", {
        // const response = await fetch("/api/crud", {

        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    });
    if (response.ok === true) {
        // если запрос прошел нормально
        // получаем данные
        cars = await response.json();
    }
    PutCarsFromDataBaseInTable();
}
// Добавление пользователя
async function Createcars(brand, model, num, color, year, fName, lName) {

    const response = await fetch("/api/carsapi", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            carBrand: brand,
            carModel: model,
            carNum: num,
            carColor: color,
            carPruductionYear: year,
            carOwnerFirstName: fName,
            carOwnerLastName: lName,
        })
    });
    if (response.ok === true) {
        const cars = await response.json();
        document.forms["carForm"].reset();
    }
}
// Изменение пользователя
async function Editcars(id, brand, model, num, color, year, fName, lName) {
    const response = await fetch("/api/carsapi", {
        method: "PUT",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            id: parseInt(id, 10),
            carBrand: brand,
            carModel: model,
            carNum: num,
            carColor: color,
            carPruductionYear: year,
            carOwnerFirstName: fName,
            carOwnerLastName: lName,
        })
    });
    if (response.ok === true) {
        const cars = await response.json();
    }
}

// Удаление пользователя
async function Deletecars(id) {
    const response = await fetch("/api/carsapi/" + id, {
        method: "DELETE",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const cars = await response.json();
        document.getElementById("tr" + id).remove();
    }
}
// ____________________________________________________
// ____________________________________________________
// ____________________________________________________
// ____________________________________________________
// ____________________________________________________
// ____________________________________________________

function CreateOneEmptyRow(id) {
    //СОЗДАНИЕ СТОЛБИКА
    var tr = document.createElement("tr");
    //СОЗДАНИЕ ЭЛЕМЕНТОВ
    var th_id = document.createElement("th");
    var td_carBrand = document.createElement("td");
    var td_carModel = document.createElement("td");
    var td_carNum = document.createElement("td");
    var td_carColor = document.createElement("td");
    var td_carPruductionYear = document.createElement("td");
    var td_carOwnerFirstName = document.createElement("td");
    var td_carOwnerLastName = document.createElement("td");
    var td_btn_put = document.createElement("td");
    var td_btn_delete = document.createElement("td");
    // ID ЭЛЕМЕНТОВ
    tr.id = "tr" + id;
    th_id.id = "SharpId" + id;
    td_carBrand.id = "Brand" + id;
    td_carModel.id = "Model" + id;
    td_carNum.id = "Number" + id;
    td_carColor.id = "Color" + id;
    td_carPruductionYear.id = "Year" + id;
    td_carOwnerFirstName.id = "First_name" + id;
    td_carOwnerLastName.id = "Last_name" + id;
    td_btn_put.id = "Put" + id;
    td_btn_delete.id = "Delete" + id;
    // УСТАНОВКА ТЕГА ДЛЯ НУМИРАЦИИ
    th_id.scope = "row";
    //ВВЕДЕНИЕ ЭДЕМЕНТОВ В СТОЛБЕЦ
    tr.append(th_id, td_carBrand, td_carModel, td_carNum, td_carColor, td_carPruductionYear, td_carOwnerFirstName, td_carOwnerLastName, td_btn_put, td_btn_delete);
    //ВВЕДЕНИЕ СТОЛБИКА В ТАБЛИЦУ
    document.getElementById("tbody").append(tr);
}

function FillOneEmptyRow(id, brand, model, num, color, year, fName, lName) {
    //ПОИСК ЭЛЕМЕНТОВ ДЛЯ НАПОЛНЕНИЯ
    var th_id = document.getElementById("SharpId" + id);
    var td_carBrand = document.getElementById("Brand" + id);
    var td_carModel = document.getElementById("Model" + id);
    var td_carNum = document.getElementById("Number" + id);
    var td_carColor = document.getElementById("Color" + id);
    var td_carPruductionYear = document.getElementById("Year" + id);
    var td_carOwnerFirstName = document.getElementById("First_name" + id);
    var td_carOwnerLastName = document.getElementById("Last_name" + id);
    var td_btn_put = document.getElementById("Put" + id);
    var td_btn_delete = document.getElementById("Delete" + id);
    //СОЗДАНИЕ КНОПАК
    var btn_put = document.createElement("a");
    var btn_delete = document.createElement("button");
    //ОПУСТОШЕНИЕ НАЙДЕННЫХ ЭЛЕМЕНТОВ
    th_id.innerHTML = "";
    td_carBrand.innerHTML = "";
    td_carModel.innerHTML = "";
    td_carNum.innerHTML = "";
    td_carColor.innerHTML = "";
    td_carPruductionYear.innerHTML = "";
    td_carOwnerFirstName.innerHTML = "";
    td_carOwnerLastName.innerHTML = "";
    td_btn_put.innerHTML = "";
    td_btn_delete.innerHTML = "";
    //НАПОЛНЕНИЕ НАЙДЕННЫХ ЭЛЕМЕНТОВ СТОЛБИКА
    th_id.append(id);
    td_carBrand.append(brand);
    td_carModel.append(model);
    td_carNum.append(num);
    td_carColor.append(color);
    td_carPruductionYear.append(year);
    td_carOwnerFirstName.append(fName);
    td_carOwnerLastName.append(lName);
    td_btn_put.append(btn_put);
    td_btn_delete.append(btn_delete);
    //НАДПИСИ НА КНОПКАХ
    btn_put.append("Create");
    btn_delete.append("Delete");
    //УСТАНОВКА КЛАССА КНОПКАМ
    btn_put.classList.add("btn", "btn-primary");
    btn_delete.classList.add("btn", "btn-primary");
    //КСТАНОВКА ДЕЙСТВИЯ КНОПКАМ
    btn_put.onclick = function() {
        BeginEditing(id);
    };
    btn_delete.onclick = function() {
        Deletecars(id);
    };
}

function PutCarsFromDataBaseInTable() {
    cars.forEach(car => {
        CreateOneEmptyRow(car.id)
        FillOneEmptyRow(car.id, car.carBrand, car.carModel, car.carNum, car.carColor, car.carPruductionYear, car.carOwnerFirstName, car.carOwnerLastName);
    });
}

var selectMain = document.getElementById("Year");
for (var i = 2020; i >= 1768; i--) {
    var option = document.createElement("option");
    option.append(i);
    selectMain.append(option)
}


function CheckingForEmptiness(elem, value) {
    if (value == "") {
        elem.classList.add("is-invalid");
        return 1;
    }


}

function ResetInVslidStyle(form_name) {
    var form = document.forms[form_name];
    form.elements["Id"].classList.remove("is-invalid");
    form.elements["Brand"].classList.remove("is-invalid");
    form.elements["Model"].classList.remove("is-invalid");
    form.elements["Number"].classList.remove("is-invalid");
    form.elements["Color"].classList.remove("is-invalid");
    form.elements["Year"].classList.remove("is-invalid");
    form.elements["FirstName"].classList.remove("is-invalid");
    form.elements["LastName"].classList.remove("is-invalid");
}

function CheckingMainForm(form_name) {
    var form = document.forms[form_name];
    var name_id = form.elements["Id"].value;
    var name_brand = form.elements["Brand"].value;
    var name_model = form.elements["Model"].value;
    var name_number = form.elements["Number"].value;
    var name_color = form.elements["Color"].value;
    var name_year = form.elements["Year"].value;
    var name_firstName = form.elements["FirstName"].value;
    var name_lastName = form.elements["LastName"].value;
    ResetInVslidStyle(form_name);
    if (CheckingForEmptiness(form.elements["Brand"], name_brand) == 1) {
        return;
    }
    ResetInVslidStyle(form_name);

    if (CheckingForEmptiness(form.elements["Model"], name_model) == 1) {
        return;
    }
    ResetInVslidStyle(form_name);

    if (CheckingForEmptiness(form.elements["Number"], name_number) == 1) {
        return;
    }
    ResetInVslidStyle(form_name);

    if (CheckingForEmptiness(form.elements["Color"], name_color) == 1) {
        return;
    }
    ResetInVslidStyle(form_name);

    if (CheckingForEmptiness(form.elements["Year"], name_year) == 1) {
        return;
    }
    ResetInVslidStyle(form_name);

    if (CheckingForEmptiness(form.elements["FirstName"], name_firstName) == 1) {
        return;
    }
    ResetInVslidStyle(form_name);

    if (CheckingForEmptiness(form.elements["LastName"], name_lastName) == 1) {
        return;
    }
    ResetInVslidStyle(form_name);

    return 1;
}

// отправка формы
document.forms["carForm"].addEventListener("submit", e => {
    e.preventDefault();
    const form = document.forms["carForm"];
    const name_id = form.elements["Id"].value;
    const name_brand = form.elements["Brand"].value;
    const name_model = form.elements["Model"].value;
    const name_number = form.elements["Number"].value;
    const name_color = form.elements["Color"].value;
    const name_year = form.elements["Year"].value;
    const name_firstName = form.elements["FirstName"].value;
    const name_lastName = form.elements["LastName"].value;

    if (CheckingMainForm("carForm") == 1) {
        Createcars(name_brand, name_model, name_number, name_color, name_year, name_firstName, name_lastName);
        CreateOneEmptyRow(name_id)
        FillOneEmptyRow(name_id, name_brand, name_model, name_number, name_color, name_year, name_firstName, name_lastName);
    }

});

// отправка формы
// document.forms["carFormPut"].addEventListener("submit", e => {
//     e.preventDefault();
//     const form = document.forms["carFormPut"];
//     const name_id = form.elements["Id"].value;
//     const name_brand = form.elements["Brand"].value;
//     const name_model = form.elements["Model"].value;
//     const name_number = form.elements["Number"].value;
//     const name_color = form.elements["Color"].value;
//     const name_year = form.elements["Year"].value;
//     const name_firstName = form.elements["FirstName"].value;
//     const name_lastName = form.elements["LastName"].value;
//     if (CheckingMainForm("carFormPut") == 1) {

//         Editcars(name_id, name_brand, name_model, name_number, name_color, name_year, name_firstName, name_lastName);

//         FillOneEmptyRow(name_id, name_brand, name_model, name_number, name_color, name_year, name_firstName, name_lastName);
//     }
// });


function BeginEditing(id) {
    var Brand = document.getElementById("Brand" + id);
    var Model = document.getElementById("Model" + id);
    var Number = document.getElementById("Number" + id);
    var Color = document.getElementById("Color" + id);
    var Year = document.getElementById("Year" + id);
    var First_name = document.getElementById("First_name" + id);
    var Last_name = document.getElementById("Last_name" + id);
    var td_btn_put = document.getElementById("Put" + id);
    var td_btn_delete = document.getElementById("Delete" + id);

    var Brand_value = Brand.innerHTML;
    var Mode_value = Model.innerHTML;
    var Number_value = Number.innerHTML;
    var Color_value = Color.innerHTML;
    var Year_value = Year.innerHTML;
    var First_name_value = First_name.innerHTML;
    var Last_name_value = Last_name.innerHTML;


    Brand.innerHTML = '<form class="" name="carFormPut' + id + '" id="carFormPut' + id + '"></form><input form="carFormPut' + id + '"  type="hidden" name="Id" value="' + id + '"><input value ="' + Brand_value + '"  form="carFormPut' + id + '" type="text" class="form-control" name="Brand"  maxlength="25">';
    Model.innerHTML = '<input form="carFormPut' + id + '" type="text" class="form-control" name="Model" value="' + Mode_value + '"  maxlength="25">';
    Number.innerHTML = '<input form="carFormPut' + id + '" type="text" class="form-control" name="Number" value="' + Number_value + '" maxlength="25">';
    Color.innerHTML = '<input form="carFormPut' + id + '" type="text" class="form-control" name="Color" value="' + Color_value + '" maxlength="25">';
    Year.innerHTML = '<select form="carFormPut' + id + '" class="form-control" name="Year" value="' + Year_value + '" id="select' + id + '"></select>';
    First_name.innerHTML = '<input form="carFormPut' + id + '" type="text" class="form-control" name="FirstName" value="' + First_name_value + '" maxlength="25">';
    Last_name.innerHTML = '<input form="carFormPut' + id + '" type="text" class="form-control" name="LastName" value="' + Last_name_value + '" maxlength="25">';
    td_btn_put.innerHTML = '<input type="submit" class="btn btn-primary" value="+"  form="carFormPut' + id + '" id="btnPut' + id + '">';
    td_btn_delete.innerHTML = "";

    var btn_go_put = document.getElementById("btnPut" + id);
    for (var i = 2020; i >= 1768; i--) {
        var option = document.createElement("option");
        option.append(i);
        document.getElementById("select" + id).append(option)
    }

    document.forms["carFormPut" + id].addEventListener("submit", e => {
        e.preventDefault();
        const form = document.forms["carFormPut" + id];
        const name_id = form.elements["Id"].value;
        const name_brand = form.elements["Brand"].value;
        const name_model = form.elements["Model"].value;
        const name_number = form.elements["Number"].value;
        const name_color = form.elements["Color"].value;
        const name_year = form.elements["Year"].value;
        const name_firstName = form.elements["FirstName"].value;
        const name_lastName = form.elements["LastName"].value;



        if (CheckingMainForm("carFormPut" + id) == 1) {

            Editcars(name_id, name_brand, name_model, name_number, name_color, name_year, name_firstName, name_lastName);

            FillOneEmptyRow(name_id, name_brand, name_model, name_number, name_color, name_year, name_firstName, name_lastName);
        }
    });


    // //КСТАНОВКА ДЕЙСТВИЯ КНОПКАМ
    // btn_go_put.onclick = function() {
    //     FillOneEmptyRow(car.id, car.carBrand, car.carModel, car.carNum, car.carColor, car.carPruductionYear, car.carOwnerFirstName, car.carOwnerLastName);
    // };


}