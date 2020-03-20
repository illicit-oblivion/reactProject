import React from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import {connect} from "react-redux"
import {changeDateFrom, changeDateTo, selection} from "./AC"


 class DayPickerAdvanced extends React.Component {
    constructor(props) {
        super(props);
        this.handleDayClick = this.handleDayClick.bind(this);
        this.handleDayMouseEnter = this.handleDayMouseEnter.bind(this);
        this.handleResetClick = this.handleResetClick.bind(this);
        this.state = this.getInitialState();
    }

    getInitialState() {
        return {
            /*from: null,
            to: null,*/
            enteredTo: null, // Keep track of the last day for mouseEnter.
        };
    }

    isSelectingFirstDay(from, to, day) {
        const isBeforeFirstDay = from && DayPicker.DateUtils.isDayBefore(day, from);
        const isRangeSelected = from && to;
        return !from || isBeforeFirstDay || isRangeSelected;
    }

    handleDayClick(day) {
        const { from, to } = this.props.dateInterval;
        if (from && to && day >= from && day <= to) {
            this.handleResetClick();
            return;
        }
        if (this.isSelectingFirstDay(from, to, day)) {
            this.props.changeDateFrom(day);
            this.props.changeDateTo(null);
            this.setState({
               /* from: day,
                to: null,*/
                enteredTo: null,
            });
        } else {
            this.props.changeDateTo(day);
            this.setState({
                enteredTo: day,
            });
        }
    }

    handleDayMouseEnter(day) {
        const { from, to } = this.state;
        if (!this.isSelectingFirstDay(from, to, day)) {
            this.setState({
                enteredTo: day,
            });
        }
    }

    handleResetClick() {
        this.props.changeDateTo(null);
        this.props.changeDateFrom(null);
        this.setState(this.getInitialState());
    }

    render() {
        const {enteredTo} = this.state;
        const { from, to } = this.props.dateInterval;
        const modifiers = { start: from, end: enteredTo };
        const disabledDays = { before: from };
        const selectedDays = [from, { from, to: enteredTo }];
        return (
            <div>
                <DayPicker
                    className="Range"
                    numberOfMonths={1}
                    fromMonth={from}
                    selectedDays={selectedDays}
                    disabledDays={disabledDays}
                    modifiers={modifiers}
                    onDayClick={this.handleDayClick}
                    onDayMouseEnter={this.handleDayMouseEnter}
                />
                <div>
                    {!from && !to && 'Please select the first day.'}
                    {from && !to && 'Please select the last day.'}
                    {from &&
                    to &&
                    `Selected from ${from.toLocaleDateString()} to
                ${to.toLocaleDateString()}`}{' '}
                    {from && to && (
                        <button className="link" onClick={this.handleResetClick}>
                            Reset
                        </button>
                    )}
                </div>
            </div>
        );
    }
}
export default connect((state)=>({
    dateInterval: state.filters.dateRange
}), { changeDateFrom, changeDateTo })(DayPickerAdvanced)
