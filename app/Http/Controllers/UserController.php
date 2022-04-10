<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MeetingRoomBooking;
use Carbon\Carbon;
use App\Models\Status; 
use App\Models\Level; 
use App\Models\MeetingRoom;
use Auth;
use Illuminate\Support\Facades\Gate;

class UserController extends Controller
{
    //
    function index(){
        return view('./employee/home');
    }

    function admin_index(){
    //    if (!Gate::allows('isAdmin')) {
    //        abort(403);
    //    }

        $data = array();
        $data['statuses'] = Status::all();
        $data['rooms'] = MeetingRoom::all();
        $data['bookings'] = MeetingRoomBooking::where('status_id',2)->get();
        $data['levels'] = Level::all();
        return view('./admin/home')->with('data', json_encode($data));
    }
}
