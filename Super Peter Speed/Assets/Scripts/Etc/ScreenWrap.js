var WarpPoint : Transform;

private var IsUsing = false;

function OnTriggerEnter2D(Rigid : Collider2D){
	if(!IsUsing){
	Rigid.transform.position.x = WarpPoint.transform.position.x;
	WarpPoint.gameObject.GetComponent(ScreenWrap).IsUsing = true;
	}
}

function OnTriggerExit2D(Rigid : Collider2D){
	IsUsing = false;
}