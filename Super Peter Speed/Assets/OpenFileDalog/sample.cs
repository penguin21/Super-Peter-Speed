using UnityEngine;
using System.Collections;

public class sample : MonoBehaviour {



	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	
	}

	private Texture2D photo1;
IEnumerator LoadPhoto1()
{
		yield return StartCoroutine( OpenFileDialog.instance.GetPhotoCoroutines());
		photo1 = OpenFileDialog.instance.GetTexure();

}



	private Texture2D photo2;
	IEnumerator LoadPhoto2()
	{
		yield return StartCoroutine( OpenFileDialog.instance.GetPhotoCoroutines());
		photo2 = OpenFileDialog.instance.GetTexure();
		
	}

void	OnGUI()
	{

		if (GUI.Button(new Rect(100,100,300,20), "load photo 1"))
		{
			StartCoroutine (LoadPhoto1());
		}


		if (GUI.Button(new Rect(100,140,300,20), "load photo 2"))
		{
			StartCoroutine (LoadPhoto2());
		}

		GUI.Box(new Rect( 100,0,100,100), photo1);
		GUI.Box(new Rect( 200,0,100,100), photo2);

	}
}
