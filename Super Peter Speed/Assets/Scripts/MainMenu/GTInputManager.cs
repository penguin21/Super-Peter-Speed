using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class GTInputManager : MonoBehaviour {
	
	public static GTInputManager instance;
	Dictionary<string,ButtonInfo> Buttons;
	
	// Use this for initialization
	void Awake () {
		Buttons = new Dictionary<string,ButtonInfo>();
		instance = this;
	}
	
	// Update is called once per frame
	void Update () {
		
	}
	
	public static GTInputManager GetReference()
	{
		return instance;
	}
	
	public void SuscribeButton(string ButtonName)
	{
		ButtonInfo newButtonInfo = new ButtonInfo();
		newButtonInfo.downSent = false;
		newButtonInfo.state = false;
		Buttons[ButtonName] = newButtonInfo;
	}
	
	public void UnsuscribeButton(string ButtonName)
	{
		if(Buttons.ContainsKey(ButtonName))
		{
			Buttons.Remove(ButtonName);
		}
	}
	
	public void DisableButton(string ButtonName)
	{
		if(Buttons.ContainsKey(ButtonName))
		{
			ButtonInfo edit = Buttons[ButtonName];
			edit.downSent = false;
			Buttons[ButtonName]= edit;
			UnsuscribeButton(ButtonName);
		}
	}
	
	
	public void OnButtonEvent(bool State,string ButtonName)
	{
		if(!Buttons.ContainsKey(ButtonName))
		{
			SuscribeButton(ButtonName);
		}
		ButtonInfo edit = Buttons[ButtonName];
		edit.state = State;
		if(!State)
		{
			edit.downSent = false;
		}
		Buttons[ButtonName]= edit;
	}
	
	public bool GetButton(string ButtonName)
	{
		if(Buttons.ContainsKey(ButtonName))
		{
			ButtonInfo edit = Buttons[ButtonName];
			if(edit.state)
			{
				edit.downSent = true;
				Buttons[ButtonName]= edit;
				return true;
			}
			else
			{
				return false;
			}
		}
		return false;
	}
	
	public bool GetButtonDown(string ButtonName)
	{
		if(Buttons.ContainsKey(ButtonName))
		{
			ButtonInfo edit = Buttons[ButtonName];
			if(!edit.downSent && edit.state)
			{
				edit.downSent = true;
				Buttons[ButtonName]= edit;
				return true;
			}
			else
			{
				return false;
			}
		}
		return false;
	}
	
	
	struct ButtonInfo
	{
		public bool downSent;
		public bool state;
	}
	
	
}