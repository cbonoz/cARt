//
//  ViewController.swift
//  cARt
//
//  Created by Edward Arenberg on 10/20/18.
//  Copyright © 2018 Edward Arenberg. All rights reserved.
//

import UIKit
import SceneKit
import ARKit

class ViewController: UIViewController {

    @IBOutlet var sceneView: ARSCNView!
    @IBOutlet weak var productView: UIView! {
        didSet {
            productView.layer.cornerRadius = 12
            productView.layer.masksToBounds = true
        }
    }
    
    @IBOutlet weak var productViewHeightConstraint: NSLayoutConstraint!
    @IBOutlet weak var productAvatarIV: UIImageView! {
        didSet {
            productAvatarIV.layer.cornerRadius = 30
            productAvatarIV.layer.masksToBounds = true
        }
    }
    @IBOutlet weak var actionButton: UIButton! {
        didSet {
            actionButton.layer.cornerRadius = 12
            actionButton.layer.masksToBounds = true
        }
    }
    @IBAction func actionHit(_ sender: UIButton) {
        actionButton.isEnabled = false
        actionButton.alpha = 0.5
        actionButton.setTitle("Checking...", for: .normal)
    }
    
    @IBOutlet weak var yodleeView: UIView! {
        didSet {
            yodleeView.alpha = 0
        }
    }
    func animateYodlee() {
        let s = 1.2
        while s > 0 {
            UIView.animate(withDuration: 0.4,
                           animations: {

                            }, completion: {finished in
                
            })
        }
    }
    
    let feedbackGenerator = UIImpactFeedbackGenerator(style: .medium)

    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Set the view's delegate
        sceneView.delegate = self
        sceneView.session.delegate = self
        sceneView.showsStatistics = false
        
        productViewHeightConstraint.constant = 0


        // Show statistics such as fps and timing information
        // sceneView.showsStatistics = true
        
        // Create a new scene
        // let scene = SCNScene(named: "art.scnassets/ship.scn")!
        
        // Set the scene to the view
        // sceneView.scene = scene
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        
        // Create a session configuration
        let configuration = ARWorldTrackingConfiguration()

        guard let referenceObjects = ARReferenceObject.referenceObjects(inGroupNamed: "merchandise", bundle: nil) else {
            fatalError("Missing expected asset catalog resources.")
        }
        configuration.detectionObjects = referenceObjects

        // Run the view's session
        sceneView.session.run(configuration)
    }
    
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        
        // Pause the view's session
        sceneView.session.pause()
    }
    
    var hitProduct = false
    override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
        guard let touchLocation = touches.first?.location(in: sceneView) else { return }
        let hitTests = sceneView.hitTest(touchLocation, options: [SCNHitTestOption.searchMode: 1])
//            let hitTest = sceneView.hitTest(touchLocation, types: .existingPlaneUsingExtent).first,
        for ht in hitTests {
            print(ht)
        }
        
        if !hitProduct {
            hitProduct = true
            productViewHeightConstraint.constant = 280
            UIView.animate(withDuration: 0.4) {
                self.view.layoutIfNeeded()
            }
            
        }
        
//        print("Hit Mr Bear")

        /*
        let touch = touches.first as! UITouch
        if(touch.view == self.sceneView){
            let viewTouchLocation:CGPoint = touch.location(in: sceneView)
            guard let result = sceneView.hitTest(viewTouchLocation, options: nil).first else {
                return
            }
            print("results", "\(result)")
            let touchPlaneNode = planeNode
            if touchPlaneNode == result.node {
                print("tapped on a match, but which plane did I tap on?")
            }
         
        }
         */

    }
    
    @IBAction func productSceneHit(_ sender: UITapGestureRecognizer) {
        productViewHeightConstraint.constant = 0
        UIView.animate(withDuration: 0.4) {
            self.view.layoutIfNeeded()
        }
        hitProduct = false
    }
    
}


extension ViewController: ARSCNViewDelegate {
    func renderer(_ renderer: SCNSceneRenderer, didAdd node: SCNNode, for anchor: ARAnchor) {
        
        if let objectAnchor = anchor as? ARObjectAnchor {
            // node.addChildNode(self.model)
            
            print("FOUND")
            let text = SCNText(string: "Mr Bear", extrusionDepth: 0.04)
            let font = UIFont(name: "Futura", size: 0.25)
            text.font = font
            text.alignmentMode = CATextLayerAlignmentMode.center.rawValue
            text.firstMaterial?.diffuse.contents = UIColor.red
            text.firstMaterial?.specular.contents = UIColor.white
            text.firstMaterial?.isDoubleSided = true
            text.chamferRadius = 0.01

            let textNode = SCNNode(geometry: text)
            let p = node.position
            textNode.scale = SCNVector3Make(0.1, 0.1, 0.1)
            textNode.position = SCNVector3Make(p.x, p.y + 0.1, p.z)
            node.addChildNode(textNode)
            DispatchQueue.main.async {
                self.feedbackGenerator.impactOccurred()
            }
        }

        guard let planeAnchor = anchor as? ARPlaneAnchor else {
            return
        }
        
        let plane = SCNBox(width: CGFloat(planeAnchor.extent.x),
                           height: CGFloat(planeAnchor.extent.y),
                           length: CGFloat(planeAnchor.extent.z),
                           chamferRadius: 0)
        plane.firstMaterial?.diffuse.contents = UIColor.red
        
        let planeNode = SCNNode(geometry: plane)
        node.addChildNode(planeNode)
        planeNode.runAction(SCNAction.fadeOut(duration: 1))
    }
    
    
    // MARK: - ARSCNViewDelegate
    
    /*
     // Override to create and configure nodes for anchors added to the view's session.
     func renderer(_ renderer: SCNSceneRenderer, nodeFor anchor: ARAnchor) -> SCNNode? {
     let node = SCNNode()
     
     return node
     }
     */
    
    func session(_ session: ARSession, didFailWithError error: Error) {
        // Present an error message to the user
        
    }
    
    func sessionWasInterrupted(_ session: ARSession) {
        // Inform the user that the session has been interrupted, for example, by presenting an overlay
        
    }
    
    func sessionInterruptionEnded(_ session: ARSession) {
        // Reset tracking and/or remove existing anchors if consistent tracking is required
        
    }
}

extension ViewController: ARSessionDelegate {
    func session(_ session: ARSession, didUpdate frame: ARFrame) {
        // sendMatrix(prefix: "C", matrix: frame.camera.projectionMatrix)
        // lastMatrix = frame.camera.projectionMatrix
        
        // videoSource.sendBuffer(frame.capturedImage, timestamp: frame.timestamp)
    }
}

