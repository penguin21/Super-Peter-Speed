using UnityEngine;
#if UNITY_EDITOR
using UnityEditor;
#endif
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;

/// <summary>
/// Frame arguments. Contain frame number
/// </summary>
public class FrameArgs : EventArgs
{
	private int mFrameNumber;
	
	public FrameArgs( int frameNumber )
	{
		this.mFrameNumber = frameNumber;
	}
	
	public int FrameNumber
	{
		get
		{
			return mFrameNumber;
		}
	}
}

/// <summary>
/// Frame handler.
/// </summary>
public delegate void FrameHandler(object sender, FrameArgs e );

#if UNITY_EDITOR
[System.Serializable]
public class GAFConverterUnityEditor : GAFConverterUnity {

#region private data
	
	[System.NonSerialized]
	protected GameObject mAnimationHolder;
			
#endregion	
	
#region public data
	
	public GAFConverterUnityEditor()
	{
		
	}
	
	public GAFConverterUnityEditor(string gafAnimationPath) 
		: base ()
	{
		mGafAnimationPath = gafAnimationPath;
		
		TextAsset ta = AssetDatabase.LoadAssetAtPath( gafAnimationPath, typeof(TextAsset) ) as TextAsset;
		mJASONString = ta.text;
		mName = ta.name;
		
	}
	
	public GAFConverterUnityEditor(string gafAnimationPath, string name) 
		: base ()
	{
		mGafAnimationPath = gafAnimationPath;
		
		TextAsset ta = AssetDatabase.LoadAssetAtPath( gafAnimationPath, typeof(TextAsset)  ) as TextAsset;
		mJASONString = ta.text;
		mName = ta.name;
	}
	
	/// <summary>
	/// Occurs when frame changed.
	/// </summary>
	public event FrameHandler FrameChanged;
	
	/// <summary>
	/// Raises the frame changed event.
	/// </summary>
	/// <param name='e'>
	/// E.
	/// </param>
	protected virtual void OnFrameChanged( FrameArgs e )
	{
		if( FrameChanged != null )
		{
			FrameChanged( this, e );	
		}
	}
	
	/// <summary>
	/// Creates the animation.
	/// </summary>
	/// <returns>
	/// The animation.
	/// </returns>
	/// <param name='hd'>
	/// Hd.
	/// </param>
	new public virtual GAFAnimationPlayer CreateAnimation(bool hd)
	{
		
		//
		mGo = new GameObject( this.Name );

		if ( hd )
		{
			mScale = 2f;
		}
		else
		{
			mScale = 1f;
		}
		
		// Create shared material
		GAFTextureAtlas ta = GetTextureAtlasByScale( mScale );
		mSharedMaterials = new Material[ta.Atlases.Length];
		if ( this.AnimationMasks != null )
		{
			for( int i=0;i<ta.Atlases.Length;i++)
			{
				mSharedMaterials[i] = new Material( Shader.Find("GAF/GAFElement_Mask") );
			}
		}
		else
		{
			for( int i=0; i< ta.Atlases.Length;i++)
			{
				mSharedMaterials[i] = new Material( Shader.Find("GAF/GAFElement"));
			}
		}
		
		/*
		//Store material
		for( int i=0;i< ta.Atlases.Length;i++)
		{
			mSharedMaterials[i].name = this.Name + i.ToString() + "_mat";
			
			//							
			string path = Path.GetDirectoryName( this.mGafAnimationPath ) + "/" + mSharedMaterials[i].name + ".mat";			
			Material mat = (Material) AssetDatabase.LoadAssetAtPath( path, typeof( Material ));				
			if( mat == null )
			{				
				AssetDatabase.CreateAsset( mSharedMaterials[i], Path.GetDirectoryName( this.mGafAnimationPath ) + "/" + mSharedMaterials[i].name + ".mat" );
			}
			else
			{
				mSharedMaterials[i] = mat;
			}
		}
		*/
		
		//Create masks
		if ( mAnimationMasks != null )
		{
			for (int i=0;i< mAnimationMasks.Length;i++)
			{
				Texture2D t = GetMaskTextureByElementName( mAnimationMasks[i].MaskName );
				GameObject go = GetGameObjectByElementName( mAnimationMasks[i].MaskName );
				
				go.name += "_" + mAnimationMasks[i].ObjectName + "_mask";
				go.layer = GAFConstants.cMaskLayer - i;
				
				GAFMaskHolder mm = go.AddComponent(typeof(GAFMaskHolder)) as GAFMaskHolder;
				mm.maskTexture = t;
				
				mm.elementScale = GetElementByName( mAnimationMasks[i].MaskName, mScale ).Scale;
				mm.elementPivot = new Vector2( GetElementByName( mAnimationMasks[i].MaskName, mScale ).PivotX,
											   GetElementByName( mAnimationMasks[i].MaskName, mScale ).PivotY 
											  );
				
				// Set initial matrix to identity
				mm.a = 1f;
				mm.d = 1f;
					
				go.GetComponent<Renderer>().enabled = false;
				
				/*
				// PRO version realisation with render to texture
				//Create mask cameras
				//GameObject maskCamGO = GameObject.Instantiate( Camera.main.gameObject ) as GameObject;
				GameObject maskCamGO = new GameObject();//GameObject.Instantiate( Camera.main.gameObject ) as GameObject;
				maskCamGO.transform.position = Camera.main.transform.position;
				maskCamGO.transform.rotation = Camera.main.transform.rotation;
				maskCamGO.transform.localScale = Camera.main.transform.lossyScale;
				
				maskCamGO.AddComponent(typeof(Camera));
				
				maskCamGO.camera.farClipPlane = Camera.main.farClipPlane;
				maskCamGO.camera.nearClipPlane = Camera.main.nearClipPlane;
				maskCamGO.camera.fieldOfView = Camera.main.fieldOfView;
				maskCamGO.camera.fov = Camera.main.fov;
				maskCamGO.camera.isOrthoGraphic = Camera.main.isOrthoGraphic;
				maskCamGO.camera.orthographicSize = Camera.main.orthographicSize;	
				
				maskCamGO.name = "MaskCamera_" + mAnimationMasks[i].ObjectName;
				RenderTexture rt = new RenderTexture( PlayerSettings.defaultScreenWidth, PlayerSettings.defaultScreenHeight, 16, RenderTextureFormat.ARGB32 );
				maskCamGO.camera.targetTexture = rt;				
				maskCamGO.camera.cullingMask = 1 << go.layer;
				maskCamGO.camera.backgroundColor = new Color( 0, 0, 0, 0 ); // Alpha should be 0
				
				// Remove unnesessary things from mask cameras
				AudioListener al = maskCamGO.camera.GetComponent(typeof(AudioListener)) as AudioListener;
				if ( al != null )
				{				
					Component.DestroyImmediate( al );
				}
				*/
				
			}
		}
		
		//Create elements
		for (int i=0;i< mAnimationObjects.Length;i++)
		{	
			GameObject go = GetGameObjectByElementName( mAnimationObjects[i].ImageName );
			
			go.name += "_" + mAnimationObjects[i].ObjectName; 
		}
		
		mGo.AddComponent(typeof(GAFAnimationPlayer));
		
		GAFAnimationPlayer ap = mGo.GetComponent(typeof(GAFAnimationPlayer)) as GAFAnimationPlayer;
		
		return ap;
		
	}
	
	/// <summary>
	/// Finds the frame.
	/// </summary>
	private int FindFrame(int frameNumber)
	{		
		//Find frame in sequence				
		for( int i=0;i<this.AnimationConfigFrames.Length;i++)
		{
			if ( this.AnimationConfigFrames[i].FrameNumber  == frameNumber )
			{
				return i;
			}				
		}
		
		return -1;		
	}
	
	/// <summary>
	/// Sets the animation to frame.
	/// </summary>
	/// <param name='fromFrame'>
	/// From frame.
	/// </param>
	/// <param name='toFrame'>
	/// To frame.
	/// </param>
	public void SetAnimationToFrame( int fromFrame, int toFrame )
	{
		//Set to default state
		foreach( Transform t in mGo.transform )
		{
			t.GetComponent<Renderer>().enabled = false;	
		}
		
		for ( int i=fromFrame;i<toFrame;i++)
		{
			//
			int actualFrameIndex = FindFrame( i );
			if ( actualFrameIndex < 0 ) continue;
						
			GAFAnimationConfigFrame acf = this.AnimationConfigFrames[ actualFrameIndex ];
			
			foreach( GAFState st in acf.States )
			{
				foreach( Transform t in mGo.transform )
				{
					string[] names = t.name.Split('_');
					
					if ( st.Name == names[1] )
					{
						//Move sprite
						ApplyTransformations( st, t.gameObject );
						
						ApplyObjectAlpha( st, t.gameObject );
					}
				}
			}
			
			//
			OnFrameChanged( new FrameArgs( i ) );
			
		}
		
	}
		
	#region private data
	
	/// <summary>
	/// Applies the transformations.
	/// </summary>
	/// <param name='state'>
	/// State.
	/// </param>
	/// <param name='go'>
	/// Go.
	/// </param>
	private void ApplyTransformations(GAFState state, GameObject go)
	{
		// Position
		go.transform.localPosition = new Vector3( state.tx, 
										  		 -state.ty,
										  		 -state.ZOrder
												);
		
		// Scale
		float a = state.a;
		float b = state.b;
		float d = state.d;
		
		float scaleX = Mathf.Sqrt( a*a + b*b );
		float scaleY = Mathf.Sqrt( b*b + d*d );
		
		if ( a < 0 )
		{
			scaleX = -scaleX;
		}
			
		if ( d < 0 )
		{
			scaleY = -scaleY;
		}	
		
		// Scale
		go.transform.localScale = new Vector3( scaleX, scaleY, 1f );
	
		//Rotation
		if ( a != 0 )
		{		
			float angle = ( ( Mathf.Atan( -b/a ) / Mathf.PI ) * 180f );
			
			go.transform.localRotation = Quaternion.Euler( 0, 0, angle );
		}
		else
		{
			go.transform.localRotation = Quaternion.identity;
		}
	}
	
	
	/// <summary>
	/// Applies the object alpha.
	/// </summary>
	/// <param name='state'>
	/// State.
	/// </param>
	/// <param name='go'>
	/// Go.
	/// </param>
	private void ApplyObjectAlpha(GAFState state, GameObject go)
	{	
		// Alpha
		float alpha = state.Alpha;
			
		if ( alpha == 0 ) 
		{
			go.GetComponent<Renderer>().enabled = false;		
			return; // if we not see object we dont apply alpha
		}
		else
		{
			go.GetComponent<Renderer>().enabled = true;
			//In fact we dont apply alpha for perfomance reason
		}
			
	}
	#endregion
	
	
#endregion
	
#region properties
		
	/// <summary>
	/// Gets or sets the animation holder.
	/// </summary>
	/// <value>
	/// The animation holder.
	/// </value>
	protected GameObject AnimationHolder
	{
		get
		{
			return AnimationHolder;
		}
		set
		{
			mAnimationHolder = value;
		}
	}
	
#endregion
	
}
#endif
