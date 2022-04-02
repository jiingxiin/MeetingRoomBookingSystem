<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MeetingRoomBooking;
use Carbon\Carbon;
use App\Models\Status; 
use App\Models\Level; 
use App\Models\MeetingRoom;

class MeetingRoomBookingController extends Controller
{
    public function store(Request $req)
    {
        // $startDate = $req->start_date->toTimeString();
        // $startTime = $req->end_time->toTimeString();
        // $endTime = $req->end_time->toTimeString();
        $booking = new MeetingRoomBooking;
        $booking->host = $req->host;
        $booking->purpose = $req->purpose;
        $booking->pax = $req->pax;
        $booking->level_id = $req->level_id;
        $booking->start_date = $req->start_date;;
        $booking->start_time = $req->start_time;
        $booking->end_time = $req->end_time;
        $booking->meeting_room_id = $req->meeting_room_id;
        $booking->status_id = $req->status_id;
        $booking->save();
        return redirect("/user/home");
        // return MeetingRoomBooking::create($req->all());
    }

    public function showAll()
    {
        return MeetingRoomBooking::all();
    }

    public function passInfo()
    {
        $data = array();
        // $s = Status::all();
        // $mr = MeetingRoom::all();
        // foreach($s as $status){
        //     array_push($data)
        // }
        $data['statuses'] = Status::all();
        $data['rooms'] = MeetingRoom::all();
        $data['bookings'] = MeetingRoomBooking::where('status_id',2)->get();
        $data['levels'] = Level::all();
        // return view('welcome', ['statuses'=>$statuses]);
        return view('welcome')->with('data', json_encode($data));
    }
}
