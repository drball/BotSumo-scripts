//--for the level where the platforms all fall after a few seconds
using UnityEngine;
using System.Collections;

public class FallingPlatformController : MonoBehaviour {

	private int maxNum = 246;
	private GameObject CurrentPlatform;
	private Renderer rend;
	public Color highlightColor;
	private Color initialColor;

	// Use this for initialization
	void Start () {

		InvokeRepeating("SelectFallingPlatform", 1, 1.5f);
	}
	
	void SelectFallingPlatform(){

		var randomNum = Random.Range(0, maxNum);
		var platformName = "FallingPlatform ("+randomNum.ToString()+")";
		Debug.Log("platform to fall is "+platformName);

		CurrentPlatform = transform.Find(platformName).gameObject;

		if(CurrentPlatform != null){

			Debug.Log("remove "+platformName);
			rend = CurrentPlatform.GetComponent<Renderer>();
			initialColor = rend.material.color;
			// FallingPlatform platformScript = ;

			GetComponent<FallingPlatform>().falling = true;

			// CurrentPlatform.GetComponent<Rigidbody>().isKinematic = false;

		}

		
	}

	
}
