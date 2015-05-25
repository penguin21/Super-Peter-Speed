using UnityEngine;

namespace Lean
{
	// This component will update a SpriteRenderer component with a localized sprite
	[ExecuteInEditMode]
	[RequireComponent(typeof(SpriteRenderer))]
	public class LeanLocalizedSpriteRenderer : LeanLocalizedBehaviour
	{
		// This gets called every time the translation needs updating
		public override void UpdateTranslation(LeanTranslation translation)
		{
			// Does the translation exist?
			if (translation != null)
			{
				// Find SpriteRenderer attached to this GameObject
				var spriteRenderer = GetComponent<SpriteRenderer>();
				
				// Update the SpriteRenderer's sprite
				spriteRenderer.sprite = translation.Object as Sprite;
			}
		}
	}
}
