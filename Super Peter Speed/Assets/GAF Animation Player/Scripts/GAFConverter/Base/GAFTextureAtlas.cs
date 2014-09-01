using UnityEngine;
using System.Collections;
using System.IO;

[System.Serializable]
public class GAFTextureAtlas {

	#region private data
	[SerializeField]
	private float mScale;
	
	[SerializeField]
	private GAFElement[] mElements;
	
	[SerializeField]
	private GAFAtlas[] mAtlases;
	#endregion
	
	#region public data
	public GAFTextureAtlas( float scale )
	{
		mScale = scale;
	}
	
	public GAFTextureAtlas(  float scale, GAFElement[] elements )
	{
		mScale = scale;
		
		mElements = elements;	
	}
	
	public GAFTextureAtlas(  float scale, GAFElement[] elements, GAFAtlas[] atlases )
	{
		mScale = scale;
		
		mElements = elements;	
		
		mAtlases = atlases;
	}
	
	/// <summary>
	/// Gets element by its name.
	/// </summary>
	/// <returns>
	/// The element by name.
	/// </returns>
	/// <param name='elementName'>
	/// Element name.
	/// </param>
	public GAFElement GetElementByName( string elementName )
	{
		foreach( GAFElement el in mElements )
		{
			if ( el.Name == elementName )
			{
				return el;
			}
		}
		
		return null;
	}
	
	/// <summary>
	/// Gets the atlas by identifier.
	/// </summary>
	/// <returns>
	/// The atlas by identifier.
	/// </returns>
	/// <param name='id'>
	/// Identifier.
	/// </param>
	public GAFAtlas GetAtlasById( int id )
	{
		foreach ( GAFAtlas a in mAtlases )
		{
			if ( a.Id == id )
			{
				return a;
			}
		}
		
		return null;
	}
	
	
	#endregion 
	
	#region properties
	/// <summary>
	/// Gets or sets the elements.
	/// </summary>
	/// <value>
	/// The elements.
	/// </value>
	public GAFElement[] Elements
	{
		get
		{
			return mElements;
		}
		set
		{
			mElements = value;
		}
			
	}
	
	/// <summary>
	/// Gets or sets the atlases.
	/// </summary>
	/// <value>
	/// The atlases.
	/// </value>
	public GAFAtlas[] Atlases
	{
		get
		{
			return mAtlases;
		}
		set
		{
			mAtlases = value;
		}
	}
	
	/// <summary>
	/// Gets the scale.
	/// </summary>
	/// <value>
	/// The scale.
	/// </value>
	public float Scale
	{
		get
		{
			return mScale;
		}
	}
	
	
	#endregion
	
}
