import {Point} from './point';
import {PointSet} from './pointset';

export class Space
{
    private dim: Array<PointSet>;
    
    constructor()
    {
    }
    
    addPoint( locVec: Array<number>, velVec:Array<number>)
    {
        let dim = Math.max( locVec.length, velVec.length);
        for( let i=0; i < dim; i++) {
            if( "undefined" === typeof this.dim[i]) {
                this.dim[i] = new PointSet();
            }
            this.dim[i].addPoint( new Point( locVec[i], velVec[i]));
        }
    }
}
