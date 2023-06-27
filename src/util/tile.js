// 첫 타일 2개
export function getInitialGrid() {
	const initialTileList = [];
	const tile1 = makeTile(initialTileList);
	initialTileList.push(tile1);
	const tile2 = makeTile(initialTileList);
	initialTileList.push(tile2);

	return initialTileList;
}

// 충돌 체크 함수
function checkCollision(tileList, tile) {
	return tileList.some((item) => item.x === tile.x && item.y === tile.y);
}

let currentId = 0;

// 새로운 타일 만드는 함수
export function makeTile(tileList) {
	let tile;
	while (!tile || checkCollision(tileList, tile)) {
		tile = {
			id: currentId++,
			x: Math.floor(Math.random() * 3),
			y: Math.floor(Math.random() * 3),
			value: 2,
		};
	}
	return tile;
}
