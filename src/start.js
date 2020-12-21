class Start {

	constructor() {

		let mX = 0;
		$('body').mousemove(e => {
			this.isMoveRight = e.pageX > mX;
			mX = e.pageX;
		});

		const windowWidth = window.innerWidth;
		const windowHeight = window.innerHeight;

		this.circleSize = 40;

		this.rightBorderPosition = 1200;
		this.leftBorderPosition = 50;

		this.paper = SVG().addTo('#canvasdiv').size(windowWidth, windowHeight);
		
		this.start();
	}

	start() {

		this.circles = [];

		for (let i = 0; i < 10; i++) {

			let xInit = this.circleSize * i;
			let color = 'red';
			
			if (i>4) {
				xInit +=this.circleSize;
				color = 'blue';
			} 

			const circle = this.paper.circle(this.circleSize).x(xInit).y(100).fill(color);
			this.circles.push(circle);

			circle.itemNr = i;
			circle.draggable().on('dragmove', e => {

				const { handler, box } = e.detail;
				e.preventDefault();

				if (this.isMoveRight) {
					this.moveRight(circle, box.x);
				} else {
					this.moveLeft(circle, box.x);
				}
			});
		}

	}

	moveRight(circle, xPos) {

		const jump = Math.abs(circle.x() - xPos);

		

		if (this.canMoveRight(circle)) {
			circle.x(xPos);
			return true;
		} else {

			if (circle.itemNr === this.circles.length - 1) {
				return false;
			}

			const nextRightCircle = this.circles[circle.itemNr + 1];
			if (this.moveRight(nextRightCircle, nextRightCircle.x() + 1)) {
				this.moveRight(circle, xPos);
				return true;
			} else {
				return false;
			}
		}

	}

	canMoveRight(circle) {
		if (circle.itemNr === this.circles.length - 1) {
			console.log(circle.x());
			return circle.x() < this.rightBorderPosition;
		}

		const dist = Math.abs(circle.x() - this.circles[circle.itemNr + 1].x());
		return dist > this.circleSize;
	}

	moveLeft(circle, xPos) {

		if (this.canMoveLeft(circle)) {
			circle.x(xPos);
			return true;
		} else {

			if (circle.itemNr === 0) {
				return false;
			}

			const nextLeftCircle = this.circles[circle.itemNr - 1];
			if (this.moveLeft(nextLeftCircle, nextLeftCircle.x() - 1)) {
				this.moveLeft(circle, xPos);
				return true;
			} else {
				return false;
			}
		}

	}


	canMoveLeft(circle) {
		if (circle.itemNr === 0) {
//			console.log(circle.x());
			return circle.x() > this.leftBorderPosition;
		}

		const dist = Math.abs(circle.x() - this.circles[circle.itemNr - 1].x());
		return dist > this.circleSize;
	}

}