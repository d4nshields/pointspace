import {PointSet, Point, Prediction} from './pointset';
import { expect} from 'chai';
import 'mocha';

let pointdata: Array<Point> = [
//    new Point( 2, -0.5),
//    new Point( 3, -0.3),
//    new Point( 1, -0.1),
//    new Point( 0, 0.0),
//    
];

function initializeRandomPoints( n: number)
{
    pointdata = new Array<Point>();
    for( var i=0; i<n; i++) {
        pointdata.push( new Point( Math.random()*10 - 5, Math.random()*10 - 5));
    }
}

describe('inject some points', function() {
    this.timeout( 20000);
    it( 'spits out a list of pairs of points, sorted in priority order, of future intersections of the PointSet', function(done) {
        pointdata = [
            new Point( 1, 0),
            new Point( 2, 0),
            new Point( 3, 0),
            new Point( 4, 0),
        ];
        const pointset = new PointSet();
        const threshold = 1;
        pointdata.map( (p: Point) => (pointset.addPoint( p)));
        //
        const allCombo2 = pointset.allRelevantPairs( threshold);
        console.log( 'allCombo2: ', allCombo2);
        done();
    });
    it( 'deals with a lot of points, to see how that changes things, outputs a table of results', function(done) {
        var prioritizedPoints;
        const num = 8000;
        const threshold = 1;
        initializeRandomPoints(num);
        const pointset = new PointSet();
        pointdata.map( (p: Point) => (pointset.addPoint( p)));
        //
        const predictions:Array<Prediction> = pointset.allRelevantPairs( threshold);
        console.log( 'knapsack size: ', Math.floor( Math.pow(num, 1/3)));
        prioritizedPoints = PointSet.sortByWhen( predictions, Math.pow(num, 1/3));
        console.log( 'number of intersections: '+prioritizedPoints.length);
        console.log('priority intersects: ', prioritizedPoints);
        console.log('highest priority: ', prioritizedPoints.shift());
        done();
    });
});
