var originalWidth = 640.0;  // define here the original resolution
var originalHeight = 400.0; // you used to create the GUI contents 
private var scale: Vector3;
 
function OnGUI(){
    scale.x = Screen.width/originalWidth; // calculate hor scale
    scale.y = Screen.height/originalHeight; // calculate vert scale
    scale.z = 1;
    var svMat = GUI.matrix; // save current matrix
    // substitute matrix - only scale is altered from standard
    GUI.matrix = Matrix4x4.TRS(Vector3.zero, Quaternion.identity, scale);
    // draw your GUI controls here:
    GUI.Box(Rect(10,10,200,50), "Box");
    GUI.Button(Rect(400,180,230,50), "Button");
    //...
    // restore matrix before returning
    GUI.matrix = svMat; // restore matrix
}