using UnityEngine;
using System.Collections;

public class EditorGrid : MonoBehaviour {
	public float Width = 32.0f;
	public float Heigth = 32.0f;
	
	public Color color = Color.white;
	
	void OnDrawGizmos(){
		Vector3 pos = Camera.current.transform.position;
		Gizmos.color = this.color;
		
		for(float y = pos.y - 800.0f; y < pos.y + 800.0f; y+= this.Heigth){
			Gizmos.DrawLine(new Vector3(-100000.0f , Mathf.Floor(y/this.Heigth)*this.Heigth, 0.0f),
			                new Vector3(100000.0f , Mathf.Floor(y/this.Heigth)*this.Heigth, 0.0f));
		}

		for(float x = pos.x - 1200.0f; x < pos.x + 1200.0f; x+= this.Width){
			Gizmos.DrawLine(new Vector3(Mathf.Floor(x/this.Width)*this.Width, -100000.0f, 0.0f), 
			                new Vector3(Mathf.Floor(x/this.Width)*this.Width, 100000.0f, 0.0f));
		}
	}
}