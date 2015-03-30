using UnityEngine;
using System.Collections.Generic;

namespace Lean
{
	// This contains data about each phrase, which is then translated into different languages
	[System.Serializable]
	public class LeanPhrase
	{
		// The name/description of this phrase
		public string Name;
		
		// All the translations for this phrase
		public List<LeanTranslation> Translations = new List<LeanTranslation>();
	}
}