import { expect} from 'chai';
import 'mocha';
//
import { Knapsack, Enumerable} from './knapsack';

class test_element implements Enumerable
{
    private n: number;
    constructor( n: number) {
        this.n = n;
    }
    value() 
    {
        return this.n;
    }
}

describe( 'basic insert tests', function() {
    it( 'stuff one Enumerable into a small knapsack', function( done) {
        var knapsack = new Knapsack( 2);
        knapsack.insert( new test_element( 1));
        var result = knapsack.getElements();
        console.log( 'knapsack:', result);
        expect(result.length).equals( 1);
        done();
    });
    it( 'stuff too many values into a size=1 knapsack', function( done) {
        var knapsack = new Knapsack( 1);
        knapsack.insert( new test_element( 1));
        knapsack.insert( new test_element( 2));
        knapsack.insert( new test_element( 3));
        knapsack.insert( new test_element( 4));
        knapsack.insert( new test_element( 5));
        var result = knapsack.getElements();
        console.log( 'knapsack:', result);
        expect(result.length).equals( 1);
        done();
    });
    it( 'stuff too many values into a size=2 knapsack', function( done) {
        var knapsack = new Knapsack( 2);
        knapsack.insert( new test_element( 1));
        knapsack.insert( new test_element( 2));
        knapsack.insert( new test_element( 3));
        knapsack.insert( new test_element( 4));
        knapsack.insert( new test_element( 5));
        var result = knapsack.getElements();
        console.log( 'knapsack:', result);
        expect(result.length).equals( 2);
        done();
    });
    it( 'stuff duplicate values into a size=5 knapsack', function( done) {
        var knapsack = new Knapsack( 5);
        knapsack.insert( new test_element( 1));
        knapsack.insert( new test_element( 2));
        knapsack.insert( new test_element( 3));
        knapsack.insert( new test_element( 4));
        knapsack.insert( new test_element( 5));
        knapsack.insert( new test_element( 5));
        knapsack.insert( new test_element( 4));
        knapsack.insert( new test_element( 3));
        knapsack.insert( new test_element( 2));
        knapsack.insert( new test_element( 1));
        var result = knapsack.getElements();
        console.log( 'knapsack:', result);
        expect(result.length).equals( 5);
        done();
    });
    it( 'stuff a large number of values into a size=5 knapsack', function( done) {
        var knapsack = new Knapsack( 5);
        for( var i=0; i < 1000000; i++) {
            knapsack.insert( new test_element( Math.random()));
        }
        var result = knapsack.getElements();
        console.log( 'knapsack:', result);
        expect(result.length).equals( 5);
        done();
    });
});
