using UnityEngine;
using System.Collections;

public class FallingPlatform : MonoBehaviour {

	public bool falling = false;
	private float fallSpeed = 6f;

	// Use this for initialization
	void Start () {
		
	}
	
	// Update is called once per frame
	void Update () {

		if(falling == true){
			Debug.Log("falling - y = "+transform.localPosition.z);
			transform.localPosition.z -= fallSpeed;
		}
	}
}
