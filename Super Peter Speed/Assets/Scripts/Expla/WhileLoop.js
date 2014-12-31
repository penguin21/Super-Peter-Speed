var cupsInTheSink : int = 4;


function Start ()
{
    while(cupsInTheSink > 0)
    {	
    	yield WaitForSeconds(2);
        Debug.Log ("I've washed a cup!");
        cupsInTheSink--;
    }
}