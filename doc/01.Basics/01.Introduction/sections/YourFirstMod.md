## Your first mod

### Download project template (optional)
We've prepared a small mod template for Visual Studio that will allow you to create a project that already has references to external libraries and a few basic patches. You can download it [here](https://github.com/Cairath/Oxygen-Not-Included-Modding/raw/master/resources/ONI%20Mod.zip).
To add it to VS, place the downloaded .zip (don't unpack it!) in `%USERPROFILE%\Documents\Visual Studio 2019\Templates\ProjectTemplates`.

### New project
Start Visual Studio. On the main screen select `Create a new project`, then follow one of the paths below depending on whether you downloaded the template above.

* **Using project template**
  
  Search for `ONI Mod` in the template list. Do **not** select `Place solution and project in the same directory`.  
  If the template does not appear on the list, make sure you imported the template correctly and restart VS. Click `next` to continue.

* **Without template**
  
  Choose `Class Library (.NET Framework)` in the template list. Click `next` then **select .NET Framework 4.7.1 in the bottom dropdown.**

Click next, then choose names for your solution and project. Solution is a collection of projects, and many of us have one solution called something along the lines of `ONI Mods` with many projects in it (one project = a single mod). If you prefer to have one solution per mod, that's fine too!

After you name your solution and project, click `Create` - and that's all for this step.

### Required game files
Once your project is created you will see a bunch of errors. It's time to import required dependencies.
* Go to the folder that you saved your solution in. (It will have `SolutionName.sln` file in it)
* Create a new folder in that directory, called `lib`
* Back in the `...\SteamLibrary\steamapps\common\OxygenNotIncluded\OxygenNotIncluded_Data\Managed` folder, find the following files and copy them to the `lib` directory:
  * `Assembly-CSharp.dll`
  * `Assembly-CSharp-firstpass.dll`
  * `0Harmony.dll`
  * `UnityEngine.dll`
  * `UnityEngine.CoreModule.dll`
* Below we list other often used files that will not be needed in this mod, but you will most likely find yourself using them at some point:
  * `UnityEngine.UI.dll`
  * `Unity.TextMeshPro.dll`
  * `UnityEngine.ImageConversionModule.dll`

Once all files are in place, try to build your project (on the sidebar, right click the project name and click `Build`). It should now recognize all files and build with no issues.
If you have issues with references not being found - please restart Visual Studio or re-add the references manually.

### Game log
The game output log is located in `%USERPROFILE%\AppData\LocalLow\Klei\Oxygen Not Included\player.log`. This file will be your friend - create a shortcut somewhere accessible. Open with Notepad++. More details about how to work with the log will be published on another page.

### First look at the code
At this point you should be familiar with Harmony patches. If you aren't -- go back and read the documentation. One of the main things you will be doing with modding is writing patches to modify the original game logic. There are a few ways of doing it, and now we'll cover the most basic one.

`Db_Initialize_Patch` is an example of a patch class (file from the example project, [available here](https://github.com/Cairath/Oxygen-Not-Included-Modding/blob/master/examples/ONI%20Hello%20World%20Mod/ONIMod/Patches.cs)):
```cs
# Patches.cs

using HarmonyLib;

namespace ONIMod
{
	public class Patches
	{
		[HarmonyPatch(typeof(Db))]
		[HarmonyPatch("Initialize")]
		public class Db_Initialize_Patch
		{
			public static void Prefix()
			{
				Debug.Log("I execute before Db.Initialize!");
			}

			public static void Postfix()
			{
				Debug.Log("I execute after Db.Initialize!");
			}
		}
	}
}
```

`Db_Initialize_Patch` contains two patches (last chance to go read Harmony documentation!) that will be executed before and after `Db.Initialize()` in the original code. You can see the results of `Debug.Log()` in the aforementioned game log file.

All patches need to reside somewhere - usually it's a bigger class with patches (in this case the `Patches` class), or sometimes a few smaller ones if there's a logical need to divide them. Where you put the patch classes does not matter - but keep it tidy -- you'll have to return to the code later at some point, so don't do anything the future you will regret.

The resulting file `Patches.cs` has the `Patches` class which holds all the patches we'll use in the example mod. You do not need to do anything to register or execute them - by default the game will pick them up on its own and apply them when it starts. If you want to have more control over the patching process or need to do something before or after it, please add [UserMod2](Mod-Structure/#usermod2) to your reading list.

### Testing the mod
Once you compile the mod (remember to compile it as `Release` version!), you have to move it to the game mod directory. 
In `%USERPROFILE%\Documents\Klei\OxygenNotIncluded\mods` there are three folders (if there aren't, please create them):
* `\Dev` - this is where mods in development should go. If a mod in this folder crashes, it will not be disabled automatically when the game restarts.
* `\Steam` - mods to which you subscribe on Steam are automatically downloaded there. Mods will be auto-disabled upon a mod crash (of any mod).
* `\Local` - locally installed mods, otherwise behaves as `\Steam`. 

On other platforms, you can find the directories here:
* Linux: `~/.config/unity3d/Klei/OxygenNotIncluded/mods`
* Mac: `~/Library/Application Support/unity.Klei.Oxygen Not Included/mods` *(you've made a bad life decision, you'll have a lot of figuring out to do)*

Each mod should have its own separate folder, so for example your `ExampleMod` path would look like this:
`...\Klei\OxygenNotIncluded\mods\Dev\ExampleMod\ExampleMod.dll`. Once you've confirmed the file is in the correct place, you can launch the game and click the `MODS` button. Find your mod on the list, enable it then allow the game to restart.

To verify the mod worked, you should open the game log and look for the two lines that your mod printed - `I execute before Db.Initialize!` and `I execute after Db.Initialize!`.

If you found them - congratulations, you've succeeded with your first mod.
