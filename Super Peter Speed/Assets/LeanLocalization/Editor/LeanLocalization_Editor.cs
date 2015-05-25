using UnityEngine;
using UnityEditor;
using System.Collections.Generic;

namespace Lean
{
	[CustomEditor(typeof(LeanLocalization))]
	public class LeanLocalization_Editor : Editor
	{
		// Languages
		public string[] NewLanguages = new string[] { "Chinese", "English", "French", "German", "Japanese", "Korean", "Portuguese", "Russian", "Spanish", "Other" };
		
		// Currently expanded language
		public int LanguageIndex = -1;
		
		// Currently expanded language phrase
		public int ReverseIndex = -1;
		
		// Currently expanded phrase
		public int PhraseIndex = -1;
		
		// Currently expanded translation
		public int TranslationIndex = -1;
		
		public List<string> ExistingLanguages = new List<string>();
		
		public List<string> ExistingPhrases = new List<string>();
		
		[MenuItem("GameObject/Lean/Localization", false, 1)]
		public static void CreateLocalization()
		{
			var gameObject = new GameObject(typeof(LeanLocalization).Name);
			
			UnityEditor.Undo.RegisterCreatedObjectUndo(gameObject, "Create Localization");
			
			gameObject.AddComponent<LeanLocalization>();
			
			Selection.activeGameObject = gameObject;
		}
		
		// Draw the whole inspector
		public override void OnInspectorGUI()
		{
			var localization = (LeanLocalization)target;
			
			EditorGUI.BeginChangeCheck();
			{
				EditorGUILayout.Separator();
				
				EditorGUILayout.PropertyField(serializedObject.FindProperty("CurrentLanguage"));
				
				EditorGUILayout.Separator();
				
				DrawLanguages(localization);
				
				EditorGUILayout.Separator();
				EditorGUILayout.Separator();
				
				DrawPhrases(localization);
				
				EditorGUILayout.Separator();
			}
			if (EditorGUI.EndChangeCheck() == true)
			{
				LeanLocalization.RebuildTranslations();
				
				EditorUtility.SetDirty(target);
			}
			
			serializedObject.ApplyModifiedProperties();
		}
		
		private void DrawLanguages(LeanLocalization localization)
		{
			var labelA = Reserve();
			var valueA = Reserve(ref labelA, 35.0f);
			
			EditorGUI.LabelField(labelA, "Languages", EditorStyles.boldLabel);
			
			// Add a new language?
			if (GUI.Button(valueA, "Add") == true)
			{
				var menu = new GenericMenu();
				
				for (var i = 0; i < NewLanguages.Length; i++)
				{
					var newLanguage = NewLanguages[i];
					
					menu.AddItem(new GUIContent(newLanguage), false, () => localization.AddLanguage(newLanguage));
				}
				
				menu.DropDown(valueA);
			}
			
			ExistingLanguages.Clear();
			
			// Draw all added languages
			for (var i = 0; i < localization.Languages.Count; i++)
			{
				var labelB   = Reserve();
				var valueB   = Reserve(ref labelB, 20.0f);
				var language = localization.Languages[i];
				
				// Edit language name or remove
				if (LanguageIndex == i)
				{
					localization.Languages[i] = EditorGUI.TextField(labelB, language);
					
					if (GUI.Button(valueB, "X") == true)
					{
						localization.Languages.RemoveAt(i); LanguageIndex = -1;
					}
				}
				
				// Expand language?
				if (EditorGUI.Foldout(labelB, LanguageIndex == i, LanguageIndex == i ? "" : language) == true)
				{
					if (LanguageIndex != i)
					{
						LanguageIndex = i;
						ReverseIndex  = -1;
					}
					
					EditorGUI.indentLevel += 1;
					{
						DrawReverse(localization, language);
					}
					EditorGUI.indentLevel -= 1;
					
					EditorGUILayout.Separator();
				}
				else if (LanguageIndex == i)
				{
					LanguageIndex = -1;
					ReverseIndex  = -1;
				}
				
				// Already added?
				if (ExistingLanguages.Contains(language) == true)
				{
					EditorGUILayout.HelpBox("This language already exists in the list!", MessageType.Warning);
				}
				else
				{
					ExistingLanguages.Add(language);
				}
			}
		}
		
		// Reverse lookup the phrases for this language
		private void DrawReverse(LeanLocalization localization, string language)
		{
			for (var i = 0; i < localization.Phrases.Count; i++)
			{
				var labelA      = Reserve();
				var phrase      = localization.Phrases[i];
				var translation = phrase.Translations.Find(t => t.Language == language);
				
				EditorGUI.LabelField(labelA, phrase.Name);
				
				if (translation != null)
				{
					if (ReverseIndex == i)
					{
						phrase.Name = EditorGUI.TextField(labelA, "", phrase.Name);
					}
					
					if (EditorGUI.Foldout(labelA, ReverseIndex == i, ReverseIndex == i ? "" : phrase.Name) == true)
					{
						ReverseIndex = i;
						
						EditorGUI.indentLevel += 1;
						{
							DrawTranslation(translation);
						}
						EditorGUI.indentLevel -= 1;
						
						EditorGUILayout.Separator();
					}
					else if (ReverseIndex == i)
					{
						ReverseIndex = -1;
					}
					
				}
				else
				{
					var valueA = Reserve(ref labelA, 120.0f);
					
					if (GUI.Button(valueA, "Create Translation") == true)
					{
						var newTranslation = new LeanTranslation();
						
						newTranslation.Language = language;
						newTranslation.Text     = phrase.Name;
						
						phrase.Translations.Add(newTranslation);
					}
				}
			}
		}
		
		private void DrawPhrases(LeanLocalization localization)
		{
			var labelA = Reserve();
			var valueA = Reserve(ref labelA, 35.0f);
			
			EditorGUI.LabelField(labelA, "Phrases", EditorStyles.boldLabel);
			
			if (GUI.Button(valueA, "Add") == true)
			{
				var newPhrase = new LeanPhrase();
				
				newPhrase.Name = "New Phrase";
				
				PhraseIndex = localization.Phrases.Count;
				
				localization.Phrases.Add(newPhrase);
			}
			
			ExistingPhrases.Clear();
			
			for (var i = 0; i < localization.Phrases.Count; i++)
			{
				var labelB = Reserve();
				var valueB = Reserve(ref labelB, 20.0f);
				var phrase = localization.Phrases[i];
				
				if (PhraseIndex == i)
				{
					phrase.Name = EditorGUI.TextField(labelB, "", phrase.Name);
					
					if (GUI.Button(valueB, "X") == true)
					{
						localization.Phrases.RemoveAt(i); PhraseIndex = -1;
					}
				}
				
				if (EditorGUI.Foldout(labelB, PhraseIndex == i, PhraseIndex == i ? "" : phrase.Name) == true)
				{
					if (PhraseIndex != i)
					{
						PhraseIndex      = i;
						TranslationIndex = -1;
					}
					
					EditorGUI.indentLevel += 1;
					{
						DrawTranslations(localization, phrase);
					}
					EditorGUI.indentLevel -= 1;
					
					EditorGUILayout.Separator();
				}
				else if (PhraseIndex == i)
				{
					PhraseIndex      = -1;
					TranslationIndex = -1;
				}
				
				if (ExistingPhrases.Contains(phrase.Name) == true)
				{
					EditorGUILayout.HelpBox("This phrase already exists in the list!", MessageType.Warning);
				}
				else
				{
					ExistingPhrases.Add(phrase.Name);
				}
			}
		}
		
		private void DrawTranslations(LeanLocalization localization, LeanPhrase phrase)
		{
			ExistingLanguages.Clear();
			
			for (var i = 0; i < phrase.Translations.Count; i++)
			{
				var labelA      = Reserve();
				var valueA      = Reserve(ref labelA, 20.0f);
				var translation = phrase.Translations[i];
				
				if (TranslationIndex == i)
				{
					translation.Language = EditorGUI.TextField(labelA, "", translation.Language);
					
					if (GUI.Button(valueA, "X") == true)
					{
						phrase.Translations.RemoveAt(i); TranslationIndex = -1;
					}
				}
				
				if (EditorGUI.Foldout(labelA, TranslationIndex == i, TranslationIndex == i ? "" : translation.Language) == true)
				{
					TranslationIndex = i;
					
					EditorGUI.indentLevel += 1;
					{
						DrawTranslation(translation);
					}
					EditorGUI.indentLevel -= 1;
					
					EditorGUILayout.Separator();
				}
				else if (TranslationIndex == i)
				{
					TranslationIndex = -1;
				}
				
				if (ExistingLanguages.Contains(translation.Language) == true)
				{
					EditorGUILayout.HelpBox("This phrase has already been translated to this language!", MessageType.Warning);
				}
				else
				{
					ExistingLanguages.Add(translation.Language);
				}
				
				if (localization.Languages.Contains(translation.Language) == false)
				{
					EditorGUILayout.HelpBox("This translation uses a language that hasn't been set in the localization!", MessageType.Warning);
				}
			}
			
			for (var i = 0; i < localization.Languages.Count; i++)
			{
				var language = localization.Languages[i];
				
				if (phrase.Translations.Exists(t => t.Language == language) == false)
				{
					var labelA = Reserve();
					var valueA = Reserve(ref labelA, 120.0f);
					
					EditorGUI.LabelField(labelA, language);
					
					if (GUI.Button(valueA, "Create Translation") == true)
					{
						var newTranslation = new LeanTranslation();
						
						newTranslation.Language = language;
						newTranslation.Text     = phrase.Name;
						
						TranslationIndex = phrase.Translations.Count;
						
						phrase.Translations.Add(newTranslation);
					}
				}
			}
		}
		
		private void DrawTranslation(LeanTranslation translation)
		{
			translation.Text   = EditorGUILayout.TextField("Text", translation.Text);
			translation.Object = EditorGUILayout.ObjectField("Object", translation.Object, typeof(Object), true);
		}
		
		private static Rect Reserve(ref Rect rect, float rightWidth = 0.0f, float padding = 2.0f)
		{
			if (rightWidth == 0.0f)
			{
				rightWidth = rect.width - EditorGUIUtility.labelWidth;
			}
			
			var left  = rect; left.xMax -= rightWidth;
			var right = rect; right.xMin = left.xMax;
			
			left.xMax -= padding;
			
			rect = left;
			
			return right;
		}
		
		private static Rect Reserve(float height = 16.0f)
		{
			var rect = EditorGUILayout.BeginVertical();
			{
				EditorGUILayout.LabelField("", GUILayout.Height(height));
			}
			EditorGUILayout.EndVertical();
			
			return rect;
		}
	}
}
