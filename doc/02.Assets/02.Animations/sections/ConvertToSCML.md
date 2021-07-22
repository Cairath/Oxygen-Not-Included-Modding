## Converting Kanim to Spriter SCML

It is not currently possible to open the kanim files in any animation software, so they must be converted to a file format that can.

**Spriter** is a 2D animation software that can be used to make animations like the ones seen in Oxygen Not Included. Currently this is the only animation software that has had a converter created for the kanim files. This section takes you though the steps necessary to convert the animation assets from the game into a Spriter `.scml` project file.

1. Open a command shell (cmd.exe or PowerShell on Windows) at the path where kanimal-cli.exe is located.

2. Run the following command:
```
kanimal-cli.exe scml --output <output_folder> <texture_file> <build_file> <anim_file>
```

`<output_folder>`: The folder where you want the Spriter files to be saved.  
`<texture_file>`: The full path to the texture file. (You can drag and drop the file to paste the path)  
`<build_file>`: The full path to the **\*_build.bytes** file.  
`<anim_file>`: The full path to the **\*_anim.bytes** file.

For example, the full command to convert the **Conveyor Loader** files might look like this:

```
kanimal-cli.exe scml --output "C:\ONI-Mods\SpriterProjects\conveyorin" "C:\ONI-Assets\Texture2D\conveyorin_0.png" "C:\ONI-Assets\TextAsset\conveyorin_build.bytes" "C:\ONI-Assets\TextAsset\conveyorin_anim.bytes"
```

If all goes well the Spriter files should exist in the `<output_folder>` and be ready to open with Spriter.