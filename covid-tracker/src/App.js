import React, { Component } from "react";

import InfoCard from "./components/InfoCard/InfoCard";
import { sortData, prettyPrintStat } from "./util";
import Table from "./components/Table/Table";

import numeral from "numeral";

import "./App.css";

import LineGraph from "./components/LineGraph/LineGraph";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			countriesList: [],
			country: "Worldwide",
			countryData: [],
			vaccinationData: [],
			flag: [],
			tableData: [],
			countryCasesData: [],
			casesType: "cases",
		};
	}

	componentDidMount() {
		this.fetchWorldwideData();
		this.fetchCountries();
		this.fetchWorldwideCasesData();
	}

	// fetch Worldwide Covid cases data from last 30 days

	fetchWorldwideCasesData = async () => {
		const url = "https://disease.sh/v3/covid-19/historical/all?lastdays=30";
		const options = {
			method: "GET",
		};
		const response = await fetch(url, options);
		const data = await response.json();

		this.setState({ countryCasesData: data.cases });
	};

	getVaccinationData = async () => {
		const { country } = this.state;
		const url =
			country === "Worldwide"
				? "https://disease.sh/v3/covid-19/vaccine/coverage?lastdays=1&fullData=false"
				: `https://disease.sh/v3/covid-19/vaccine/coverage/countries/${country}?lastdays=1&fullData=false`;
		const options = {
			method: "GET",
		};
		const response = await fetch(url, options);
		const fetchedData = await response.json();
		this.setState({ vaccinationData: fetchedData });
	};

	// fetch Worldwide Covid cases data

	fetchWorldwideData = async () => {
		const url = "https://disease.sh/v3/covid-19/all";
		const options = {
			method: "GET",
		};
		const response = await fetch(url, options);
		const fetchedData = await response.json();
		this.setState({ countryData: fetchedData });
	};

	// fetch Covid cases for the selected country

	fetchCountryCases = async () => {
		const { country } = this.state;
		const url =
			country === "Worldwide"
				? "https://disease.sh/v3/covid-19/historical/all?lastdays=30"
				: `https://disease.sh/v3/covid-19/historical/${country}?lastdays=30`;
		const options = {
			method: "GET",
		};
		const response = await fetch(url, options);
		const data = await response.json();
		if (country === "Worldwide") {
			this.setState({ countryCasesData: data.cases });
		} else {
			this.setState({ countryCasesData: data.timeline.cases });
		}
	};

	// fetch countries list and data

	fetchCountries = async () => {
		const url = "https://disease.sh/v3/covid-19/countries";
		const options = {
			method: "GET",
		};

		const response = await fetch(url, options);
		const data = await response.json();
		const updatedData = data.map((eachCountry) => ({
			country: eachCountry.country,
			id: eachCountry.countryInfo._id,
			countryflag: eachCountry.countryInfo.flag,
		}));
		let sortedData = sortData(data);
		this.setState({ countriesList: updatedData, tableData: sortedData });
	};

	// get the data for the selected country

	onChangeCountry = async (event) => {
		const countryCode = event.target.value;
		const url =
			countryCode === "Worldwide"
				? "https://disease.sh/v3/covid-19/all"
				: `https://disease.sh/v3/covid-19/countries/${countryCode}`;
		const options = {
			method: "GET",
		};
		const response = await fetch(url, options);
		const data = await response.json();
		this.setState({ countryData: data, country: countryCode });
		this.fetchCountryCases();
	};

	renderFlag = () => {
		const { countryData } = this.state;
		const { countryInfo } = countryData;
		const { flag } = countryInfo;
		return <img className="flag" alt="flag" src={flag} />;
	};

	render() {
		const { country, countryData, countriesList, tableData, countryCasesData } =
			this.state;
		const {
			cases,
			deaths,
			recovered,
			todayCases,
			todayDeaths,
			todayRecovered,
		} = countryData;

		return (
			<div className="app">
				<div className="app-header">
					<h1 className="app-heading">COVID-19 Tracker</h1>
					<select
						name="countries"
						className="dropdown"
						onChange={this.onChangeCountry}
					>
						<option value="Worldwide">Worldwide</option>
						{countriesList.map((eachCountry) => (
							<option value={eachCountry.country}>{eachCountry.country}</option>
						))}
					</select>
				</div>
				<div className="app-data-container">
					<div className="app-left">
						<div className="covid-data-container">
							<div className="heading-container">
								<h1 className="heading">{country}</h1>
								{country !== "Worldwide" ? this.renderFlag() : null}
							</div>

							<div className="data-container">
								{/* Total Cases */}
								<InfoCard
									title="Cases"
									cases={prettyPrintStat(cases)}
									today={numeral(todayCases).format("0.0a")}
								/>
								{/* Recovered Cases */}
								<InfoCard
									title="Recovered"
									cases={prettyPrintStat(recovered)}
									today={numeral(todayRecovered).format("0.0a")}
								/>
								{/* Deaths */}
								<InfoCard
									title="Deaths"
									cases={prettyPrintStat(deaths)}
									today={numeral(todayDeaths).format("0.0a")}
								/>
							</div>
						</div>
						<div className="graph-container">
							{/*Graph */}
							<LineGraph countryCasesData={countryCasesData} />
						</div>
					</div>
					<div className="app-right">
						<h2>Live Cases by country</h2>
						<div className="table-header-container">
							{/* Table*/}
							<tr className="table-header">
								<td></td>
								<td>Country</td>
								<td>Cases</td>
								<td>Today Cases</td>
							</tr>
						</div>
						<Table countries={tableData} />
					</div>
				</div>
			</div>
		);
	}
}

export default App;
