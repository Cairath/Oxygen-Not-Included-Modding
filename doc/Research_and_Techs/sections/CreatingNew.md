
## Creating New Techs

***Difficulty:** Don't try this at home, kids*

### Should I be Creating Custom Techs?
**Only if you do not plan to add it to the Research Tree,** unless you are okay using a library to do it for you.

#### Why not?
At current, the tech tree layout is hard-coded and is difficult to modify. In order to insert into the tree, the Node must be created at a defined position and the Edges (the lines between techs) must be programmatically "hand"-drawn, which must *also* be hard-coded.

This will *very* likely conflict with other mods adding Techs or even stock-game updates, resulting in a *very* broken-looking research tree.

#### But what if I really want to?
I don't like being the guy that constantly advertises a library, but if you want to maintain compatibility your best bet is to use [PipLib](https://lab.vevox.io/games/oxygen-not-included/piplib), as it reconstructs the entire research tree to be dynamically-generated rather than hard-coded. This greatly improved the odds the research tree won't look horrible, but it's not perfect.

#### But I don't wanna use a library
You're welcome to try, but don't say I did not warn you.

The game uses a hard-coded asset in GraphML format for the research tree, pre-generated with all Nodes and Edges already positioned. If you wish to add or modify positions, you must completely replace this asset (please don't) or programmatically modify `Database.Techs.resources`.

Only `nodeX` and `nodeY` are used by the game for positing the node; sizing is done dynamically. Any Edges parsed from the asset are used to populate the `unlockedTech` and `requiredTech` values, but the lines between each Node in the tree is otherwise dynamic.

Note that the top-left of the research screen is `0,0` and continues rightward along `-x` and downward along `-y`.

*Have fun with all that...*

### Creating New Tech Objects
**Read the information above first!**

If you've decided you're going to ignore my warnings (please don't) *or* want to create a tech but not add it to the tree (potentially such that it is unlocked only through debug or a non-research-tree means), that can be done.

```cs
var tech = new Tech(
    "MyCustomTech", // tech ID
    Db.Get().Techs, // instance of Techs
    Strings.Get("STRINGS.RESEARCH.TECHS.MYCUSTOMTECH.NAME"), // localized name
    Strings.Get("STRINGS.RESEARCH.TECHS.MYCUSOTMTECH.DESC"), // localized description
    new ResourceTreeNode(){
        nodeX: 0, // X position of the tech
        nodeY: 0, // Y position of the tech
        width: 0, // not used, but required
        height: 0 // not used, but required
    }
);
Techs.TECH_GROUPING.Add(tech.id, new string[0]); // unlocked items
```

This tech will not appear in the research tree until it has been *correctly* added to `Database.Techs.resources`, but it will still be respected by the game regarding unlocking buildings.

Some more in-depth examples of working with the tech tree can be found [in PipLib here](https://lab.vevox.io:4042/games/oxygen-not-included/piplib/-/blob/master/PipLib/Tech/TechTree.cs).
