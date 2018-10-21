//
//  SplashVC.swift
//  cARt
//
//  Created by Edward Arenberg on 10/20/18.
//  Copyright © 2018 Edward Arenberg. All rights reserved.
//

import UIKit

class SplashVC: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        
        DispatchQueue.main.asyncAfter(deadline: .now() + 2) {
            if let vc = self.storyboard?.instantiateViewController(withIdentifier: "ViewController") as? ViewController {
                self.view.window?.rootViewController = vc
            }
        }
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}
