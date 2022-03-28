import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Table, Button } from 'reactstrap';
import dateFormat from 'dateformat';

export default class AdminHome extends Component {
    constructor(){
        super()
        this.state = {
            bookings: [],
            status: 1,
            newBookingData: {host: "", purpose: "", pax: "", level_id: "", start_date: "", start_time: "", 
            duration: "", end_time: "", meeting_room_id: "" , status_id: 1},
        }
    }
    loadBooking(){
        axios.get('http://127.0.0.1:8000/api/bookings').then((response) => {
            this.setState({
                bookings:response.data
            })
        })
    }
    componentWillMount() {
        this.loadBooking();
    }
    render() {
        let bookings = this.state.bookings.map((booking) => {
            let status = booking.status_id
            let status_name
            if (status=='1') {
                status_name = <td>Pending</td>
              }
            else if (status=='2'){
                status_name = <td>Approve</td>
            }
            else if (status=='3'){
                status_name = <td>Cancel</td>
            }
            else if (status=='4'){
                status_name = <td>Deny</td>
            }
            else {
                status_name = <td>{booking.status_id}</td>
            }
            return (
                <tr key={booking.id}>
                    <td>{booking.id}</td>
                    <td>{booking.host}</td>
                    <td>{booking.start_date}</td>
                    { status_name }
                    <td>
                        <Button color="success" size="sm">
                        {/* // onClick={this.callUpdateBooking.bind(this, booking.id, booking.host, booking.start_date, booking.status)}> */}
                        Edit</Button>{'  '}
                        <Button color="danger" size="sm">
                        {/* // onClick={this.deleteBooking.bind(this, booking.id)}> */}
                        Delete</Button>
                    </td>
                </tr>
            )
        })
        return (
            <div className="container">
                <Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Host</th>
                            <th>Booking Date</th>
                            <th>Status</th>
                            <th>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings}
                    </tbody>
                </Table>
            </div>
        );
    }
}

// export default UserCreate;

if (document.getElementById('adminhome')) {
    ReactDOM.render(<AdminHome />, document.getElementById('adminhome'));
}

// Date.prototype.addMinutes = function(minutes) {
//     this.setMinutes(this.getMinutes() + minutes);
//     console.log(this);
//     return this;
// };
