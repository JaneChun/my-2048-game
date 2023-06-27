import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Tile from './Tile';
import { getInitialGrid } from '../util/tile';

const GRID_SIZE = 4;

function Grid() {
	const [tileList, setTileList] = useState(getInitialGrid);

	useEffect(() => {
		window.addEventListener('keydown', handleInput);

		return () => {
			window.removeEventListener('keydown', handleInput);
		};
	});

	function handleInput(e) {
		switch (e.key) {
			case 'ArrowUp':
				moveUp();
				break;
			case 'ArrowDown':
				moveDown();
				break;
			case 'ArrowLeft':
				moveLeft();
				break;
			case 'ArrowRight':
				moveRight();
				break;
			default:
				break;
		}
	}

	function moveUp() {
		console.log('up');
	}
	function moveDown() {
		console.log('down');
	}
	function moveLeft() {
		console.log('left');
	}
	function moveRight() {
		console.log('right');
	}

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
