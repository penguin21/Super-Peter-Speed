var LevelEditorManagerObj : GameObject;

private var h = true;

function Start(){
LevelEditorManagerObj = GameObject.FindWithTag("Others");
	if(LevelEditorManagerObj == null){
		h = false;
	}



}

function OnMouseOver () {
if(h){
if(LevelEditorManagerObj.GetComponent(LevelEditorManager).IsEditor == true){
	
	if(Input.GetMouseButtonDown(1)){
	Destroy(gameObject);
			}
		}
		}
}