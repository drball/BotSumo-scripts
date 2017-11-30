using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class rotate : MonoBehaviour {

	public float spinX = 0;
	public float spinY = 0;
	public float spinZ = 0;
	
	// Update is called once per frame
	void Update () {
		transform.Rotate(
			spinX * Time.deltaTime,
			spinY * Time.deltaTime,
			spinZ * Time.deltaTime,
			Space.Self
		);
	}
}