var PointSoundEffect : AudioClip;
var BrickBreakSoundEffect : GameObject;
var BrickParticles : GameObject;
var anim : Animator;
var PlayerObj : GameObject;
var KeySoundEffect : AudioClip;
var GUIKey : GameObject;
var PoisionSound : AudioClip;
var HealthPotionSound : AudioClip;
var HurtPlayerSound : AudioClip;

function Start () {
	MainCode.Key = 0;
	MainCode.Score = 0;
	MainCode.Heart = MainCode.MaxHeart;
}

function Update () {
}

function OnTriggerEnter2D(other : Collider2D){
	if(other.gameObject.tag == "Point"){
		MainCode.Score += 10;
		audio.clip = PointSoundEffect;
		audio.Play();
		Destroy(other.gameObject); //Get a point
	}
	
	if(other.gameObject.tag == "Fall Death"){
		anim.SetBool("Death",true);
		yield WaitForSeconds (0.3);
		MainCode.Score = 0;
		MainCode.Heart = MainCode.MaxHeart;
		Application.LoadLevel(Application.loadedLevel); //Restart Level
	}
}

function OnCollisionEnter2D(other : Collision2D){
	if(other.gameObject.tag == "Brick"){
		Instantiate(BrickBreakSoundEffect, transform.position + Vector3(0, 0, 0), Quaternion.Euler(0,0,0) );		
		Instantiate(BrickParticles, transform.position + Vector3(0, 0, 0), Quaternion.Euler(0,0,0) );
		Destroy(other.gameObject);
	}
		
		if(other.gameObject.tag == "Health Potion"){
		MainCode.Heart +=1;
		audio.clip = HealthPotionSound;
		audio.Play();
		if(MainCode.Heart >= MainCode.MaxHeart){
			}
		Destroy(other.gameObject);
		}
		
		if(other.gameObject.tag == "Poision Potion"){
		MainCode.Heart -=1;
		Destroy(other.gameObject);
		audio.clip = PoisionSound;
		audio.Play();
		}
		
		if(other.gameObject.tag == "Key"){
		MainCode.Key += 1;
		GUIKey.SetActive(true);
		audio.PlayOneShot(KeySoundEffect);
		Destroy(other.gameObject);
		}
		
		if(other.gameObject.tag == "Enemy"){
		anim.Play("Hit");
		audio.PlayOneShot(HurtPlayerSound);
		MainCode.Heart -= 1;
		}
		
		if(MainCode.Heart <= 0){
			Application.LoadLevel(Application.loadedLevel);
			}
}