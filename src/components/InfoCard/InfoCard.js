import React from "react";
import "./InfoCard.css";
import {
	CustomCard,
	CustomElement,
} from "../StyledComponents/styledComponents";

function InfoCard({ title, cases, today }) {
	return (
		<CustomCard title={title}>
			<h1 className="title">{title}</h1>
			<CustomElement title={title} className="today-cases">
				+ {today}
			</CustomElement>
			<h2 className="cases">{cases}</h2>
		</CustomCard>
	);
}

export default InfoCard;
