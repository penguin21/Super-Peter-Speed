using UnityEngine;
using System.Collections;
using System.Collections.Generic;


public class DemoAPI : MonoBehaviour {
	
	public GameObject[] animationObjects;
	#region fps declars
	public  float updateInterval = 0.5F;
 
	private float accum   = 0; // FPS accumulated over the interval
	private int   frames  = 0; // Frames drawn over the interval
	private float timeleft; // Left time for current interval
	private string format; 
	#endregion
	
	/// <summary>
	/// Start this instance.
	/// </summary>
	void Start () {
	
		//Coin
		GAFAnimationPlayer ap = animationObjects[0].GetComponent(typeof(GAFAnimationPlayer)) as GAFAnimationPlayer;
		ap.GAFWrapMode = eGAFWrapMode.Once;
		ap.GAFPlay();
		
	}
	
	void CalculateFPS()
	{
		timeleft -= Time.deltaTime;
    	accum += Time.timeScale/Time.deltaTime;
  		++frames;
 
    	// Interval ended 
    	if( timeleft <= 0.0 )
    	{
        	// display two fractional digits (f2 format)
			float fps = accum/frames;
			format = System.String.Format("{0:F2} FPS",fps);
		
			//	DebugConsole.Log(format,level);
	   	 timeleft = updateInterval;
	    	accum = 0.0F;
	    	frames = 0;
    	}
	}
	
	/// <summary>
	/// Update this instance.
	/// </summary>
	void Update () {
	
		GAFAnimationPlayer ap = animationObjects[0].GetComponent(typeof(GAFAnimationPlayer)) as GAFAnimationPlayer;
		if ( !ap.GAFIsPlaying )
		{
			ap.GAFSetNextAnimation();
			ap.GAFRewind();
			ap.GAFPlay();
		}
		
		CalculateFPS();
				
	}
	
	void OnGUI()
	{
		//FPS
		GUI.Label( new Rect(10,Screen.height - 50,100,100), format );
	}
	
}
