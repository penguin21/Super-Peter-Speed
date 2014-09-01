using UnityEngine;
using System.Collections;

[System.Serializable]
public class GAFElement {

	
	#region private data
	[SerializeField]
	private string mName;
	
	[SerializeField]
	private int mPivotX;
	
	[SerializeField]
	private int mPivotY;
	
	[SerializeField]
	private int mX;
	
	[SerializeField]
	private int mY;
	
	[SerializeField]
	private int mWidth;
	
	[SerializeField]
	private int mHeight;
	
	[SerializeField]
	private int mAtlasID;
	
	[SerializeField]
	private float mScale;
	#endregion
	
	#region public data
	
	public GAFElement( string name, int pivotX, int pivotY, int x, int y, int width, int height, int atlasId, float scale  )
	{
		mName = name;
		mPivotX = pivotX;
		mPivotY = pivotY;
		mX = x;
		mY = y;
		mWidth = width;
		mHeight = height;
		mAtlasID = atlasId;
		mScale = scale;
	}
	#endregion
	
	#region implementation
	public override string ToString ()
	{
		return string.Format ("[Element: Name={0}, PivotX={1}, PivotY={2}, X={3}, Y={4}, Width={5}, Height={6}, AtlasId={7}]", Name, PivotX, PivotY, X, Y, Width, Height, AtlasId);
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
	/// Gets the pivot x.
	/// </summary>
	/// <value>
	/// The pivot x.
	/// </value>
	public int PivotX
	{
		get
		{
			return mPivotX;	
		}
	}
	
	/// <summary>
	/// Gets the pivot y.
	/// </summary>
	/// <value>
	/// The pivot y.
	/// </value>
	public int PivotY
	{
		get
		{
			return mPivotY;	
		}
	}
	
	/// <summary>
	/// Gets the x.
	/// </summary>
	/// <value>
	/// The x.
	/// </value>
	public int X
	{
		get
		{
			return mX;	
		}
	}
	
	/// <summary>
	/// Gets the y.
	/// </summary>
	/// <value>
	/// The y.
	/// </value>
	public int Y
	{
		get
		{
			return mY;
		}
	}
	
	/// <summary>
	/// Gets the width.
	/// </summary>
	/// <value>
	/// The width.
	/// </value>
	public int Width
	{
		get
		{
			return mWidth;
		}
	}
	
	/// <summary>
	/// Gets the height.
	/// </summary>
	/// <value>
	/// The height.
	/// </value>
	public int Height
	{
		get
		{
			return mHeight;
		}
	}
	
	/// <summary>
	/// Gets the atlas identifier.
	/// </summary>
	/// <value>
	/// The atlas identifier.
	/// </value>
	public int AtlasId
	{
		get
		{
			return mAtlasID;
		}
	}
	
	public float Scale
	{
		get
		{
			return mScale;
		}
	}
	
	
	#endregion
	
}
