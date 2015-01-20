 import System.Collections.Generic;
 import System.IO;

var ImagePath : String;
var ImageData : String = "/Super Peter Speed/CustomSprites";
private var appdata : String;
appdata = System.Environment.GetFolderPath(System.Environment.SpecialFolder.ApplicationData)+ ImageData + ImagePath;

function Start () {
	var www : WWW = new WWW (appdata);
	yield www;
}

function Update () {

}