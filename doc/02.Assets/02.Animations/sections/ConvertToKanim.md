## Converting Spriter SCML to Kanim

When you are ready to "export" your animations from Spriter back into the game you will have to use **kanimal-cli** again.

1. Open a command shell (cmd.exe or PowerShell on Windows) at the path where kanimal-cli.exe is located.

2. Run the following command:
```
kanimal-cli.exe kanim <scml_file> --output <output_folder> --interpolate
```

`<scml_file>`: The full path to the `.scml` file.  
`<output_folder>`: The folder where you want the kanim files to be saved.  
`--interpolate`: Tells kanimal-cli to fill in frames between sparsely placed keyframes in the Spriter timeline.

For example, the full command to convert the **Conveyor Loader** scml files from before might look like this:

```
kanimal-cli.exe kanim "C:\ONI-Mods\SpriterProjects\conveyorin\conveyorIn.scml" --output "C:\ONI-Mods\CustomAnims\conveyorin" --interpolate
```

If all goes well the kanim files should exist in the `<output_folder>` and be ready to include with your mod.