
var today = new Date();

// Agrega 30 días a la fecha actual
var nextMonthDate = new Date(today);
nextMonthDate.setDate(nextMonthDate.getDate() + 30);

// Formatea la fecha en el formato deseado
var formattedDate = nextMonthDate.toLocaleDateString(); // Esto dará el formato de fecha dependiendo del locale del usuario

// Imprime la fecha
console.log("La fecha en 30 días será: " + formattedDate);
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
let my_image = document.querySelector('#my_image').src;
const _token = document.querySelector("input[name=_token]").value;
let edit_dates = `
<div class="content_edit_dates">

    <div class="edit_dates">
        <i id="btn_x" class="bi bi-x-circle"></i>
        <h1>EDITAR DATOS</h1>
        <div class="content_edit_mypicture">
            <div class="content_mypicture_dates">
                <center>

                    <img src="${my_image}" alt="">


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

            <img src="${my_image}" alt="">
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
                        url: "delete_user",
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
                url: "closed_session",
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
    $.ajax({
        type: "GET",
        url: "home/loading_dates_user",
        success: function (response) {

            if (response['message']) {
                my_name.innerHTML = response['message']['name'];
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

    $.ajax({
        type: "GET",
        url: "home/loading_dates_user",
        success: function (response) {

            if (response['message']) {
                name.value = response['message']['name'];
                phone.value = response['message']['phone'];
            }


        },
        error: function (error) {
            // Manejar el error si lo hay
            console.error(error);
        }
    });

    $.ajax({
        type: "GET",
        url: "home/loading_departaments",
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
            url: "home/loading_citys/" + departamet,
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

    //-------------------------------------ACCION FORM DATES------------------------
    // const error_edit_dates = document.querySelector('#error_edit_dates');
    // const btn_save_dates = document.querySelector('#btn_save_dates');
    // const validate_phone = document.querySelector('#validate_phone');
    // const _token = document.querySelector("input[name=_token]").value;
    // console.log(_token);
    // btn_save_dates.addEventListener('click', function (e) {
    //     const name = document.querySelector('#name');
    //     const phone = document.querySelector('#phone');
    //     const citys = document.querySelector('#citys');
    //     const birthdate = document.querySelector('#birthdate');
    //     var image = document.getElementById('image');

    //     var formData = new FormData();
    //     formData.append('image', image.files[0]);
    //     e.preventDefault();

    //     $.ajax({
    //         type: "POST",
    //         url: "home/save_dates_user",
    //         data: {
    //             image: formData,
    //             name: name.value,
    //             phone: phone.value,
    //             city: citys.value,
    //             birthdate:birthdate.value,
    //             _token:_token,
    //         },
    //         contentType: false,
    //         processData: false,


    //         success: function (response) {

    //             if (response['message'] == true) {
    //                 Swal.fire(
    //                     'DATOS INSERTADOS',
    //                     'Gracias por tu informacion',
    //                     'success'
    //                 )

    //             }


    //         },
    //         error: function (error) {
    //             // Manejar el error si lo hay
    //             console.error(error);
    //         }
    //     });

    // });


}



try {

    const publication = document.querySelectorAll('.publication');

    publication.forEach(p => {
        const id_publication = p.querySelector('#id_publication').textContent;
        const btn_like = p.querySelector('#btn_like');

        btn_like.addEventListener('click', function (e) {
            const count_likes = p.querySelector('#count_likes');
            $.ajax({
                type: "GET",
                url: "home/save_like/" + id_publication,
                success: function (response) {

                    if (response['message'] == 'like') {
                        btn_like.classList.remove("bi-heart");
                        btn_like.classList.add("bi-heart-fill");
                        const sonido_like = new Audio(rute_sond);
                        sonido_like.play();
                        setTimeout(() => {
                            btn_like.style.color = '#9376E0';
                        }, 300);


                    } else {

                        btn_like.classList.remove("bi-heart-fill");
                        btn_like.classList.add("bi-heart");
                        btn_like.style.color = 'black';
                    }

                    $.ajax({
                        type: "GET",
                        url: "home/add_likes/" + id_publication,
                        success: function (response) {

                            if (response['message'] == null) {
                                count_likes.textContent = 0;

                            } else {
                                count_likes.textContent = response['message'];
                            }
                        },
                        error: function (error) {
                            // Manejar el error si lo hay
                            console.error(error);
                        }
                    });

                },
                error: function (error) {
                    // Manejar el error si lo hay
                    console.error(error);
                }
            });
        })


        const btn_comment = p.querySelector('#btn_comment');
        const profiel_picture = p.querySelector('#your_picture').src;
        const name_publication = p.querySelector('#name_publication').textContent;
        const date_publication = p.querySelector('#date_publication').textContent;
        const description_publication = p.querySelector('#description_publication').textContent;

        const image_publication = p.querySelector('#image_publication').src;
        btn_comment.addEventListener('click', function (e) {

            let form_comments = `<div class="content_comment">
            <div class="comment">
                <i id="btn_x" class="bi bi-x-circle"></i>
                <div class="comment_header">
                    <div class="comment_header_picture">
                        <img src="${profiel_picture}" alt="">
                    </div>
                    <div class="comment_header_info">
                        <h1>${name_publication}</h1>
                        <p>${date_publication}</p>
                    </div>
                </div>
                <div class="comment_description">
                    <p>${description_publication}</p>
                </div>
                <div class="comment_picture">
                    <img src="${image_publication}" alt="">
                </div>
                <h1>COMENTARIOS</h1>
                <div class="content_all_comments">
                </div>

                <div class="form_comment">
                    <input type="text" placeholder="ESCRIBE UN COMENTARIO" id="text_comment">
                    <button id="btn_text_comment">COMENTAR</button>
                </div>
            </div>
        </div>
`;
            contenido.innerHTML = form_comments;
            const btn_x = document.querySelector('#btn_x');
            const content_comment = document.querySelector('.content_comment');
            btn_x_action(btn_x, content_comment);
            loading_funtion_comment(content_comment, id_publication);
            loading_comments(content_comment, id_publication);

        })
    });

} catch (error) {

}

function removecomment(id_publication) {
    const content_comment = document.querySelectorAll('.content_only_comments');

    content_comment.forEach(c => {
        const id_comment = c.querySelector('#id_comment').textContent;
        try {

        const btn_delete_comment = c.querySelector('#btn_delete_comment');
        btn_delete_comment.addEventListener('click', function name(e) {
            $.ajax({
                type: "POST",
                url: "home/delete_comment",
                data: {

                    id: id_comment,
                    _token: _token,
                },
                success: function (response) {

                    if (response['message'] == true) {
                        count_comments(id_publication);
                        c.style.opacity = 0;

                        setTimeout(() => {
                            c.remove();
                        }, 800);

                    }



                },
                error: function (error) {
                    // Manejar el error si lo hay
                    console.error(error);
                }
            });

        })

    } catch (error) {

    }

    });



}

function loading_funtion_comment(content_comment, id_publication) {
    const content_all_comments = content_comment.querySelector('.content_all_comments');
    const text_comment = content_comment.querySelector('#text_comment');
    const btn_text_comment = content_comment.querySelector('#btn_text_comment');

    btn_text_comment.addEventListener('click', function (e) {

        if (text_comment.value == "") {
        } else {

            $.ajax({
                type: "POST",
                url: "home/save_comment",
                data: {
                    comment: text_comment.value,
                    id_publication: id_publication,
                    _token: _token,
                },
                success: function (response) {

                    if (response['id_last_comment']) {
                        let final_img_comment = my_image;
                        let c = `<div class="content_only_comments">
                        <p id="id_comment" hidden>${response['id_last_comment']}</p>
                        <div class="content_only_comments_header">
                            <div class="content_only_comments_header_picture">
                                <img src="${final_img_comment}" alt="">
                            </div>
                            <div class="content_only_comments_header_info">
                                <h1>${my_name}</h1>
                                <p>${response['fechaColombiana']}</p>
                            </div>
                        </div>
                        <div class="content_only_comments_comment">
                            <p>${text_comment.value} </p><i id="btn_delete_comment" class="bi bi-trash-fill btn btn-danger"></i>
                        </div>
                    </div>`;
                        content_all_comments.innerHTML = c + content_all_comments.innerHTML;
                        text_comment.value = "";
                    }

                    removecomment(id_publication);
                    count_comments(id_publication);


                },
                error: function (error) {
                    // Manejar el error si lo hay
                    console.error(error);
                }
            });

        }

    })

}

function loading_comments(content_comment, id_publication) {

    const content_all_comments = content_comment.querySelector('.content_all_comments');
    $.ajax({
        type: "GET",
        url: "home/getcomments/" + id_publication,
        success: function (response) {

            if (response['message']) {

                response['message'].forEach(add_comment => {
                    let btn_delete = "";
                    if (add_comment['id_user'] == my_id) {
                        btn_delete = `<i id="btn_delete_comment" class="bi bi-trash-fill btn btn-danger"></i>`;
                    }
                    let final_img_comment = '';
                    if (add_comment['picture'] == null && add_comment['id_gender'] == 1) {
                        final_img_comment = control_rute_imgs + 'avatar_men.png';

                    } else if (add_comment['picture'] == null && add_comment['id_gender'] == 2) {
                        final_img_comment = control_rute_imgs + 'avatar_woman.png';
                    } else {
                        final_img_comment = control_rute_imgs + add_comment['picture'];
                    }

                    let c = `<div class="content_only_comments">
                    <p id="id_comment" hidden>${add_comment['id']}</p>
                    <div class="content_only_comments_header">
                        <div class="content_only_comments_header_picture">
                            <img src="${final_img_comment}" alt="">
                        </div>
                        <div class="content_only_comments_header_info">
                            <h1>${add_comment['name']}</h1>
                            <p>${add_comment['date']}</p>
                        </div>
                    </div>
                    <div class="content_only_comments_comment">
                        <p>${add_comment['comment']} </p>${btn_delete}
                    </div>
                </div>`;

                    content_all_comments.innerHTML = c + content_all_comments.innerHTML;

                });

            } else {

            }
            removecomment(id_publication);
        },
        error: function (error) {
            // Manejar el error si lo hay
            console.error(error);
        }
    });


}


function count_comments(id_publication) {


    const publications = document.querySelectorAll('.publication');

    publications.forEach(p => {

        const id = p.querySelector('#id_publication').textContent;

        const count_comments = p.querySelector('#count_comments');
        console.log(id_publication);
        if (id == id_publication) {

            $.ajax({
                type: "GET",
                url: "home/count_comments/"+id,
                success: function (response) {

                    if (response['message']) {
                        count_comments.textContent = response['message'];
                    }else{
                        count_comments.textContent = 0;
                    }


                },
                error: function (error) {
                    // Manejar el error si lo hay
                    console.error(error);
                }
            });
        }
    });



}




