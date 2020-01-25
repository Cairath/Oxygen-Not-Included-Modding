## Your first mod

### Download project template (optional)
We've prepared a small mod template for Visual Studio that will allow you to create a project that already has references to external libraries and a few basic patches. You can download it [here](https://github.com/Cairath/Oxygen-Not-Included-Modding/raw/master/resources/ONI%20Mod.zip).
To add it to VS, place the downloaded .zip (don't unpack it!) in `C:\Users\%USERNAME%\Documents\Visual Studio 2019\Templates\ProjectTemplates`.

### New project
Start Visual Studio. On the main screen select `Create a new project`, then follow one of the paths below depending on whether you downloaded the template above.

* **Using project template**
  
  Search for `ONI Mod` in the template list. If it does not appear make sure you imported the template correctly and restart VS. Click `next` to continue.

* **Without template**
  
  Choose `Class Library (.NET Framework)` in the template list. Click `next` then **select .NET Framework 4.0 in the bottom dropdown.**

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

Below we list other often used files that will not be needed in this mod, but you will most likely find yourself using them at some point:
  * `UnityEngine.UI.dll`
  * `Unity.TextMeshPro.dll`
  * `UnityEngine.ImageConversionModule.dll`

Once all files are in place, try to build your project (on the sidebar, right click the project name and click `Build`). It should now recognize all files and build with no issues.

### Game log
The game output log is located in `C:\Users\%USERNAME%\AppData\LocalLow\Klei\Oxygen Not Included\output_log.txt`. This file will be your friend - create a shortcut somewhere accessible. Open with Notepad++. More details about how to work with the log will be published on another page.

### First look at the code
At this point you should be familiar with Harmony patches. If you aren't -- go back and read the documentation.



