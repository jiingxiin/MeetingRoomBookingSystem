@extends('layouts.app')
@section('content')

<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
        <link href="/css/app.css" rel="stylesheet">
        <!-- Styles -->

        <style>
        h1{
            text-align:center;
            padding-bottom:30px;
        }
        </style>
    </head>
    <body class="antialiased">
        <div class="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center py-4 sm:pt-0">

            @if (session('status'))
            <div class="alert alert-success" role="alert">
            {{ session('status') }}
            </div>
            @endif
            
            @can('isAdmin')
            <h1>Welcome To Admin Dashboard</h1>
            @else
            <h1>Welcome To Employee Dashboard</h1>
            @endcan
        
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-md-8">
                        <div class="card">
                            <div class="card-header">Booked Meeting Rooms</div>
                                <div class="card-body">

                                    <div id='adminhome' data='{{$data}}'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </body>
    <script src="/js/app.js"></script>
</html>
@endsection
