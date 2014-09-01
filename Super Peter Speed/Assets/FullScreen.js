function Update () {



//Left Click
if(Input.GetMouseButtonDown(0))
{

//If fullscreen change it to window mode
if(Screen.fullScreen == true) 
{
Screen.fullScreen = false;
return;
}

//If window mode change it to fullscreen
if(Screen.fullScreen == false) 
{
Screen.fullScreen = true;
return;
}

}


}
