/* 
author: Larkin Iversen

Program description: The following graphs represents the point-biserial correlations between individual components of my daily routine and a wellness indicator as defined by the Care/of Routines app. The wellness indicator can be changed by clicking the buttons at the top of the screen. The correlation of the selected wellness indicator and any individual routine can be displayed by hovering over the points orbiting the center point in the graph. The closer the orbit, the higher the correlation.

How to interact: hover over an orbiting point to expose its correlation value and name, click one of the wellness indicators in the upper left to change the graph. 

References: inspiration and technique drawn from MTDA course 5150 taught by Weidi Zang https://www.zhangweidi.com/
*/


//Draw orbits for total amount of data points, will need to be updated to include statistic. currently circular and centered.
function drawOrbits(totalOrbits, whichSystem) {
  //push to keep setting local
  push();

  //loop one, see if it will keep ellipse stable

  for (i = 1; i < totalOrbits + 1; i++) {
    //TODO scale the 100 to be based off of correlation, can probably get down to 50 at least
    major = inverses[whichSystem - 1][i - 1];
    //major = i * 50 + totalOrbits * 10;
    //minor = i * 50 + i * 10;

    push();
    strokeWeight(1);
    stroke("#A0A5A5");
    noFill();
    //total orbits allows eccentricity to decrease with higher orbits
    ellipse(windowWidth / 2, windowHeight / 2, major, major);
    pop();
  }
}

//Draw points on orbits for total amount of data points, will need to be updated to include statistic. currently circular and centered.

function drawPoints(
  totalOrbits,
  ang,
  localMouseX,
  localMouseY,
  whichSystem,
  y
) {
  //create settings and draw center point
  strokeWeight(10);
  push();
  stroke("rgb(253, 184, 19)");
  strokeWeight(20);
  point(windowWidth / 2, windowHeight / 2);
  pop();

  //set orbits, make them decrease in eccentricity with larger size

  for (i = 1; i < totalOrbits + 1; i++) {
    //update angle to start at different points
    ang = ang + (30)

    major = inverses[whichSystem - 1][i - 1];
    //minor = i * 50 + i * 10;

    push();

    //map color values in gradient 
    r = map(
      inverses[whichSystem - 1][i - 1],
      min(inverses[whichSystem - 1]),
      max(inverses[whichSystem - 1]),
      255,
      100
    );
    
    b =  map(
      inverses[whichSystem - 1][i - 1],
      min(inverses[whichSystem - 1]),
      max(inverses[whichSystem - 1]),
      100,
      255
    );
    print(max(inverses[whichSystem - 1]))
    
    c = color(r, 0,b);
    stroke(c);

    //calculate x and y
    let pointx = (major / 2) * cos(ang) + windowWidth / 2;
    let pointy = (major / 2) * sin(ang) + windowHeight / 2;
    point(pointx, pointy);

    pop();

    //not working below, check with weidi
    let dis = dist(localMouseX, localMouseY, pointx, pointy);

    //show text based on mouse distance
    if (dis < 20) {
      push();
      textSize(15);
      fill("white");
      noStroke();
      textAlign(RIGHT);
      text(
        "Wellness Indicator: " + colName[whichSystem - 1],
        windowWidth - 230 / 3,
        y + 35
      );
      text(
        "Routine Component: " + rowName[i - 1],
        windowWidth - 230 / 3,
        y + 70
      );
      //need to fix correlation value
      text(
        "Correlation Value: " + round(rowValue[whichSystem - 1][i - 1], 3),
        windowWidth - 230 / 3,
        y + 105
      );
      pop();
    }
  }
}

//Create buttons for each wellness indicator
function newButton(x, y, w, h, tsize, cols) {
  buttonWidth = 230 / (numCols - 1);

  for (i = 0; i < numCols - 1; i++) {
    indivX = (i + 1) * buttonWidth + 7;
    indivY = y + 5;

    if (dist(mouseX, mouseY, indivX, indivY) < w / 3) {
      fill("rgba(255,255,255,0.5)");
    } else {
      noFill();
    }

    if (mouseIsPressed) {
      changeButton(indivX, indivY, i + 1);
    }

    rectMode(CORNER);

    strokeWeight(0.5);
    stroke("white");
    rect(indivX - 7, indivY, w - 10, h);

    noStroke();
    fill("white");
    textAlign(LEFT, TOP);
    textSize(tsize);
    text(cols[i], indivX + 10, indivY + 5);
  }
}

//draw descriptive text in upper left
function descriptiveText(x, y, w, h) {
  push();
  textAlign(LEFT);
  rectMode(CORNER);

  textSize(15);
  fill("white");
  stroke("white");

  text(
    "The following graph represents the point-biserial correlations between individual components of my daily routine and a wellness indicator as defined by the Care/of Routines app. The wellness indicator can be changed by clicking the buttons at the top of the screen. The correlation of the selected wellness indicator and any individual routine can be displayed by hovering over the points orbiting the center point in the graph. The closer the orbit, the higher the correlation.",
    230 / 3,
    y + 35,
    230,
    400
  );
  pop();
}
