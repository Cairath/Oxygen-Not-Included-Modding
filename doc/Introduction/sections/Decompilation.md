## Decompiling the game files

To be able to make modifications to the code, you need to decompile it first. It's a process of that will allow you to turn the compiled game assemblies into readable code on which you will base your patches.

The program we use for decompilation is called **dotPeek**. 

### Locating the game files
* Locate the game folder in your steam library `...\SteamLibrary\steamapps\common\OxygenNotIncluded`
* Go into the `\OxygenNotIncluded_Data\Managed` directory. This folder contains all the game assemblies that you will need for your mods.


### Decompilation and exporting to a project
* Once you open dotPeek, go to `File -> Open`, navigate to the aforementioned folder and choose `Assembly-CSharp.dll`
* Once the file decompiles, you will be able to browse and navigate through the code. We **heavily recommend** exporting the sources to a project to be able to view them in Visual Studio (next step)
* Right click on the `Assembly-CSharp` project in the left sidebar then choose `Export to project`. The following options should be selected:
  * `Create .sln file`
  * Optionally `Open project in Visual Studio` if you want it to open automatically once it's done exporting. You can always open it from the folder that you save it to.

### Navigating the code in Visual Studio
Once you have your decompiled sources you're ready to browse the code.  
*If you're new to VS*: Visual Studio offers many cool keybinds and shortcuts that make your life easier and navigation faster, such as finding usages of a given method or all references of a field. Take a while to play and familiarize yourself with the environment. You can also look up some shortcut cheat sheets for VS online.
