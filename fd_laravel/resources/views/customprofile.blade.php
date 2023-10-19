@extends('layouts.main')
@section('title', 'HOME')

@section('css')
    @vite(['resources/css/home.css'])
@endsection


@section('content')
<p id="my_id" hidden>{{ $user->id }}</p>
    @csrf



    </div>

    <section class="content-home">

        <div class="content-left">
            <div class="content-profile">
                <div class="content-my-picture">
                    <center>
                        @if ($user->picture == null and $user->id_gender == 1)
                            <img id="my_image" src="{{ asset('storage/imgs/avatar_men.png') }}" alt="">
                        @elseif ($user->picture == null and $user->id_gender == 2)
                            <img id="my_image" src="{{ asset('storage/imgs/avatar_woman.png') }}" alt="">
                        @else
                            <img id="my_image" src="{{ asset('storage/imgs/' . $user->picture) }}" alt="">
                        @endif
                    </center>
                </div>
                <h1 id="my_name">{{ $user->name }}</h1>
            </div>
            <div class="content-info-profile">
                <div>
                    <b>CORREO</b>
                    <p>{{ $user->email }}</p>
                </div>
                <div><b>TÈLEFONO</b>
                    @if ($user->phone == null)
                        <p>NO REGISTRADO</p>
                    @else
                        <p>{{ $user->phone }}</p>
                    @endif

                </div>
                <div> <b>CIUDAD</b>
                    @if ($city == null)
                        <p>NO REGISTRADO</p>
                    @else
                        <p>{{ $city->city }}</p>
                    @endif
                </div>
                <div><b>FECHA DE NACIMIENTO</b>
                    @if ($user->birthdate == null)
                        <p>NO REGISTRADO</p>
                    @else
                        <p>{{ $user->birthdate }}</p>
                    @endif
                </div>




            </div>
            <div class="content-my-publications">
                <h1>MIS PUBLICACIONES</h1>
                <div class="pictures">
                    @foreach ($my_publications as $mp)
                        <div class="picture-my-pictures">
                            <img src="{{ asset('storage/imgs/' . $mp->picture) }}" alt="">
                        </div>
                    @endforeach
                </div>
                <div class="content-btn-more">
                    <a href="{{ route('home.details', $user->id)}}" id="btn_see_more">VER DETALLES</a>
                </div>
            </div>
        </div>
        <div class="content-right">
            @foreach ($publications as $p)
                <div class="publication">
                    <p hidden id="id_publication">{{ $p->id_publication }}</p>
                    <div class="publication-header">
                        <div class="publication-info-person">
                            <div class="only_info_person">
                                <div class="picture_publication">
                                    <a href="{{ route('home.details', $p->id) }}">
                                    @if ($p->picture == null and $p->id_gender == 1)
                                        <img id="your_picture" src="{{ asset('storage/imgs/avatar_men.png') }}"
                                            alt="">
                                    @elseif ($p->picture == null and $p->id_gender == 2)
                                        <img id="your_picture" src="{{ asset('storage/imgs/avatar_woman.png') }}"
                                            alt="">
                                    @else
                                        <img id="your_picture" src="{{ asset('storage/imgs/' . $p->picture) }}"
                                            alt="">
                                    @endif
                                </a>
                                </div>
                                <div class="info">
                                    <b id="name_publication">{{ $p->name }}</b>
                                    <p id="date_publication">{{ $p->date }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="publication-description-picture">
                            <p id="description_publication">{{ $p->description }}</p>
                        </div>
                    </div>
                    <div class="publication-content-picture">
                        <img id="image_publication" src="{{ asset('storage/imgs/' . $p->picture_publication) }}"
                            alt="">
                    </div>
                    <div class="publication-content-buttons">
                        <div class="content_like">
                            @php
                                $validate_like = false;
                            @endphp
                            @foreach ($likes as $l)
                                @if ($user->id == $l->id_user and $l->id_publication == $p->id_publication)
                                    @php
                                        $validate_like = true;
                                    @endphp
                                @endif
                            @endforeach

                            @if ($validate_like)
                                <i id="btn_like" style="color: #9376E0;" class="bi bi-heart-fill"></i>
                            @else
                                <i id="btn_like" class="bi bi-heart"></i>
                            @endif
                            @php
                                $total = 0;
                            @endphp
                            @foreach ($likes as $l)
                                @if ($l->id_publication == $p->id_publication)
                                    @php
                                        $total = $total + 1;
                                    @endphp
                                @endif
                            @endforeach
                            <p><b id="count_likes">{{ $total }}</b> LIKES </p>
                        </div>
                        <div class="content_comments">
                            <i id="btn_comment" class="bi bi-chat-square-fill"></i>
                            @php
                                $total = 0;
                            @endphp
                            @foreach ($comments as $c)
                                @if ($c->id_publication == $p->id_publication)
                                    @php
                                        $total = $total + 1;
                                    @endphp
                                @endif
                            @endforeach
                            <p> <b id="count_comments">{{ $total }}</b> COMENTARIOS </p>
                        </div>
                    </div>

                </div>
            @endforeach



        </div>


    </section>


@endsection

@section('js')
    <script>
        let rute_sond = "{{ asset('storage/sonds/sonido_like.mp3') }}";
        let rute_form_dates = "{{ route('home.save_dates_user') }}";
        let rute_form_publication = "{{ route('home.save_publication') }}";
        let = control_rute_imgs = "{{ asset('storage/imgs/') }}" + "/";
    </script>
    @if (session('dates_user'))
        <script>
            Swal.fire(
                'DATOS GURDADOS CON EXISTO',
                'Gracias por tu informaciòn!',
                'success'
            )
        </script>
    @endif

    @if (session('error_dates_publication'))
        <script>
            Swal.fire(
                'ERROR EN LOS DATOS DE PUBLICACIÒN',
                'Hubo un error en la informacion!',
                'error'
            )
        </script>
    @endif

    @if (session('succes_dates_publication'))
        <script>
            Swal.fire(
                'PUBLICACIÒN SUBIDA CON EXISTO',
                'Bien hecho!',
                'success'
            )
        </script>
    @endif
    @vite(['resources/js/home.js'])
@endsection
