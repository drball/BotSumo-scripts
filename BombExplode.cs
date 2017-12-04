using System.Collections;
using System.Collections.Generic;
using UnityEngine;

//--use ontriggerenter to see which rigidbodies we need to apply an instant force to 

public class BombExplode : MonoBehaviour {

	public GameObject Explosion;
	public Transform explosionPos;

	void CreateExplosion(){
		GameObject explosionInstance = Instantiate(Explosion, explosionPos.position, explosionPos.rotation);

		Destroy(gameObject,2);
		Destroy(explosionInstance,2);
	}
	
}
