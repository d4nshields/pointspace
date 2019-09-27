import {Point} from './point';
import {Knapsack, Comparable} from './knapsack';
//

export {Point} from './point';

/**
 * Prediction represents a possible collision in the future at time offset 'when' in the future 
 * for a set of points that are at known locations at time 0.
 */

export class Prediction<T> implements Comparable
{
    private when: number;
    private points: T;
    
    constructor( points: T, when: number)
    {
        this.points = points;
        this.when = when;
    }
    
    public compareTo( a: Prediction<T>, b: Prediction<T>)
    {
        if( ("undefined" == typeof b) || (a.when < b.when)) {
            return -1;
        } else if( ("undefined" == typeof a) || (a.when > b.when)) {
            return +1;
        } else {
            return 0;
        }
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
    
    public static sortByWhen( what: Array<Array<Point>>, size:number)
    {
        var knapsack = new Knapsack( size);
        for( var i=0; i<what.length; i++) {
            var when = PointSet.when( what[i][0], what[i][1]);
            if( "undefined" !== typeof when) {
                knapsack.insert( 
                    new Prediction<Array<Point>>( 
                        what[i], 
                        when
                    )
                );
            }
        }
        return knapsack.getElements();
    }

    /**
     * returns all combinations of 2 points from current set
    */
    public allRelevantCombinations(): Array<Array<Point>>
    {
        var result: Array<Array<Point>> = new Array<Array<Point>>();
        for( var i=0; i < this.points.length; i++) {
            for( var j=i+1; j < this.points.length; j++) {
                result.push( [this.points[i], this.points[j]]);
            }
        }
        return result;
    }
}
