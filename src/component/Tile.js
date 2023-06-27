import React from 'react';
import styled from 'styled-components';

function Tile({ x, y, value }) {
	const power = Math.log2(value);
	const backgroundLightness = 100 - power * 9;

	return (
		<TileDiv x={x} y={y} backgroundLightness={backgroundLightness}>
			{value}
		</TileDiv>
	);
}

const TileDiv = styled.div`
	--background-lightness: 20%;
	--text-lightness: 80%;
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	width: var(--cell-size);
	height: var(--cell-size);
	background-color: skyblue;
	border-radius: 1vmin;
	top: calc(${(props) => props.y} * (var(--cell-size) + var(--cell-gap)) + var(--cell-gap));
	left: calc(${(props) => props.x} * (var(--cell-size) + var(--cell-gap)) + var(--cell-gap));
	font-weight: bold;
	background-color: hsl(200, 50%, ${(props) => props.backgroundLightness}%);
	color: hsl(200, 25%, var(--text-lightness));
	color: hsl(200, 25%, ${(props) => (props.backgroundLightness <= 50 ? 90 : 10)}%);
	animation: show 200ms ease-in-out;
	transition: 100ms ease-in-out;

	@keyframes show {
		0% {
			opacity: 0.5;
			transform: scale(0);
		}
	}
`;

export default Tile;
