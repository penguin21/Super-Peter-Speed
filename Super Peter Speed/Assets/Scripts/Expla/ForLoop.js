var numEnemies : int = 3;


function Start ()
{
    for(var i : int = 0; i < numEnemies; i++)
    {
        Debug.Log("Creating enemy number: " + i);
    }
}