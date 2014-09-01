Shader "GAF/GAFElement_Mask" {
	Properties {
		_MainTex ("Base (RGB)", 2D) = "white" {}
		_MaskMap ("Mask Texture", 2D) = "white" {}
		_ColorMult("ColorMult",Color) = (1.0, 1.0, 1.0, 1.0 )
		_ColorShift("ColorShift",Color) = (0.0, 0.0, 0.0, 0.0 )
		_Alpha ("Alpha factor", Range(0.0,1.0)) = 1.0
		
	}
	SubShader {
	
		Tags { "Queue"="Transparent" "IgnoreProjector"="True" 
				"RenderType"="Transparent" }
		Cull Off
		Lighting Off
		Blend SrcAlpha OneMinusSrcAlpha									
		CGPROGRAM
		//#pragma surface surf Unlit 
		#pragma surface surf Lambert 

//		half4 LightingUnlit (SurfaceOutput s, half3 lightDir, half atten) {
//          half4 c;
//          c.rgb = s.Albedo;
//          c.a = s.Alpha;
//          return c;
//        }
        

		sampler2D _MainTex;
		sampler2D _MaskMap;
		
		float4x4 _Matrix0;
		
		float3 _ColorMult;	
		float4 _ColorShift;	
		
		float _Alpha;
				
		struct Input {
			float2 uv_MainTex;
			float4 screenPos;
		};

		void surf (Input IN, inout SurfaceOutput o) {
			
			float2 screenUV = IN.screenPos.xy / IN.screenPos.w;			
			half4 maskColor = tex2D (_MaskMap, mul(_Matrix0, float4(screenUV, 1.0, 1.0)).xy );
			
      	    //half4 col = maskColor;
			half4 col = tex2D(_MainTex, IN.uv_MainTex );
			o.Albedo = ( col.rgb * _ColorMult.rgb + _ColorShift.rgb ); 
			
			o.Alpha = ( col.a * _Alpha + _ColorShift.a ) * maskColor.a;
			
		}
		ENDCG
	} 
	FallBack "Mobile/VertexLit"
}
