using UnityEngine;

namespace Lean
{
	// This component simplifies the updating process, extend it if you want to cause a specific object to get localized
	[ExecuteInEditMode]
	public abstract class LeanLocalizedBehaviour : MonoBehaviour
	{
		// The name of the phrase we want to use
		[LeanPhraseName]
		public string PhraseName;
		
		// This gets called every time the translation needs updating
		// NOTE: translation may be null if it can't be found
		public abstract void UpdateTranslation(LeanTranslation translation);
		
		protected virtual void OnEnable()
		{
			LeanLocalization.OnLocalizationChanged += updateLocalization;
			
			updateLocalization();
		}
		
		protected virtual void OnDisable()
		{
			LeanLocalization.OnLocalizationChanged -= updateLocalization;
		}
		
#if UNITY_EDITOR
		protected virtual void OnValidate()
		{
			updateLocalization();
		}
#endif
		
		private void updateLocalization()
		{
			UpdateTranslation(LeanLocalization.GetTranslation(PhraseName));
		}
	}
}