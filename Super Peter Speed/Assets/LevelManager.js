
//Levels Collider
var ColliderLevel1 : GameObject;
var ColliderLevel2 : GameObject;
var ColliderLevel3 : GameObject;
var ColliderLevel4 : GameObject;
var ColliderLevel5 : GameObject;
var ColliderLevel6 : GameObject;
var ColliderLevel7 : GameObject;
var ColliderLevel8 : GameObject;
var ColliderLevel9 : GameObject;
var ColliderLevel10 : GameObject;
var ColliderLevel11 : GameObject;
var ColliderLevel12 : GameObject;
var ColliderLevel13 : GameObject;
var ColliderLevel14 : GameObject;

//Collider Pass
var ColliderLevel1P : GameObject;
var ColliderLevel2P : GameObject;
var ColliderLevel3P : GameObject;
var ColliderLevel4P : GameObject;
var ColliderLevel5P : GameObject;
var ColliderLevel6P : GameObject;
var ColliderLevel7P : GameObject;
var ColliderLevel8P : GameObject;
var ColliderLevel9P : GameObject;
var ColliderLevel10P : GameObject;
var ColliderLevel11P : GameObject;
var ColliderLevel12P : GameObject;
var ColliderLevel13P : GameObject;
var ColliderLevel14P : GameObject;

//Levels Locked
var Level2Locked : GameObject;
var Level3Locked : GameObject;
var Level4Locked : GameObject;
var Level5Locked : GameObject;
var Level6Locked : GameObject;
var Level7Locked : GameObject;
var Level8Locked : GameObject;
var Level9Locked : GameObject;
var Level10Locked : GameObject;
var Level11Locked : GameObject;
var Level12Locked : GameObject;
var Level13Locked : GameObject;
var Level14Locked : GameObject;

//Levels Obj
var Level1 : GameObject;
var Level2 : GameObject;
var Level3 : GameObject;
var Level4 : GameObject;
var Level5 : GameObject;
var Level6 : GameObject;
var Level7 : GameObject;
var Level8 : GameObject;
var Level9 : GameObject;
var Level10 : GameObject;
var Level11 : GameObject;
var Level12 : GameObject;
var Level13 : GameObject;
var Level14 : GameObject;

//Levels Ints
var Level1Reach : int = 0;
var Level2Reach : int = 0;
var Level3Reach : int = 0;
var Level4Reach : int = 0;
var Level5Reach : int = 0;
var Level6Reach : int = 0;
var Level7Reach : int = 0;
var Level8Reach : int = 0;
var Level9Reach : int = 0;
var Level10Reach : int = 0;
var Level11Reach : int = 0;
var Level12Reach : int = 0;
var Level13Reach : int = 0;
var Level14Reach : int = 0;

//Sprites Unlock
var SpriteUnlockedLevel2 : Sprite;
var SpriteUnlockedLevel3 : Sprite;
var SpriteUnlockedLevel4 : Sprite;
var SpriteUnlockedLevel5 : Sprite;
var SpriteUnlockedLevel6 : Sprite;
var SpriteUnlockedLevel7 : Sprite;
var SpriteUnlockedLevel8 : Sprite;
var SpriteUnlockedLevel9 : Sprite;
var SpriteUnlockedLevel10 : Sprite;
var SpriteUnlockedLevel11 : Sprite;
var SpriteUnlockedLevel12 : Sprite;
var SpriteUnlockedLevel13 : Sprite;
var SpriteUnlockedLevel14 : Sprite;

//Sprites Win
var SpriteWin1 : Sprite;
var SpriteWin2 : Sprite;
var SpriteWin3 : Sprite;
var SpriteWin4 : Sprite;
var SpriteWin5 : Sprite;
var SpriteWin6 : Sprite;
var SpriteWin7 : Sprite;
var SpriteWin8 : Sprite;
var SpriteWin9 : Sprite;
var SpriteWin10 : Sprite;
var SpriteWin11 : Sprite;
var SpriteWin12 : Sprite;
var SpriteWin13 : Sprite;
var SpriteWin14 : Sprite;

//Saves
Level1Reach = PlayerPrefs.GetInt(LevelSetting1);
Level2Reach = PlayerPrefs.GetInt(LevelSetting2);
Level3Reach = PlayerPrefs.GetInt(LevelSetting3);
Level4Reach = PlayerPrefs.GetInt(LevelSetting4);
Level5Reach = PlayerPrefs.GetInt(LevelSetting5);
Level6Reach = PlayerPrefs.GetInt(LevelSetting6);
Level7Reach = PlayerPrefs.GetInt(LevelSetting7);
Level8Reach = PlayerPrefs.GetInt(LevelSetting8);
Level9Reach = PlayerPrefs.GetInt(LevelSetting9);
Level10Reach = PlayerPrefs.GetInt(LevelSetting10);
Level11Reach = PlayerPrefs.GetInt(LevelSetting11);
Level12Reach = PlayerPrefs.GetInt(LevelSetting12);
Level13Reach = PlayerPrefs.GetInt(LevelSetting13);
Level14Reach = PlayerPrefs.GetInt(LevelSetting14);

//String Saves
var LevelSetting1 : String;
var LevelSetting2 : String;
var LevelSetting3 : String;
var LevelSetting4 : String;
var LevelSetting5 : String;
var LevelSetting6 : String;
var LevelSetting7 : String;
var LevelSetting8 : String;
var LevelSetting9 : String;
var LevelSetting10 : String;
var LevelSetting11 : String;
var LevelSetting12 : String;
var LevelSetting13 : String;
var LevelSetting14 : String;

function Update () {
	if(Level1Reach == 1){
		ColliderLevel1P.SetActive(false);
		ColliderLevel2.SetActive(true);
		Level1.GetComponent(SpriteRenderer).sprite = SpriteWin1;
		Level2.GetComponent(SpriteRenderer).sprite = SpriteUnlockedLevel2;
				
	}
		else
	if(Level1Reach == 0){
		ColliderLevel1P.SetActive(true);
		ColliderLevel2.SetActive(false);
	}
	
		if(Level2Reach == 1){
		ColliderLevel2P.SetActive(false);
		ColliderLevel3.SetActive(true);
		Level2.GetComponent(SpriteRenderer).sprite = SpriteWin2;
		Level3.GetComponent(SpriteRenderer).sprite = SpriteUnlockedLevel3;
				
	}
		else
	if(Level2Reach == 0){
		ColliderLevel2P.SetActive(true);
		ColliderLevel3.SetActive(false);
	}
}