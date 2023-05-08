## Modifying Existing Techs

***Difficulty:** Simple*

### Adding your building to a Tech
Modifying existing technologies to introduce new buildings is a rather simple task, and only involves inserting the building in question into the array of unlocked items for a given tech.

First, locating the stock-game tech associations in `Database.Techs.TECH_GROUPING`: here you can see the "tech groupings" for the stock game. These "groupings" serve as the source of truth the game uses to determine if a given building should be unlocked. Buildings which do not exist in this list are available by default.

To add your building to this list, identify the tech you wish to add to, then insert; this will need to be done before the research tree is initialized, so `OnLoad` is a decent place for this. For this example, we will be adding to the `PowerRegulation` tech.

```cs
using Database;

public static void OnLoad ()
{
    // fetch the array from the Dictionary, convert to list, add to it, then convert back and re-insert.
    var powerRegulation = new List(Techs.TECH_GROUPING["PowerRegulation"]);
    powerRegulation.Add(MyBuilding.ID); // this can be any string, but this is the preferred way
    Techs.TECH_GROUPING["PowerRegulation"] = powerRegulation.ToArray();
}
```

...and that's it. Really.
The game will handle the rest.
