describe("Helper - Multiply", function () {
    it("2 * 2 = 4", function () {
        expect(Helper.multiply(2, 2)).toEqual(4);
    });
});

describe("Helper -  Rotate Point", function () {
	it("Rotate point 90 degrees", function () {
		var origin = new me.Vector2d(2,3);
		var point = new me.Vector2d(10,2);
		expect(Helper.rotatePoint(origin, point, 3.14)).toEqual(3);
	});
});

describe("Helper - Find Angle", function () {
    it("gives angle in radians", function () {
    	var point1 = new me.Vector2d(2,3);
		var point2 = new me.Vector2d(2,5);

        expect(Helper.findAngle(point1, point2)).toEqual(1.5707963267948966);
    });
});

describe("Helper - get middle point", function () {
    it("should return a middle Vector2d", function () {
    	var points = [];
    	points.push(new me.Vector2d(2,3));
		points.push(new me.Vector2d(2,5));

        expect(Helper.getMiddlePoint(points)).toEqual(new me.Vector2d(2,4));
    });
});

describe("Helper - find the furthest point", function () {
    it("should return furthest points from set of points", function () {
    	var points = [];
    	points.push(new me.Vector2d(2,3));
		points.push(new me.Vector2d(3,5));
		//points.push(new me.Vector2d(2,5));
		var centrePoint = new me.Vector2d(2,2);

        expect(Helper.findFurthestPoints(points, centrePoint)).toEqual();
    });
});

describe("LightDraw Effects - CandleFills", function () {
    it("should ", function () {
    	var points = [];
    	points.push(new me.Vector2d(2,3));
		points.push(new me.Vector2d(3,5));
		//points.push(new me.Vector2d(2,5));
		var centrePoint = new me.Vector2d(2,2);

        expect(LightDrawEffects.CandleFill()).toEqual();
    });
});

describe("Light - Reduce Points", function () {
    it("should reduce points properly", function () {
    	var points = [];
    	points.push(new illuminated.Vec2(2,3));
		points.push(new illuminated.Vec2(3,5));

        expect(Light.ReducePoints(points)).toEqual(4);
    });
});

describe("Light - Add Point", function () {
    it("should add point to point list", function () {
    	var points = [];
    	points.push(new illuminated.Vec2(2,3));
		points.push(new illuminated.Vec2(3,5));

        expect(Light.ReducePoints(points)).toEqual(4);
    });
});

describe("Visible - Check Intersection", function () {
    it("should intersect", function () {
    	var p1 = new me.Vector2d(2,3);
    	var p2 = new me.Vector2d(2,6);
    	var p3 = new me.Vector2d(4,5);
    	var p4 = new me.Vector2d(1,2);

        expect(Visible.CheckIntersection(p1,p2,p3,p4)).toEqual(true);
    });

    it("should not intersect parallel lines", function () {
    	var p1 = new me.Vector2d(2,3);
    	var p2 = new me.Vector2d(2,6);
    	var p3 = new me.Vector2d(4,3);
    	var p4 = new me.Vector2d(4,6);

        expect(Visible.CheckIntersection(p1,p2,p3,p4)).toEqual(false);
    });
});

describe("AStar - Path finding search", function () {
    it("should find path to A-B and bring a list", function () {
    	var points = [];
    	points.push(new illuminated.Vec2(2,3));
		points.push(new illuminated.Vec2(3,5));

        expect(AStar.search(points)).toEqual(4);
    });
});


