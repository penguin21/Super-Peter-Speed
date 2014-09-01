using UnityEngine;
using System.Collections;

[System.Serializable]
public class GAFNamedPart {
	
	#region private data
	[SerializeField]
	private string mPartId;
	
	[SerializeField]
	private string mName;
	#endregion
	
	
	#region public 
	
	public GAFNamedPart( string partId, string name )
	{
		mPartId = partId;
		mName = name;
	}
	#endregion
	
	#region implementation
	public override string ToString ()
	{
		return string.Format ("[NamedPart: PartId={0}, Name={1}]", PartId, Name);
	}
	#endregion
	
	#region properties
	/// <summary>
	/// Gets the part identifier.
	/// </summary>
	/// <value>
	/// The part identifier.
	/// </value>
	public string PartId
	{
		get
		{
			return mPartId;
		}
	}
	
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
	#endregion
	
}
