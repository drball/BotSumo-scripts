using System.Collections;
using System.Collections.Generic;
using UnityEngine;

//--ability for bot B

public class AlternateShooting : MonoBehaviour {

	public GameObject BulletEmitter1;
	public GameObject BulletEmitter2;
	public GameObject Bullet;
	private bool fireFromL; //--alternates whether fire from L or R
	private float fireRateNormal = 0.75f;
	private float fireRate;

	// Use this for initialization
	void Start () {
		fireRate = fireRateNormal;
		
	}
	
	// called by PlayerAbility using sendmessage
	void ActivateAbilityBroadcast(){
		Debug.Log("Activate yus!");
		InvokeRepeating("FireBullet", 0, fireRate);
	}

	void DisableAbilityBroadcast(){
		Debug.Log("Disable yus!");
		CancelInvoke("FireBullet");
	}

	void FireBullet() {

		fireFromL = !fireFromL;
		
		Vector3 EmitterPos;
		
		if( fireFromL == true ){
			EmitterPos = BulletEmitter1.transform.position;
		}else {
			EmitterPos = BulletEmitter2.transform.position;
		}
		
		GameObject bulletInstance = Instantiate(Bullet, EmitterPos, transform.rotation);
		
		//--set the owner of this bullet
		// bulletInstance.GetComponent<BulletScript>().Owner = gameObject;

	}
}
