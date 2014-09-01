using UnityEngine;
using System.Collections;

[System.Serializable]
public class GAFAnimationMask {
	
	#region private data
	[SerializeField]
	private string mObjectName;
	
	[SerializeField]
	private string mMaskName;
	#endregion
	
	
	#region public 
	
	public GAFAnimationMask( string objectName, string maskName )
	{
		mObjectName = objectName;
		mMaskName = maskName;
	}
	#endregion
	
	#region properties
	/// <summary>
	/// Gets the name of the object.
	/// </summary>
	/// <value>
	/// The name of the object.
	/// </value>/
	public string ObjectName
	{
		get
		{
			return mObjectName;
		}
	}
	
	/// <summary>
	/// Gets the name of the mask.
	/// </summary>
	/// <value>
	/// The name of the mask.
	/// </value>
	public string MaskName
	{
		get
		{
			return mMaskName;
		}
	}
	#endregion
	
}
