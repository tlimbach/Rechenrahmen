class CircleRow {

	constructor(paper, rowXPos, rowYPos, circleSize, hGap, vGap, usedWidth, usedHeight, colors) {

		this.rightBorderPosition = rowXPos + usedWidth - (circleSize + hGap);
		this.leftBorderPosition = rowXPos;
		this.circleSize = circleSize;
		this.hGap = hGap;
		this.usedWidth = usedWidth;

		let mX = 0;
		$('body').mousemove(e => {
			this.isMoveRight = e.pageX > mX;
			mX = e.pageX;
		});

		$('body').bind('touchmove', e => {
			const screenX = e.originalEvent.changedTouches[0].screenX;
			this.isMoveRight = screenX > mX;
			mX = screenX;
		});

		this.circles = [];
		

		for (let i = 0; i < 10; i++) {

			let xInit = this.leftBorderPosition + (this.circleSize + hGap) * i;
			let color =  colors["circleColor1"];

			if (i > 4) {
				xInit += this.circleSize;
				color = colors["circleColor2"];
			}

			const circle = paper.circle(this.circleSize).x(xInit).y(rowYPos).fill(color).attr("stroke", "none");
;
			this.circles.push(circle);

			circle.itemNr = i;
			circle.draggable().on('dragmove', e => {

				if (e.cancelable) {
					e.preventDefault();
				}
				
				const distance = Math.abs(e.detail.box.x - circle.x());
				if (distance > this.circleSize) {
					console.log("too fast!");
					return;
				}

				const { handler, box } = e.detail;
				const xMax = rowXPos + usedWidth - circleSize - hGap;

				if (this.isMoveRight) {

					let newX = box.x;
					if (newX > xMax) {
						newX = xMax;
					}
					this.moveRight(circle, newX);

				} else {

					let newX = box.x;
					if (newX < this.leftBorderPosition) {
						newX = this.leftBorderPosition;
					}
					this.moveLeft(circle, newX);
				}

			});
		}

	}

	moveRight(circle, xPos) {

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
			return circle.x() < this.rightBorderPosition;
		}

		const dist = Math.abs(circle.x() - this.circles[circle.itemNr + 1].x());
		return dist > this.circleSize + this.hGap;
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
			return circle.x() > this.leftBorderPosition;
		}

		const dist = Math.abs(circle.x() - this.circles[circle.itemNr - 1].x());
		return dist > this.circleSize + this.hGap;
	}
}