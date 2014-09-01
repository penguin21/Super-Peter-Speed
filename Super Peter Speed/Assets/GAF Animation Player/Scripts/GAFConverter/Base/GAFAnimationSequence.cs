using UnityEngine;
using System.Collections;

[System.Serializable]
public class GAFAnimationSequence {
	
#region private data
	
	[SerializeField]
	private string mId;
	
	[SerializeField]
	private int mStartFrame;
	
	[SerializeField]
	private int mEndFrame;
	
#endregion
	
#region public data
	
	public GAFAnimationSequence( string id, int startFrame, int endFrame )
	{
		mId = id;
		mStartFrame = startFrame;
		mEndFrame = endFrame;
	}
	
#endregion
	
#region implementation
	
	public override string ToString ()
	{
		return string.Format ("[AnimationSequence: Id={0}, StartFrame={1}, EndFrame={2}]", Id, StartFrame, EndFrame);
	}
	
#endregion
	
#region properties
	
	/// <summary>
	/// Gets or sets the identifier.
	/// </summary>
	/// <value>
	/// The identifier.
	/// </value>
	public string Id
	{
		get
		{
			return mId;
		}
		set
		{
			mId = value;
		}
	}
	
	/// <summary>
	/// Gets or sets the start frame.
	/// </summary>
	/// <value>
	/// The start frame.
	/// </value>
	public int StartFrame
	{
		get
		{
			return mStartFrame;
		}
		set
		{
			mStartFrame = value;
		}
	}
	
	/// <summary>
	/// Gets or sets the end frame.
	/// </summary>
	/// <value>
	/// The end frame.
	/// </value>
	public int EndFrame
	{
		get
		{
			return mEndFrame;
		}
		set
		{
			mEndFrame = value;
		}
	}
	
#endregion
	
	
}
