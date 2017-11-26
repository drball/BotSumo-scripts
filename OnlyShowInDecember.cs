using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class OnlyShowInDecember : MonoBehaviour {

	private string month; 


	// Use this for initialization
	void Start () {

		// gameObject.SetActive(false); //--temporary

		month = System.DateTime.Now.Month.ToString();

		if((month != "11") && (month != "12")){
			gameObject.SetActive(false);
		}
	}
	
}
