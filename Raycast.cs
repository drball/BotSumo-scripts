using UnityEngine;
using System.Collections;

public class Raycast : MonoBehaviour {

    RaycastHit other;
    public float speed = 1.8f, moveSpeed = 0.01f;
    public float tickness = 1.0f;
    public static bool moveForward = false;
    bool rotateL = true;
    bool search = true;
    public float t = 1;
    public Vector3 target;
	// Use this for initialization
	void Start () {
	
	}
	


    void Update()
    {


        Vector3 fwd = transform.TransformDirection(Vector3.forward);

        Debug.Log(rotateL);

        if (Physics.Raycast(transform.position, fwd, out other))
        {
            //print("There is something in front of the object!");
            //Debug.Log(other.transform.gameObject.name);

            if (other.transform.name == "Cube (1)")
            {
                this.transform.Translate(Vector3.Lerp(this.transform.position, Vector3.forward, t) * moveSpeed);
                if (rotateL)
                {
                    rotateL = false;
                }
                else
                {
                    rotateL = true;
                }

                //moveForward = true;

            }
            else
            {

                if (rotateL)
                {
                    this.transform.Rotate(-Vector3.up * speed);
                }
                else if (!rotateL)
                {
                    this.transform.Rotate(Vector3.up * speed);
                }

            }


        }



    }



}
