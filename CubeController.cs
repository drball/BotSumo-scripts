using UnityEngine;
using System.Collections;

public class CubeController : MonoBehaviour {

	public GameObject[] currentCubes;

	// Use this for initialization
	void Start () {
		CheckCubeAmt();

		InvokeRepeating("CheckCubeAmt", 10, 10);
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	public void CheckCubeAmt() {
		Debug.Log("new cube has arrived");

		// yield return new WaitForSeconds(5);

		//--check how many cubes are remaining
		currentCubes = GameObject.FindGameObjectsWithTag("Box");
		Debug.Log("there are "+currentCubes.Length+" cubes");

		//--if less than 5, create another  cube
		if(currentCubes.Length < 8){

			GameObject instance = Instantiate(Resources.Load("Cube", typeof(GameObject)), 
				new Vector3(
					Random.Range(-4.5f, 5f),
					10f,
					Random.Range(-5.9f, 5.9f)
				),
				Random.rotation
			) as GameObject;
		}

	}

    
}
