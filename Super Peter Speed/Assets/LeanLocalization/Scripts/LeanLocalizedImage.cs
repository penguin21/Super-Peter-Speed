using UnityEngine;
using UnityEngine.UI;

namespace Lean
{
	// This component will update an Image component with a localized sprite
	[ExecuteInEditMode]
	[RequireComponent(typeof(Image))]
	public class LeanLocalizedImage : LeanLocalizedBehaviour
	{
		// This gets called every time the translation needs updating
		public override void UpdateTranslation(LeanTranslation translation)
		{
			// Does the translation exist?
			if (translation != null)
			{
				// Find Image attached to this GameObject
				var image = GetComponent<Image>();
				
				// Update the Image's sprite
				image.sprite = translation.Object as Sprite;
			}
		}
	}
}
