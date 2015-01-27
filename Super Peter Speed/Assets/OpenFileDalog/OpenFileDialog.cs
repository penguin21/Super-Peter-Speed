using UnityEngine;
using System.Collections;

public class OpenFileDialog : MonoBehaviour {

	public static OpenFileDialog instance;
	private string path="";


	bool isTextureLoaded = false;
	bool isErrorUploading = false;
	bool isCanceled = false;
	bool isPathReturned = false;

	private  Texture2D texture;

	public Texture2D GetTexure()
	{
		return texture;
	}


	public void ShowDialog()
	{
		Application.ExternalEval("ShowDialog()");
		debug += "showing dialog \n";
	}





	public void HideDialog()
	{
		Application.ExternalEval("HideDialog()");
		debug += "hiding dialog \n";
	}






	

private IEnumerator DownloadImage(string url)
	{
		WWW www = new WWW(url);
		// wait until the download is done
		debug+="downloading image from url =" +url +"\n";
		yield return www;
		// assign the downloaded image to the main texture of the object
		texture = www.texture;
	}

	

	public void FromJSCall_returnedAnswer(string answerCode)

	{
		debug+="returned answer = " + answerCode + "\n";
		// code error - func onError
		// code cancel -func onCancell
		// code ok - func return path
		if (answerCode == "error")
		{
			isErrorUploading = true;
		}
		if (answerCode == "cancel")
		{
			isCanceled = true;
		}
		if (answerCode == "succes")
		{

		//	path = answerText;

			// js, send mi path pleace
			JSsendMiiPAthPlease();

		}
		isAnswered = true;
	}

	public void FromJSCall_sendPath(string serverPathTophoto)
	{
		debug+="geted path is "+ serverPathTophoto + "\n";
		path = serverPathTophoto;
		isPathReturned = true;
	}

	private void JSsendMiiPAthPlease()
	{
		Application.ExternalEval("SendPathToUnity()");
		debug += "JSsendMiiPAthPlease :\n";
	}


	private bool isAnswered = false;
	public IEnumerator GetPhotoCoroutines()
	{
		ResetAllBoolians();
	
		// 1 openfile dialog // wite while close or ok
		ShowDialog();
		// yield return url or cancell or error
		while (isAnswered == false) {
			// in bowser user open image if apoloaded or no - reqwestetd to FromJSCall_returnedAnswer
			// we wait isAnswered true that function continue
			// after answer js sen to unity path to file and isPathReturned = true
			// after succes downloading file
			Debug.Log ("wait foe anwer...\n");
			debug+=".";
			yield return null;		
		}

		while (isPathReturned == false) {
			if (isErrorUploading == true || isCanceled == true)
			{ break;}

			Debug.Log ("waity foe path...\n");
			debug+="/";
			yield return null;		
		}
		if(isPathReturned)
		{
			yield return StartCoroutine(DownloadImage(path));
		}
		else
		{
			yield return 0;
	
		}
	}



	private void ResetAllBoolians()
	{
		isTextureLoaded = false;
		isErrorUploading = false;
		isCanceled = false;
		isPathReturned = false;
		isAnswered = false;
		path = "";
		texture = null;

	}

	// Use this for initialization
	void Start () {
		instance = this;
		debug+="In play mode not work (uses jquery in webplayer) by default is showing debug,\n if you wnt disable debug - isShowDebug in inspector\n";
	}
	
	// Update is called once per frame
	void Update () {
	
	}


	public string debug;
	public bool isShowDebug = true;

	void OnGUI()
	{
		if (isShowDebug)
		{
		GUI.Label(new Rect(0,0,500,800),debug);
		GUI.Box(new Rect(300,0,100,100),texture);
		}
	}
}
