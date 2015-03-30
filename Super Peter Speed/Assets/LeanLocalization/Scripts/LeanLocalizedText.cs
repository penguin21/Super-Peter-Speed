using UnityEngine;
using UnityEngine.UI;

namespace Lean
{
	// This component will update a Text component with localized text
	[ExecuteInEditMode]
	[RequireComponent(typeof(Text))]
	public class LeanLocalizedText : LeanLocalizedBehaviour
	{
		// This gets called every time the translation needs updating
		public override void UpdateTranslation(LeanTranslation translation)
		{
			// Does the translation exist?
			if (translation != null)
			{
				// Find Text attached to this GameObject
				var text = GetComponent<Text>();
				
				// Update the Text's text
				text.text = translation.Text;
			}
		}
	}
}