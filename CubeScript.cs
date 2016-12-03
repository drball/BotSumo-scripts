using UnityEngine;
using System.Collections;

public class CubeScript : MonoBehaviour {

	float fallingYPos = -10f;
	private CubeController CubeController;

	// Use this for initialization
	void Start () {

		CubeController = GameObject.Find("GameController").GetComponent<CubeController>();
	}
	
	// Update is called once per frame
	void Update () {

		if (transform.position.y < fallingYPos){

			// CubeController.CheckCubeAmt();
					
			Destroy(gameObject);

		}
	}
}
