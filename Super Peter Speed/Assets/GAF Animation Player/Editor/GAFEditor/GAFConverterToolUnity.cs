using UnityEngine;
using UnityEditor;
using System.IO;
using System;

public class GAFConverterToolUnity : EditorWindow {
	
	#region public variables
	
	#endregion
	
	#region private data
	
	private TextAsset mGAFAnimation = null;
	
	private TextAsset mPreviosAnimation = null;
	
	private GAFConverterUnityEditor mGAFConverter;
	
	private float mGenerationFrame = 0;
	
	private int mConversionSequenceIndex = 0;
	private string[] mConversionSequences;
	
	private enum eState
	{
		empty, selected, processed, converted
	}
	
	private eState mCurrentState = eState.empty;	
	
	private bool mSetupEnvironment = true;
	private Vector2 mScreenResolution = new Vector2( 1024f, 768f );
	
	private const float cWindowOutline = 100f;
		
	#endregion
		
	// Add submenu
    [MenuItem("Window/GAF Animation Converter")]
	static void Init()
    {
		// Get existing open window or if none, make a new one:
		GAFConverterToolUnity window = (GAFConverterToolUnity)EditorWindow.GetWindow(typeof(GAFConverterToolUnity));
       	window.autoRepaintOnSceneChange = true;
       	window.title = "GAFConverter";
       	window.Show();				
	}
	
	 void OnGUI()
     {
	
		GUILayout.Label("GAF animation converter");
		
		GUILayout.Label("  GAF animation:");
		mGAFAnimation = (TextAsset)EditorGUILayout.ObjectField(mGAFAnimation,typeof(TextAsset),true);
		
		if ( mGAFAnimation != mPreviosAnimation )
		{
			mCurrentState = eState.selected;
			mPreviosAnimation = mGAFAnimation;
		}
		
		if ( EditorApplication.isPlaying==false )
		{		
			if ( mCurrentState == eState.selected  )
			{
				Process();
			}
						
			if ( mCurrentState > eState.selected )
			{			
				Generate();					
			}
		}
		else
		{
			GUILayout.Label("Please exit play mode before creating new animations");
		}
										
	 }
	
	/// <summary>
	/// Process this instance.
	/// </summary>
	private void Process()
	{
		if(GUILayout.Button("Process GAF"))
	    {												
			//Process gaf file
			string path = AssetDatabase.GetAssetPath( mGAFAnimation );
		
			mGAFConverter = new GAFConverterUnityEditor( path, Path.GetFileNameWithoutExtension( path) ); 
				
			mGAFConverter.FrameProcessed += delegate(object sender, FrameArgs e) 
			{		
				EditorUtility.DisplayProgressBar("GAF Converter","Process frame", (float) e.FrameNumber / ( mGAFConverter.FrameNumber - 1));
			};
			
			mGAFConverter.ProcessGAF();
			
			EditorUtility.ClearProgressBar();

			mCurrentState = eState.processed;
			
			mConversionSequences = new string[ mGAFConverter.AnimationSequences.Length];
			for( int i=0;i< mConversionSequences.Length;i++)
			{
				mConversionSequences[i] = mGAFConverter.AnimationSequences[i].Id;
			}
			
			mGenerationFrame = ( mGAFConverter.AnimationSequences[0].StartFrame + mGAFConverter.AnimationSequences[0].EndFrame ) / 2;
			
			mConversionSequenceIndex = 0;
			
			//
			if( PlayerPrefs.HasKey("GAFSetupEnvironment"))
			{
				mSetupEnvironment = Convert.ToBoolean( PlayerPrefs.GetInt( "GAFSetupEnvironment" )); 
			}
			
		}
	}
	
	/// <summary>
	/// Generate this instance.
	/// </summary>
	private void Generate()
	{				
		GUILayout.Label("Version:" + mGAFConverter.Version);
		GUILayout.Label("Number or frames:" + mGAFConverter.FrameNumber);
		GUILayout.Label("Animation objects number:" + mGAFConverter.AnimationObjects.Length);
		GUILayout.Label("Atlases:");
			
		foreach( GAFTextureAtlas ta in mGAFConverter.TextureAtlases )
		{				
			GUILayout.Label("  Scale:" + ta.Scale);			
				
			if ( float.Parse( mGAFConverter.Version ) > 2.4f )
			{
				foreach( GAFAtlas a in ta.Atlases )
				{
					string fn = "   ";
					for ( int i=0;i< a.CSF.Length;i++ )
					{					
						fn += " CSF " + a.CSF[i] + " " + a.FileNames[i];
					}
					GUILayout.Label( fn );			
				}
			}
			else
			{
				foreach( GAFAtlas a in ta.Atlases )
				{
					GUILayout.Label( "   " + a.FileName );
				}
			}
		}
			
		GUILayout.Label("Sequences:");
			
		foreach( GAFAnimationSequence animSeq in mGAFConverter.AnimationSequences )
		{				
			GUILayout.Label("  " + animSeq.Id  + "( "+ animSeq.StartFrame + " : " + animSeq.EndFrame + " )" );
		}
			
		mCurrentState = eState.processed;
		
		GUILayout.Space( 10f );
		GUILayout.Label("Sequence for conversion:");
		mConversionSequenceIndex = EditorGUILayout.Popup( mConversionSequenceIndex, mConversionSequences );
		
		// Animation position slide
		GUILayout.Space( 10f );
		GUILayout.Label("Pre-processing animation time:");
		mGenerationFrame = GUILayout.HorizontalSlider(mGenerationFrame, mGAFConverter.AnimationSequences[mConversionSequenceIndex].StartFrame, mGAFConverter.AnimationSequences[mConversionSequenceIndex].EndFrame );
		
		
		// Setup camera
		GUILayout.Space( 10f );
		mSetupEnvironment = GUILayout.Toggle( mSetupEnvironment, "Setup environment for 2D animation" );
		PlayerPrefs.SetInt( "GAFSetupEnvironment", mSetupEnvironment ? 1 : 0 );
		
		if ( mSetupEnvironment )
		{
			mScreenResolution = EditorGUILayout.Vector2Field( "Screen resolution", mScreenResolution );
		}
		
		// Create animation
		if(GUILayout.Button("Create GAF animation")) 
	    {														
			//Create animation
			EditorUtility.DisplayProgressBar("GAF Converter","Create sprites", 0.33f );			
			GAFAnimationPlayer ap = mGAFConverter.CreateAnimation(false);
					
			GAFAnimation ga = AssetDatabase.LoadAssetAtPath( "Assets/GAFAnimations/" + mGAFConverter.Name + ".asset", typeof(GAFAnimation)) as GAFAnimation;
								
			EditorUtility.DisplayProgressBar("GAF Converter","Create animation", 0.66f );
			if ( ga == null )
			{
				
				//Genarate custom animatoin				
				ga = ScriptableObject.CreateInstance<GAFAnimation>();  //scriptable object
				ga.AnimationConfigFrames =  mGAFConverter.AnimationConfigFrames;
				ga.AnimationSequences = mGAFConverter.AnimationSequences;
				
				if ( !System.IO.Directory.Exists( "Assets/GAFAnimations " ) )
				{			
					AssetDatabase.CreateFolder( "Assets", "GAFAnimations" );
				}
				
	    		AssetDatabase.CreateAsset(ga, "Assets/GAFAnimations/" + mGAFConverter.Name + ".asset");
								   				
			}
			else
			{
				GAFAnimation nga = ScriptableObject.CreateInstance<GAFAnimation>();  //scriptable object
				nga.AnimationConfigFrames =  mGAFConverter.AnimationConfigFrames;
				nga.AnimationSequences = mGAFConverter.AnimationSequences;
				
				EditorUtility.CopySerialized( nga, ga );
				AssetDatabase.SaveAssets();
				
			}
			
			
    		EditorUtility.FocusProjectWindow();
		
			ap.GAFAnimation = ga;
			ap.Start();
			ap.GAFCurrentSequenceIndex = mConversionSequenceIndex;
			
			mGAFConverter.FrameChanged += delegate(object sender, FrameArgs e) 
			{		
				EditorUtility.DisplayProgressBar("GAF Converter","Simulate animation", (float) e.FrameNumber / ( mGenerationFrame - mGAFConverter.AnimationSequences[mConversionSequenceIndex].StartFrame - 1 ));
			};
			
			mGAFConverter.SetAnimationToFrame( mGAFConverter.AnimationSequences[mConversionSequenceIndex].StartFrame, (int)  mGenerationFrame );
			
			EditorUtility.ClearProgressBar();
			
			//Setup camera
			if ( mSetupEnvironment )
			{
				SetupCamera();
				SetupRenderSettings();
				SetupWindows();
			}
			
			//Set editor selection for a new creted object
    		Selection.activeObject = ap.gameObject;
			
			//Fly to created object
			if (SceneView.lastActiveSceneView )
			{
				SceneView.lastActiveSceneView.LookAt( mGAFConverter.RootObject.transform.position );
				SceneView.lastActiveSceneView.orthographic = true;
				SceneView.lastActiveSceneView.rotation = Quaternion.identity;				
			}
					
		}
						
	}
	
	/// <summary>
	/// Gets the main game view.
	/// </summary>
	/// <returns>
	/// The main game view.
	/// </returns>
	public static EditorWindow GetMainGameView()
	{
       System.Type T = System.Type.GetType("UnityEditor.GameView,UnityEditor");
       System.Reflection.MethodInfo GetMainGameView = T.GetMethod("GetMainGameView",System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Static);
       System.Object Res = GetMainGameView.Invoke(null,null);
       return (EditorWindow)Res;
    }
	
	/// <summary>
	/// Setups the windows.
	/// </summary>
	private void SetupWindows()
	{
		EditorWindow gameView = GetMainGameView();
		
		if ( gameView != null )
		{		
	        Rect pos = gameView.position;
	        pos.width = mScreenResolution.x + cWindowOutline;
	        pos.height = mScreenResolution.y + cWindowOutline;
	        gameView.position = pos;				
		}
	}
	
	/// <summary>
	/// Setups the camera.
	/// </summary>
	private void SetupCamera()
	{
		Camera cam;
		if ( Camera.main == null )
		{
			GameObject camGo = new GameObject("Main Camera");	
			camGo.tag = "MainCamera";
			cam = camGo.AddComponent( typeof(Camera) ) as Camera;
		}
		else
		{
			cam = Camera.main;
		}
		
		cam.transform.position = new Vector3( mScreenResolution.x / 2f, -mScreenResolution.y / 2, -1000f );
		cam.orthographic = true;
		cam.orthographicSize = mScreenResolution.y / 2;
		
		cam.clearFlags = CameraClearFlags.Color;
		cam.backgroundColor = Color.black;
		
		cam.cullingMask = 1;
		
	}
	
	/// <summary>
	/// Setups the render settings.
	/// </summary>
	private void SetupRenderSettings()
	{
		RenderSettings.ambientLight = Color.white;
		RenderSettings.fog = false;		
	}
	
	
	
}