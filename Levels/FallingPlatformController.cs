//--for the level where the platforms all fall after a few seconds
using UnityEngine;
using System.Collections;

public class FallingPlatformController : MonoBehaviour {

	private int maxNum = 176;
	private GameObject CurrentPlatform;

	// Use this for initialization
	void Start () {

		// InvokeRepeating("SelectFallingPlatform", 1, 2f);

	}
	
	// void SelectFallingPlatform(){

	// 	var randomNum = Random.Range(0, maxNum+1);
	// 	var platformName = "FallingPlatform ("+randomNum.ToString()+")";
	// 	// Debug.Log("platform to fall is "+platformName);

	// 	CurrentPlatform = transform.Find(platformName).gameObject;

	// 	if(CurrentPlatform != null){

	// 		//--make the platform fall
	// 		CurrentPlatform.GetComponent<Rigidbody>().isKinematic = false;
	// 		CurrentPlatform.GetComponent<Collider>().enabled = false;

	// 	}

		
	// }



	
}
