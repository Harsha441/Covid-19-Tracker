import styled from "styled-components";

export const CustomCard = styled.div`
	border-top: 6px solid;
	border-color: ${(props) => {
		if (props.title === "Cases") {
			return "#e93232";
		} else if (props.title === "Recovered") {
			return "#5e9e60";
		} else {
			return "#ff2b2b";
		}
	}};
	border-radius: 10px;
	padding: 15px;
	box-shadow: 5px 5px 3px rgb(141, 136, 136);
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	width: 130px;
	margin-bottom: 20px;
	background-color: #ffffff;
`;

export const CustomElement = styled.p`
	color: ${(props) => {
		if (props.title === "Cases") {
			return "#e93232";
		} else if (props.title === "Recovered") {
			return "#5e9e60";
		} else {
			return "#ff2b2b";
		}
	}};
`;
