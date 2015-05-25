using UnityEditor;
using UnityEngine;
using System.Collections;

[CustomEditor(typeof(GAFAnimationPlayer))]
public class GAFAnimationEditor : Editor  {
	
	#region private data
	private string[] mConversionSequencesNames;
	#endregion
	
	public override void OnInspectorGUI()
	{
		GAFAnimationPlayer animationPlayer = (GAFAnimationPlayer) target;
		
		GUILayout.Space( 3f );
		GUILayout.Label("Animation clip:" );
		animationPlayer.GAFAnimation = (GAFAnimation) EditorGUILayout.ObjectField( animationPlayer.GAFAnimation, typeof( GAFAnimation ), true );
		
		if ( animationPlayer.GAFAnimation != null )
		{
			GUILayout.Space( 3f );
			animationPlayer.GAFCurrentSequenceIndex = EditorGUILayout.Popup("Sequence:", animationPlayer.GAFCurrentSequenceIndex, animationPlayer.GAFAnimation.AnimationSequencesNames );
			animationPlayer.GAFWrapMode = (eGAFWrapMode) EditorGUILayout.EnumPopup( "Wrap mode:", animationPlayer.GAFWrapMode );
			animationPlayer.GAFPlayAutomatically = GUILayout.Toggle( animationPlayer.GAFPlayAutomatically, "Play automatically");
		}
	}
	
}
