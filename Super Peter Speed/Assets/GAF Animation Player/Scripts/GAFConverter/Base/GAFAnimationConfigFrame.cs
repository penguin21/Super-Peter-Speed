using UnityEngine;
using System.Collections;
using System.Collections.Generic;

[System.Serializable]
public class GAFAnimationConfigFrame {
	
#region private data
	
	[SerializeField]
	private int mFrameNumber;
	
	[SerializeField]
	private List<GAFState> mStates;
	
#endregion
	
#region implementation
		
#endregion
	
#region properties
	
	public GAFAnimationConfigFrame( int frameNumber )
	{
		mFrameNumber = frameNumber;
		
		mStates = new List<GAFState>();
		
	}
	
	/// <summary>
	/// Get amount of frames that present in animation.
	/// </summary>
	/// <value>
	/// The frame number.
	/// </value>/
	public int FrameNumber
	{
		get
		{
			return mFrameNumber;
		}
	}
	
	/// <summary>
	/// Adds the state to current config frame.
	/// </summary>
	/// <param name='state'>
	/// State.
	/// </param>/
	public void AddState( GAFState state )
	{
		mStates.Add( state );
	}
	
#endregion
	
	/// <summary>
	/// Retrives list of all states that present in .
	/// </summary>
	/// <value>
	/// The states.
	/// </value>/
	public List<GAFState> States
	{
		get
		{
			return mStates;
		}
	}
}
