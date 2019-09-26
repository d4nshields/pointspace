export interface Comparable
{
    compareTo: (a:Object,b:Object) => number;
}

export class Knapsack
{
    private size;
    private array: Array<Object>;
    
    constructor( size: number)
    {
        this.size = size;
        this.array = new Array();
    }
    
    // public methods:
    public insert( elem: Comparable)
    {
        this.array.push( elem);
        if( this.array.length > this.size) {
            this.array = this.array.sort(elem.compareTo).slice( 0, this.size);
        }
    }
    
    public getElements()
    {
        return this.array;
    }
}
