import { useEffect } from 'react';
import { slideTile } from './tile';

function useHandleKeyboard({ tileList, setTileList }) {
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
		slideTile(0, -1, { tileList, setTileList });
	}

	function moveDown() {
		slideTile(0, 1, { tileList, setTileList });
	}
	function moveLeft() {
		slideTile(-1, 0, { tileList, setTileList });
	}
	function moveRight() {
		slideTile(1, 0, { tileList, setTileList });
	}
}

export default useHandleKeyboard;
