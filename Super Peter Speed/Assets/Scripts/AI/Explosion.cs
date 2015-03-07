using UnityEngine;
using System.Collections;

public class Explosion : MonoBehaviour {
	public float explosionDelay = 1f;
	public float explosionRate = 1f;
	public float explosionMaxSize = 10f;
	public float explosionSpeed = 1f;
	public float currentRadius = 0f;
	public bool IsBox = true;
	public bool IsCircle = false;
	public GameObject bomb;
	public AudioClip BombClip;
	public GameObject BombSoundObj;
	public GameObject ExplosionBomb;
	public Transform Ob;


	bool exploded = false;
	BoxCollider2D explosionRadiusB;
	CircleCollider2D explosionRadius;

	// Use this for initialization
	void Start () {
		if(IsBox == true){
			explosionRadiusB = gameObject.GetComponent<BoxCollider2D>();
		}

		if(IsCircle == true){
			explosionRadius = gameObject.GetComponent<CircleCollider2D>();
		}
	}
	
	// Update is called once per frame
	void Update () {
		explosionDelay -= Time.deltaTime;
		if(explosionDelay < 0){
			exploded = true;
		}
	}

	void FixedUpdate(){
		if(exploded == true){
			if(IsBox == true){
				//if(currentRadius < explosionMaxSize){
				//	currentRadius += explosionRate; 
				//}
				//else
				//{
				//	Object.Destroy(this.gameObject.transform.parent.gameObject);
				//}
				//explosionRadiusB.size = currentRadius;
			}

			if(IsCircle == true){
				if(currentRadius < explosionMaxSize){
					currentRadius += explosionRate; 
				}
				else
				{
					Object.Destroy(this.gameObject.transform.parent.gameObject);
				}
				Instantiate(BombSoundObj,Ob.position,Ob.rotation);
				Instantiate(ExplosionBomb,Ob.position,Ob.rotation);
				explosionRadius.radius = currentRadius;
			}

		}
	}

	void OnTriggerEnter2D(Collider2D col){
		if(exploded == true){
			if(col.gameObject.rigidbody2D !=null){
				Vector2 target = col.gameObject.transform.position;
				Vector2 bomb = gameObject.transform.position;

				Vector2 direction = 140f * (target - bomb);

				col.gameObject.rigidbody2D.AddForce(new Vector2 (direction.x / 2f, direction.y * 10));

			}
		}
	}
}

