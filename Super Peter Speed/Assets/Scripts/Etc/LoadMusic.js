 #pragma strict
 
 import System.Collections.Generic;
 import System.IO;
 
 public var path : String = "./";  // Is equal to where you have your executable
 public var appdata : String;
 public var musicData : String = "/Super Peter Speed/Music";
 private var Mu : String;
 private var Mu2 : String;
 var MusicFile : String;
 appdata = System.Environment.GetFolderPath(System.Environment.SpecialFolder.ApplicationData)+ musicData;
 path = Path.Combine(appdata, MusicFile);
 
 private var fileTypes : String[] = ["ogg", "wav"]; // Valid file types
 
 private var files : FileInfo[];
private var audioSource : AudioSource;
 private var audioClips : List.<AudioClip> = new List.<AudioClip>();
 
 function Start () {
 	 if(!Directory.Exists(appdata + Mu)){    
     //if it doesn't, create it
     Directory.CreateDirectory(appdata + Mu);
 	}
 	
 	if(Directory.Exists(path)){
 		Debug.Log("No Music");
 	}
 	
     // Set an AudioSource to this object
     audioSource = GetComponent.<AudioSource>();
     if(audioSource == null)
         audioSource = gameObject.AddComponent(AudioSource);
     
     // Find files in directory
     yield GetFilesInDirectory();   
     
     
     // Play a clip found in directory
     if (audioClips.Count>0) {
         audioSource.clip = audioClips[0];
         audioSource.Play();
     }
 }
 
 function GetFilesInDirectory () {
     var info : DirectoryInfo = new DirectoryInfo(path);
     files = info.GetFiles();
     for (var file : FileInfo in files) {
         var extension : String = Path.GetExtension(file.FullName);
         if (ValidType(extension))
             yield LoadFile(file.FullName);
     }
 }
 
 function ValidType (extension : String) : boolean {
     for (var validExtension : String in fileTypes)
         if (extension.IndexOf(validExtension) > -1)
             return true;
     return false;
 }
 
 function LoadFile (path : String) {
     var www : WWW = new WWW("file://"+path);
     var clip : AudioClip = www.audioClip;
     while (!clip.isReadyToPlay)
         yield;
     clip = www.GetAudioClip(false);
     var parts : String[] = path.Split("\\"[0]);
     clip.name = parts[parts.Length-1];
     audioClips.Add(clip);
 }