import React from "react";
import { Line } from "react-chartjs-2";

function LineGraph({ countryCasesData }) {
	const buildChartData = (data) => {
		let chartData = [];

		for (let date in data) {
			let newData = {
				x: date,
				y: data[date],
			};
			chartData.push(newData);
		}
		return chartData;
	};

	let chartData = buildChartData(countryCasesData);

	return (
		<div>
			<Line
				data={{
					datasets: [
						{
							backgroundColor: "#d90b34",
							borderColor: "#fa1744",
							data: chartData,
						},
					],
				}}
				options={{
					title: {
						display: true,
						text: "Cases per day",
						fontSize: 20,
					},
					legend: {
						display: true,
						position: "right",
					},
				}}
			/>
		</div>
	);
}

export default LineGraph;
