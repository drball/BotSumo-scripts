// using UnityEngine;
// using System.Collections;

// public class FallingPlatform : MonoBehaviour {

// 	public bool falling = false;
// 	private float fallSpeed = 2f;
// 	private Vector3 newPos;

// 	// Use this for initialization
// 	void Start () {
		
// 	}
	
// 	// Update is called once per frame
// 	void Update () {

// 		if(falling == true){
// 			Debug.Log("falling - y = "+transform.localPosition.y);
// 			transform.Translate((Vector3.down * fallSpeed) * Time.deltaTime);

// 			if(transform.position.y < -14f){
// 				gameObject.SetActive(false);
// 			}
// 		}
// 	}
// }
