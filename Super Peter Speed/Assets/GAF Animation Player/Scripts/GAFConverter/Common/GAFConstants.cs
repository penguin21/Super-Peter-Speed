using UnityEngine;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

public static class GAFConstants
{
	//
	public const float cTargetFPS = 30f;
	
	public const int cPerRadiusBlurIterations = 10;
	public const int cBlurIterations = 3;
	
	public const string cElementShaderPath = "GAF/GAFElement";
	public const string cElementMaskShaderPath = "GAF/GAFElement_Mask";
	public const float cTimeScale  = 0.9f;
	public const int cMaskLayer = 31;
}

