var TestObj : GameObject;
var TestSpawn :GameObject;
var Screen1 = 20;

function Start () {

}

 function Update () 
     {
     if (Input.GetMouseButtonDown(0)) 
         {
 		 var pos = Input.mousePosition;
         pos.z = transform.position.z;
         pos = Camera.main.ScreenToWorldPoint(pos);
         
         var q = Quaternion.FromToRotation(Vector3.up, pos - transform.position);
         var go = Instantiate(TestObj, transform.position, q);
         go.transform.localPosition = Vector3(0, 0, 5);
         go.transform.localRotation = Quaternion.identity;
         }
     }