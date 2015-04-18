var textNews : UI.Text;
var urlText = "http://yourUrl.txt";

function Start(){
   var www : WWW = new WWW(urlText);
   yield www;
   textNews.text = www.data;
}