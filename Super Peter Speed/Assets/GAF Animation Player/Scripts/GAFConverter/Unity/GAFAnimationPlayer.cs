using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using System.IO;

public class GAFAnimationPlayer : GAFAnimationPlayerBase {
	
	/// <summary>
	/// Gets the visible elements.
	/// </summary>
	/// <value>
	/// The visible elements.
	/// </value>
	public int VisibleElements
	{
		get
		{
			int count = 0;
			foreach( Transform t in transform )
			{
				if ( t.gameObject.renderer != null )
				{
					if ( t.gameObject.renderer.enabled )
					{
						count++;
					}
				}
			}
			
			return count;	
		}
	}
	
}
