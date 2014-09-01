using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using System.IO;

[System.Serializable]
public class GAFConverterUnity : GAFConverter {

	
#region private data
	
	[System.NonSerialized]
	protected Material[] mSharedMaterials;
	
	[SerializeField]
	protected string mName = "GAFAnimation";
	
	[System.NonSerialized]
	protected GameObject mGo;
	
	[SerializeField]
	protected float mScale;
	
#endregion
	
#region public data
	
	/// <summary>
	/// Initializes a new instance of the <see cref="GAFConverterUnity"/> class.
	/// </summary>
	public GAFConverterUnity()
		: base ()
	{
	}
	
	/// <summary>
	/// Initializes a new instance of the <see cref="GAFConverterUnity"/> class.
	/// </summary>
	/// <c>
	/// GAFConverterUnity gafConverter = new GAFConverterUnity("coin/coin" );
	/// gafConverter.CreateAnimation(false);
	/// </c>	
	/// <param name='gafPath'>
	/// Gaf path.
	/// </param>
	public GAFConverterUnity(string gafPath) 
		: base ( gafPath )
	{
		mName = Path.GetFileNameWithoutExtension( gafPath );
	}
	
	/// <summary>
	/// Initializes a new instance of the <see cref="GAFConverterUnity"/> class.	
	/// </summary>
	/// <c>
	/// GAFConverterUnity gafConverter = new GAFConverterUnity("coin/coin", "myCoin" );
	/// gafConverter.CreateAnimation(false);
	/// </c>	
	/// <param name='gafPath'>
	/// Gaf path.
	/// </param>
	/// <param name='name'>
	/// Name.
	/// </param>
	public GAFConverterUnity(string gafPath, string name) 
		: base ( gafPath )
	{
		mName = name;		
	}
	
	#region future implementation
//	/// <summary>
//	/// Creates the unity animation clip based on animation configframes. Warning: unity animation do interpolation that may cause unexpected bahaviour.
//	/// </summary>
//	/// <returns>
//	/// The clip.
//	/// </returns>
//	/// <param name='animationConfigFrames'>
//	/// Animation config frames.
//	/// </param>
//	private AnimationClip CreateClip( GAFAnimationConfigFrame[] animationConfigFrames )
//	{
//		AnimationClip clip = new AnimationClip();
//		
//		AnimationCurve curveX = new AnimationCurve();
//		AnimationCurve curveY = new AnimationCurve();
//		AnimationCurve curveZ = new AnimationCurve();
//		
//		AnimationCurve curveScaleX = new AnimationCurve();
//		AnimationCurve curveScaleY = new AnimationCurve();
//		AnimationCurve curveScaleZ = new AnimationCurve();
//		
//		AnimationCurve curveRotationX = new AnimationCurve();
//		AnimationCurve curveRotationY = new AnimationCurve();
//		AnimationCurve curveRotationZ = new AnimationCurve();
//		AnimationCurve curveRotationW = new AnimationCurve();
//		
//		AnimationCurve curveAlpha = new AnimationCurve();
//		
//		for( int i=0;i< animationConfigFrames.Length;i++)
//		{
//			
//			if ( animationConfigFrames[i].States.Count == 0 )
//			{
//				continue;
//			}
//				
//			float time = animationConfigFrames[i].FrameNumber / GAFConstants.cTargetFPS; //30 fps
//			float stateX = animationConfigFrames[i].States[0].tx;
//			float stateY = -animationConfigFrames[i].States[0].ty;
//			float stateZ = -animationConfigFrames[i].States[0].ZOrder;
//			
//			//Scale
//			float a = animationConfigFrames[i].States[0].a;
//			float b = animationConfigFrames[i].States[0].b;
//			float c = animationConfigFrames[i].States[0].c;
//			float d = animationConfigFrames[i].States[0].d;
//					
//			float scaleX = Mathf.Sqrt( a*a + b*b );
//			float scaleY = Mathf.Sqrt( c*c + d*d );
//			
//			if ( a < 0 )
//			{
//				scaleX = -scaleX;
//			}
//			
//			if ( d < 0 )
//			{
//				scaleY = -scaleY;
//			}
//			
//			curveX.AddKey( new Keyframe( time, stateX ));
//			curveY.AddKey( new Keyframe( time, stateY ));		
//			curveZ.AddKey( new Keyframe( time, stateZ ));	
//			
//			curveScaleX.AddKey( new Keyframe( time, scaleX ));
//			curveScaleY.AddKey( new Keyframe( time, scaleY ));
//			
//			//Rotation
//			float angle = ( ( Mathf.Atan( -b/a ) / Mathf.PI ) * 180f );
//			
//			Quaternion q = Quaternion.Euler( 0, 0, angle );
//			
//			curveRotationX.AddKey( new Keyframe( time, q.x ));
//			curveRotationY.AddKey( new Keyframe( time, q.y ));
//			curveRotationZ.AddKey( new Keyframe( time, q.z ));
//			curveRotationW.AddKey( new Keyframe( time, q.w ));	
//						
//			curveAlpha.AddKey( new Keyframe( time, animationConfigFrames[i].States[0].Alpha ));	
//		}
//		
//		// Set initial to zero
//		curveAlpha.AddKey( new Keyframe( 0f, 0f ));
//				
//		// Unity BUG: can't handle animations of 1 key
//		if ( curveX.keys.Length == 1 )
//		{
//			curveX.AddKey( 1 / GAFConstants.cTargetFPS, curveX.keys[0].value );
//			curveY.AddKey( 1 / GAFConstants.cTargetFPS, curveY.keys[0].value );
//			curveZ.AddKey( 1 / GAFConstants.cTargetFPS, curveZ.keys[0].value );
//			
//			curveScaleX.AddKey( 1 / GAFConstants.cTargetFPS, curveScaleX.keys[0].value );
//			curveScaleY.AddKey( 1 / GAFConstants.cTargetFPS, curveScaleX.keys[0].value );
//			
//			curveRotationX.AddKey( 1 / GAFConstants.cTargetFPS, curveRotationX.keys[0].value );
//			curveRotationY.AddKey( 1 / GAFConstants.cTargetFPS, curveRotationY.keys[0].value );
//			curveRotationZ.AddKey( 1 / GAFConstants.cTargetFPS, curveRotationZ.keys[0].value );
//			curveRotationW.AddKey( 1 / GAFConstants.cTargetFPS, curveRotationW.keys[0].value );
//			
//		}
//		
//		// Unity BUG: 
//		curveScaleZ.AddKey( 0, 1f );
//		curveScaleZ.AddKey( 1 / GAFConstants.cTargetFPS , 1f );
//					
//		//
//		clip.SetCurve("", typeof(Transform), "localPosition.x", curveX);
//		clip.SetCurve("", typeof(Transform), "localPosition.y", curveY);
//		clip.SetCurve("", typeof(Transform), "localPosition.z", curveZ);
//		
//		clip.SetCurve("", typeof(Transform), "localScale.x", curveScaleX);
//		clip.SetCurve("", typeof(Transform), "localScale.y", curveScaleY);
//		clip.SetCurve("", typeof(Transform), "localScale.z", curveScaleZ);
//		
//		clip.SetCurve("", typeof(Transform), "localRotation.x", curveRotationX);
//		clip.SetCurve("", typeof(Transform), "localRotation.y", curveRotationY);
//		clip.SetCurve("", typeof(Transform), "localRotation.z", curveRotationZ);
//		clip.SetCurve("", typeof(Transform), "localRotation.w", curveRotationW);
//		
//		clip.SetCurve("", typeof(Material), "_Alpha", curveAlpha );
//		
//		return clip;
//	}
//	
//	/// <summary>
//	/// Gets the animation clip by object name
//	/// </summary>
//	/// <returns>
//	/// The animation clip by object name.
//	/// </returns>
//	/// <param name='objectName'>
//	/// Object name.
//	/// </param>
//	public AnimationClip GetAnimationClipByObjectName( string objectName )
//	{
//		//
//		GAFAnimationConfigFrame[] mAnimation = this.GetAnimationFramesByObject( objectName );
//				
//		AnimationClip ac = this.CreateClip( mAnimation );
//		
//		return ac;
//	}
//	
//	/// <summary>
//	/// Gets the animation clip by object sequence.
//	/// </summary>
//	/// <returns>
//	/// The animation clip by object sequence.
//	/// </returns>
//	/// <param name='objectName'>
//	/// Object name.
//	/// </param>
//	/// <param name='animationSequence'>
//	/// Animation sequence.
//	/// </param>
//	public AnimationClip GetAnimationClipByObjectSequence( string objectName, GAFAnimationSequence  animationSequence)
//	{
//		// 	
//		GAFAnimationConfigFrame[] mAnimation = this.GetAnimationFramesByObjectSequence( objectName, animationSequence );	
//		AnimationClip ac = this.CreateClip( mAnimation );	
//		return ac;
//	}
	#endregion
	
	/// <summary>
	/// Gets the atlas by identifier.
	/// </summary>
	/// <returns>
	/// The atlas by identifier.
	/// </returns>
	/// <param name='id'>
	/// Identifier.
	/// </param>
	/// <param name='scale'>
	/// Scale.
	/// </param>
	protected GAFTextureAtlas GetAtlasById( int id, float scale )
	{
		foreach ( GAFTextureAtlas ta in mTextureAtlases )
		{
			if ( ta.Scale == scale )
			{
				foreach( GAFAtlas a in ta.Atlases )
				{
					if( a.Id == id )
					{
						return ta;
					}
				}
			}
		}
		
		// Not found any atlas
		return null;
	}
	
	/// <summary>
	/// Gets the texture atlas by scale.
	/// </summary>
	/// <returns>
	/// The texture atlas by scale.
	/// </returns>
	/// <param name='scale'>
	/// Scale.
	/// </param>
	protected GAFTextureAtlas GetTextureAtlasByScale( float scale )
	{
		foreach( GAFTextureAtlas ta in mTextureAtlases )
		{
			if ( ta.Scale == scale )
			{
				return ta;
			}
		}
		
		return null;
	}
	
	/// <summary>
	/// Gets the name of the texture by element.
	/// </summary>
	/// <returns>
	/// The texture by element name.
	/// </returns>
	/// <param name='elementName'>
	/// Element name.
	/// </param>
	protected Texture2D GetTextureByElementName( string elementName )
	{
		//
		GAFTextureAtlas ta = GetTextureAtlasByScale( mScale );
		
		//
		GAFElement el = ta.GetElementByName( elementName );
		
		GAFAtlas a = ta.GetAtlasById( el.AtlasId );
		
		Texture2D texture = new Texture2D( el.Width, el.Height );
		texture.Apply();
		
		
		Color[] portion = a.AtlasTexture.GetPixels( el.X, el.Y, el.Width, el.Height ); 
				
		texture.SetPixels( portion );
		
		texture.filterMode = FilterMode.Point;
		texture.wrapMode = TextureWrapMode.Clamp;
		
		texture.Apply();
		
		return texture;
	}
	
	/// <summary>
	/// Gets the name of the mask texture by element.
	/// </summary>
	/// <returns>
	/// The mask texture by element name.
	/// </returns>
	/// <param name='elementName'>
	/// Element name.
	/// </param>
	protected Texture2D GetMaskTextureByElementName( string elementName )
	{
		//
		GAFTextureAtlas ta = GetTextureAtlasByScale( mScale );
		
		GAFElement el = ta.GetElementByName( elementName );
		GAFAtlas a = ta.GetAtlasById( el.AtlasId );
					
		//Texture2D texture = new Texture2D( el.Width + 10, el.Height + 10 );
		Texture2D texture = new Texture2D( el.Width, el.Height, TextureFormat.ARGB32, false );		
		
		// Fill texture with black
		Color[] col = texture.GetPixels();
		for(int i=0;i<col.Length;i++)
		{
			col[i] = Color.black;
		}
		texture.SetPixels( col );
		texture.Apply();
		
		Color[] portion = a.AtlasTexture.GetPixels( el.X, a.AtlasTexture.height - el.Height - el.Y, el.Width, el.Height );
		texture.SetPixels( 0,0, el.Width, el.Height, portion );
		texture.Apply(true);
		
		texture.filterMode = FilterMode.Bilinear;
		texture.wrapMode = TextureWrapMode.Clamp;
				
		texture.Apply();
		
		return texture;
	}
	
	/// <summary>
	/// Gets the name of the game object by element.
	/// </summary>
	/// <returns>
	/// The game object by element name.
	/// </returns>
	/// <param name='elementName'>
	/// Element name.
	/// </param>
	virtual protected GameObject GetGameObjectByElementName(string elementName)
	{	
		//
		GAFTextureAtlas ta = GetTextureAtlasByScale( mScale );	
		
		//
		GAFElement el = ta.GetElementByName( elementName );
		
		
		GAFAtlas a = ta.GetAtlasById( el.AtlasId );
		
		//
		GameObject tmpobj = new GameObject();
		MeshFilter mf = tmpobj.AddComponent(typeof(MeshFilter)) as MeshFilter;
		tmpobj.AddComponent(typeof(MeshRenderer));
		
		tmpobj.name = elementName;
		
		Vector3[] verts = new Vector3[4];
		Vector2[] uv = new Vector2[4];
		Vector3[] normals = new Vector3[4];
		int[] tri = new int[6];

		verts[0] = new Vector3(-el.PivotX / ta.Scale, -el.Height / ta.Scale + el.PivotY / ta.Scale, 0f);
		verts[0] /= el.Scale;
		
		verts[1] = new Vector3(-el.PivotX / ta.Scale, el.PivotY / ta.Scale, 0f);
		verts[1] /= el.Scale;
		
		verts[2] = new Vector3(el.Width / ta.Scale - el.PivotX / ta.Scale, el.PivotY / ta.Scale, 0f);
		verts[2] /= el.Scale;
		
		verts[3] = new Vector3(el.Width / ta.Scale - el.PivotX / ta.Scale, -el.Height / ta.Scale + el.PivotY / ta.Scale, 0f);
		verts[3] /= el.Scale;
		
		normals[0] = new Vector3(0f, 0f, -1f);
		normals[1] = new Vector3(0f, 0f, -1f);
		normals[2] = new Vector3(0f, 0f, -1f);
		normals[3] = new Vector3(0f, 0f, -1f);
			
		uv[1] = new Vector2( (float) el.X / a.AtlasTexture.width, (float) (a.AtlasTexture.height - el.Y ) / a.AtlasTexture.height );
		uv[0] = new Vector2( (float) el.X / a.AtlasTexture.width, (float) (a.AtlasTexture.height - el.Y - el.Height ) / a.AtlasTexture.height );
		uv[3] = new Vector2( (float) (el.X + el.Width ) / a.AtlasTexture.width, (float) ( a.AtlasTexture.height - el.Y - el.Height ) / a.AtlasTexture.height );
		uv[2] = new Vector2( (float) (el.X + el.Width ) / a.AtlasTexture.width, (float) ( a.AtlasTexture.height - el.Y ) / a.AtlasTexture.height );

		tri[0] = 2;
		tri[1] = 0;
		tri[2] = 1;

		tri[3] = 3;
		tri[4] = 0;
		tri[5] = 2;

		Mesh mesh = new Mesh();
		mesh.name = "Element_" + elementName;
		
		mesh.vertices = verts;
		mesh.uv = uv;
		mesh.triangles = tri;
		
		mesh.normals = normals;
		
		mesh.RecalculateBounds();
		mesh.RecalculateNormals();
		mf.mesh = mesh;
		
		//Material stuff
		tmpobj.renderer.sharedMaterial = mSharedMaterials[el.AtlasId - 1];
		tmpobj.renderer.sharedMaterial.color = new Color(1f, 1f, 1f, 1f);
		tmpobj.renderer.sharedMaterial.mainTexture = a.AtlasTexture;
	
		tmpobj.renderer.castShadows = false;
		tmpobj.renderer.receiveShadows = false;
		
		
		//Attach to parent
		tmpobj.transform.parent = mGo.transform;
		
		return tmpobj;
		
	}
		
	/// <summary>
	/// Creates the animation.
	/// </summary>
	/// <c>
	/// GAFConverterUnity gafConverter = new GAFConverterUnity("coin/coin", "myCoin" );
	/// gafConverter.CreateAnimation(false);
	/// </c>	
	/// <returns>
	/// The animation.
	/// </returns>
	/// <param name='hd'>
	/// Hd.
	/// </param>
	virtual public GAFAnimationPlayer CreateAnimation(bool hd)
	{	
		//If was no parsing
		if ( !this.WasProcessed )
		{
			ProcessGAF();
		}
		
		if ( !this.WasProcessed )
		{
			return null;
		}
		
		// Create root object
		mGo = new GameObject( mName );
		
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
			for( int i=0;i< ta.Atlases.Length;i++)
			{
				mSharedMaterials[i] = new Material( Shader.Find(GAFConstants.cElementMaskShaderPath) );
			}
		}
		else
		{
			for( int i=0;i< ta.Atlases.Length;i++)
			{
				mSharedMaterials[i] = new Material( Shader.Find(GAFConstants.cElementShaderPath));
			}
		}
		
		//Create masks
		if ( mAnimationMasks != null )
		{
			for (int i=0;i< mAnimationMasks.Length;i++)
			{
				Texture2D t = GetMaskTextureByElementName( mAnimationMasks[i].MaskName );
				GameObject go = GetGameObjectByElementName( mAnimationMasks[i].MaskName );
				
				go.layer = GAFConstants.cMaskLayer - i;
				
				go.name += "_" + mAnimationMasks[i].ObjectName + "_mask";
				
				GAFMaskHolder mh = go.AddComponent(typeof(GAFMaskHolder)) as GAFMaskHolder;
				mh.maskTexture = t;
												
				mh.elementScale = GetElementByName( mAnimationMasks[i].MaskName, mScale ).Scale;
				mh.elementPivot = new Vector2( GetElementByName( mAnimationMasks[i].MaskName, mScale ).PivotX,
											   GetElementByName( mAnimationMasks[i].MaskName, mScale ).PivotY 
											  );
				
				// Set initial matrix transformation to identity
				mh.a = 1f;
				mh.d = 1f;
				
				go.renderer.enabled = false;
				
				// For PRO realisation
				/*
				GameObject maskCamGO = new GameObject();//GameObject.Instantiate( Camera.main.gameObject ) as GameObject;
				
				Camera cam  = Camera.main;
				if ( cam == null )
				{
					cam = GameObject.Find("Camera").camera;
				}
				
				maskCamGO.transform.position = cam.transform.position;
				maskCamGO.transform.rotation = cam.transform.rotation;
				maskCamGO.transform.localScale = cam.transform.lossyScale;
				
				maskCamGO.AddComponent(typeof(Camera));
				
				maskCamGO.camera.farClipPlane = cam.farClipPlane;
				maskCamGO.camera.nearClipPlane = cam.nearClipPlane;
				maskCamGO.camera.fieldOfView = cam.fieldOfView;
				maskCamGO.camera.fov = cam.fov;
				maskCamGO.camera.isOrthoGraphic = cam.isOrthoGraphic;
				maskCamGO.camera.orthographicSize = cam.orthographicSize;			
				
				
				maskCamGO.name = "MaskCamera_" + mAnimationMasks[i].ObjectName;
												
				RenderTexture rt = new RenderTexture( (int) cam.pixelWidth, (int) cam.pixelHeight, 16, RenderTextureFormat.ARGB32 );
				maskCamGO.camera.targetTexture = rt;				
				maskCamGO.camera.cullingMask = 1 << go.layer;
				maskCamGO.camera.backgroundColor = new Color( 0, 0, 0, 0 );
				*/
				
				
			}
		}
		
		//Create elements
		for (int i=0;i< mAnimationObjects.Length;i++)
		{	
			GameObject go = GetGameObjectByElementName( mAnimationObjects[i].ImageName );
			
			go.name += "_" + mAnimationObjects[i].ObjectName; 
		}
									
		GAFAnimation ga = ScriptableObject.CreateInstance(typeof(GAFAnimation)) as GAFAnimation;
		ga.name = this.Name;
		
		ga.AnimationConfigFrames = this.AnimationConfigFrames;
		ga.AnimationSequences = this.AnimationSequences;
		
				
		GAFAnimationPlayer ap = mGo.AddComponent(typeof(GAFAnimationPlayer)) as GAFAnimationPlayer;
		ap.GAFAnimation = ga;		
										
		return ap;
		
	}
	
#endregion
	
#region properties
	
	/// <summary>
	/// Gets the name.
	/// </summary>
	/// <value>
	/// The name.
	/// </value>
	public string Name
	{
		get
		{
			return mName;
		}
	}
	
	/// <summary>
	/// Gets the root object.
	/// </summary>
	/// <value>
	/// The root object.
	/// </value>
	public GameObject RootObject
	{
		get
		{
			return mGo;	
		}
	}
	
	/// <summary>
	/// Gets or sets the scale.
	/// </summary>
	/// <value>
	/// The scale.
	/// </value>
	private float Scale
	{
		get
		{
			return mScale;
		}
		set
		{
			mScale = value;
		}
	}
	
	/// <summary>
	/// Gets or sets the shared material.
	/// </summary>
	/// <value>
	/// The shared material.
	/// </value>
	private Material[] SharedMaterials
	{
		get
		{
			return mSharedMaterials;
		}
		set
		{
			mSharedMaterials = value;
		}
	}
	
#endregion
	
}
