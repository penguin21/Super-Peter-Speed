using UnityEngine;
using System.Collections;

public class MoveWorld : MonoBehaviour {

	public float speed= 1.5f;
	
	void  Update (){
		transform.Translate(new Vector3(Input.GetAxis("Move") * speed * Time.deltaTime, 0.0f));
	}
}
