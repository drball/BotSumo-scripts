using UnityEngine;
using System.Collections;
using UnityEngine.Analytics;
using System.Collections.Generic;

public class GameAnalytics : MonoBehaviour {

    public int timesPlayed;

    void Start(){
        timesPlayed = PlayerPrefs.GetInt("timesPlayed");
    }
	
	void StartLevel() {
	    //--called by game controller when the level is reset

        timesPlayed = PlayerPrefs.GetInt("timesPlayed");

	    PlayerPrefs.SetInt("timesPlayed", timesPlayed+=1);


        //--send analytics event
        Analytics.CustomEvent("played", new Dictionary<string, object>
        {
            { "timesPlayed", timesPlayed }
        });

        Debug.Log("times played = "+timesPlayed);
	}
}
