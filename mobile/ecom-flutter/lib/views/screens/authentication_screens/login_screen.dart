import 'package:flutter/material.dart';

class LoginScreen extends StatelessWidget {
  const LoginScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        width: double.infinity,
        height: double.infinity,
        decoration: BoxDecoration(
          image: DecorationImage(
            image: AssetImage("assets/images/bg-login.jpeg"),
            fit: BoxFit.cover,
          ),
        ),
        child: Column(
            mainAxisAlignment: MainAxisAlignment.end,
            children: [
                Text("Login", 
                    textAlign: TextAlign.start,
                    style: TextStyle(
                        fontFamily: 'Raleway',
                        color: Color(0xFF202020),
                        fontWeight: FontWeight.bold, 
                        fontSize: 52, 
                        letterSpacing: 0.2
                    )
                ),
                Text("Good to see you back!",
                    style: TextStyle(
                        fontFamily: 'Lato',
                        color: Color(0xFF0d120E),
                        fontSize: 16,
                        letterSpacing: 0.2
                    )
                ),
                
                SizedBox(height: 30),
                
                // Email Field
                Container(
                  margin: EdgeInsets.symmetric(horizontal: 30),
                  decoration: BoxDecoration(
                    color: Colors.white.withOpacity(0.9),
                    borderRadius: BorderRadius.circular(15),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withOpacity(0.1),
                        blurRadius: 10,
                        offset: Offset(0, 5),
                      ),
                    ],
                  ),
                  child: TextField(
                    decoration: InputDecoration(
                      hintText: "Email",
                      hintStyle: TextStyle(
                        color: Colors.grey[600],
                        fontSize: 16,
                      ),
                      prefixIcon: Icon(Icons.email, color: Colors.grey[600]),
                      border: InputBorder.none,
                      contentPadding: EdgeInsets.symmetric(horizontal: 20, vertical: 15),
                    ),
                  ),
                ),
                
                SizedBox(height: 20),
                
                // Password Field
                Container(
                  margin: EdgeInsets.symmetric(horizontal: 30),
                  decoration: BoxDecoration(
                    color: Colors.white.withOpacity(0.9),
                    borderRadius: BorderRadius.circular(15),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withOpacity(0.1),
                        blurRadius: 10,
                        offset: Offset(0, 5),
                      ),
                    ],
                  ),
                  child: TextField(
                    obscureText: true,
                    decoration: InputDecoration(
                      hintText: "Password",
                      hintStyle: TextStyle(
                        color: Colors.grey[600],
                        fontSize: 16,
                      ),
                      prefixIcon: Icon(Icons.lock, color: Colors.grey[600]),
                      border: InputBorder.none,
                      contentPadding: EdgeInsets.symmetric(horizontal: 20, vertical: 15),
                    ),
                  ),
                ),

                SizedBox(height: 30),

                Image.asset("assets/images/Illustration.png",
                    width: 200,
                    height: 200,
                    fit: BoxFit.cover,
                ),
                
                SizedBox(height: 50),
            ],
        ),
      ),
    );
  }
}