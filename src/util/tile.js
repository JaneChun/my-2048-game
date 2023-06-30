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

// 타일 이동시키는 함수
export function slideTile(x, y, { tileList, setTileList }) {
	const isVerticalMove = y !== 0;
	const isMinus = x < 0 || y < 0; // true라면 위로 이동 또는 왼쪽 이동

	const sortedTileList = [...tileList].sort((tile1, tile2) => {
		// 수직으로 이동했다면 x를 기준으로 정렬, 수평으로 움직였다면 y를 기준으로 정렬
		const res = isVerticalMove ? tile1.x - tile2.x : tile1.y - tile2.y;

		if (res !== 0) {
			return res;
		} else {
			// 수직이동인데 같은 줄에 있을 때, 수평 이동인데 같은 줄에 있을 때
			if (isVerticalMove) {
				return isMinus ? tile1.y - tile2.y : tile2.y - tile1.y; // 위로 이동이라면 오름차순, 아래로 이동이라면 내림차순
			} else {
				return isMinus ? tile1.x - tile2.x : tile2.x - tile2.x; // 왼쪽 이동이라면 오름차순, 오른쪽 이동이라면 내림차순
			}
		}
	});

	let initialPosition = isMinus ? 0 : 3; // 위나 왼쪽으로 이동했으면 ? 맨 위 혹은 맨 왼쪽 0 : 맨 아래 혹은 맨 오른쪽 3
	let position = initialPosition;

	for (let i = 0; i < sortedTileList.length; i++) {
		if (isVerticalMove) {
			sortedTileList[i].y = position; // 새로운 y좌표
			position = isMinus ? position + 1 : position - 1;

			// 만약 현재 타일의 x좌표가 다음 타일의 x좌표와 다르다면 (열이 변경되었다면)
			if (sortedTileList[i].x !== sortedTileList[i + 1]?.x) {
				position = initialPosition; // position 값을 초기화한다.
			}
		} else {
			sortedTileList[i].x = position; // 새로운 x 좌표
			position = isMinus ? position + 1 : position - 1;

			if (sortedTileList[i].y !== sortedTileList[i + 1]?.y) {
				position = initialPosition;
			}
		}
	}
	console.log('sortedTileList', sortedTileList);

	setTileList(sortedTileList);
}
