class Start {

	constructor() {

		const windowWidth = window.innerWidth;
		const windowHeight = window.innerHeight;
		
		const circleSize = windowHeight / 15;
		const hGap = circleSize/5;
		const vGap = circleSize/2;
		
		const usedWidth = 10*(circleSize+hGap)*2;
		const usedHeight = 10*(circleSize+vGap);
		
		const rowXPos = (windowWidth/2)-(usedWidth/2);
		const rowYPos = (windowHeight/2)-(usedHeight/2);
		
		const colors = {
			inner : '#eeeeee',
			outer : 'lightgray',
			circleColor1  :"#BE5A5D",
			circleColor2  : "#4E4C8A",
			colorStange : "#87ab62"
		};
//		const colors = {
//			inner : '#fd0006',
//			outer : 'purple',
//			circleColor1  :"#d8f800",
//			circleColor2  : "#269926",
//			colorStange : "lightgray"
//		};

		this.paper = SVG().addTo('#canvasdiv').size(windowWidth, windowHeight);
		this.paper.rect(windowWidth, windowHeight).fill(colors["outer"]);
		
		
		const innerRect = this.paper.rect(usedWidth, usedHeight).move(rowXPos, rowYPos).radius(circleSize/2).fill(colors["inner"]);
//		this.paper.rect(usedWidth, usedHeight).move(rowXPos, rowYPos).radius(10).fill(colors["inner"]);
		
		$('html').css('background-color', colors["outer"]);
		
		for (let row=0; row<10; row++) {
			
			this.paper.rect(usedWidth, 1).move(rowXPos, -1+circleSize/2+rowYPos +(vGap/2)+ (row*(circleSize+vGap))).fill(colors["colorStange"]);
			
			new CircleRow(this.paper, rowXPos+(hGap), rowYPos +(vGap/2)+ (row*(circleSize+vGap)), circleSize, hGap, vGap, usedWidth, usedHeight, colors);
		}

	}
}