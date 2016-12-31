using UnityEngine;
using System.Collections;

public class UnstableLevel : MonoBehaviour {

	private int maxNum = 176;

	// Use this for initialization
	void Start () {
		StartLevel();
	}

	void StartLevel(){
		InvokeRepeating("MakePlatformFall", 1, 0.4f);
	}
	
	void ResetLevel (){

		Debug.Log("resetting the unstable level");

		CancelInvoke("MakePlatformFall");

		for(int i = 0; i <= maxNum; i++){

			var platformName = "FallingPlatform ("+i.ToString()+")";
			Debug.Log("reset platform "+platformName);
			var APlatform = GameObject.Find(platformName).gameObject;

			APlatform.transform.localPosition = new Vector3(
				APlatform.transform.localPosition.x,
				0,
				APlatform.transform.localPosition.z);
			APlatform.GetComponent<Rigidbody>().isKinematic = true;
			APlatform.GetComponent<Collider>().enabled = true;
		}

		StartLevel();
	}

	void MakePlatformFall(){

		var randomNum = Random.Range(0, maxNum+1);
		var platformName = "FallingPlatform ("+randomNum.ToString()+")";
		// Debug.Log("platform to fall is "+platformName);

		var CurrentPlatform = GameObject.Find(platformName).gameObject;

		if(CurrentPlatform != null){

			//--make the platform fall
			CurrentPlatform.GetComponent<Rigidbody>().isKinematic = false;
			CurrentPlatform.GetComponent<Collider>().enabled = false;

		}
	}
}
