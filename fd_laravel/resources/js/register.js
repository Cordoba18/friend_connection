



let form_code = '<h2>INGRESE EL CODIGO</h2>' +
    '<form action="" method="POST">' +
    '<p id="message_code"></p>' +
    '<label>CODIGO</label>' +
    '<input id="code" type="number" inputmode="none" maxlength="4" inputmode="numeric" pattern="[0-9]*" placeholder="INGRESE EL CODIGO" name="code" required>' +
    '<p id="error_code" hidden></p>' +
    '<button id="btn_verificar" type="submit">VERIFICAR</button>' +
    '<a href="'+route_login+'">Si tengo cuenta</a>' +
    '</form>';

let content_form = document.querySelector('.content-form');
const btn_save_info_register = document.querySelector('#btn_save_info_register');
let error_form = document.querySelector('#error');

btn_save_info_register.addEventListener('click', function (e) {
    e.preventDefault();
    const _token = document.querySelector("input[name=_token]").value;

    const email = document.querySelector('#email');
    const gender = document.querySelector('#gender');
    const name = document.querySelector('#name');
    const password1 = document.querySelector('#password1');
    const password2 = document.querySelector('#password2');
    error_form.style.color = 'red';
    if (largotextos(name.value)) {
        error_form.innerHTML = "NOMBRE NO VALIDO";
        error_form.removeAttribute('hidden');
    } else
    if (gender.value == "") {
        error_form.innerHTML = "SELECCIONE UN GENERO";
        error_form.removeAttribute('hidden');
    } else
        if (!validate_email(email.value) || email.value == "") {
            error_form.innerHTML = "CORREO NO VALIDO";
            error_form.removeAttribute('hidden');
        } else if (password1.value != password2.value) {
            error_form.innerHTML = "LAS CONTRASEÑAS NO COINCIDEN";
            error_form.removeAttribute('hidden');
        } else if (!tieneMayuscula(password1.value) || !tieneMinuscula(password1.value) || !tieneNumero(password1.value)) {
            error_form.innerHTML = "La contraseña debe contener al menos una mayuscula, una minuscula y un numero";
            error_form.removeAttribute('hidden');
        } else if (!largocontrasena(password1.value)) {
            error_form.innerHTML = "La contraseña debe ser de mayor a 8 o menor a 15 caracteres";
            error_form.removeAttribute('hidden');
        } else {
            error_form.innerHTML = "VALIDANDO USUARIO....";
            error_form.removeAttribute('hidden');
            error_form.style.color = 'green';
            $.ajax({
                type: "POST",
                url: "register/validate_email",
                data: {
                    email: email.value,
                    name: name.value,
                    _token: _token,
                },
                success: function (response) {
                    error_form.setAttribute('hidden', 'true');
                    if (response['message'] == true) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Ya estas registrado en nuestro sistema'
                        })

                    } else {
                        let code = response['message'];
                        content_form.innerHTML = form_code;
                        let timerInterval
                        Swal.fire({
                            title: 'ENVIANDO CODIGO DE VERIFICACION',
                            html: 'Enviando codigo tiempo : <b></b> milisegundos.',
                            timer: 2000,
                            timerProgressBar: true,
                            didOpen: () => {
                                Swal.showLoading()
                                const b = Swal.getHtmlContainer().querySelector('b')
                                timerInterval = setInterval(() => {
                                    b.textContent = Swal.getTimerLeft()
                                }, 100)
                            },
                            willClose: () => {
                                clearInterval(timerInterval)
                            }
                        }).then((result) => {
                            activate_form_code(code, email.value, password1.value, name.value, gender.value, _token);
                        })


                    }


                },
                error: function (error) {
                    // Manejar el error si lo hay
                    console.error(error);
                }
            });
        }
})


function activate_form_code(code, email, password, name, gender, _token) {

    const message_code = document.querySelector('#message_code');
    message_code.innerHTML = 'Hemos enviado un codigo de verificacion a ' + email;
    const btn_verificar = document.querySelector('#btn_verificar');

    btn_verificar.addEventListener('click', function (e) {
        e.preventDefault();
        const verify_code = document.querySelector('#code');
        let error_code = document.querySelector('#error_code');
        if (verify_code.value == code) {
            error_code.setAttribute('hidden', 'true');

            $.ajax({
                type: "POST",
                url: "register/new_user",
                data: {
                    email: email,
                    name: name,
                    password: password,
                    gender: gender,
                    _token: _token,
                },
                success: function (response) {

                    if (response['message'] == true) {
                        Swal.fire({
                            icon: 'success',
                            title: 'USUARIO CREADO',
                            text: 'Gracias por ser parte de nosotros!',
                          })

                          setTimeout(() => {
                            window.location = "home";
                          }, 2000);


                    } else {

                    }


                },
                error: function (error) {
                    // Manejar el error si lo hay
                    console.error(error);
                }
            });

        } else {

            error_code.removeAttribute('hidden');
            error_code.innerHTML = 'CODIGO INCORRECTO';

        }


    })
}


function validate_email(texto) {
    const patron1 = /@gmail\.com/;

    const resultado1 = texto.search(patron1);
    const patron2 = /@hotmail\.com/;

    const resultado2 = texto.search(patron2);
    const patron3 = /@outlook\.com/;

    const resultado3 = texto.search(patron3);

    if (resultado1 !== -1  || resultado2 !== -1 || resultado3 !== -1) {
        return true;
    } else {
        return false;
    }
}



function tieneMayuscula(texto) {
    for (let i = 0; i < texto.length; i++) {
        if (texto[i] !== texto[i].toLowerCase()) {
            return true;
        }
    }
    return false;
}
//metodo para encontrar minusculas en un texto
function tieneMinuscula(texto) {
    for (let i = 0; i < texto.length; i++) {
        if (texto[i] !== texto[i].toUpperCase()) {
            return true;
        }
    }
    return false;
}
//metodo para encontrar numeros en un texto
function tieneNumero(texto) {
    for (let i = 0; i < texto.length; i++) {
        if (!isNaN(texto[i])) {
            return true;
        }
    }
    return false;
}
//mvalidar el largo permitido de la contraseña

function largocontrasena(texto) {
    if (texto.length > 15 || texto.length < 8) {
        return false;
    } else {
        return true;
    }
}

function largotextos(texto) {
    if (texto.length > 100 || texto.length <= 0) {
        return true;
    } else {
        return false;
    }
}
