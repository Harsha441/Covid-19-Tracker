import React from "react";
import "./Table.css";
import numeral from "numeral";

function Table({ countries }) {
	return (
		<div className="table"> 
			{countries.map((country) => (
				<tr>
					<td>
						<img
							src={country.countryInfo.flag}
							alt="flag"
							className="flag-img"
						/>
					</td>
					<td>
						<strong>{country.country}</strong>
					</td>
					<td>
						<strong>{numeral(country.cases).format("0,0")}</strong>
					</td>
					<td>
						<strong>{numeral(country.todayCases).format("0,0")}</strong>
					</td>
				</tr>
			))}
		</div>
	);
}

export default Table;
