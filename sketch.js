//TODO for future, remove magic numbers from text coordinates
//make graph switch buttons works,  see if we can scale the orbit numbers so that they're not bunched up
//work on text for showing correlation values
//set angle and speed
let ang = 10;
let speed = 0.1;
let totalOrbits, totalSystems;
let dataHeaders;
let numRows, numCols;
let rowName = [[]],
  rowValue = [[]],
  inverses = [[]];
colName = [[]];
let tempX = 20;
let tempY = 20;
let tempW = 80;
let tempH = 20;
let indivX, indivY;

//set max values to work with orbits
let minOrbitScale = 170;
let maxOrbitScale = 720;

let whichSystem = 1;

function preload() {
  data = loadTable("assets/correlations.csv", "csv");
  dataNoHeaders = loadTable("assets/correlations.csv", "csv", "header");
}

function setup() {
  angleMode(DEGREES);
  createCanvas(windowWidth, windowHeight);

  numRows = data.getRowCount();
  numCols = data.getColumnCount();

  //initialize total number of orbits (routine items) and total systems (wellness indicators)
  totalOrbits = numRows - 1;
  totalSystems = numCols;

  //load data to arrays for use
  for (d = 1; d < numCols; d++) {
    colName[d - 1] = data.getString(0, d);
    buff = [];
    buff2 = [];
    for (i = 0; i < numRows - 1; i++) {
      //multiply by -1 to invert values, such that largest correlation orbits closer to center of system
      buff[i] = data.getNum(i + 1, d);
      buff2[i] = -1 * data.getNum(i + 1, d);
    }
    rowValue[d - 1] = buff;
    inverses[d - 1] = buff2;
  }

  //remap correlation values to orbit ranges
  for (d = 0; d < numCols - 1; d++) {
    localMax = max(inverses[d]);
    localMin = min(inverses[d]);

    for (i = 0; i < numRows - 1; i++) {
      inverses[d][i] = map(
        inverses[d][i],
        localMin,
        localMax,
        minOrbitScale,
        maxOrbitScale
      );
    }
  }

  //sort row names
  for (i = 1; i < numRows; i++) {
    rowName[i - 1] = data.getString(i, 0);
  }
}


function draw() {
  //currentData = Parsedatafunctionhere
  background(0, 0, 0);

  //draw buttons
  newButton(tempX, tempY, tempW, tempH, 10, colName);
  descriptiveText(tempX, tempY, tempW, tempH);

  //text pad should be 20,20 to 250, 400
  stroke("red");
  point(20, 20);
  point(250, 250);
  point(60, 60);

  drawOrbits(totalOrbits, whichSystem);

  drawPoints(totalOrbits, ang, mouseX, mouseY, whichSystem,tempY);

  //iterate angle , needed to rotate
  ang = ang + speed;
}



//define change button funcion within mousePressed event 
function mousePressed() {
  changeButton();
}


//iterate system if change button is clicked 
function changeButton(x,y,i) {
  if((dist(mouseX, mouseY, indivX, indivY) < tempW/2)){
    if(whichSystem != i){
      whichSystem=i
    }
  }
}
