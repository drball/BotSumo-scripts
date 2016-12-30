//--for the level where the platforms all fall after a few seconds
using UnityEngine;
using System.Collections;

public class FallingPlatformController : MonoBehaviour {

	private int maxNum = 183;
	private GameObject CurrentPlatform;

	// Use this for initialization
	void Start () {

		InvokeRepeating("SelectFallingPlatform", 1, 0.5f);

		Invoke("ResetPlatform", 3);
	}
	
	void SelectFallingPlatform(){

		var randomNum = Random.Range(0, maxNum);
		var platformName = "FallingPlatform ("+randomNum.ToString()+")";
		Debug.Log("platform to fall is "+platformName);

		CurrentPlatform = transform.Find(platformName).gameObject;

		if(CurrentPlatform != null){

			//--make the platform fall
			CurrentPlatform.GetComponent<Rigidbody>().isKinematic = false;
			CurrentPlatform.GetComponent<Collider>().enabled = false;

		}

		
	}

	void ResetPlatform (){

		for(int i = 0; i < maxNum; i++){
			var platformName = "FallingPlatform ("+i.ToString()+")";
			var APlatform = transform.Find(platformName).gameObject;
			APlatform.transform.localPosition = new Vector3(
				APlatform.transform.localPosition.x,
				0,
				APlatform.transform.localPosition.z);
			APlatform.GetComponent<Rigidbody>().isKinematic = true;
			APlatform.GetComponent<Collider>().enabled = true;
		}
	}

	
}
