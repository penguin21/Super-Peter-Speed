using UnityEngine;
using System.Collections;

public class SmoothCamera2D : MonoBehaviour {
	
	public float dampTime = 0.15f;
	private Vector3 velocity = Vector3.zero;
	public Transform target;
	public bool IsMirror = false;

	// Update is called once per frame
	void Start(){

	}

	void Update () 
	{		  
		IsMirror = true;
		if(IsMirror == true){
		if (target)
		{
			Vector3 point = GetComponent<Camera>().WorldToViewportPoint(target.position);
			Vector3 delta = target.position - GetComponent<Camera>().ViewportToWorldPoint(new Vector3(0.5f, 0.5f, point.z)); //(new Vector3(0.5, 0.5, point.z));
			Vector3 destination = transform.position + delta;
			transform.position = Vector3.SmoothDamp(transform.position, destination, ref velocity, dampTime);
			}	
		}
		if(target == null){
			target = GameObject.FindWithTag ("Player").transform;
		}else{
			return;
		}
		
	}
	IEnumerator Example() {
		target = null;
		yield return new WaitForSeconds(1);
		target = GameObject.FindWithTag ("Player").transform;
	}
}