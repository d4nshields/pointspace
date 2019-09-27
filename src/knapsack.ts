export interface Enumerable
{
    value(): number;
}

export class Knapsack
{
    private size;
    private array: Array<Enumerable>;
    
    constructor( size: number)
    {
        this.size = size;
        this.array = new Array();
    }
    
    // public methods:
    public insert( elem: Enumerable)
    {
        // find the offset in the this.array to insert the new element, allowing it to overflow off to the right
        var done = false;
        for( var i=0; i < Math.min( this.size, this.array.length); i++) {
            if (elem.value() < this.array[i].value()) {
                // shift [i..this.size] to the right to make room to insert at i
                for( var j=Math.min( this.size, this.array.length); j >= i ; j--) {
                    if( j+1 < this.size) {
                        this.array[j+1]= this.array[j];
                    }
                }
                done = true;
                break;
            }
            if( done) {
                break;
            }
        }
        if( i < this.size) {        // if not overflowing
            this.array[i] = elem;
        }
    }
    
    public getElements()
    {
        return this.array;
    }
}
