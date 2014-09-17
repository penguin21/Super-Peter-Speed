using UnityEngine;
using System.Collections;

public class ChaseAI2 : MonoBehaviour {
	//------------Variables----------------//
	public Transform target;
	public int moveSpeed;
	public int rotationSpeed;
	public int maxdistance;
	private Transform myTransform;
	//------------------------------------//    
	
	void Awake()
	{
		myTransform = transform;
	}
	
	
	void Start ()
	{
		
		maxdistance = 2;
	}
	
	
	void Update ()
	{
		
		
		if (Vector3.Distance(target.position, myTransform.position) > maxdistance)
		{
			// Get a direction vector from us to the target
			Vector3 dir = target.position - myTransform.position;
			
			// Normalize it so that it's a unit direction vector
			dir.Normalize();
			
			// Move ourselves in that direction
			myTransform.position += dir * moveSpeed * Time.deltaTime;
		}
	}
}