using UnityEngine;
using System.Collections;

public class GAFRenderTexture : MonoBehaviour {
	
	public RenderTexture renderTexture;
	
	// Use this for initialization
	void Start () {
	
		renderTexture = new RenderTexture( Screen.width, Screen.height, 16, RenderTextureFormat.ARGB32 );
		GetComponent<Camera>().targetTexture = renderTexture;
		
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}
