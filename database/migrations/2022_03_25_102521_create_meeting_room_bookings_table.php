<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMeetingRoomBookingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('meeting_room_bookings', function (Blueprint $table) {
            $table->id();
            $table->string('host'); //the user
            $table->text('purpose');
            $table->integer('pax');
            $table->integer('level_id'); //foreign key to Levels
            $table->date('start_date');
            $table->time('start_time');
            // $table->integer('duration');
            $table->time('end_time');
            $table->integer('meeting_room_id'); //foreign key to MeetingRooms
            $table->integer('status_id'); //foreign key to Statuses
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('meeting_room_bookings');
    }
}
