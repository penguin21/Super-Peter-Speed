import System.Threading;
 
class ThreadData {
	var start : int;
	var end : int;
	var i : int;
 
	function ThreadData (start : int, end : int, i : int) {
		this.start = start;
		this.end = end;
		this.i = i;
	}
}
 
private static var texColors : Color32[];
private static var newColors : Color32[];
private static var w : int;
private static var ratioX : float;
private static var ratioY : float;
private static var w2 : int;
private static var finishCounts : int[];
 
static function Point (tex : Texture2D, newWidth : int, newHeight : int) {
	ThreadedScale (tex, newWidth, newHeight, false);
}
 
static function Bilinear (tex : Texture2D, newWidth : int, newHeight : int) {
	ThreadedScale (tex, newWidth, newHeight, true);
}
 
private static function ThreadedScale (tex : Texture2D, newWidth : int, newHeight : int, useBilinear : boolean) {
	texColors = tex.GetPixels32();
	newColors = new Color32[newWidth * newHeight];
	if (useBilinear) {
		ratioX = 1.0 / (parseFloat(newWidth) / (tex.width-1));
		ratioY = 1.0 / (parseFloat(newHeight) / (tex.height-1));
	}
	else {
		ratioX = parseFloat(tex.width) / newWidth;
		ratioY = parseFloat(tex.height) / newHeight;
	}
	w = tex.width;
	w2 = newWidth;
	var cores = Mathf.Min (SystemInfo.processorCount, newHeight);
	if (finishCounts == null || finishCounts.Length != cores) {
		finishCounts = new int[cores];
	}
	else {
		for (var count in finishCounts) count = 0;
	}
 
	if (cores > 1) {
		var slice = newHeight/cores;
		for (var i = 0; i < cores-1; i++) {
			var threadData = new ThreadData(slice*i, slice*(i+1), i);
			var thread = useBilinear? new Thread(BilinearScale) : new Thread(PointScale);
			thread.Start (threadData);
		}
		threadData = new ThreadData(slice*i, newHeight, i);
		if (useBilinear) {
			BilinearScale (threadData);
		}
		else {
			PointScale (threadData);
		}
 
		var totalCount : int;
		while (totalCount < cores) {
			totalCount = 0;
			for (i = 0; i < cores; i++) {
				totalCount += finishCounts[i];
			}
		}
	}
	else {
		threadData = new ThreadData(0, newHeight, 0);
		if (useBilinear) {
			BilinearScale (threadData);
		}
		else {
			PointScale (threadData);
		}
	}
 
	tex.Resize (newWidth, newHeight);
	tex.SetPixels32 (newColors);
	tex.Apply();
}
 
private static function BilinearScale (threadData : ThreadData) {
	for (var y = threadData.start; y < threadData.end; y++) {
		var yFloor = Mathf.Floor (y * ratioY);
		var y1 = yFloor * w;
		var y2 = (yFloor+1) * w;
		var yw = y * w2;
 
		for (var x = 0; x < w2; x++) {
			var xFloor = Mathf.Floor (x * ratioX);
			var xLerp = x * ratioX-xFloor;
			newColors[yw + x] = ColorLerpUnclamped (ColorLerpUnclamped (texColors[y1 + xFloor], texColors[y1 + xFloor+1], xLerp),
												    ColorLerpUnclamped (texColors[y2 + xFloor], texColors[y2 + xFloor+1], xLerp),
												    y*ratioY-yFloor);
		}
	}
 
	finishCounts[threadData.i]++;
}
 
private static function PointScale (threadData : ThreadData) {
	for (var y = threadData.start; y < threadData.end; y++) {
		var thisY = parseInt(ratioY * y) * w;
		var yw = y * w2;
		for (var x = 0; x < w2; x++) {
			newColors[yw + x] = texColors[thisY + ratioX*x];
		}
	}
 
	finishCounts[threadData.i]++;
}
 
private static function ColorLerpUnclamped (c1 : Color32, c2 : Color32, value : float) : Color32 {
	return new Color32 (c1.r + (c2.r - c1.r)*value, 
					    c1.g + (c2.g - c1.g)*value, 
					    c1.b + (c2.b - c1.b)*value, 
					    c1.a + (c2.a - c1.a)*value);
}