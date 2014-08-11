using UnityEngine;
using System.Collections;

public class GTButton : MonoBehaviour {
	
	GTInputManager _InputManager;
	string _Name;
	public KeyCode MapKeyboardKey;
	
	void Start()
	{
		_InputManager = GTInputManager.GetReference();
		_Name = transform.name;
		_InputManager.SuscribeButton(_Name);
	}
	
	void OnPress(bool Pressed)
	{
		_InputManager.OnButtonEvent(Pressed,_Name);
	}
	
	
	void Update()
	{
		if(MapKeyboardKey != KeyCode.None)
		{
			if(Input.GetKey(MapKeyboardKey))
			{
				_InputManager.OnButtonEvent(true,_Name);
			}
			else if(Input.GetKeyUp(MapKeyboardKey))
			{
				_InputManager.OnButtonEvent(false,_Name);
			}
		}
	}
}