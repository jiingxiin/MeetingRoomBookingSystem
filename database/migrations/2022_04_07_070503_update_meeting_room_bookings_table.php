<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateMeetingRoomBookingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('meeting_room_bookings', function (Blueprint $table) {            
            $table->renameColumn('host', 'host_id'); 
        });
        Schema::table('meeting_room_bookings', function (Blueprint $table) {            
            $table->integer('host_id')->change(); 

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
