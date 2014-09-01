Shader "GAF/GAFElement" {
	Properties {
		_MainTex ("Base (RGB)", 2D) = "white" {}
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
		//Blend SrcAlpha DstAlpha
		AlphaTest Greater .001
											
		CGPROGRAM
		#pragma surface surf Lambert
		//#pragma surface surf NoLight
		
//		half4 LightingNoLight( SurfaceOutput s, fixed3 lightDir, fixed atten )
//		{
//			fixed4 c;
//			//c.rgb = s.Albedo - 0.5f;
//			c.rgb = s.Albedo - 0.5f;
//			c.a = s.Alpha;
//			return c;
//		}
		
		sampler2D _MainTex;
		float3 _ColorMult;	
		float4 _ColorShift;		
		float _Alpha;
		
		struct Input {
			float2 uv_MainTex;			
		};
	
		void surf (Input IN, inout SurfaceOutput o) {
								
			half4 col = tex2D(_MainTex, IN.uv_MainTex );
			o.Albedo = col.rgb * _ColorMult.rgb + _ColorShift.rgb;
			o.Alpha = col.a * _Alpha + _ColorShift.a;
			
		}
		ENDCG
	} 
	FallBack "Mobile/VertexLit"
}
