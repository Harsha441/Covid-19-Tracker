import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Legend,
	ResponsiveContainer,
} from "recharts";

const Graph = ({ countryCasesData }) => {
	const dataFormatter = (number) => {
		if (number > 1000) {
			return `${(number / 1000).toString()}k`;
		}
		return number.toString();
	};

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
	console.log(chartData);

	return (
		<ResponsiveContainer width="100%" height={500}>
			<BarChart width={900} height={400} data={chartData} margin={{ top: 5 }}>
				<XAxis
					dataKey="x"
					tick={{
						stroke: "#6c757d",
						strokeWidth: 1,
						fontSize: 15,
						fontFamily: "Roboto",
					}}
				/>
				<YAxis
					dataKey="y"
					tick={{
						stroke: "#6c757d",
						strokeWidth: 0.5,
						fontSize: 15,
						fontFamily: "Roboto",
					}}
				/>
				<Legend
					wrapperStyle={{
						paddingTop: 20,
						textAlign: "center",
						fontSize: 12,
						fontFamily: "Roboto",
					}}
				/>
				<Bar
					dataKey="y"
					name="data"
					fill="#5a8dee"
					radius={[10, 10, 0, 0]}
					barSize="20%"
				/>
			</BarChart>
		</ResponsiveContainer>
	);
};

export default Graph;
