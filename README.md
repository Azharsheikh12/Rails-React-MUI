# README

## Accessible through API as well as Web

This application is fully functional via both the **web interface** and **API** for standalone access and external integrations.

---

## **Project Reference Images**
Project-related images can be found in:
```
rails-react-app/public/images
```

---

## **Prerequisites**
Ensure the following software is installed:

### **Homebrew** (for macOS users)
The macOS package manager. Install it if you don't have it:
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### **Node.js** (for the React frontend)
Install via Homebrew:
```bash
brew install node
```

### **Yarn** (optional, but recommended for package management in React)
```bash
brew install yarn
```

### **Ruby** (for the Rails backend)
Rails requires Ruby. Install it with Homebrew:
```bash
brew install ruby
```

### **Rails** (for the Rails backend)
Install Rails using the following command:
```bash
gem install rails
```

### **PostgreSQL** (or MySQL, depending on your project requirements)
Install PostgreSQL using Homebrew:
```bash
brew install postgresql
```

---

## **Setup Instructions**

### **Extract the zip file:**
Unzip the provided project file:
```bash
unzip my_project.zip
cd my_project
```

### **Install dependencies:**
#### Install Ruby gems:
```bash
bundle install
```
#### Install JavaScript dependencies:
```bash
yarn install
```

### **Setup the database:**
Create and migrate the database:
```bash
rails db:create db:migrate
```

### **Start the server:**
Run the Rails server (serving both API and React frontend):
```bash
rails assets:precompile
rails s
```
By default, the server will be available at: [http://localhost:3000](http://localhost:3000)

### **Access the application:**
Open your web browser and go to:
[http://localhost:3000](http://localhost:3000)

*All navigation will be managed by this URL. If you encounter any routing errors on the browser, hit back to the original URL: [http://localhost:3000](http://localhost:3000)*

---

## **Signup & Login through API:**

### **Endpoints:**

#### **Signup API**
```bash
curl -X POST http://localhost:3000/api/v1/users/signup \
  -H "Content-Type: application/json" \
  -d '{
    "user": {
      "email": "newuser@example.com",
      "password": "newpassword",
      "password_confirmation": "newpassword"
    }
  }'
```

#### **Login API**
```bash
curl -X POST http://localhost:3000/api/v1/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "user": {
      "email": "user@example.com",
      "password": "yourpassword"
    }
  }'
```

---

This ensures that the feature works both on **Web** and **API** independently. 🚀

