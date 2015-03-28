using UnityEngine;
using UnityEngine.UI;

public class SFX : MonoBehaviour 
{
	public Slider soundSlider;
	public Slider musicSlider;
	
	void Start () 
	{	
		UpdateSliders();
	}
	
	//mute a value
	public void Mute(string name)
	{
		PlayerPrefs.SetFloat(name, 0);
	}
	
	//set the sound volume through slider
	public void SetSound(float a)
	{
		PlayerPrefs.SetFloat("SoundVolume", a);
	}
	
	//set the music volume through slider
	public void SetMusic(float a)
	{
		PlayerPrefs.SetFloat("MusicVolume", a);
		
	}
	
	void UpdateSliders()
	{
		float soundValue = PlayerPrefs.GetFloat("SoundVolume");
		float musicValue = PlayerPrefs.GetFloat("MusicVolume");
		
		soundSlider.value = soundValue;
		musicSlider.value = musicValue;
	}
}