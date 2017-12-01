using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PooperAbilityScript : MonoBehaviour {

	public GameObject BombEmitter;
	public GameObject Bomb;
	private float fireRateNormal = 1f;
	private float fireRate;
	private Vector3 emitterPos;

	// Use this for initialization
	void Start () {
		emitterPos = BombEmitter.transform.position;
	}
	
	// called by PlayerAbility using sendmessage
	void ActivateAbilityBroadcast(){
		Debug.Log("Activate yus!");
		InvokeRepeating("CreateBomb", 0, fireRate);
	}

	void DisableAbilityBroadcast(){
		Debug.Log("Disable yus!");
		CancelInvoke("CreateBomb");
	}

	void CreateBomb() {
		
		GameObject bombInstance = Instantiate(Bomb, emitterPos, transform.rotation);
		
		//--set the owner of this bullet
		// bulletInstance.GetComponent<BulletScript>().Owner = gameObject;

	}
}
