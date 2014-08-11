private var startTime : float;
var textTime : String;
//First define two variables. One private and one public variable. Set the first variable to be a float. 
//Use for textTime a string. 
function Start() {
startTime = Time.time;
}
function OnGUI () {
var guiTime = Time.time - startTime; 
//The gui-Time is the difference between the actual time and the start time.
var minutes : int = guiTime / 60; //Divide the guiTime by sixty to get the minutes.
var seconds : int = guiTime % 60;//Use the euclidean division for the seconds.
var fraction : int = (guiTime * 100) % 100;
 
 textTime = String.Format ("{0:00}:{1:00}:{2:00}", minutes, seconds, fraction); 
//text.Time is the time that will be displayed.
 GetComponent(GUIText).text = textTime;
 
}