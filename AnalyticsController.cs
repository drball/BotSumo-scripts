using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Analytics;

public class AnalyticsController : MonoBehaviour
{
	public void ReplayEvent()
	{
  // 		int totalPotions = 5;
		// int totalCoins = 100;
		// Analytics.CustomEvent("gameOver", new Dictionary<string, object>
		// {
		// 	{ "potions", totalPotions },
		// 	{ "coins", totalCoins }
  // 		});
		Debug.Log("analytics event");
	}

	public void TestEvent(){
		Debug.Log("analytics event1");
	}
}