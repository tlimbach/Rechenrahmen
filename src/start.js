class Start {

	constructor() {

		const windowWidth = window.innerWidth;
		const windowHeight = window.innerHeight;
		
		const circleSize = 40;
		const hGap = 3;
		const vGap =20;
		
		const usedWidth = 10*(circleSize+hGap)*2;
		const usedHeight = 10*(circleSize+vGap);
		
		const rowXPos = (windowWidth/2)-(usedWidth/2);
		const rowYPos = (windowHeight/2)-(usedHeight/2);

		this.paper = SVG().addTo('#canvasdiv').size(windowWidth, windowHeight);
		this.paper.rect(windowWidth, windowHeight).fill("yellow");
		this.paper.rect(usedWidth, usedHeight).move(rowXPos, rowYPos).fill('orange');
		
		for (let row=0; row<10; row++) {
			new CircleRow(this.paper, rowXPos+(hGap), rowYPos +(vGap/2)+ (row*(circleSize+vGap)), circleSize, hGap, vGap, usedWidth, usedHeight);
		}

	}
}