using UnityEngine;
using System.Collections;

public class LoadMusicExternal : MonoBehaviour {

	public string FileOGG;

	void Start () {
		
		StartCoroutine(LoadMp3(FileOGG));
		
	}
	
	// Update is called once per frame
	void Update () {
		
	}
	
	IEnumerator LoadMp3(string url) {
		
		WWW m_get = new WWW(url);
		
		yield return m_get;
		
		GetComponent<AudioSource>().audio.clip = m_get.audioClip;
		
		audio.Play();
		
	}
}
