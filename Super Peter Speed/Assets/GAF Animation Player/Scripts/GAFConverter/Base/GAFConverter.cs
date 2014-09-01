using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System;


[System.Serializable]
public class GAFConverter {
	
#region private data
	
	[SerializeField]
	protected string mJASONString = "";
	
	[SerializeField]
	protected int mFrameNumber = 0;
	
	[SerializeField]
	protected string mVersion; 
	
	[SerializeField]
	protected GAFTextureAtlas[] mTextureAtlases;
	
	[SerializeField]
	protected GAFAnimationSequence[] mAnimationSequences;
	
	[SerializeField]
	protected GAFAnimationObject[] mAnimationObjects;
	
	[SerializeField]
	protected GAFAnimationConfigFrame[] mAnimationConfigFrames;
	
	[SerializeField]
	protected GAFNamedPart[] mNamedParts;
	
	[SerializeField]
	protected GAFAnimationMask[] mAnimationMasks;
	
	[SerializeField]
	protected string mGafAnimationPath;
	
	[SerializeField]
	protected bool mWasProcessed = false;
	
	
		
#endregion
	
#region public data
	
	/*
	public GAFConverter(string inJASONString)
	{
		mJASONString = inJASONString;
	}
	*/
	
	/// <summary>
	/// Occurs when frame processed.
	/// </summary>
	public event FrameHandler FrameProcessed;
	
	/// <summary>
	/// Raises the frame changed event.
	/// </summary>
	/// <param name='e'>
	/// E.
	/// </param>
	protected virtual void OnFrameProcessed( FrameArgs e )
	{
		if( FrameProcessed != null )
		{
			FrameProcessed( this, e );	
		}
	}
	
	/// <summary>
	/// Initializes a new instance of the <see cref="GAFConverter"/> class.
	/// </summary>
	public GAFConverter()
	{
	}
	
	/// <summary>
	/// Initializes a new instance of the <see cref="GAFConverter"/> class.
	/// </summary>
	/// <param name='gafAnimationPath'>
	/// Gaf animation path.
	/// </param>
	public GAFConverter(string gafAnimationPath)
	{
		
		mGafAnimationPath = gafAnimationPath;	
		
		try
		{
			TextAsset ta = Resources.Load( gafAnimationPath ) as TextAsset;		
			mJASONString = ta.text;
		}
		catch( Exception e )
		{
			Debug.Log( e );
		}
	}
	
	/// <summary>
	/// Determines whether this instance is part exists the specified partID.
	/// </summary>
	/// <returns>
	/// <c>true</c> if this instance is part exists the specified partID; otherwise, <c>false</c>.
	/// </returns>
	/// <param name='partID'>
	/// If set to <c>true</c> part I.
	/// </param>
	protected bool IsPartExists(string partId)
	{
		if ( mNamedParts != null  )
		{
			foreach( GAFNamedPart np in mNamedParts )
			{
				if( np.PartId == partId )
				{
					//Found
					return true;
				}
			}
			
			//Not found
			return false;
			
		}
		else
		{
			//If named parts is zero then draw everything
			return true;
		}
	}
	
	/// <summary>
	/// Do parsing and fill data structures.
	/// </summary>
	public void ProcessGAF()
	{
		if ( mJASONString == "" )
		{
			Debug.Log("JSON string is empty. Please check file path and file format.");
		}
		else
		{
			//Parse string into a JSONObject:
			JSONObject jsonObject = JSONObject.Parse(mJASONString);
		
			//Get version
			mVersion = jsonObject.GetString("version");
			
			//Get frame number
			mFrameNumber = (int) jsonObject.GetNumber("animationFrameCount");
			
			//Get Texture Atlases
			JSONArray jtae = jsonObject.GetArray("textureAtlas");
			mTextureAtlases = new GAFTextureAtlas[jtae.Length];
			
			for( int i=0; i< jtae.Length;i++)
			{									
				JSONObject joAtlas = JSONObject.Parse( jtae[i].ToString() );
				
				//Get scale
				float scale = (float) joAtlas.GetNumber("scale");
				
				//Get atlases
				JSONArray ja = joAtlas.GetArray("atlases");
											
				GAFAtlas[] atlases = new GAFAtlas[ja.Length];
				
				
				if ( float.Parse( mVersion ) > 2.4f ) //TODO:put in constants but with hows decription???
				{
					for ( int j=0; j< ja.Length;j++)
					{
						//
						JSONObject tmp = JSONObject.Parse( ja[j].ToString() );
						
						JSONArray sourArr = tmp.GetArray("sources");
						
						string[] sFileNames = new string[sourArr.Length];
						float[] sCSF = new float[sourArr.Length];
						
						for( int k=0;k<sourArr.Length;k++)
						{
							sFileNames[k] = sourArr[k].Obj.GetString("source");
							sCSF[k] = (float) sourArr[k].Obj.GetNumber("csf");
						}
								
						atlases[j] = new GAFAtlas( sFileNames, this.mGafAnimationPath, sCSF, (int) tmp.GetNumber("id") );
					}
				}
				else
				{
					for ( int j=0; j< ja.Length;j++)
					{
						JSONObject tmp = JSONObject.Parse( ja[j].ToString() );
						
						atlases[j] = new GAFAtlas( tmp.GetString("source"), this.mGafAnimationPath, (int) tmp.GetNumber("id"));
						
					}
				}
				
				
				//GetElements
				JSONArray jae = joAtlas.GetArray("elements");
				GAFElement[] elements = new GAFElement[jae.Length];
				
				for ( int j=0; j< jae.Length;j++)
				{
					JSONObject tmp = JSONObject.Parse( jae[j].ToString() );
					
					elements[j] = new GAFElement(       tmp.GetString("name"),
												(int) tmp.GetNumber("pivotX"),
												(int) tmp.GetNumber("pivotY"),
												(int) tmp.GetNumber("x"),
												(int) tmp.GetNumber("y"),
												(int) tmp.GetNumber("width"),
												(int) tmp.GetNumber("height"),
												(int) tmp.GetNumber("atlasID"),
												(float) tmp.GetNumber("scale")
											   );
											   
				}
				
				mTextureAtlases[i] = new GAFTextureAtlas( scale, elements, atlases );
				
			}
					
			//AnimationConfigFrames
			JSONArray jaa = jsonObject.GetArray("animationConfigFrames");
			mAnimationConfigFrames = new GAFAnimationConfigFrame[jaa.Length];
			
			for ( int i=0; i< jaa.Length;i++)
			{
				
				JSONObject tmp = JSONObject.Parse( jaa[i].ToString() );
				
				mAnimationConfigFrames[i] = new GAFAnimationConfigFrame( (int) tmp.GetNumber("frameNumber") );
				
				//GetElements
				JSONObject jas = tmp.GetObject("state");
				
				foreach( KeyValuePair<string,JSONValue> jo in jas )
				{
					GAFState st = new GAFState( jo.Key );
				
					JSONObject joSt = JSONObject.Parse( jo.Value.ToString() );	
					foreach( KeyValuePair<string,JSONValue> jo2 in joSt )
					{
						// Basic state info
						if ( jo2.Key == "st" )
						{
							string jo2V = jo2.Value.Str;
							jo2V = jo2V.Replace("{", string.Empty );
							jo2V = jo2V.Replace("}", string.Empty );
								
							string[] jo2VA = jo2V.Split(',');
							st.ZOrder = int.Parse( jo2VA[0] );
							st.a = float.Parse( jo2VA[1] );
							st.b = float.Parse( jo2VA[2] );
							st.c = float.Parse( jo2VA[3] );
							st.d = float.Parse( jo2VA[4] );
							st.tx = float.Parse( jo2VA[5] );
							st.ty = float.Parse( jo2VA[6] );
							st.Alpha = float.Parse( jo2VA[7] );						
						}
						//Color matrix
						else if ( jo2.Key == "c" )
						{	
							string[] jo2VA = jo2.Value.Str.Split(',');
							
							//fill color transformation matrix
							Color cMult = new Color( float.Parse( jo2VA[1] ), 
													 float.Parse( jo2VA[3] ),
													 float.Parse( jo2VA[5] )
													);
							
							
							Color cOffset = new Color( float.Parse( jo2VA[2] ), 
													   float.Parse( jo2VA[4] ),
													   float.Parse( jo2VA[6] ),
													   float.Parse( jo2VA[0] )
													  );
							
							GAFColorTransformationMatrix ctm = new GAFColorTransformationMatrix( cMult, cOffset );
							
							//assign matrix
							st.ColorTansformaitonMtx = ctm;
						}
						//Mask
						else if ( jo2.Key == "m" )
						{
							st.MaskId = jo2.Value.Str;
						}
						//Effects
						else if ( jo2.Key == "e" )
						{
							foreach( JSONValue jo3 in jo2.Value.Array )
							{
								if ( jo3.Obj["t"].Str == "Fblur" )
								{
									st.HorizontalBlur = float.Parse( jo3.Obj["x"].Str );
									st.VerticalBlur = float.Parse( jo3.Obj["y"].Str );		
								}
							}
						}
					}
					
					mAnimationConfigFrames[i].AddState( st );	
				}
				
				//Callback for progress bar
				OnFrameProcessed( new FrameArgs(i ));
				
			}
			
			//Animation sequence
			if ( jsonObject.ContainsKey("animationSequences") )
			{
				JSONArray jaas = jsonObject.GetArray("animationSequences");		
				mAnimationSequences = new GAFAnimationSequence[jaas.Length];
				
				for ( int i=0; i< jaas.Length; i++ )
				{
					JSONObject tmp = JSONObject.Parse( jaas[i].ToString() );
						
					mAnimationSequences[i] = new GAFAnimationSequence( tmp.GetString("id"),
																	(int) tmp.GetNumber("startFrameNo"),
																	(int) tmp.GetNumber("endFrameNo")
																   );
				}
			}
			else
			{
				mAnimationSequences = new GAFAnimationSequence[1];
				mAnimationSequences[0] = new GAFAnimationSequence( "Default", 1, mAnimationConfigFrames[mAnimationConfigFrames.Length-1].FrameNumber );
			}
			
			
			// Get animation objects
			string ao = jsonObject.GetValue( "animationObjects" ).ToString();
			ao = ao.Replace("{",string.Empty);
			ao = ao.Replace("}",string.Empty);
			
			if ( ao.Length > 0 )
			{
				string [] aovals = ao.Split(',');
				mAnimationObjects = new GAFAnimationObject[aovals.Length];
				
				for ( int i=0; i< aovals.Length; i++ )
				{
					string tmp = aovals[i].ToString().Replace("\"", string.Empty);
					
					string objName = tmp.Split(':')[0];
					string aniName = tmp.Split(':')[1];
					
					mAnimationObjects[i] = new GAFAnimationObject( objName, aniName );
				}
			}
			
			// Get animation masks
			string am = jsonObject.GetValue( "animationMasks" ).ToString();
			am = am.Replace("{",string.Empty);
			am = am.Replace("}",string.Empty);
			
			if ( am.Length > 0 )
			{
				string [] amvals = am.Split(',');
				mAnimationMasks = new GAFAnimationMask[amvals.Length];
				
				for ( int i=0; i< amvals.Length; i++ )
				{
					string tmp = amvals[i].ToString().Replace("\"", string.Empty);
					
					string objName = tmp.Split(':')[0];
					string mskName = tmp.Split(':')[1];
					
					mAnimationMasks[i] = new GAFAnimationMask( objName, mskName );
				}
			}
			
			
			// Get named parts
			string np = jsonObject.GetValue( "namedParts" ).ToString();
			np = np.Replace("{",string.Empty);
			np = np.Replace("}",string.Empty);
			
			if ( np.Length > 0 )
			{
				string [] npvals = np.Split(',');
				mNamedParts = new GAFNamedPart[npvals.Length];
				
				for ( int i=0; i< npvals.Length; i++ )
				{
					string tmp = npvals[i].ToString().Replace("\"", string.Empty);
					
					string partID = tmp.Split(':')[0];		
					string unicName = tmp.Split(':')[1];
					
					mNamedParts[i] = new GAFNamedPart( partID, unicName );
				}
			}
			
			
			//
			mWasProcessed = true;
			
		}
	}
	
	/// <summary>
	/// Gets the name of the element.
	/// </summary>
	/// <returns>
	/// The element by name.
	/// </returns>
	/// <param name='name'>
	/// Name.
	/// </param>
	/// <param name='scale'>
	/// Scale.
	/// </param>
	public GAFElement GetElementByName(string name, float scale )
	{
		
		foreach( GAFTextureAtlas ta in mTextureAtlases )
		{
			if ( ta.Scale == scale )
			{
				foreach( GAFElement el in ta.Elements )
				{
					if( el.Name == name )
					{
						return el;
					}
				}
			}
		}
			
		return null;
	}
	
	/// <summary>
	/// Gets the animation frames by object.
	/// </summary>
	/// <returns>
	/// The animation frames by object.
	/// </returns>
	/// <param name='objectName'>
	/// Object name.
	/// </param>
	public GAFAnimationConfigFrame[] GetAnimationFramesByObject( string objectName )
	{
		
		GAFAnimationConfigFrame[] acf = new GAFAnimationConfigFrame[ mAnimationConfigFrames.Length ];
			
		for ( int i=0; i< acf.Length;i++ )
		{
			acf[i] = new GAFAnimationConfigFrame( mAnimationConfigFrames[i].FrameNumber );
			
			foreach ( GAFState st in mAnimationConfigFrames[i].States )
			{
				if( st.Name == objectName )
				{
					acf[i].AddState( st );
				}
			}
		}
		
		return acf;
	}
	
	/// <summary>
	/// Gets the animation frames by object sequence.
	/// </summary>
	/// <returns>
	/// The animation frames by object sequence.
	/// </returns>
	/// <param name='objectName'>
	/// Object name.
	/// </param>
	/// <param name='animationSequence'>
	/// Animation sequence.
	/// </param>
	public GAFAnimationConfigFrame[] GetAnimationFramesByObjectSequence( string objectName, GAFAnimationSequence animationSequence )
	{
		
		List<GAFAnimationConfigFrame> configFrames = new List<GAFAnimationConfigFrame>();
		
		int startFrame = animationSequence.StartFrame;
		int endFrame = animationSequence.EndFrame;
		
		for ( int i=0; i< mAnimationConfigFrames.Length;i++ )
		{
			if ( mAnimationConfigFrames[i].FrameNumber >= startFrame && mAnimationConfigFrames[i].FrameNumber <= endFrame )
			{		
				
				GAFAnimationConfigFrame tmpCF = new GAFAnimationConfigFrame( mAnimationConfigFrames[i].FrameNumber );
					
				foreach ( GAFState st in mAnimationConfigFrames[i].States )
				{
					if( st.Name == objectName )
					{
						tmpCF.AddState( st );
					}
				}
				
				configFrames.Add( tmpCF );
			}
		}
		
		return configFrames.ToArray();
	}

	/// <summary>
	/// Returns a <see cref="System.String"/> that represents the current <see cref="GAFConverter"/>.
	/// </summary>
	/// <returns>
	/// A <see cref="System.String"/> that represents the current <see cref="GAFConverter"/>.
	/// </returns>
	public override string ToString ()
	{
		return string.Format ("[GAFConverter: TextureAtlases={0}, AnimationObjects={1}, AnimationConfigFrames={2}, AnimationSequences={3}, AnimationMasks={4}, NamedParts={5}, FrameNumber={6}, Version={7}, WasProcessed={8}]", TextureAtlases, AnimationObjects, AnimationConfigFrames, AnimationSequences, AnimationMasks, NamedParts, FrameNumber, Version, WasProcessed);
	}
	
#endregion
	
#region properties
	
	/// <summary>
	/// Gets the texture atlases.
	/// </summary>
	/// <value>
	/// The texture atlases.
	/// </value>
	public GAFTextureAtlas[] TextureAtlases
	{
		get
        {
            return mTextureAtlases;
        }
	}
	
	/// <summary>
	/// Gets the animation objects.
	/// </summary>
	/// <value>
	/// The animation objects.
	/// </value>
	public GAFAnimationObject[] AnimationObjects
	{
		get
        {
            return mAnimationObjects;
        }
	}
	
	/// <summary>
	/// Gets the animation config frames.
	/// </summary>
	/// <value>
	/// The animation config frames.
	/// </value>
	public GAFAnimationConfigFrame[] AnimationConfigFrames
	{
		get
        {
            return mAnimationConfigFrames;
        }
	}
	
	/// <summary>
	/// Gets the animation sequences.
	/// </summary>
	/// <value>
	/// The animation sequences.
	/// </value>
	public GAFAnimationSequence[] AnimationSequences
	{
		get
		{
			return mAnimationSequences;
		}
	}
	
	/// <summary>
	/// Gets the animation masks.
	/// </summary>
	/// <value>
	/// The animation masks.
	/// </value>
	public GAFAnimationMask[] AnimationMasks
	{
		get
		{
			return mAnimationMasks;
		}
	}
	
	/// <summary>
	/// Gets the named parts.
	/// </summary>
	/// <value>
	/// The named parts.
	/// </value>
	public GAFNamedPart[] NamedParts
	{
		get
		{
			return mNamedParts;
		}
	}
	
	/// <summary>
	/// Gets the frame number.
	/// </summary>
	/// <value>
	/// The frame number.
	/// </value>
	public int FrameNumber
	{
		get
		{
			return mFrameNumber;
		}
	}
	
	/// <summary>
	/// Gets the version.
	/// </summary>
	/// <value>
	/// The version.
	/// </value>
	public string Version
	{
		get
		{
			return mVersion;
		}
	}
	
	/// <summary>
	/// Gets a value indicating whether this <see cref="GAFConverter"/> was processed.
	/// </summary>
	/// <value>
	/// <c>true</c> if was processed; otherwise, <c>false</c>.
	/// </value>
	public bool WasProcessed
	{
		get
		{
			return mWasProcessed;
		}
	}
	
#endregion
	
}
