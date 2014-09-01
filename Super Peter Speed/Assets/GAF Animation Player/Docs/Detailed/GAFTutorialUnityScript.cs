using UnityEngine;
using System.Collections;

public class GAFTutorialUnityScript : MonoBehaviour {

	// Use this for initialization
	void Start () {
		
		//Pass path to coin.TXT asset
		GAFConverterUnity gafCon = new GAFConverterUnity("coin/coin");
		
		//Create animation not in HD
		gafCon.CreateAnimation( false );
		
	}
}
