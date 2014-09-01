using UnityEngine;
using System.Collections;
using System.Collections.Generic;


public class DemoFeatures : MonoBehaviour {
	
	public GameObject[] animationObjects;
	private int mCurrentObjectIndex = 0;
	private List<GameObject> mClones;
	
	private bool mStoped = false;
	
	private Vector3 mClonePosition = new Vector3( 400f,-500f,0f );
	
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
	
		animationObjects[ mCurrentObjectIndex ].SetActive( true );
		mClones = new List<GameObject>();
		
		timeleft = updateInterval; 
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
	
		CalculateFPS();
		
		//Process touch input
#if UNITY_IPHONE
		
		if( Input.touchCount > 0 && mCurrentObjectIndex > -1)
		{
			if ( Input.touches[0].phase == TouchPhase.Began )
			{
			
				animationObjects[mCurrentObjectIndex].transform.position = new Vector3( Input.touches[0].position.x, 
																						-( Screen.height - Input.touches[0].position.y ),
																						animationObjects[mCurrentObjectIndex].transform.position.z );
				
			}
		}
		
#endif
		
	}
	
	/// <summary>
	/// Pauses & play.
	/// </summary>
	private void PausePlay()
	{
		if ( GUI.Button( new Rect( 20,20,200,60), "Play/Pause" ) )
		{
			if ( mCurrentObjectIndex > -1 )
			{
				if ( mStoped )
				{
					animationObjects[mCurrentObjectIndex].SendMessage("GAFPlay");
					mStoped = false;
				}
				else
				{
					animationObjects[mCurrentObjectIndex].SendMessage("GAFStop");
					mStoped = true;
				}
			}
		}
	}
	
	/// <summary>
	/// Restart this instance.
	/// </summary>
	private void Restart()
	{
		//Restart
		if ( GUI.Button( new Rect( 20,100,200,60), "Restart" ) )
		{
			if ( mCurrentObjectIndex > -1 )
			{
				animationObjects[mCurrentObjectIndex].SendMessage("GAFRewind",SendMessageOptions.DontRequireReceiver);
			}
		}
	}
	
	/// <summary>
	/// Change background color
	/// </summary>
	private void Background()
	{
		//Background
		if ( GUI.Button( new Rect( 20,180,60,60), "B" ) )
		{
			Camera.main.backgroundColor = Color.black;
		}
		
		if ( GUI.Button( new Rect( 120,180,60,60), "W" ) )
		{
			Camera.main.backgroundColor = Color.white;
		}
		
		if ( GUI.Button( new Rect( 220,180,60,60), "G" ) )
		{
			Camera.main.backgroundColor = Color.gray;
		}
	}
	
	/// <summary>
	/// Clones & remove.
	/// </summary>
	private void CloneRemove()
	{
		//Clone
		if ( GUI.Button( new Rect( 20,260,60,60), "-" ) )
		{
			if ( mCurrentObjectIndex > -1 )
			{
				if ( mClones.Count > 0 )
				{
					GameObject go = mClones[ mClones.Count - 1 ];
					mClones.RemoveAt( mClones.Count - 1 );
					Destroy( go );
					mClonePosition -= new Vector3( 50f,0f,0f );
				}
			}
		}
		
		if ( GUI.Button( new Rect( 120,260,60,60), "+" ) )
		{
			DoClone(1);
		}
		
	}
	
	/// <summary>
	/// Amounts the clones.
	/// </summary>
	private void AmountClones()
	{
		//Amount of clones
		if ( GUI.Button( new Rect( 20,340,60,60), "1" ) )
		{
			CleanUp();
		}
		
		if ( GUI.Button( new Rect( 120,340,60,60), "5" ) )
		{
			CleanUp();
			DoClone( 5 );
		}
		
		if ( GUI.Button( new Rect( 220,340,60,60), "10" ) )
		{
			CleanUp();
			DoClone( 10 );
		}
	}
	
	/// <summary>
	/// Previous & next frame.
	/// </summary>
	/// 
	/// 
//	private void PreviousNextFrame()
//	{
//		//Previous next frame
//		if ( GUI.Button( new Rect( 20,420,60,60), "-" ) )
//		{
//			
//		}
//		
//		if ( GUI.Button( new Rect( 120,420,60,60), "+" ) )
//		{
//	
//		}
//	}
	
	/// <summary>
	/// Full cleanup.
	/// </summary>
	private void FullCleanup()
	{
		//Full cleanup
		if ( GUI.Button( new Rect( 20,420,200,60), "Full cleanup" ) )
		{
			if ( mCurrentObjectIndex > -1 )
			{
				CleanUp();
				animationObjects[mCurrentObjectIndex].SendMessage("GAFRewind");
				animationObjects[mCurrentObjectIndex].SetActive(false);
				mCurrentObjectIndex = -1;
			}
		}
	}
	
	/// <summary>
	/// Pevious & next animation.
	/// </summary>
	private void PeviousNextAnimation()
	{
		//Next previos animation
		if ( GUI.Button( new Rect( 20,500,60,60), "-" ) )
		{
			if ( mCurrentObjectIndex > -1 )
			{
				CleanUp();
				animationObjects[mCurrentObjectIndex].SendMessage("GAFRewind");
				animationObjects[mCurrentObjectIndex].SetActive(false);
			}
				
			if ( mCurrentObjectIndex <= 0 )
			{
				mCurrentObjectIndex = animationObjects.Length - 1;
			}
			else
			{
				mCurrentObjectIndex--;
			}
			
			animationObjects[ mCurrentObjectIndex ].SetActive( true );
		}
		
		if ( GUI.Button( new Rect( 120,500,60,60), "+" ) )
		{
			
			if ( mCurrentObjectIndex > -1 )
			{
				CleanUp();
				animationObjects[mCurrentObjectIndex].SendMessage("GAFRewind", SendMessageOptions.DontRequireReceiver);
				animationObjects[mCurrentObjectIndex].SetActive(false);
			}
				
			if ( mCurrentObjectIndex == animationObjects.Length - 1 )
			{
				mCurrentObjectIndex = 0;
			}
			else
			{
				mCurrentObjectIndex++;
			}
			
			animationObjects[ mCurrentObjectIndex ].SetActive( true );
		}
	}
	
	void OnGUI ()
	{
		
		PausePlay();
		
		Restart();
		
		Background();
		
		CloneRemove();
		
		AmountClones();
		
		//PreviousNextFrame();
		
		FullCleanup();
		
		PeviousNextAnimation();
		
		//FPS
		GUI.Label( new Rect(10,Screen.height - 50,100,100), format );
		
		//Visible
		int count = 0;
		if ( mCurrentObjectIndex > -1 )
		{
			GAFAnimationPlayer ap = animationObjects[ mCurrentObjectIndex ].GetComponent(typeof(GAFAnimationPlayer)) as GAFAnimationPlayer;
			count += ap.VisibleElements;
		}
		
		for( int i=0; i< mClones.Count;i++)
		{
			GAFAnimationPlayer ap = mClones[i].GetComponent(typeof(GAFAnimationPlayer)) as GAFAnimationPlayer;
			count += ap.VisibleElements;
		}
		

		GUI.Label( new Rect(10,Screen.height - 70,100,100), count.ToString() + " Elements");
		
	}
	
	private void CleanUp()
	{
		if ( mCurrentObjectIndex > -1 )
		{
			while( mClones.Count > 0 )
			{
				GameObject go = mClones[ mClones.Count - 1 ];
				mClones.RemoveAt( mClones.Count - 1 );
				Destroy( go );
			}
			
			mClonePosition = new Vector3( 400f,-500f,0f );
			
			mStoped = false;
		}
			
	}
	
	private void DoClone( int amount )
	{
		if ( mCurrentObjectIndex > -1 )
		{
			for( int i=0; i< amount;i++)
			{
				mClonePosition += new Vector3( 50f,0f,0f );
				GameObject go = GameObject.Instantiate( animationObjects[ mCurrentObjectIndex ], mClonePosition, Quaternion.identity ) as GameObject;
				mClones.Add ( go );
			}
		}
	}
	
	
}
