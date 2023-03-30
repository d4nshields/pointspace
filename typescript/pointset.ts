import {Point} from './point';
import {Knapsack, Enumerable} from './knapsack';
//

export {Point} from './point';

/**
 * Prediction represents a possible collision in the future at time offset 'when' in the future 
 * for a set of points that are at known locations at time 0.
 */

export class Prediction implements Enumerable
{
    private when: number;
    private points: Array<Point>;
    
    constructor( points: Array<Point>, when: number)
    {
        this.points = points;
        this.when = when;
    }

    value()
    {
        return this.when;
    }
}

/* PointSet is a set of points along with some static methods that assist in finding mutual properties 
 * within the set (such as intersection at a time in the future).    
 * You define the points and then you can view the set in terms of properties associated with pairs of points (all combinations of points).
 */

export class PointSet
{
    private points: Array<Point> = [];
    static Accuracy: number = 0.000001;
    
    public addPoint( p: Point)
    {
        this.points.push( p);
    }
    
    static eq( n0: number, n1:number)
    {
        return (Math.abs(n0 - n1) < PointSet.Accuracy);
    }
    
    public static when( p0: Point, p1: Point)
    {
        if( PointSet.eq(p0.v, p1.v)) {
            if( PointSet.eq(p0.x, p1.x)) {      // points have same position and velocity
                return 0;
            } else {
                return undefined;               // points have undefined intersection
            }
        }
        let t = (p1.x-p0.x)/(p0.v-p1.v);
        return ( t >= 0 ? t : undefined);
    }
    
    public static sortByWhen( what: Array<Prediction>, size:number)
    {
        var knapsack = new Knapsack( size);
        for( var i=0; i<what.length; i++) {
            var when = what[i].value();
            if( "undefined" !== typeof when) {
                knapsack.insert( what[i]);
            }
        }
        return knapsack.getElements();
    }

    /**
     * returns all combinations of 2 points from current set
     * that are expected to intersect at their current velocity within threshold
    */
    public allRelevantPairs( threshold: number): Array<Prediction>
    {
        var result: Array<Prediction> = new Array<Prediction>();
        for( var i=0; i < this.points.length; i++) {
            for( var j=i+1; j < this.points.length; j++) {
                var when = PointSet.when( this.points[i], this.points[j]);
                if( when && when < threshold) {
                    result.push( new Prediction( [this.points[i], this.points[j]], when));
                }
            }
        }
        return result;
    }
}
