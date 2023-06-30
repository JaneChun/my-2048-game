import React, { useState } from 'react';
import styled from 'styled-components';
import Tile from './Tile';
import { getInitialGrid } from '../util/tile';
import useHandleKeyboard from '../util/useHandleKeyboard';

const GRID_SIZE = 4;

function Grid() {
	const [tileList, setTileList] = useState(getInitialGrid);
	useHandleKeyboard({ tileList, setTileList });

	return (
		<Board>
			{new Array(GRID_SIZE * GRID_SIZE).fill(0).map((_, i) => (
				<Cell key={i} />
			))}
			{tileList.map((item) => (
				<Tile key={item.id} {...item} />
			))}
		</Board>
	);
}

const Board = styled.div`
	--cell-size: 20vmin;
	--cell-gap: 2vmin;
	display: grid;
	grid-template-rows: repeat(${GRID_SIZE}, var(--cell-size));
	grid-template-columns: repeat(${GRID_SIZE}, var(--cell-size));
	background-color: white;
	gap: var(--cell-gap);
	border-radius: 1vmin;
	padding: var(--cell-gap);
	position: relative;
`;

const Cell = styled.div`
	background-color: lightgray;
	border-radius: 1vmin;
`;

export default Grid;
