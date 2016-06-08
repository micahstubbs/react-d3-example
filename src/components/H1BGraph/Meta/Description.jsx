import React, { Component } from 'react';
import d3 from 'd3';

import Meta from './BaseComponent';
import StatesMap from './StatesMap';

class Description extends Meta {
	getAllDataByYear(year, data) {
		data || (data = this.props.allData);

		return data.filter(d => d.submit_date.getFullYear() == year);
	}

	getAllDataByUSState(USstate, data) {
		data || (data = this.props.allData);

		return data.filter(d => d.state == USstate);
	}

	getPreviousYearFragment() {
		let years = this.getYears().map(Number);
		let fragment;

		if (years.length > 1) {
			fragment = '';
		} else if (years[0] == 2012) {
			fragment = '';
		} else {
			let year = years[0];
			let lastYear = this.getAllDataByYear(year - 1);
			let USstates = this.getUSStates();

			if (USstates.length == 1) {
				lastYear = this.getAllDataByState(USstates[0], lastYear);
			}

			if (this.props.data.length / lastYear.length > 2) {
				let times_more = (this.props.data.length / lastYear.length).toFixed();
				fragment = `, ${times_more} times more than the year before`;	
			} else {
				let percent = ((1 - lastYear.length / this.props.data.length) * 100).toFixed();
				fragment = `, ${Math.abs(percent)}% ${percent > 0 ? 'more' : 'less'} than
					the year before`;
			}
		}

		return fragment;
	}

	getYearFragment() {
		let years = this.getYears();
		let fragment;

		if (years.length > 1) {
			fragment = '';
		} else {
			fragment = `In ${years[0]}`;
		}

		return fragment;
	}

	getUSStateFragment() {
		let states = this.getUSStates();
		let fragment;

		if (states.length > 1) {
			fragment = 'US';
		} else {
			fragment = StatesMap[states[0].toUpperCase()];
		}

		return fragment;
	}

	render() {
		let formatter = this.getFormatter();
		let mean = d3.mean(
			this.props.data,
			d => d.base_salary
		);
		let deviation = d3.deviation(
			this.props.data,
			d => d.base_salary
		);

		let yearFragment = this.getYearFragment();
		let USStateFragment = this.getUSStateFragment();
		let previousYearFragment = this.getPreviousYearFragment();
		let N = formatter(this.props.data.length);
		let min_salary = formatter(mean - deviation);
		let max_salary = formatter(mean + deviation);

		return (	
			<p className='lead'>
				{yearFragment.length ? yearFragment : 'Since 2009'} the {USStateFragment} software
				industry {yearFragment.length ? 'gave' : 'has given'} jobs to {N} foreign 
				nationals{previousYearFragment}. Most of them made between ${min_salary} and
				${max_salary} per year.  
			</p>
		)
	}
}

export default Description;