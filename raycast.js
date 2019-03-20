//mapWidth = 11;
//mapHeight = 11;

var mapHeight = 24;
var mapWidth = 24;

var dirx = -1;
var diry = 0;
var planex = 0;
var planey = -.66;
//var posx = 9.5;
//var posy = 1.5;
var posx = 22;
var posy = 12;
var rayx = posx;
var rayy = posy;

var newCoord, posCoord;

function rot(x,y,theta) {
	var xnew = x*Math.cos(theta)-y*Math.sin(theta);
	var ynew = x*Math.sin(theta)+y*Math.cos(theta);
	return {
		x: xnew,
		y: ynew
	};
}

function coordToIndices(x,y,xdir,ydir) {
	if (Number.isInteger(x) && x > 0 && xdir < 0) {
		x--;
	}
	if (Number.isInteger(y) && y > 0 && ydir < 0) {
		y--;
	}
	var xnew = Math.floor(x);
	var ynew = Math.floor(y);
	var result = {
		x: xnew,
		y: ynew
	};
	return result;
}

function castRay(c) {
	//c ranges from -1 to 1
	var raydirx = dirx + c*planex;
	var raydiry = diry + c*planey;
	var rayy_i = posy, rayx_i = posx;
	var rayy_f = posy, rayx_f = posx;
	var dy, dx, d;
	var coord;
	var color;
	while(1) {
		if (raydirx < 0) {
			rayx_f = Math.ceil(rayx_i) - 1;
		} else {
			rayx_f = Math.floor(rayx_i) + 1;
		}
		if (raydiry < 0) {
			rayy_f = Math.ceil(rayy_i) - 1;
		} else {
			rayy_f = Math.floor(rayy_i) + 1;
		}
		if (dirx == 0) {
			d = (rayy_f-rayy_i)/(diry+(c*planey));
		} else if (diry == 0) {
			d = (rayx_f-rayx_i)/(dirx+(c*planex));
		} else {
			dy = (rayy_f-rayy_i)/(diry+(c*planey));
			dx = (rayx_f-rayx_i)/(dirx+(c*planex));
			if (dy < dx) {
				d = dy;
			} else {
				d = dx;
			}
		}
		rayx_f = rayx_i + d*(dirx+(c*planex));
		rayy_f = rayy_i + d*(diry+(c*planey));
		coord = coordToIndices(rayx_f,rayy_f,raydirx,raydiry);
		rayy_i = rayy_f;
		rayx_i = rayx_f;
		//console.log("rayx_f: " + rayx_f + " rayy_f: " + rayy_f);
		if (worldMap[coord.y][coord.x] >= 1) {
			color = worldMap[coord.y][coord.x];
			break;
		}
	}
	var perpDist = ((rayx_f-posx)*dirx)+((rayy_f-posy)*diry);
	var dist = Math.sqrt(Math.pow((posx-rayx_f),2)+Math.pow((posy-rayy_f),2));
	return {dist: dist,
		perpDist: perpDist,
		color: color
	};
}

var worldMap =
[
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,1,1,1,1,1,0,0,0,0,3,0,3,0,3,0,0,0,1],
  [1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,3,0,0,0,3,0,0,0,1],
  [1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,1,1,0,1,1,0,0,0,0,3,0,3,0,3,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,4,0,4,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,4,0,0,0,0,5,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,4,0,4,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,4,0,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

/*
[
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
[1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
[1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1],
[1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
[1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
[1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
[1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];
*/

function drawScene() {
	var distances, dist, perpDist;
	for (var i = -1; i < 1; i = i + .01) {
		distances = castRay(i);
		//console.log(distances);
		perpDist = Math.abs(distances.perpDist);
		dist = distances.dist;
		if (distances.color == 1) {
			fill('blue');
		} else if (distances.color == 3) {
			fill('red');
		} else if (distances.color == 4) {
			fill('green');
		} else if (distances.color == 5) {
			fill('yellow')
		}
		rect((width/2)*(i+1),(height/2)-.5*(height/perpDist),(width/2)*(i+1.01),(height/2)+.5*(height/perpDist));
	}
}

/*
for (var i = -1; i <= 1; i = i + .05) {
	console.log(castRay(i));
} 
*/

function setup() {
	createCanvas(480,640);
	noStroke();
	rectMode(CORNERS);
}

function draw() {
	clear();
	if (keyIsDown(UP_ARROW)) {
		posx = posx+(dirx/2);
		if (posx > mapWidth - 1) {
			posx = posx - Math.abs(dirx);
		}
		if (posx < 1) {
			posx = posx + Math.abs(dirx);
		}
		posy = posy+(diry/2);
		if (posy > mapHeight - 1) {
			posy = posy - Math.abs(diry);
		}
		if (posy < 1) {
			posy = posy + Math.abs(diry);
		}
		posCoord = coordToIndices(posx,posy,dirx,diry);
		if (worldMap[posCoord.y][posCoord.x] >= 1) {
			if (dirx < 0) {
				posx = posx + Math.abs(dirx);
			} else if (dirx > 0) {
				posx = posx - Math.abs(dirx);
			}
			if (diry < 0) {
				posy = posy + Math.abs(diry);
			} else if (diry > 0) {
				posy = posy - Math.abs(diry);
			}
		}
	}
	if (keyIsDown(DOWN_ARROW)) {
		posx = posx-(dirx/2);
		if (posx > mapWidth - 1) {
			posx = posx - Math.abs(dirx/2);
		}
		if (posx < 1) {
			posx = posx + Math.abs(dirx/2);
		}
		posy = posy-(diry/2);
		if (posy > mapHeight - 1) {
			posy = posy - Math.abs(diry/2);
		}
		if (posy < 1) {
			posy = posy + Math.abs(diry/2);
		}
		posCoord = coordToIndices(posx,posy,dirx,diry);
		if (worldMap[posCoord.y][posCoord.x] >= 1) {
			if (dirx < 0) {
				posx = posx - Math.abs(dirx/2);
			} else if (dirx > 0) {
				posx = posx + Math.abs(dirx/2);
			}
			if (diry < 0) {
				posy = posy - Math.abs(diry/2);
			} else if (diry > 0) {
				posy = posy + Math.abs(diry/2);
			}
		}
	}
	if (keyIsDown(LEFT_ARROW)) {
		newCoord = rot(dirx,diry,-5*(Math.PI)/180);
		dirx = newCoord.x;
		diry = newCoord.y;
		newCoord = rot(planex,planey,-5*(Math.PI)/180);
		planex = newCoord.x;
		planey = newCoord.y;
	}
	if (keyIsDown(RIGHT_ARROW)) {
		newCoord = rot(dirx,diry,5*(Math.PI)/180);
		dirx = newCoord.x;
		diry = newCoord.y;
		newCoord = rot(planex,planey,5*(Math.PI)/180);
		planex = newCoord.x;
		planey = newCoord.y;
	}
	drawScene();

}