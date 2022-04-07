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
        $this->validate($req, [
            'host_id' => 'required | integer',
            'purpose' => 'required | string',
            'pax' => 'required | integer',
            'level_id' => 'required | integer',
            'start_date' => 'required | date_format:Y-m-d',
            'start_time' => 'required | date_format:H:i',
            'end_time' => 'required | after:start_time',
            'meeting_room_id' => 'required | integer',
            'status_id' => 'required | integer'
        ]);
        $booking = new MeetingRoomBooking;
        $booking->host_id = $req->host_id;
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
        $data['statuses'] = Status::all();
        $data['rooms'] = MeetingRoom::all();
        $data['bookings'] = MeetingRoomBooking::where('status_id',2)->get();
        $data['levels'] = Level::all();
        return view('welcome')->with('data', json_encode($data));
    }

    public function passInfoAdmin()
    {
        $data = array();
        $data['statuses'] = Status::all();
        $data['rooms'] = MeetingRoom::all();
        $data['bookings'] = MeetingRoomBooking::where('status_id',2)->get();
        $data['levels'] = Level::all();
        return view('admin-home')->with('data', json_encode($data));
    }

    public function update(Request $req, $id){
        $this->validate($req, [
            'host_id' => 'required | integer',
            'purpose' => 'required | string',
            'pax' => 'required | integer',
            'level_id' => 'required | integer',
            'start_date' => 'required | date_format:Y-m-d',
            'start_time' => 'required | date_format:H:i:s',
            'end_time' => 'required | after:start_time',
            'meeting_room_id' => 'required | integer',
            'status_id' => 'required | integer'
        ]);

        $data = MeetingRoomBooking::find($id);
        $data->update($req->all());
        return $data;
    }

    public function delete($id){
        $data = MeetingRoomBooking::find($id);
        $data->delete();
        return $data;
    }
}
