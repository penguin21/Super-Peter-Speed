using UnityEngine;
using System.Collections;

public class FreeParallaxDemo : MonoBehaviour {

	public FreeParallax parallax;
	public GameObject cloud;

	// Use this for initialization
	void Start () {
		cloud.GetComponent<Rigidbody2D>().velocity = new Vector2(0.1f, 0.0f);
	}
	
	// Update is called once per frame
	void Update () {
		if (parallax != null)
		{
			if (Input.GetKey(KeyCode.LeftArrow))
			{
				parallax.Speed = 15.0f;
			}
			else if (Input.GetKey(KeyCode.RightArrow))
			{
				parallax.Speed = -15.0f;
			}
			else
			{
				parallax.Speed = 0.0f;
			}
		}
	}
}
