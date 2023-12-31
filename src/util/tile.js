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

	const sortedTileList = [...tileList]
		.map((item) => ({ ...item, isMerged: false, isNew: false }))
		.sort((tile1, tile2) => {
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

	let nextPosition = 0; // 타일을 이동하면서 다음 타일의 위치를 설정하기 위해 사용될 변수
	const newTileList = [...sortedTileList];

	for (let i = 0; i < newTileList.length; i++) {
		const currentTile = newTileList[i];
		const nextTile = newTileList[i + 1];
		const isOnSameLine = isVerticalMove ? currentTile.x === nextTile?.x : currentTile.y === nextTile?.y;

		if (currentTile.isDisabled) continue;

		// nextPosition이 0이 아니고, 현재 타일과 이전 타일이 같은 행/열에 위치한다면
		if (nextPosition && isOnSameLine) {
			if (isVerticalMove) {
				currentTile.y = nextPosition; // 현재 타일의 y좌표를 nextPosition으로 설정한다.
			} else {
				currentTile.x = nextPosition;
			}
			isMinus ? (nextPosition += 1) : (nextPosition -= 1);
		} else {
			nextPosition = 0; // 현재 타일과 이전 타일이 같은 줄에 있지 않으면, nextPosition 변수를 0으로 재설정한다.
		}
		// 즉, nextPosition 변수는 이전 타일과 현재 타일이 같은 위치에 있을 때, 병합된 타일의 다음 위치를 결정한다.

		const isMergable = currentTile.value === nextTile?.value && isVerticalMove ? currentTile.x === nextTile?.x : currentTile.y === nextTile?.y;

		if (isMergable) {
			const tile = makeTile(newTileList);
			tile.x = currentTile.x;
			tile.y = currentTile.y;
			tile.value = currentTile.value * 2;
			currentTile.isDisabled = true;
			nextTile.isDisabled = true;
			newTileList.push(tile);
		}
	}

	setTileList(newTileList.filter((item) => !item.isDisabled));
	console.log(newTileList);
}
