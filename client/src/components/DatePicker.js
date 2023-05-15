import React, { Component } from 'react';

class DatePicker extends Component {

    constructor(props) {
        super(props);

        this.changeDate = this.changeDate.bind(this);
    }


    changeDate(e) {
        this.props.changeDate(e);
    }

    render() {
        const {date} = this.props;

        return (
            <div className='DatePicker'>
                <input type="date" value={date} onInput={this.changeDate}  />
                <div className='calendarIcon'>
                    <img src='/images/calendar.svg' alt='end date select' />
                </div>
                
            </div>
        )
    }
}

export default DatePicker;