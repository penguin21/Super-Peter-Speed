using UnityEngine;
using System.Collections;

public class ParallaxCam : MonoBehaviour {

	public FreeParallax parallax;
	public bool isX = true;
	public bool isY = false;
	public float CamSpeed;
	public float CamSpeedY;
	Vector3 lastPosition = Vector3.zero;
	Vector3 lastPositionY = Vector3.zero;

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		if (parallax != null){
			if(isX){
				parallax.Speed = CamSpeed;
			}
			if(isY){
				parallax.Speed = CamSpeedY;
			}
		}
		if(isX){
			CamSpeed = transform.position.x;
		}

		if(isY){
			CamSpeedY = transform.position.y;
		}

	}

	void FixedUpdate()
	{	
	if(isX){
		CamSpeed = (transform.position - lastPosition).magnitude;
			lastPosition = transform.position;
		}

	}
}
