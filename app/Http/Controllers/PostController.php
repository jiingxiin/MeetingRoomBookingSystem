<?php
namespace App\Http\Controllers;
use Illuminate\Support\Facades\Gate;
use Illuminate\Http\Request;
class PostController extends Controller
{
 public function create()
 {
 if (Gate::allows('isUser')) {
 dd('User allowed');
 } else {
 dd('You are not an User');
 }
 
 }
 public function edit()
 {
 if (Gate::allows('isAdmin')) {
 dd('Admin allowed');
 } else {
 dd('You are not an Admin');
 }
 }
 public function delete()
 { 
 if (Gate::allows('isAdmin')) {
 dd('Admin allowed');
 } else {
 dd('You are not Admin');
 }
}
}