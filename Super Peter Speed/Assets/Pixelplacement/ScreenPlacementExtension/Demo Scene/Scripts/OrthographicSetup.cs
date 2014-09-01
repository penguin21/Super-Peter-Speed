//Sets a camera's orthographic size so that it can be much closer to pixel-perfect for scale dimensions

using UnityEngine;
using System.Collections;

public class OrthographicSetup : MonoBehaviour {
	void Awake(){
		Debug.LogWarning("Camera set to orthographic and it's size adjusted to closer match pixel usage (FYI this is NOT neccesary for using ScreenPlacement, you can even use a perspective camera).");
		camera.orthographic = true;
		camera.orthographicSize = Screen.height/2;	
	}
}
