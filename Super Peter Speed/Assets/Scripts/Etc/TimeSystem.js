@script RequireComponent(TextMesh)
 var date : System.DateTime;
 
 //sets something allowing you to populate it with the date and time
 var text : String;
 function Update()
 {
     //tells the var to look for the precise moment you are at
     var date = System.DateTime.Now;
     //converts the above var to a readable string
     gameObject.GetComponent(TextMesh).text = date.ToString("HH:mm:ss");
 }