let startInstance;
let resizeTimeout;

function initialize() {
    // Verzögerung einbauen, um sicherzustellen, dass die Größen korrekt sind
    if (resizeTimeout) {
        clearTimeout(resizeTimeout);
    }
    resizeTimeout = setTimeout(() => {
        // Prüfen, ob das Gerät im Hochformat ist
        if (window.innerHeight > window.innerWidth) {
            // Wenn Hochformat, zeige eine Meldung und beende die Initialisierung
           // $('#canvasdiv').html('<p style="text-align: center; font-size: 20px;">Bitte drehen Sie Ihr Gerät ins Querformat, um Lucy auszuführen.</p>');
           // return;
        }

        // Lösche vorherige Instanz (falls vorhanden)
        //if (startInstance) 
		{
            $('#canvasdiv').empty(); // Entfernt die vorhandenen SVG-Inhalte
        }
        // Neue Instanz erstellen
        startInstance = new Start();
    }, 100); // 200 ms Verzögerung
}

window.onload = initialize;
window.onresize = initialize;

class Start {
    constructor() {
        const windowWidth = window.innerWidth - 20;
        const windowHeight = window.innerHeight - 20;

        const circleSize = windowHeight / 16;
        const hGap = circleSize / 20;
        const vGap = circleSize / 2;

        const usedWidth = windowWidth;
        const usedHeight = windowHeight;

        const rowXPos = (windowWidth / 2) - (usedWidth / 2);
        const rowYPos = (windowHeight / 2) - (usedHeight / 2);

        const colors = {
            inner: '#eeeeee',
            outer: 'lightgray',
            circleColor1: "#BE5A5D",
            circleColor2: "#4E4C8A",
            colorStange: "#87ab62"
        };

        this.paper = SVG().addTo('#canvasdiv').size(windowWidth, windowHeight);
        const innerRect = this.paper.rect(usedWidth, usedHeight).move(rowXPos, rowYPos).radius(circleSize / 2).fill(colors["inner"]);

        $('html').css('background-color', colors["outer"]);

        for (let row = 0; row < 10; row++) {
            this.paper.rect(usedWidth, 1).move(rowXPos, -1 + circleSize / 2 + rowYPos + (1.5*vGap / 1) + (row * (circleSize + vGap))).fill(colors["colorStange"]);
            new CircleRow(this.paper, rowXPos + (hGap), rowYPos + (1.5 * vGap / 1) + (row * (circleSize + vGap)), circleSize, hGap, vGap, usedWidth, usedHeight, colors);
        }
    }
}
