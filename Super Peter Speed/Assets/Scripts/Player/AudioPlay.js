var Audio2 : AudioClip; //What audio you want it to play

function Start(){
GetComponent.<AudioSource>().PlayOneShot(Audio2); //Play the sound
}