function allAssistances() {
    let token = getCookie("DataUser");
    if (token != null) {
        $.ajax({
            url: post_all_assistances_Route + token,
            method: 'POST',
            success: function(response) {
                // Manejar la respuesta del servidor aquí
                let attendances = JSON.parse(JSON.stringify(response.value))
                console.table(attendances);
                document.querySelector('#flush-collapseThree tbody').innerHTML = "";
                if(response.Success){
                    attendances.forEach(att => {
    
                    // Fecha en formato ISO 8601
                    var fecha = new Date(att.Creation_date);
    
                    // Opciones de formato para Intl.DateTimeFormat
                    var opcionesFormato = {
                        weekday: 'long', // día de la semana completo
                        day: 'numeric', // día del mes
                        month: 'long', // nombre completo del mes
                        year: 'numeric', // año
                        hour: 'numeric', // hora en formato de 12 horas
                        minute: 'numeric', // minuto
                        hour12: true // indicador de formato de 12 horas
                    };
    
                    // Formatear la fecha utilizando Intl.DateTimeFormat
                    var formatoFecha = new Intl.DateTimeFormat('es-ES', opcionesFormato).format(fecha);
    
                    // Convertir la primera letra a mayúscula
                    var formatoCorregido = formatoFecha.charAt(0).toUpperCase() + formatoFecha.slice(1);
    
                    let tr = `<tr>
                        <th>${att.Id_Assistance}</th>
                        <td>${att.User.Fullname}</td>
                        <td>${att.Coords}</td>
                        <td>${att.IP}</td>
                        <td>${formatoCorregido}</td>
                        <td>${att.Status == true ? "Active" : "Inactive" }</td>
                        </tr>`
                        document.querySelector('#flush-collapseThree tbody').innerHTML += tr;
                    });
                    printAllAttendances(attendances.length)
                }

                if(!response.is_Allowed){
                    document.querySelectorAll('.accordion-item')[2].classList.add("d-none")
                }
    
                toastFill(response)
            },
            error: function(error) {
                // Manejar errores de AJAX aquí
                deleteCookie("DataUser")
                console.log(getCookie("DataUser"))
                console.error("Error en la petición.");
                loadPartialView("Users/login", document.querySelector(".main"));
            }
        });
    }else{
        tokenError()
    }
}
function myAssistances() {
    let token = getCookie("DataUser");
    if(token != null){
        $.ajax({
            url: post_user_all_assistances_Route + token,
            method: 'POST',
            success: function(response) {
                // Manejar la respuesta del servidor aquí
                let attendances = JSON.parse(JSON.stringify(response.value))
                console.table(attendances);
                if(document.querySelector('#flush-collapseTwo tbody')){
                    document.querySelector('#flush-collapseTwo tbody').innerHTML = "";
                    if(response.Success){
                        attendances.forEach(att => {
    
                        // Fecha en formato ISO 8601
                        var fecha = new Date(att.Creation_date);
    
                        // Opciones de formato para Intl.DateTimeFormat
                        var opcionesFormato = {
                            weekday: 'long', // día de la semana completo
                            day: 'numeric', // día del mes
                            month: 'long', // nombre completo del mes
                            year: 'numeric', // año
                            hour: 'numeric', // hora en formato de 12 horas
                            minute: 'numeric', // minuto
                            hour12: true // indicador de formato de 12 horas
                        };
    
                        // Formatear la fecha utilizando Intl.DateTimeFormat
                        var formatoFecha = new Intl.DateTimeFormat('es-ES', opcionesFormato).format(fecha);
    
                        // Convertir la primera letra a mayúscula
                        var formatoCorregido = formatoFecha.charAt(0).toUpperCase() + formatoFecha.slice(1);
    
                        let tr = `<tr>
                            <th>${att.Id_Assistance}</th>
                            <td>${att.User.Fullname}</td>
                            <td>${att.Coords}</td>
                            <td>${att.IP}</td>
                            <td>${formatoCorregido}</td>
                            <td>${att.Status == true ? "Active" : "Inactive" }</td>
                            </tr>`
                            document.querySelector('#flush-collapseTwo tbody').innerHTML += tr;
                        });
                        printMyAttendances(attendances.length)
                    }
                }
    
                toastFill(response)
            },
            error: function(error) {
                // Manejar errores de AJAX aquí
                deleteCookie("DataUser")
                console.log(getCookie("DataUser"))
                console.error("Error en la petición.");
                loadPartialView("Users/login", document.querySelector(".main"));
            }
        });
    }else{
        tokenError()
    }
}
function todayAssistances() {
    let token = getCookie("DataUser");
    if(token != null){
        $.ajax({
            url: post_user_today_assistances_Route + token,
            method: 'POST',
            success: function(response) {
                // Manejar la respuesta del servidor aquí
                let attendances = JSON.parse(JSON.stringify(response.value))
                console.table(attendances);
                if (document.querySelector('#flush-collapseOne tbody')) {
                    document.querySelector('#flush-collapseOne tbody').innerHTML = "";
                    if(response.Success){
                        attendances.forEach(att => {
    
                        // Fecha en formato ISO 8601
                        var fecha = new Date(att.Creation_date);
    
                        // Opciones de formato para Intl.DateTimeFormat
                        var opcionesFormato = {
                            weekday: 'long', // día de la semana completo
                            day: 'numeric', // día del mes
                            month: 'long', // nombre completo del mes
                            year: 'numeric', // año
                            hour: 'numeric', // hora en formato de 12 horas
                            minute: 'numeric', // minuto
                            hour12: true // indicador de formato de 12 horas
                        };
    
                        // Formatear la fecha utilizando Intl.DateTimeFormat
                        var formatoFecha = new Intl.DateTimeFormat('es-ES', opcionesFormato).format(fecha);
    
                        // Convertir la primera letra a mayúscula
                        var formatoCorregido = formatoFecha.charAt(0).toUpperCase() + formatoFecha.slice(1);
    
                        let tr = `<tr>
                            <th>${att.Id_Assistance}</th>
                            <td>${att.User.Fullname}</td>
                            <td>${att.Coords}</td>
                            <td>${att.IP}</td>
                            <td>${formatoCorregido}</td>
                            <td>${att.Status == true ? "Active" : "Inactive" }</td>
                            </tr>`
                            document.querySelector('#flush-collapseOne tbody').innerHTML += tr;
                        });
                        printTodayAttendances(attendances.length)
                    }
        
                    toastFill(response)
                }
            },
            error: function(error) {
                // Manejar errores de AJAX aquí
                deleteCookie("DataUser")
                console.log(getCookie("DataUser"))
                console.error("Error en la petición.");
                loadPartialView("Users/login", document.querySelector(".main"));
            }
        });
    }else{
        tokenError()
    }
}
function addAssistance(is_scheduleTriggered = false) {
    let token = getCookie("DataUser");
    if (token != null) {
        $.ajax({
            url: post_new_assistances_Route + token,
            method: 'POST',
            success: function(response) {
                // Manejar la respuesta del servidor aquí
                console.log(response);
                if (response.Success) {
                    
                    if (is_scheduleTriggered) {
                        getSchedule()
                    }else{
                        allAssistances()
                        myAssistances()
                        todayAssistances()
                    }
                }
                toastFill(response)
            },
            error: function(error) {
                // Manejar errores de AJAX aquí
                deleteCookie("DataUser")
                console.log(getCookie("DataUser"))
                console.error("Error en la petición.");
                loadPartialView("Users/login", document.querySelector(".main"));
            }
        });
    }
    else{
        tokenError()
    }
}
function printMyAttendances(numb) {
    let e = document.querySelector('.user_assistance_count');
    e.classList.remove('placeholder')
    e.innerText = numb;
}
function printTodayAttendances(numb) {
    let e = document.querySelector('.user_assistance_list');
    e.classList.remove('placeholder')
    e.innerText = numb;
}
function printAllAttendances(numb) {
    let e = document.querySelector('.user_assistance_history');
    e.classList.remove('placeholder')
    e.innerText = numb;
}