 #pragma strict
 import System.Collections.Generic;
 
 var mapSizeX : int;
 var mapSizeY : int;
 
 var tilePrefab : GameObject;
 
 
 var tiles : List.<Transform> = new List.<Transform>(); 
 
 
 function Start () {
     var i : int = 0;
     var xIndex : int = 0;
     var yIndex : int = 0;
     
     while(yIndex < mapSizeY){
         xIndex = 0;
         while(xIndex < mapSizeX){
             var newTile : GameObject = Instantiate (tilePrefab, Vector3(xIndex*0.32, yIndex*0.32, 0), Quaternion.identity);
             tiles.Add(newTile.transform);
             newTile.transform.parent = transform;
             newTile.transform.name = "tile_"+i;
             i++;
             xIndex++;
         }
     
         yIndex++;
     }
 }