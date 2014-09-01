using UnityEngine;
using System.Collections;

[System.Serializable]
public class GAFColorTransformationMatrix {
	
	#region private data
	//
	[SerializeField]
	private float mMultiplierR;
	
	[SerializeField]
	private float mMultiplierG;
	
	[SerializeField]
	private float mMultiplierB;
	
	[SerializeField]
	private float mMultiplierA;
	
	//
	[SerializeField]
	private float mOffsetR;
	
	[SerializeField]
	private float mOffsetG;
	
	[SerializeField]
	private float mOffsetB;
	
	[SerializeField]
	private float mOffsetA;	
	#endregion
	
	
	#region public 
	
	public GAFColorTransformationMatrix( )
	{
		this.Multipliers = Color.white;
		this.Offsets = Color.black;
		mOffsetA = 0f;
	}
	
	public GAFColorTransformationMatrix( Color multipliers, Color offsets )
	{
		this.Multipliers = multipliers;
		this.Offsets = offsets;
	}
	
	public override string ToString ()
	{
		return string.Format ("[ColorTranformationMatrix: Multipliers={0}, Offsets={1}]", Multipliers, Offsets);
	}
	
	#endregion
	
	#region properties
	/// <summary>
	/// Gets or sets the multipliers.
	/// </summary>
	/// <value>
	/// The multipliers.
	/// </value>
	public Color Multipliers
	{
		get
		{			
			return new Color( mMultiplierR, mMultiplierG, mMultiplierB, mMultiplierA );
		}
		set
		{
			mMultiplierR = value.r;
			mMultiplierG = value.g;
			mMultiplierB = value.b;
			mMultiplierA = value.a;
		}
	}
	
	/// <summary>
	/// Gets or sets the offsets.
	/// </summary>
	/// <value>
	/// The offsets.
	/// </value>
	public Color Offsets
	{
		get
		{
			return new Color( mOffsetR, mOffsetG, mOffsetB, mOffsetA );
		}
		set
		{
			mOffsetR = value.r;
			mOffsetG = value.g;
			mOffsetB = value.b;
			mOffsetA = value.a;
		}
	}
	#endregion
	
}
