using UnityEngine;
using System.Collections;
using System;

public class GAFAnimation : ScriptableObject {
	
	[HideInInspector] 
	[SerializeField]
	private GAFAnimationConfigFrame[] mConfigFrames;
	
	[HideInInspector] 
	[SerializeField]	
	private GAFAnimationSequence[] mAnimationSequences;
	
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}
	
	#region properties
	/// <summary>
	/// Gets or sets the animation config frames.
	/// </summary>
	/// <value>
	/// The animation config frames.
	/// </value>
	public GAFAnimationConfigFrame[] AnimationConfigFrames
	{
		get
		{
			return mConfigFrames;
		}
		set
		{
			mConfigFrames = value;
		}
	}
	
	/// <summary>
	/// Gets or sets the animation sequences.
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
		set
		{
			mAnimationSequences = value;
		}
	}
	
	/// <summary>
	/// Gets the animation sequences names.
	/// </summary>
	/// <value>
	/// The animation sequences names.
	/// </value>
	public string[] AnimationSequencesNames
	{
		get
		{
			string[] sn = new string[ mAnimationSequences.Length];
			
			for( int i=0;i< mAnimationSequences.Length;i++)
			{
				sn[i] = mAnimationSequences[i].Id;
			}
			
			return sn;
		}
	}
	#endregion
	
}
