using UnityEngine;
using System.Collections;
using System.IO;
#if UNITY_EDITOR
using UnityEditor;
#endif

[System.Serializable]
public class GAFAtlas {

	#region private data
	[SerializeField]
	private float[] mCsfs;
	
	[SerializeField]
	private string[] mFileNames;
	
	[SerializeField]
	private int mId;

	[SerializeField]
	private Texture2D[] mTextures;
	#endregion
	
	#region public data
	public GAFAtlas( string[] fileNames, float[] CSF, int id )
	{
		mFileNames = fileNames;
		mId = id;
		mCsfs = CSF;
		
		mTextures = new Texture2D[fileNames.Length];
		for( int i=0;i<fileNames.Length;i++)
		{
			mTextures[i] = Resources.Load( Path.GetFileNameWithoutExtension( mFileNames[i]) ) as Texture2D;
		}
		
	}
	
	public GAFAtlas( string[] fileNames, string animationPath, float[] CSF, int id )
	{
		mFileNames = fileNames;
		mId = id;
		mCsfs = CSF;
		
		mTextures = new Texture2D[fileNames.Length];
		for( int i=0;i<fileNames.Length;i++)
		{
			if ( Application.isPlaying )
			{
				string path = Path.GetDirectoryName( animationPath );
				path =  path + "/" + Path.GetFileNameWithoutExtension( fileNames[i] );
				mTextures[i] = Resources.Load( path ) as Texture2D;
			}
#if UNITY_EDITOR
			else
			{
				string path = Path.GetDirectoryName( animationPath );
				path =  path + "/" + fileNames[i];
				mTextures[i] = AssetDatabase.LoadAssetAtPath( path, typeof(Texture2D)) as Texture2D;
				
				// Texture settings			
				string assetPath = AssetDatabase.GetAssetPath( mTextures[i] );
											
				TextureImporter  textureImporter = AssetImporter.GetAtPath( assetPath ) as TextureImporter;				
				textureImporter.textureType = TextureImporterType.Advanced;
								
				textureImporter.npotScale = TextureImporterNPOTScale.None;
				textureImporter.mipmapEnabled = false;
				textureImporter.isReadable = true;
				textureImporter.textureFormat = TextureImporterFormat.ARGB32;			
								
				TextureImporterSettings st = new TextureImporterSettings();
				textureImporter.ReadTextureSettings( st );
				st.wrapMode = TextureWrapMode.Clamp;
				textureImporter.SetTextureSettings( st );				
				
				AssetDatabase.ImportAsset( assetPath, ImportAssetOptions.ForceUpdate );
				
			}
#endif			
		}
		
	}
	
	public GAFAtlas( string fileName, int id )
	{
		mFileNames = new string[1];
		mFileNames[0] = fileName;
		
		mId = id;
		
		mTextures = new Texture2D[1];
		mTextures[0] = Resources.Load( Path.GetFileNameWithoutExtension( fileName )) as Texture2D;
	}
	
	public GAFAtlas( string fileName, string animationPath, int id )
	{
		mFileNames = new string[1];
		mFileNames[0] = fileName;
		
		mId = id;
		
		mTextures = new Texture2D[1];
		
		if ( Application.isPlaying )
		{
			string path = Path.GetDirectoryName( animationPath );
			path =  path + "/" + Path.GetFileNameWithoutExtension( fileName );
			mTextures[0] = Resources.Load( path ) as Texture2D;
		}
#if UNITY_EDITOR
		else
		{
			string path = Path.GetDirectoryName( animationPath );
			path =  path + "/" + fileName;
			mTextures[0] = AssetDatabase.LoadAssetAtPath( path, typeof(Texture2D)) as Texture2D;
			
			// Texture settings
			string assetPath = AssetDatabase.GetAssetPath( mTextures[0] );
			TextureImporter  textureImporter = AssetImporter.GetAtPath( assetPath ) as TextureImporter;
			
			textureImporter.textureType = TextureImporterType.Advanced;
			textureImporter.npotScale = TextureImporterNPOTScale.None;
			textureImporter.mipmapEnabled = false;
			textureImporter.isReadable = true;
				
			TextureImporterSettings st = new TextureImporterSettings();
			textureImporter.ReadTextureSettings( st );
			st.wrapMode = TextureWrapMode.Clamp;
			textureImporter.SetTextureSettings( st );
				
			AssetDatabase.ImportAsset( assetPath, ImportAssetOptions.ForceUpdate );
			
		}
#endif	
		
	}
	
	
	#endregion 
	
	#region properties
	/// <summary>
	/// Gets or sets the file names.
	/// </summary>
	/// <value>
	/// The file names.
	/// </value>
	public string[] FileNames
	{
		get
		{
			return mFileNames;
		}
		set
		{
			mFileNames = value;
		}
	}
	
	/// <summary>
	/// Gets or sets the name of the file.
 	/// </summary>
	/// <value>
	/// The name of the file.
	/// </value>
	public string FileName
	{
		get
		{
			return mFileNames[0];
		}
		set
		{
			mFileNames[0] = value;
		}
	}
	
	/// <summary>
	/// Gets or sets the identifier.
	/// </summary>
	/// <value>
	/// The identifier.
	/// </value>
	public int Id
	{
		get
		{
			return mId;
		}
		set
		{
			mId = value;
		}
	}
	
	/// <summary>
	/// Gets or sets the atlas textures.
	/// </summary>
	/// <value>
	/// The atlas textures.
	/// </value>
	public Texture2D[] AtlasTextures
	{
		get
		{
			return mTextures;
		}
		set
		{
			mTextures = value;
		}
	}
	
	/// <summary>
	/// Gets or sets the atlas texture.
	/// </summary>
	/// <value>
	/// The atlas texture.
	/// </value>
	public Texture2D AtlasTexture
	{
		get
		{
			return mTextures[0];
		}
		set
		{
			mTextures[0] = value;
		}
	}
	
	/// <summary>
	/// Gets or sets the control scale factors.
	/// </summary>
	/// <value>
	/// The constol scale factor.
	/// </value>
	public float[] CSF
	{
		get
		{
			return mCsfs;
		}
		set
		{
			mCsfs = value;
		}
	}
	#endregion
	
}
