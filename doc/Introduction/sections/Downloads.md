## Downloads

Below you will find links to the required tools. All tools not marked as optional are mandatory. Everything linked below is free to use. 

*If you know what you're doing you're welcome to use different tools, but these tools are something we can help with.*

### Visual Studio Community 2019
***Download link:*** https://visualstudio.microsoft.com/vs/  
This will be your primary tool for editing C# and browsing game code.  
*Installation instructions will be presented in the next chapter of this guide.*

Non-Windows platforms will need to use an alternative, but this will not be much covered in this guide.

You could download dotnet sdk ,find a dll file named `csc.dll`(even if you're using Linux! do NOT convert `csc.dll` to `csc.dll.so` or `libcsc.so` automatically!), execute commands like
```
/path/to/dotnet /path/to/csc.dll -nologo -t:library \
  -r:'../OxygenNotIncluded_Data/Managed/0Harmony.dll' \
  -r:'../OxygenNotIncluded_Data/Managed/System.dll' \
  -r:'../OxygenNotIncluded_Data/Managed/UnityEngine.dll' \
  -r:'../OxygenNotIncluded_Data/Managed/UnityEngine.CoreModule.dll' \
  -r:'../OxygenNotIncluded_Data/Managed/mscorlib.dll' \
  -r:'../OxygenNotIncluded_Data/Managed/Assembly-CSharp.dll' \
  -out:"your-mod.dll"\
  -optimize \
  "your-source-file.cs"
```
to compile your code.

### dotPeek
***Download link:*** https://www.jetbrains.com/decompiler/download/#section=web-installer  
Used to decompile game libraries to be able to read the source code.

*Alternatives:* [dnSpy](https://github.com/0xd4d/dnSpy/releases)

### Notepad++
***Download link:*** https://notepad-plus-plus.org/downloads/  
Or any other sensible text editor. Just don't use Windows Notepad. Please. We'll hate you.

### AssetStudio (optional)
***Download link:*** https://github.com/Perfare/AssetStudio/releases  
A small tool for extracting Unity assets - you can extract animation files from the game. Optional tool, install only if you want to dig into unused assets, or you can always download it later.
