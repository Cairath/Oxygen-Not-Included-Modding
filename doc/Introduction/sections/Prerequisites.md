## Prerequisites
* At least basic knowledge of C# (you *will* be required to read up on more advanced concepts, depending on the depth of your mod). **We will not teach you C#, that one is on you.**
* Understanding of [Harmony](https://github.com/pardeike/Harmony) - the library we use for patching game methods. **Reading and understanding [Harmony documentation](https://harmony.pardeike.net/articles/patching.html) is absolutely mandatory before proceeding.**
* A working development environment. This can be either Windows, Linux, or MacOS (under certain conditions). **If you opt for a non-Windows platform, help may be limited.**
  * Windows: You will need Visual Studio and .NET Framework 4.7.1, which used by the game and will need to be installed either via Visual Studio or manually.
  * Linux/MacOS: `dotnetcore` must be installed and an editor capable of working with MSBuild and C# is required (such as Visual Studio Code). You will also need the reference assemblies for .NET Framework 4.7.1, which are available on [nuget here](https://www.nuget.org/packages/Microsoft.NETFramework.ReferenceAssemblies.net471/).

