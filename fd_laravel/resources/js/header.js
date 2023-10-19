
const my_name = document.querySelector('#my_name').textContent;
const my_id = document.querySelector('#my_id').textContent;
function btn_x_action(btn_x, screnn) {
    btn_x.addEventListener('click', function (e) {

        screnn.style.opacity = 0;

        setTimeout(() => {
            screnn.remove();
        }, 1000);


    })
}
try {

    const btn_x = document.querySelector('#btn_x');
    const warning = document.querySelector('.warning');
    btn_x_action(btn_x, warning);

} catch (error) {

}
const _token = document.querySelector("input[name=_token]").value;
let edit_dates = `
<div class="content_edit_dates">

    <div class="edit_dates">
        <i id="btn_x" class="bi bi-x-circle"></i>
        <h1>EDITAR DATOS</h1>
        <div class="content_edit_mypicture">
            <div class="content_mypicture_dates">
                <center>

                    <img id="my_image_publication" src="" alt="">


                </center>
            </div>
            <form action="${rute_form_dates}" method="post" enctype="multipart/form-data">
                <input type="hidden" name="_token" value="${_token}" autocomplete="off">
                <label>FOTO DE PERFIL</label>
                <input type="file" name="image" id="image" accept="image/*">
                <label>NOMBRE COMPLETO</label>
                <input type="text" placeholder="INGRESE SU NOMBRE" name="name" id="name">
                <label>TÈLEFONO </label>
                <input type="number" placeholder="INGRESE SU TÈLEFONO" name="phone" id="phone">
                <label>FECHA DE NACIMIENTO </label>
                <input type="date" name="birthdate" id="birthdate">
                <label>DEPARTAMENTO</label>
                <select id="departamets" id="">
                </select>
                <label>CIUDADES</label>
                <select id="citys" name="city" disabled>
                <option value="">SELECCIONE UN DEPARTAMENTO</option>
                </select>
                <p id="error_edit_dates" hidden></p>
                <button type="submit" id="btn_save_dates">GUARDAR CAMBIOS</button>
            </form>

        </div>
    </div>
</div>`;

const contenido = document.querySelector('.contenido');
let menu = ` <div class="menu">

<div class="content_menu activate_menu">
    <div class="content_header_menu">
       <h1>PERFIL</h1>
    </div>
    <div class="content_full_menu">
        <button id="btn_upload_publication"><i class="bi bi-card-image"></i>SUBIR UNA PUBLICACION</button>
        <button id="btn_edit_dates"><i class="bi bi-pencil-square"></i>EDITAR MIS DATOS</button>
        <button id="btn_closed_session"><i class="bi bi-box-arrow-left"></i>CERRAR SESION</button>
        <button id="btn_delete_account"><i class="bi bi-trash"></i>ELIMINAR CUENTA</button>
        <button><i class="bi bi-x-octagon"></i>CERRAR</button>
    </div>
</div>

</div>`;
let upload_publication = `  <div class="content_upload_publication">
<div class="upload_publication">
    <i id="btn_x" class="bi bi-x-circle"></i>
    <div class="form_upload_publication">
        <h1>SUBIR PUBLICACION</h1>
        <div class="form_upload_publication_header">
            <div class="form_upload_publication_header_my_image">

            <img id="my_image_publication" alt="">
            </div>
            <h1 id="my_name"></h1>
        </div>
        <form action="${rute_form_publication}" method="post" enctype="multipart/form-data">
        <input type="hidden" name="_token" value="${_token}" autocomplete="off">
            <label >IMAGEN DE LA PUBLICACIÒN</label>
            <input type="file" name="image" accept="image/*" placeholder="hola">
            <label >DESCRIPCIÒN DE LA PUBLICACIÒN</label>
            <textarea name="description" id="description"></textarea>
            <button id="btn_save_publication">SUBIR PUBLICACION</button>
        </form>
    </div>
</div>
</div>`;
const btn_open_menu = document.querySelector('#btn_open_menu');

btn_open_menu.addEventListener('click', function (e) {

    contenido.innerHTML = menu;

    const content_menu = document.querySelector('.content_menu');
    const form_menu = document.querySelector('.menu');
    closed_contenido(form_menu, content_menu);
    activate_buttons_menu();
})

function closed_contenido(form_menu, content,) {

    content.addEventListener('click', function (e) {

        content.classList.remove("activate_menu");
        content.classList.add("desactive_menu");
        setTimeout(() => {
            form_menu.remove();
        }, 400);


    })

}


function activate_buttons_menu() {


    const btn_delete_account = document.querySelector('#btn_delete_account');
    const btn_edit_dates = document.querySelector('#btn_edit_dates');
    const btn_upload_publication = document.querySelector('#btn_upload_publication');
    const _token = document.querySelector("input[name=_token]").value;

    var boolean_info_validate_dates = true;
    const btn_closed_session = document.querySelector('#btn_closed_session');
    try {
        const info_validate_dates = document.querySelector('#info_validate_dates').textContent;
        boolean_info_validate_dates = false;

    } catch (error) {

    }
    btn_delete_account.addEventListener('click', function (e) {

        setTimeout(() => {

            Swal.fire({
                title: 'Estas seguro de eliminar tu cuenta?',
                text: "Tu cuenta sera eliminada y no podras ingresar con ella.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Eliminar!'
            }).then((result) => {
                if (result.isConfirmed) {
                    $.ajax({
                        type: "POST",
                        url: "../../delete_user",
                        data: {
                            _token: _token,
                        },
                        success: function (response) {

                            if (response['message'] == true) {
                                Swal.fire(
                                    'Eliminado!',
                                    'El usuarion usuario a sido eliminado',
                                    'success'
                                )

                                setTimeout(() => {
                                    window.location = "login";
                                }, 3000);

                            }


                        },
                        error: function (error) {
                            // Manejar el error si lo hay
                            console.error(error);
                        }
                    });


                }
            })
        }, 800);
    })

    btn_closed_session.addEventListener('click', function (e) {
        setTimeout(() => {
            $.ajax({
                type: "POST",
                url: "../../closed_session",
                data: {
                    _token: _token,
                },
                success: function (response) {

                    if (response['message'] == true) {
                        Swal.fire(
                            'SESIÒN CERRADA',
                            'Redireccionando.............',
                            'success'
                        )

                        setTimeout(() => {
                            window.location = "login";
                        }, 1500);

                    }


                },
                error: function (error) {
                    // Manejar el error si lo hay
                    console.error(error);
                }
            });
        }, 800);



    })


    btn_upload_publication.addEventListener('click', function (e) {
        console.log(boolean_info_validate_dates);
        setTimeout(() => {
            if (boolean_info_validate_dates == true) {
                loading_upload_publication();

            } else {
                Swal.fire(
                    'NO PUEDES PUBLICAR',
                    'Completa tus datos para hacer publicaciones',
                    'error'
                )
            }
        }, 800);
    })


    btn_edit_dates.addEventListener('click', function (e) {

        setTimeout(() => {
            loading_form_dates();
        }, 800);
    })

}

function loading_upload_publication() {
    contenido.innerHTML = upload_publication;
    const btn_x = document.querySelector('#btn_x');
    const cont_upload_publication = document.querySelector('.content_upload_publication');
    btn_x_action(btn_x, cont_upload_publication);
    const my_name = document.querySelector('#my_name');
    const my_image = document.querySelector('#my_image_publication');
    $.ajax({
        type: "GET",
        url: "../loading_dates_user",
        success: function (response) {

            if (response['message']) {

                let final_img = '';
                if (response['message']['picture'] == null && response['message']['id_gender'] == 1) {
                    final_img = control_rute_imgs + 'avatar_men.png';

                } else if (response['message']['picture'] == null && response['message']['id_gender'] == 2) {
                    final_img = control_rute_imgs + 'avatar_woman.png';
                } else {
                    final_img = control_rute_imgs + response['message']['picture'];
                }
                my_name.innerHTML = response['message']['name'];
                my_image.src = final_img;
            }


        },
        error: function (error) {
            // Manejar el error si lo hay
            console.error(error);
        }
    });
}

function loading_form_dates() {
    contenido.innerHTML = edit_dates;
    const btn_x = document.querySelector('#btn_x');
    const content_edit_dates = document.querySelector('.content_edit_dates');
    btn_x_action(btn_x, content_edit_dates);
    const name = document.querySelector('#name');
    const phone = document.querySelector('#phone');
    const departamets = document.querySelector('#departamets');
    const citys = document.querySelector('#citys');
    const my_image = document.querySelector('#my_image_publication');

    $.ajax({
        type: "GET",
        url: "../loading_dates_user",
        success: function (response) {

            if (response['message']) {
                name.value = response['message']['name'];
                phone.value = response['message']['phone'];

                let final_img = '';
                if (response['message']['picture'] == null && response['message']['id_gender'] == 1) {
                    final_img = control_rute_imgs + 'avatar_men.png';

                } else if (response['message']['picture'] == null && response['message']['id_gender'] == 2) {
                    final_img = control_rute_imgs + 'avatar_woman.png';
                } else {
                    final_img = control_rute_imgs + response['message']['picture'];
                }
                my_image.src = final_img;

            }


        },
        error: function (error) {
            // Manejar el error si lo hay
            console.error(error);
        }
    });

    $.ajax({
        type: "GET",
        url: "../loading_departaments",
        success: function (response) {

            if (response['message']) {

                response['message'].forEach(departamet => {
                    departamets.innerHTML = departamets.innerHTML + `<option value="${departamet['id']}">${departamet['departament']}</option>`;
                });
            }


        },
        error: function (error) {
            // Manejar el error si lo hay
            console.error(error);
        }
    });

    departamets.addEventListener('change', function (e) {
        citys.removeAttribute('disabled');
        const departamet = document.querySelector('#departamets').value;
        $.ajax({
            type: "GET",
            url: "../loading_citys/" + departamet,
            success: function (response) {

                if (response['message']) {
                    citys.innerHTML = "";
                    response['message'].forEach(city => {
                        citys.innerHTML = citys.innerHTML + `<option value="${city['id']}">${city['city']}</option>`;
                    });
                }
            },
            error: function (error) {
                // Manejar el error si lo hay
                console.error(error);
            }
        });
    })

}
