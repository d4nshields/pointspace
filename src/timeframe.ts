
export class TimeFrame
{
    private timestamp: number;      // system timestamp
    
    constructor()
    {
        this.timestamp = new Date().getTime();
    }
}