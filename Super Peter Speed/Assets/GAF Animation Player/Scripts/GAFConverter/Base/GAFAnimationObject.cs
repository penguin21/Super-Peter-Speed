using UnityEngine;
using System.Collections;

[System.Serializable]
public class GAFAnimationObject {
	
	#region private data
	[SerializeField]
	private string mObjectName;
	
	[SerializeField]
	private string mImageName;
	#endregion
	
	
	#region public 
	
	public GAFAnimationObject( string objectName, string imageName )
	{
		mObjectName = objectName;
		mImageName = imageName;
	}
	#endregion
	
	#region properties
	/// <summary>
	/// Gets the name of the object.
	/// </summary>
	/// <value>
	/// The name of the object.
	/// </value>
	public string ObjectName
	{
		get
		{
			return mObjectName;
		}
	}
	
	/// <summary>
	/// Gets the name of the image.
	/// </summary>
	/// <value>
	/// The name of the image.
	/// </value>
	public string ImageName
	{
		get
		{
			return mImageName;
		}
	}
	#endregion
	
}
