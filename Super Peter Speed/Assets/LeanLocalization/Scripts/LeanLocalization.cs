using UnityEngine;
using System.Collections.Generic;

namespace Lean
{
	// This component stores a list of phrases, their translations, as well as manage a global list of translations for easy access
	[ExecuteInEditMode]
	[AddComponentMenu("Lean/Lean Localization")]
	public class LeanLocalization : MonoBehaviour
	{
		// List of all currently active localizations
		public static List<LeanLocalization> AllLocalizations = new List<LeanLocalization>();
		
		// Dictionary of all the current translations mapped to their phrase name
		public static Dictionary<string, LeanTranslation> Translations = new Dictionary<string, LeanTranslation>();
		
		// Called when the language or something changes
		public static System.Action OnLocalizationChanged;
		
		// The list of all supported languages
		public List<string> Languages = new List<string>();
		
		// The list of all supported phrases
		public List<LeanPhrase> Phrases = new List<LeanPhrase>();
		
		// The current language
		[LeanLanguageName]
		public string CurrentLanguage;
		
		// Change the current language of all localizations?
		public static void SetAllLanguages(string newLanguage)
		{
			var modified = false;
			
			for (var i = 0; i < AllLocalizations.Count; i++)
			{
				var localization = AllLocalizations[i];
				
				if (localization.CurrentLanguage != newLanguage)
				{
					localization.CurrentLanguage = newLanguage; modified = true;
				}
			}
			
			if (modified == true)
			{
				RebuildTranslations();
			}
		}
		
		// Change the current language of this localization?
		public void SetLanguage(string newLanguage)
		{
			if (CurrentLanguage != newLanguage)
			{
				CurrentLanguage = newLanguage;
				
				RebuildTranslations();
			}
		}
		
		// Builds the translation dictionary based on the current language
		public static void RebuildTranslations()
		{
			Translations.Clear();
			
			for (var i = AllLocalizations.Count - 1; i >= 0; i--)
			{
				var localization = AllLocalizations[i];
				
				for (var j = localization.Phrases.Count - 1; j >= 0; j--)
				{
					var phrase = localization.Phrases[j];
					
					// Only add the translation once
					if (Translations.ContainsKey(phrase.Name) == false)
					{
						var translation = phrase.Translations.Find(p => p.Language == localization.CurrentLanguage);
						
						if (translation != null)
						{
							Translations.Add(phrase.Name, translation);
						}
					}
				}
			}
			
			if (OnLocalizationChanged != null)
			{
				OnLocalizationChanged();
			}
		}
		
		// Get the current translation for this phrase, or return null
		public static LeanTranslation GetTranslation(string phraseName)
		{
			var translation = default(LeanTranslation);
			
			if (phraseName != null)
			{
				Translations.TryGetValue(phraseName, out translation);
			}
			
			return translation;
		}
		
		// Get the current text for this phrase, or return null
		public static string GetTranslationText(string phraseName)
		{
			var translation = GetTranslation(phraseName);
			
			if (translation != null)
			{
				return translation.Text;
			}
			
			return null;
		}
		
		// Get the current Object for this phrase, or return null
		public static Object GetTranslationObject(string phraseName)
		{
			var translation = GetTranslation(phraseName);
			
			if (translation != null)
			{
				return translation.Object;
			}
			
			return null;
		}
		
		// Add a new language to this localization
		public void AddLanguage(string language)
		{
			if (Languages.Contains(language) == false)
			{
				Languages.Add(language);
			}
		}
		
		// Add a new phrase to this localization, or return the current one
		public LeanPhrase AddPhrase(string phraseName)
		{
			var phrase = Phrases.Find(p => p.Name == phraseName);
			
			if (phrase == null)
			{
				phrase = new LeanPhrase();
				
				phrase.Name = phraseName;
				
				Phrases.Add(phrase);
			}
			
			return phrase;
		}
		
		// Add a new translation to this localization, or return the current one
		public LeanTranslation AddTranslation(string language, string phraseName)
		{
			AddLanguage(language);
			
			var phrase      = AddPhrase(phraseName);
			var translation = phrase.Translations.Find(t => t.Language == language);
			
			if (translation == null)
			{
				translation = new LeanTranslation();
				
				translation.Language = language;
				translation.Text     = phraseName;
				
				phrase.Translations.Add(translation);
			}
			
			return translation;
		}
		
		// Add instance and rebuild
		protected virtual void OnEnable()
		{
			AllLocalizations.Add(this);
			
			RebuildTranslations();
		}
		
		// Remove instance and rebuild
		protected virtual void OnDisable()
		{
			AllLocalizations.Remove(this);
			
			RebuildTranslations();
		}
		
#if UNITY_EDITOR
		// Inspector modified?
		protected virtual void OnValidate()
		{
			RebuildTranslations();
		}
#endif
	}
}
