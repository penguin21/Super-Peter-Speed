using UnityEngine;
using System.Collections;

public class AiZ : MonoBehaviour {
	public Transform target;
	public int moveSpeed;
	public int rotationSpeed;
	public int maxDistance;
	
	private Transform myTransform;
	
	void Awake() {
		myTransform = transform;
	}   
	
	// Use this for initialization
	void Start () {
		GameObject go = GameObject.FindGameObjectWithTag("Player");
		
		target = go.transform;
		
		maxDistance = 15;
	}       
	
	
	
	
	// Update is called once per frame
	void FixedUpdate () {
		Debug.DrawLine(target.position, myTransform.position, Color.yellow);
		
		//Look at target
		
		
		//Move towards target
		myTransform.position += myTransform.right * moveSpeed * Time.deltaTime;
		myTransform.position -= myTransform.right * moveSpeed * Time.deltaTime;
	}
	
}
