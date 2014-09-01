using UnityEditor;
using UnityEngine;
using System.IO;

/// <summary>
/// GAF asset post processor.
/// </summary>
public class GAFAssetPostProcessor : AssetPostprocessor 
{
	/// <summary>
	/// Raises the postprocess all assets event.
	/// </summary>
	/// <param name='importedAssets'>
	/// Imported assets.
	/// </param>
	/// <param name='deletedAssets'>
	/// Deleted assets.
	/// </param>
	/// <param name='movedAssets'>
	/// Moved assets.
	/// </param>
	/// <param name='movedFromAssetPaths'>
	/// Moved from asset paths.
	/// </param>
    public static void OnPostprocessAllAssets(string[] importedAssets, string[] deletedAssets, string[] movedAssets, string[] movedFromAssetPaths)
    {
        foreach (string asset in importedAssets)
        {
            if (asset.EndsWith(".json"))
            {
				string newFileName = Path.GetDirectoryName(asset) + "/" + Path.GetFileNameWithoutExtension(asset) + ".txt";
 
				//UNITY BUG: AssetDataBase move dont apply correclty
				File.Move( asset, newFileName );
					
                AssetDatabase.Refresh(ImportAssetOptions.Default);
            }
        }
    }
	
	/*
	public void OnPostprocessTexture( Texture2D texture )
	{
		
		TextureImporter importer = assetImporter as TextureImporter;
		importer.npotScale = TextureImporterNPOTScale.None;
		importer.isReadable = true;
		importer.mipmapEnabled = false;
		
		Object asset = AssetDatabase.LoadAssetAtPath( importer.assetPath, typeof(Texture2D));
		if (asset)
		{
			EditorUtility.SetDirty( asset );
		}
		else
		{
			AssetDatabase.ImportAsset( importer.assetPath, ImportAssetOptions.ForceUpdate );
		}
	}
	*/
	
}