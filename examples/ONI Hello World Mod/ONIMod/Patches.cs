using Harmony;

namespace ONIMod
{
	public class Patches
	{
		public static class Mod_OnLoad
		{
			public static void OnLoad()
			{
				Debug.Log("Hello world!");
			}
		}

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
