class Start {

	constructor() {

		const windowWidth = window.innerWidth;
		const windowHeight = window.innerHeight;
		
		
		const circleSize = 40;

		this.paper = SVG().addTo('#canvasdiv').size(windowWidth, windowHeight);
		
		for (let row=0; row<10; row++) {
			new CircleRow(this.paper, circleSize, 50, 1200, 200+row*(circleSize+(circleSize/2)));
		}

	}
}