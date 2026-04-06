# silksong-translator

Search text assets based on its name.

## Website development

```
npm start
```


## Exporting assets

```
Remove-Item -Path ".\TextAsset\*.txt"
Remove-Item -Path ".\DecodedText\*.txt"
```

Export all `TextAsset` using https://github.com/aelurum/AssetStudio. And run the decrypt https://www.nexusmods.com/hollowknightsilksong/mods/10?tab=files:

```
.\HollowKnightSilksongDecryptorEncryptor.zip-10-1-0-1757065610\HollowKnight_TextAssetDecryptor.exe -d ".\TextAsset\" -o "DecodedText"
```

```
python generate_json.py
python generate_changelog.py
```

Check build info at https://steamdb.info/app/1030300/patchnotes/
