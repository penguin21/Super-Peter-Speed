using UnityEngine;
using System.Collections;

[System.Serializable]
public class GAFState {
	
#region private data
	
	[SerializeField]
	private string mName;
	
	[SerializeField]
	private int mZOrder;
	
	// Transformations
	[SerializeField]
	private float mA;
	
	[SerializeField]
	private float mB;
	
	[SerializeField]
	private float mC;
	
	[SerializeField]
	private float mD;
	
	[SerializeField]
	private float mTx;
	
	[SerializeField]
	private float mTy;
	
	// Alpha
	[SerializeField]
	private float mAlpha;
	
	// Mask id
	[SerializeField]
	private string mMaskId;
	
	// Blur
	[SerializeField]
	private float mHorizontalBlur = 0f;
	
	[SerializeField]
	private float mVerticalBlur = 0f;
	
	// Color transformation matrix
	[SerializeField]
	private GAFColorTransformationMatrix mColorTransformationMatrix;
	
#endregion
	
#region public data
	
	public GAFState( string name, int zorder, float a, float b, float c, float d, float tx, float ty, float alpha )
	{
		mName = name;
		mZOrder = zorder;
		mA = a;
		mB = b;
		mC = c;
		mD = d;
		mTx = tx;
		mTy = ty;
		mAlpha = alpha;
	}
	
	public GAFState( string name, int zorder, float a, float b, float c, float d, float tx, float ty, float alpha, string maskId )
	{
		mName = name;
		mZOrder = zorder;
		mA = a;
		mB = b;
		mC = c;
		mD = d;
		mTx = tx;
		mTy = ty;
		mAlpha = alpha;
		mMaskId = maskId;
	}
	
	public GAFState(string name)
	{
		mName = name;
	}
	
#endregion
	
#region implementation
	
	public override string ToString ()
	{
		return string.Format ("[State: Name={0}, ZOrder={1}, a={2}, b={3}, c={4}, d={5}, tx={6}, ty={7}, Alpha={8}, MaskId={9}, HorizontalBlur={10}, VerticalBlur={11}, ColorTansformaitonMtx={12}]", Name, ZOrder, a, b, c, d, tx, ty, Alpha, MaskId, HorizontalBlur, VerticalBlur, ColorTansformaitonMtx);
	}
	
#endregion
	
#region properties
	
	/// <summary>
	/// Gets or sets the name of animation state.
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
		set
		{
			mName = value;
		}
	}
	
	/// <summary>
	/// Gets or sets the Z order.
	/// </summary>
	/// <value>
	/// The Z order.
	/// </value>
	public int ZOrder
	{
		get
		{
			return mZOrder;
		}
		set
		{
			mZOrder = value;
		}
	}
	
	/// <summary>
	/// Gets or sets a.
	/// </summary>
	/// <value>
	/// A.
	/// </value>
	public float a
	{
		get
		{
			return mA;
		}
		set
		{
			mA = value;
		}
	}
	
	/// <summary>
	/// Gets or sets the b.
	/// </summary>
	/// <value>
	/// The b.
	/// </value>
	public float b
	{
		get
		{
			return mB;
		}
		set
		{
			mB = value;
		}
	}
	
	/// <summary>
	/// Gets or sets the c.
	/// </summary>
	/// <value>
	/// The c.
	/// </value>
	public float c
	{
		get
		{
			return mC;
		}
		set
		{
			mC = value;
		}
	}
	
	/// <summary>
	/// Gets or sets the d.
	/// </summary>
	/// <value>
	/// The d.
	/// </value>/
	public float d
	{
		get
		{
			return mD;
		}
		set
		{
			mD = value;
		}
	}
	
	/// <summary>
	/// Gets or sets the tx.
	/// </summary>
	/// <value>
	/// The tx.
	/// </value>/
	public float tx
	{
		get
		{
			return mTx;
		}
		set
		{
			mTx = value;
		}
	}
	
	/// <summary>
	/// Gets or sets the ty.
	/// </summary>
	/// <value>
	/// The ty.
	/// </value>
	public float ty
	{
		get
		{
			return mTy;
		}
		set
		{
			mTy = value;
		}
	}
	
	/// <summary>
	/// Gets or sets the alpha.
	/// </summary>
	/// <value>
	/// The alpha.
	/// </value>/
	public float Alpha
	{
		get
		{
			return mAlpha;
		}
		set
		{
			mAlpha = value;
		}
	}
	
	/// <summary>
	/// Gets or sets the mask identifier.
	/// </summary>
	/// <value>
	/// The mask identifier.
	/// </value>
	public string MaskId
	{
		get
		{
			return mMaskId;
		}
		set
		{
			mMaskId = value;
		}
	}
	
	/// <summary>
	/// Gets or sets the horizontal blur.
	/// </summary>
	/// <value>
	/// The horizontal blur.
	/// </value>
	public float HorizontalBlur
	{
		get
		{
			return mHorizontalBlur;
		}
		set
		{
			mHorizontalBlur = value;
		}
	}
	
	/// <summary>
	/// Gets or sets the vertical blur.
	/// </summary>
	/// <value>
	/// The vertical blur.
	/// </value>
	public float VerticalBlur
	{
		get
		{
			return mVerticalBlur;
		}
		set
		{
			mVerticalBlur = value;
		}
	}
	
	/// <summary>
	/// Gets or sets the color tansformaiton mtx.
	/// </summary>
	/// <value>
	/// The color tansformaiton mtx.
	/// </value>
	public GAFColorTransformationMatrix ColorTansformaitonMtx
	{
		get
		{
			return mColorTransformationMatrix;
		}
		set
		{
			mColorTransformationMatrix = value;
		}
	}
	
	
#endregion
	
	
	
}
