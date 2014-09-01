using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using System.IO;

/// <summary>
/// Animation wrap mode.
/// </summary>
public enum eGAFWrapMode
{
	Once,Loop
}

//
[System.Serializable]
public class PolygonVerts
{
	[SerializeField]
	public Vector3 Vertex0;
	
	[SerializeField]
	public Vector3 Vertex1;
	
	[SerializeField]
	public Vector3 Vertex2;
	
	[SerializeField]
	public Vector3 Vertex3;
}

/// <summary>
/// GAF animation player base.
/// </summary>
public class GAFAnimationPlayerBase : MonoBehaviour {
	
	#region public data	
	#endregion
	
	#region private data
	[SerializeField]
	private GAFAnimation mGafAnimation;
	
	[SerializeField]
	protected int mCurrentSequenceIndex;	
	
	[SerializeField]
	protected bool mPlayAutomatically = true;
	
	[SerializeField]
	protected bool mIsPlaying = false;
	
	[SerializeField]
	protected bool mWasInit = false;
	
	[SerializeField]
	protected eGAFWrapMode mWrapMode = eGAFWrapMode.Loop;
	
	[SerializeField]
	public List<PolygonVerts> mOriginalVerts;

	[SerializeField]
	public List<string> mOriginalVertsGo;
	
	//
	protected Dictionary<string, GameObject> mAnimatedObjects;
	
	protected GameObject mCurrentGameObject;
	protected int mCurrentFrame = -1;	
	protected float mPreviousTime;	
	protected GAFState mCurrentState;
	
	protected Dictionary<GameObject,List<GameObject>> mBlurGos;
	protected Dictionary<GameObject,List<Material>> mBlurMats;	
	#endregion
		
	#region MonoBehaviour
	public virtual void Start () {
			
		if ( this.GAFAnimation == null )
		{
			mIsPlaying = false;
			return;
		}
						
		mIsPlaying = mPlayAutomatically;
		
		if ( !mPlayAutomatically )
		{
			return;
		}
		
		// Clean up old blurren objects
		foreach( Transform t in transform )
		{
			if( t.name.Contains("blur"))
			{
				DestroyImmediate( t.gameObject );	
			}
		}
		
		//Get link to frames
		mAnimatedObjects = new Dictionary<string, GameObject>();
		
		mBlurGos = new Dictionary<GameObject, List<GameObject>>();		
		mBlurMats = new Dictionary<GameObject, List<Material>>();
		
		bool cloned = true;
		if ( mOriginalVerts == null )
		{
			mOriginalVerts = new List<PolygonVerts>();
			mOriginalVertsGo = new List<string>();
			cloned = false;
		}
		else if ( mOriginalVerts.Count == 0 )
		{
			mOriginalVerts = new List<PolygonVerts>();
			mOriginalVertsGo = new List<string>();
			cloned = false;
		}
		
		foreach ( Transform t in transform )
		{
			string[] names = t.name.Split('_');
		
			if ( !t.name.Contains("blur") )
			{
				mAnimatedObjects.Add( names[1], t.gameObject );
				
				MeshFilter mf = t.gameObject.GetComponent(typeof(MeshFilter)) as MeshFilter;
				
				if ( !cloned )
				{
					mOriginalVertsGo.Add( t.gameObject.name );
					PolygonVerts ps = new PolygonVerts();
					
					ps.Vertex0 = mf.sharedMesh.vertices[0];
					ps.Vertex1 = mf.sharedMesh.vertices[1];
					ps.Vertex2 = mf.sharedMesh.vertices[2];
					ps.Vertex3 = mf.sharedMesh.vertices[3];
					
					mOriginalVerts.Add ( ps );
				}
		
				t.localScale = Vector3.one;
				t.localRotation = Quaternion.identity;
			}
						
			mCurrentGameObject = t.gameObject;
		
			mCurrentGameObject.renderer.enabled = false;
							
			mBlurGos.Add( mCurrentGameObject, new List<GameObject>() );
		}
			
		mPreviousTime = Time.realtimeSinceStartup;
		
		mCurrentFrame = mGafAnimation.AnimationSequences[mCurrentSequenceIndex].StartFrame - 1;
		
		mWasInit = true;
				
	}
	
	public virtual void Update () {
					
		if ( !mIsPlaying )
		{
			return;
		}
		
		//
		if ( (Time.realtimeSinceStartup - mPreviousTime) > ( GAFConstants.cTimeScale / GAFConstants.cTargetFPS ) )
		{
			mCurrentFrame++;			
			mPreviousTime = Time.realtimeSinceStartup;
						
			if ( (mCurrentFrame > mGafAnimation.AnimationSequences[mCurrentSequenceIndex].EndFrame - 1 ) )
			{
				
				if ( mWrapMode == eGAFWrapMode.Once )
				{
					mIsPlaying = false;
					return;
				}
				else if ( mWrapMode == eGAFWrapMode.Loop )
				{
					GAFResetElements();
					mCurrentFrame = mGafAnimation.AnimationSequences[mCurrentSequenceIndex].StartFrame;					
				}
			}			
			
		}
		else
		{
			return;
		}
		
		//Find frame in sequence
		int gafFramePosition = -1;
		for( int i=0;i<mGafAnimation.AnimationConfigFrames.Length;i++)
		{
			if ( mGafAnimation.AnimationConfigFrames[i].FrameNumber  == mCurrentFrame )
			{
				gafFramePosition = i;
				break;
			}				
		}
		
		if (gafFramePosition< 0 )
		{
			return;
		}
			
		//
		GAFAnimationConfigFrame animationFrame = mGafAnimation.AnimationConfigFrames[gafFramePosition];
		foreach ( GAFState animState in animationFrame.States )
		{	
			if ( mAnimatedObjects.ContainsKey( animState.Name ) )
			{			
				mCurrentGameObject = mAnimatedObjects[ animState.Name ];
				
				mCurrentState = animState;
								
				ApplyTransformations();						
				
				//if ( !mCurrentGameObject.name.Contains("mask") )
				{					
					ApplyObjectAlpha();	
					ApplyColorTranformation();				
					ApllyObjectBlur();					
					ApplyMask();			
				}
				
			}
		}
						
	}
	#endregion		
	
	#region Custom methods
	/// <summary>
	/// Applies the mask.
	/// </summary>
	protected virtual void ApplyMask()
	{				
		if ( mCurrentState.MaskId != string.Empty && mCurrentState.MaskId != null )
		{	
			// Pro realisation of a masks
			/*
			GameObject maskCamera = GameObject.Find("MaskCamera_" + mCurrentState.MaskId );
			
			if ( maskCamera == null )
			{
				Debug.Log("GAF Warning: cannot find mask camera: " + mCurrentState.MaskId +".Check does it was removed by hands."); 
				return;
			}
			else
			{				
				mCurrentGameObject.renderer.material.SetTexture("_MaskMap", maskCamera.camera.targetTexture );
			}
			*/

						
			// Free realisation
			string maskName = mCurrentState.MaskId;
			
			GameObject currentMaskGo = mAnimatedObjects[maskName];
			
			GAFMaskHolder mh = currentMaskGo.GetComponent(typeof(GAFMaskHolder)) as GAFMaskHolder;
			
			// TODO: process mask animation at first
			if ( mh.a == 0 )
			{
				return;
			}
			
			//			
			Matrix4x4 mtx = Matrix4x4.identity;
			
			mtx.m00 = mh.a;
			mtx.m01 = -mh.c ;
			
			mtx.m10 = -mh.b;
			mtx.m11 = mh.d;
							
			//
			mCurrentGameObject.renderer.material.SetTexture("_MaskMap", mh.maskTexture );
								
			float screenAscpect = (float) Screen.width / Screen.height;
		
			float scaleX = Mathf.Sqrt( mh.a * mh.a + mh.b * mh.b );
			float scaleY = Mathf.Sqrt( mh.c * mh.c + mh.d * mh.d );
			
			float pixelWidth = mh.maskTexture.width / mh.elementScale * scaleX * transform.localScale.x * screenAscpect;
			float pixelHeight = mh.maskTexture.height / mh.elementScale * scaleY * transform.localScale.y;
			
			float sizeXUV = Screen.width / pixelWidth;
			float sizeYUV = Screen.height / pixelHeight;
		
			float pivotScaleX = Screen.width / ( mh.maskTexture.width / mh.elementScale );
			float pivotScaleY = Screen.height / ( mh.maskTexture.height / mh.elementScale );
										
			float pivotX = pivotScaleX * ( mh.elementPivot.x / mh.elementScale ) / Screen.width;
			float pivotY = pivotScaleY * ( mh.maskTexture.height / mh.elementScale - mh.elementPivot.y / mh.elementScale ) / Screen.height;
			
			//float moveX = -( currentMaskGo.transform.localPosition.x + transform.localPosition.x ) / Screen.width;
			//float moveY = -1f - ( currentMaskGo.transform.localPosition.y + transform.localPosition.y ) / Screen.height;
			
			float moveX = -currentMaskGo.transform.position.x / Screen.width;
			float moveY = -1f - currentMaskGo.transform.position.y / Screen.height;
			
			Matrix4x4 piv = Matrix4x4.TRS(new Vector3( pivotX, pivotY, 0f), Quaternion.identity, Vector3.one );													
			
			Matrix4x4 scale = Matrix4x4.TRS(Vector3.zero, Quaternion.identity, new Vector3( sizeXUV, sizeYUV, 1f ));																													
			
			//float rotAng = Mathf.Atan( -mh.b / mh.a ) / Mathf.PI * 180f;
			
			Matrix4x4 rotGO = Matrix4x4.TRS(Vector3.zero, Quaternion.Euler(0f, 0.0f, -transform.localRotation.eulerAngles.z ), Vector3.one );
			
			//Matrix4x4 rot = Matrix4x4.TRS(Vector3.zero, Quaternion.Euler(0f, 0.0f, rotAng ), Vector3.one );
			
			Matrix4x4 scaleBack = Matrix4x4.TRS(Vector3.zero, Quaternion.identity, new Vector3( 1f / scaleX, 1f / scaleY, 1f ));
			
			Matrix4x4 screenScale = Matrix4x4.TRS( Vector3.zero, Quaternion.identity, new Vector3( screenAscpect, 1f, 1f ) );
		
			Matrix4x4 move = Matrix4x4.TRS(new Vector3( moveX, moveY, 0f), Quaternion.identity, Vector3.one );													
		
			mCurrentGameObject.renderer.material.SetMatrix("_Matrix0",  piv * scale * rotGO * mtx * scaleBack * screenScale * move );
			//mCurrentGameObject.renderer.material.SetMatrix("_Matrix0",  piv * scale * mtx * screenScale * move );			
			
		}
	}	
	
	// Stack usage optimization
	/// <summary>
	/// Applies the transformations.
	/// </summary>
	protected virtual void ApplyTransformations()
	{		
					
		// Position
		mCurrentGameObject.transform.localPosition = new Vector3( mCurrentState.tx, 
										  		 -mCurrentState.ty,
										  		 -mCurrentState.ZOrder
												);
		
		// Math coeffs
		float a = mCurrentState.a;
		float b = -mCurrentState.b;
		float c = -mCurrentState.c;
		float d = mCurrentState.d;
		
		if ( mCurrentGameObject.name.Contains("mask"))
		{
			GAFMaskHolder mh = mCurrentGameObject.GetComponent(typeof(GAFMaskHolder)) as GAFMaskHolder;
			mh.a = a;
			mh.b = b;
			mh.c = c;
			mh.d = d;
		}
		
		MeshFilter ms = mCurrentGameObject.GetComponent(typeof(MeshFilter)) as MeshFilter;
		Matrix4x4 mtx = Matrix4x4.identity;
		
		mtx.m00 = a;
		mtx.m01 = c;
		
		mtx.m10 = b;
		mtx.m11 = d;
		
		Vector3 []vecsOriginal = new Vector3[4];
		
		vecsOriginal[0] = mOriginalVerts[ mOriginalVertsGo.IndexOf( mCurrentGameObject.name ) ].Vertex0;
		vecsOriginal[1] = mOriginalVerts[ mOriginalVertsGo.IndexOf( mCurrentGameObject.name ) ].Vertex1;
		vecsOriginal[2] = mOriginalVerts[ mOriginalVertsGo.IndexOf( mCurrentGameObject.name ) ].Vertex2;
		vecsOriginal[3] = mOriginalVerts[ mOriginalVertsGo.IndexOf( mCurrentGameObject.name ) ].Vertex3;
		
		Vector3 [] vecs = new Vector3[ vecsOriginal.Length];
		for( int i=0; i< vecs.Length;i++)
		{
			vecs[i] = mtx * vecsOriginal[i];
		}
		
		ms.mesh.vertices = vecs;
		
		ms.mesh.RecalculateBounds();
											
	}
	
	/// <summary>
	/// Applies the object alpha.
	/// </summary>
	protected virtual void ApplyObjectAlpha()
	{	
		
		// Alpha
		float alpha = mCurrentState.Alpha;
			
		if ( alpha == 0 ) 
		{
			mCurrentGameObject.renderer.enabled = false;		
			return; // if we not see object we dont apply alpha
		}
		else
		{
			mCurrentGameObject.renderer.enabled = true;
			mCurrentGameObject.renderer.material.SetFloat("_Alpha", alpha  );
			
//			if ( alpha == 1 )
//			{
//				//currentGameObject.renderer.material.SetFloat("_Alpha", alpha  );
//				//currentGameObject.renderer.sharedMaterial = gafInstance.SharedMaterial;
//			}
//			else
//			{
//				currentGameObject.renderer.material.SetFloat("_Alpha", alpha  );
//			}
		}
			
	}
	
	/// <summary>
	/// Apllies the object blur.
	/// </summary>
	protected virtual void ApllyObjectBlur()
	{
		if ( mCurrentState.HorizontalBlur > 0 || mCurrentState.VerticalBlur > 0 )
		{
			// blur
			if ( !mBlurMats.ContainsKey(mCurrentGameObject) )
			{
				List<Material> mats = new List<Material>();
				for( int i=0; i < GAFConstants.cBlurIterations * GAFConstants.cPerRadiusBlurIterations; i++ )
				{
					mats.Add( new Material( mCurrentGameObject.renderer.material ));
				}
				mBlurMats.Add ( mCurrentGameObject, mats );
			}
			
			// Check if we have no blur objects create it
			if ( mBlurGos[mCurrentGameObject].Count < 1 )
			{	
				for( int r=0; r< GAFConstants.cBlurIterations;r++)
				{
					for( int i=0;i< GAFConstants.cPerRadiusBlurIterations; i++) //Iteration for blur
					{
						// Create instance
						GameObject go = GameObject.Instantiate( mCurrentGameObject ) as GameObject;
						go.name = mCurrentGameObject.name + "_blur_" + r.ToString();
						go.transform.parent = mCurrentGameObject.transform.parent;
						go.renderer.sharedMaterial = mBlurMats[mCurrentGameObject][r];
						go.transform.localScale = mCurrentGameObject.transform.localScale;
						
						// Add it to list
						mBlurGos[mCurrentGameObject].Add( go );
					}
				}
			}
			
			// Process blur objects
			float piStep = ( 2f * Mathf.PI ) / GAFConstants.cPerRadiusBlurIterations;
			
			for( int r=0; r< GAFConstants.cBlurIterations;r++)
			{
				for( int i=0; i< GAFConstants.cPerRadiusBlurIterations;i++)
				{
					mBlurGos[mCurrentGameObject][r * GAFConstants.cPerRadiusBlurIterations + i ].transform.localPosition = 
						mCurrentGameObject.transform.localPosition + new Vector3( mCurrentState.HorizontalBlur * (  (float) ( r + 1 ) / ( GAFConstants.cBlurIterations ) ) * Mathf.Cos( i * piStep ) , 
																				  mCurrentState.VerticalBlur * (  (float) ( r + 1 ) / ( GAFConstants.cBlurIterations ) ) * Mathf.Sin( i * piStep ), 0f );
					
					mBlurGos[mCurrentGameObject][r * GAFConstants.cPerRadiusBlurIterations + i].renderer.enabled = true;
				}
			
				float currenAlpha = mCurrentState.Alpha;
			
			 	//mBlurMats[mCurrentGameObject][(int)r].SetFloat("_Alpha", (currenAlpha * ( 1f - (float) ( r + 1 ) / ( GAFConstants.cBlurIterations ) ) ));
				mBlurMats[mCurrentGameObject][(int)r].SetFloat("_Alpha", (currenAlpha * ( 0.25f * ( 1f - (float) r / GAFConstants.cBlurIterations ) )));
			}
			
			//mCurrentGameObject.renderer.material.SetFloat("_Alpha", (currenAlpha /  ( GAFConstants.cBlurIterations / 2f + 1f) ));
			mCurrentGameObject.renderer.material.SetFloat("_Alpha", 0f );
		}
		else
		{
			
			for( int i=0;i<mBlurGos[mCurrentGameObject].Count;i++)
			{
				mBlurGos[mCurrentGameObject][i].renderer.enabled = false;
			}
					
		}
	
	}	
	
	/// <summary>
	/// Applies the color tranformation.
	/// </summary>
	protected virtual void ApplyColorTranformation()
	{		
		if ( mCurrentState.ColorTansformaitonMtx != null )
		{
			Color cMult = mCurrentState.ColorTansformaitonMtx.Multipliers;
			Color cOffset = mCurrentState.ColorTansformaitonMtx.Offsets;
			
			mCurrentGameObject.renderer.material.SetColor("_ColorMult", cMult );
			mCurrentGameObject.renderer.material.SetColor("_ColorShift", cOffset );
		}
		else
		{
			mCurrentGameObject.renderer.material.SetColor("_ColorMult", Color.white );
			mCurrentGameObject.renderer.material.SetColor("_ColorShift", new Color( 0, 0, 0, 0) );
		}
	}
	#endregion
	
	#region SendMessage receivers
	/// <summary>
	/// Sets the next animation. If it is last animation set to first one.
	/// </summary>
	public virtual void GAFSetNextAnimation()
	{
		if ( mGafAnimation == null )
		{
			return;
		}
			
		if ( mCurrentSequenceIndex > mGafAnimation.AnimationSequences.Length - 2 )
		{
			GAFSetAnimationByIndex(0);
		}
		else
		{
			GAFSetAnimationByIndex( mCurrentSequenceIndex + 1 );
		}
		
	}
	
	/// <summary>
	/// Sets the previous animation. If it is first animation set to last
	/// </summary>
	public virtual void GAFSetPreviousAnimation()
	{
		if ( mGafAnimation == null )
		{
			return;
		}
			
		if ( mCurrentSequenceIndex == 0  )
		{
			GAFSetAnimationByIndex(mGafAnimation.AnimationSequences.Length - 1);
		}
		else
		{
			GAFSetAnimationByIndex( mCurrentSequenceIndex - 1 );
		}
		
	}
		
	
	/// <summary>
	/// Sets current animation by name. If name was not founded do nothing.
	/// </summary>
	/// <param name='name'>
	/// Name.
	/// </param>
	public virtual void GAFSetAnimationByName( string name )
	{
		if (mGafAnimation == null )
		{
			return;
		}
		
		for( int i=0;i<mGafAnimation.AnimationSequences.Length;i++)
		{
			if ( mGafAnimation.AnimationSequences[i].Id == name )
			{
				mCurrentSequenceIndex = i;
				mCurrentFrame = mGafAnimation.AnimationSequences[mCurrentSequenceIndex].StartFrame - 2;
				return;
			}
		}
		
		Debug.Log("Warning: such sequence was not found ");
	}
	
	/// <summary>
	/// Sets current animation by index. If index is out of range do nothing.
	/// </summary>
	/// <param name='index'>
	/// Index.
	/// </param>
	public virtual void GAFSetAnimationByIndex( int index )
	{
		if (mGafAnimation == null )
		{
			return;
		}
		
		if ( index >= 0 && index < mGafAnimation.AnimationSequences.Length )
		{
			mCurrentSequenceIndex = index;
			
			//Using meshes can't preview
			GAFResetElements();	
			GAFRewind();
		}
	}
	
	/// <summary>
	/// Reset elements. Make them invisible, reset color shift and multiplication. Do not hide objects in editor mode
	/// </summary>
	public virtual void GAFResetElements()
	{
		foreach( Transform t in transform )
		{
			if ( !t.name.Contains( "mask"))
			{
				// Not hide objects in editor mode
				if ( Application.isPlaying )
				{
					t.renderer.enabled = false;
				}
				
				t.renderer.sharedMaterial.SetTexture("_MaskMap", null );
				t.renderer.sharedMaterial.SetColor("_ColorMult", Color.white );
				t.renderer.sharedMaterial.SetColor("_ColorShift", new Color( 0, 0, 0, 0) );
			}
		}	
	}
	
	/// <summary>
	/// Rewind current animation sequrnce to start.
	/// </summary>
	public virtual void GAFRewind()
	{
		if ( mGafAnimation != null )
		{		
			mCurrentFrame = mGafAnimation.AnimationSequences[mCurrentSequenceIndex].StartFrame - 1;
			//SetAnimationToFrame( mCurrentFrame + 1,  mCurrentFrame + 2 );
		}		
	}
		
	/// <summary>
	/// Sets the animation to frame. Simulate animation at setted period.
	/// </summary>
	/// <param name='fromFrame'>
	/// From frame.
	/// </param>
	/// <param name='toFrame'>
	/// To frame.
	/// </param>
	public virtual void GAFSetAnimationToFrame( int fromFrame, int toFrame )
	{
		//Set to default state
		foreach( Transform t in transform )
		{
			t.renderer.enabled = false;	
		}
		
		for ( int i=fromFrame;i<toFrame;i++)
		{
			
			//Find frame in sequence
			int gafFramePosition = -1;
			for( int j=0;i<mGafAnimation.AnimationConfigFrames.Length;j++)
			{
				if ( mGafAnimation.AnimationConfigFrames[j].FrameNumber - 1 == i )
				{
					gafFramePosition = i;
					break;
				}				
			}
		
			if (gafFramePosition< 0 )
			{
				continue;
			}
			
			GAFAnimationConfigFrame acf = mGafAnimation.AnimationConfigFrames[ i ];
			
			foreach( GAFState st in acf.States )
			{
				foreach( Transform t in transform )
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
			
		}
		
	}
	
	/// <summary>
	/// Play animation.
	/// </summary>
	public virtual void GAFPlay()
	{
		mIsPlaying = true;
	}
	
	/// <summary>
	/// Stop animation.
	/// </summary>
	public virtual void GAFStop()
	{
		mIsPlaying = false;
	}
	
	/// <summary>
	/// Applies the transformations.
	/// </summary>
	/// <param name='state'>
	/// State.
	/// </param>
	/// <param name='go'>
	/// Go.
	/// </param>
	protected virtual void ApplyTransformations(GAFState state, GameObject go)
	{
		// Position
		go.transform.localPosition = new Vector3( state.tx, 
										  		 -state.ty,
										  		 -state.ZOrder
												);
		
		// Math coeffs
		float a = state.a;
		float b = -state.b;
		float c = -state.c;
		float d = state.d;
		
		MeshFilter ms = go.GetComponent(typeof(MeshFilter)) as MeshFilter;
		Matrix4x4 mtx = Matrix4x4.identity;
		
		mtx.m00 = a;
		mtx.m01 = c;
				
		mtx.m10 = b;
		mtx.m11 = d;
		
		Vector3 []vecsOriginal = new Vector3[4];
		
		vecsOriginal[0] = mOriginalVerts[ mOriginalVertsGo.IndexOf( go.name ) ].Vertex0;
		vecsOriginal[1] = mOriginalVerts[ mOriginalVertsGo.IndexOf( go.name ) ].Vertex1;
		vecsOriginal[2] = mOriginalVerts[ mOriginalVertsGo.IndexOf( go.name ) ].Vertex2;
		vecsOriginal[3] = mOriginalVerts[ mOriginalVertsGo.IndexOf( go.name ) ].Vertex3;
		
		Vector3 [] vecs = new Vector3[ vecsOriginal.Length];
		for( int i=0; i< vecs.Length;i++)
		{
			vecs[i] = mtx * vecsOriginal[i];
		}
				
		ms.sharedMesh.vertices = vecs;
	}
	
	/// <summary>
	/// Applies the object alpha. Use in editor scripts
	/// </summary>
	/// <param name='state'>
	/// State.
	/// </param>
	/// <param name='go'>
	/// Go.
	/// </param>
	protected virtual void ApplyObjectAlpha(GAFState state, GameObject go)
	{	
		// Alpha
		float alpha = state.Alpha;
			
		if ( alpha == 0 ) 
		{
			go.renderer.enabled = false;		
			return; // if we not see object we dont apply alpha
		}
		else
		{
			go.renderer.enabled = true;
			//In fact we dont apply alpha for perfomance reason and generated materials
		}
			
	}
	#endregion
	
	#region properties
	/// <summary>
	/// Gets or sets the GAF animation data.
	/// </summary>
	/// <value>
	/// The gaf animation.
	/// </value>
	public GAFAnimation GAFAnimation
	{
		get
		{
			return mGafAnimation;
		}
		set
		{
			mGafAnimation = value;
		}
	}
	
	/// <summary>
	/// Gets or sets the index of the current sequence.
	/// </summary>
	/// <value>
	/// The index of the current sequence.
	/// </value>
	public int GAFCurrentSequenceIndex
	{
		get
		{
			return 	mCurrentSequenceIndex;
		}
		set
		{					
			if ( mCurrentSequenceIndex != value )
			{
				GAFSetAnimationByIndex( value );
			}
		}
	}
	
	/// <summary>
	/// Gets a value indicating whether this instance is playing.
	/// </summary>
	/// <value>
	/// <c>true</c> if this instance is playing; otherwise, <c>false</c>.
	/// </value>
	public bool GAFIsPlaying
	{
		get
		{
			return mIsPlaying;
		}
	}
	
	/// <summary>
	/// Gets or sets a value indicating whether animation is going to play on start.
	/// </summary>
	/// <value>
	/// <c>true</c> if play automatically; otherwise, <c>false</c>.
	/// </value>
	public bool GAFPlayAutomatically
	{
		get
		{
			return mPlayAutomatically;
		}
		set
		{
			mPlayAutomatically = value;
		}
	}
	
	/// <summary>
	/// Gets or sets the current frame.
	/// </summary>
	/// <value>
	/// The current frame.
	/// </value>
	public int GAFCurrentFrame
	{
		get
		{
			return mCurrentFrame;
		}
		set
		{
			if ( this.GAFAnimation != null )
			{
				mCurrentFrame = value;
			}					
		}
	}
	
	/// <summary>
	/// Gets or sets the GAF wrap mode.
	/// </summary>
	/// <value>
	/// The GAF wrap mode.
	/// </value>
	public eGAFWrapMode GAFWrapMode
	{
		get
		{
			return mWrapMode;
		}
		set
		{
			mWrapMode = value;
		}
	}
	#endregion
	
	
	
}
