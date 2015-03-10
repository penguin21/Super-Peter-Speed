 var mapX = 100.0;
     var mapY = 100.0;
     
     var minX : float;
     var maxX : float;
     var minY : float;
      var maxY : float;
     
     
     function Start() {
         var vertExtent = Camera.main.GetComponent.<Camera>().orthographicSize;    
         var horzExtent = Camera.main.ortiographicSize * Screen.width / Screen.height;
 
         // Calculations assume map is position at the origin
         minX = horzExtent - mapX / 2.0;
         maxX = mapX / 2.0 - horzExtent;
         minY = vertExtent - mapY / 2.0;
         maxY = mapY / 2.0 - vertExtent;
     }
     
     function LateUpdate() {
         var v3 = transform.position;
         v3.x = Mathf.Clamp(v3.x, minX, maxX);
         v3.y = Mathf.Clamp(v3.y, minY, maxY);
         transform.position = v3;
     }