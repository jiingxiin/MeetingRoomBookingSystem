<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\MeetingRoomBooking;

class Status extends Model
{
    use HasFactory;
    public $timestamps = false;

    public function getMeetingRoomBooking(){
        return $this->hasMany(MeetingRoomBooking::class);
    }
}
