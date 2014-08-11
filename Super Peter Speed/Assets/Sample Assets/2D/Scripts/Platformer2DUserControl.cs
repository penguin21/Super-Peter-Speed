using UnityEngine;

[RequireComponent(typeof(AudioSource))]
[RequireComponent(typeof(PlatformerCharacter2D))]
public class Platformer2DUserControl : MonoBehaviour 
{
	private PlatformerCharacter2D character;
    private bool jump;
	public AudioClip JumpSound;
	
	void Awake()
	{
		character = GetComponent<PlatformerCharacter2D>();
	}

    void Update ()
    {
        // Read the jump input in Update so button presses aren't missed.
#if CROSS_PLATFORM_INPUT
        if (CrossPlatformInput.GetButtonDown("Jump")) jump = true;
#else
		if (Input.GetButtonDown("Jump")){
			jump = true;
			if(!audio.isPlaying){
			audio.PlayOneShot(JumpSound, 0.7F);
			}
		}
#endif

    }

	void FixedUpdate()
	{
		// Read the inputs.
		bool crouch = Input.GetAxis("Up and Crouch") < 0;
		#if CROSS_PLATFORM_INPUT
		float h = CrossPlatformInput.GetAxis("Horizontal");
		#else
		float h = Input.GetAxis("Move");
		#endif

		// Pass all parameters to the character control script.
		character.Move( h, crouch , jump );

        // Reset the jump input once it has been used.
	    jump = false;
	}
}
