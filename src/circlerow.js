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
			e.preventDefault();
			const screenX = e.originalEvent.changedTouches[0].screenX;
			this.isMoveRight = screenX > mX;
			mX = screenX;
		});

		this.circles = [];


		for (let i = 0; i < 10; i++) {

			const offset = this.circleSize/4;
	
			let xInit = (this.leftBorderPosition + (this.circleSize + hGap) * i)+ offset;
			
			let color = colors["circleColor1"];

			if (i > 4) {
				xInit += this.circleSize/2;
				color = colors["circleColor2"];
			}

			const circle = paper.circle(this.circleSize).x(xInit).y(rowYPos).fill(color).attr("stroke", "none");

			const gradient = paper.gradient('radial', function(add) {

				add.stop(0, '#cf6366');
				add.stop(1, '#98484a');

// heller
//				add.stop(0, '#cf777a');
//				add.stop(1, '#985859');

			});
			circle.fill(gradient);

			if (i > 4) {
				const g2 = paper.gradient('radial', function(add) {
					add.stop(0, '#706dca');
					add.stop(1, '#37348a');


// heller
//					add.stop(0, '#827fca');
//					add.stop(1, '#46438a');

				});
				circle.fill(g2);
			}

			
//			circle.attr('boxShadow', '10px 20px 30px blue');
//			circle.attr('filter', 'drop-shadow( 3px 3px 2px rgba(0, 0, 0, .7))');
			
			

			this.circles.push(circle);

			circle.itemNr = i;
			circle.draggable().on('dragmove', e => {

				if (e.cancelable) {
					e.preventDefault();
				}

				this.ongoingDrag = true;

				const { handler, box } = e.detail;

				if (this.isMoveRight) {

					this.moveRight(circle, Math.round(box.x - circle.x()));

				} else {
					const step = Math.round(circle.x() - box.x);
					if (step > 0) {
						this.moveLeft(circle, step);
					}
				}

			}).on('dragend', e => {
				if (e.cancelable) {
					e.preventDefault();
				}
			});
		}

	}

	setCircleToXPos(circle, xPos) {
		circle.x(xPos);
	}

	//* Gradient in Circle einbauen
	moveRight(circle, step) {

		if (step < 0) {
			return;
		}

		const distNextObject = this.distNextRightObject(circle);

		if (distNextObject < step) {

			if (circle.itemNr < this.circles.length - 1) {
				const nextRightCirlce = this.circles[circle.itemNr + 1];
				const remaining = step - distNextObject;

				this.moveRight(nextRightCirlce, remaining);
				this.setCircleToXPos(circle, circle.x() + this.distNextRightObject(circle));
			} else {
				// right border
				this.setCircleToXPos(circle, this.rightBorderPosition - this.hGap);
			}
		} else {
			this.setCircleToXPos(circle, circle.x() + step);
		}
	}

	distNextRightObject(circle) {
		if (circle.itemNr === this.circles.length - 1) {
			return Math.round(this.rightBorderPosition - circle.x());
		}

		return Math.round(this.circles[circle.itemNr + 1].x() - circle.x() - (this.circleSize + this.hGap));
	}

	moveLeft(circle, step) {

		const distNextObject = this.distNextLeftObject(circle);

		if (distNextObject < step) {

			if (circle.itemNr > 0) {
				const nextLeftCirlce = this.circles[circle.itemNr - 1];
				const remaining = step - distNextObject;

				this.moveLeft(nextLeftCirlce, remaining);
				this.setCircleToXPos(circle, circle.x() - this.distNextLeftObject(circle));
			} else {
				// left border
				this.setCircleToXPos(circle, this.leftBorderPosition);
			}
		} else {
			this.setCircleToXPos(circle, circle.x() - step);
		}
	}

	distNextLeftObject(circle) {
		if (circle.itemNr === 0) {
			return Math.round(circle.x() - this.leftBorderPosition);
		}

		return Math.round(circle.x() - (this.circleSize + this.hGap) - this.circles[circle.itemNr - 1].x());
	}
}