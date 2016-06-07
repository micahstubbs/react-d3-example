import React, { Component } from 'react';
import d3 from 'd3';

import Meta from './BaseComponent';
import StatesMap from './StatesMap';

class Title extends Meta {
	getYearsFragment() {
		let years = this.getYears();
		let title;

		if (years.length > 1) {
			title = '';
		} else {
			title = `in ${years[0]}`;
		}

		return title;
	}

	getUSStateFragment() {
		let states = this.getUSStates();
		let title;

		if (states.length > 1) {
			title = '';
		} else {
			title = `in ${StatesMap[states[0].toUpperCase()]}`;
		}

		return title;
	}

	render() {
		let mean = d3.mean(
			this.props.data,
			d => d.base_salary
		);
		let format = this.getFormatter();

		let yearsFragment = this.getYearsFragment();
		let USstateFragment = this.getUSStateFragment();
		let title;

		if(yearsFragment && USstateFragment) {
			title = (
				<h2>
					{USstateFragment}, workers with H1B visas in the software industry made
						${format(mean)}/year {yearsFragment}
				</h2>
			)
		} else {
			title = (
				<h2>
					Workers with H1B visas in the software
						industry {yearsFragment.length ? 'made' : 'make'} ${format(mean)}/year {USstateFragment}
						{yearsFragment}
				</h2>
			)
		}

		return title;
	}
}

export default Title;