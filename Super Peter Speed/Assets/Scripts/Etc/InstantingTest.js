var TestObj : GameObject;
var TestSpawn :GameObject;
var Screen1 = 20;
var ParentLevelTil : Transform;

function Start () {

}

 function Update () 
     {
     if (Input.GetMouseButtonDown(0)) 
         {
 			clone = Instantiate(TestObj, TestSpawn.transform.position, TestSpawn.transform.rotation);
 			clone.transform.parent = ParentLevelTil;
         }
     }