# ResQNet — Smart Emergency Response & Safety Platform

## **Overview**

ResQNet is an AI-assisted emergency response and safety management platform designed to provide fast, reliable, and automated support during critical situations. The system integrates real-time incident reporting, smart alerting, geolocation services, and automated decision assistance to coordinate help efficiently and minimize response time.

ResQNet focuses on empowering communities, authorities, and responders with a unified interface to handle emergencies such as accidents, hazards, medical issues, or suspicious activities.

---

## **Features**

### **1. Real-Time Incident Reporting**

* Users can instantly report emergencies through an intuitive interface.
* Supports category-based reporting (fire, accident, medical, criminal, etc.).
* Allows attachment of images, videos, or location data.

### **2. Smart AI-Driven Response System**

* Intelligent classification of reported issues.
* Severity estimation using rule-based and AI-driven scoring.
* Suggests best possible response action automatically.

### **3. Geolocation & Live Tracking**

* Map-based UI to track incident locations.
* Real-time responder tracking (ambulance, police, fire service).
* Supports automated routing and ETA predictions.

### **4. Emergency Broadcast System**

* Notifies relevant authorities and responders instantly.
* Supports multi-level alerting (local volunteers, police, hospitals, etc.).
* Auto-trigger alerts for high-severity cases.

### **5. Admin & Dashboard Analytics**

* Review all reported incidents.
* Track responder performance.
* View severity heatmaps and incident statistics.

---

## **Tech Stack**

### **Frontend**

* HTML, CSS, JavaScript
* Tailwind CSS
* Reactjs
* Map APIs (Leaflet / Google Maps)

### **Backend**

* Node.js / Express or PHP (based on implementation)
* REST API services
* Location services integration

### **Database**

* MySQL / MongoDB

### **AI/ML (Optional)**

* Python-based microservices
* Image classification, severity prediction

---

## **System Architecture**

1. **User App/UI** sends incident report.
2. **Backend API** validates and stores data.
3. **AI Engine (optional)** processes severity and type.
4. **Incident Dispatcher** sends alerts.
5. **Responders** receive directions via map services.
6. **Admin Dashboard** monitors all activity.

---

## **Installation & Setup**

### **1. Clone the Repository**

```
git clone https://github.com/your-username/resqnet.git
cd resqnet
```

### **2. Install Backend Dependencies (Node.js)**

```
npm install
```

### **3. Start the Server**

```
npm start
```

### **4. Open Frontend**

Open `index.html` in browser or use a local server.

---

## **Usage Flow**

1. User reports an incident.
2. System verifies and classifies the incident.
3. Alerts are dispatched to authorities.
4. Responders view location and take action.
5. Admin monitors real-time updates.

---

## **Screenshots**

<img width="1879" height="916" alt="Screenshot 2025-10-31 205616" src="https://github.com/user-attachments/assets/d8dd1816-0b29-4057-a50d-c24cb0534db6" />
<img width="1882" height="911" alt="Screenshot 2025-10-31 205659" src="https://github.com/user-attachments/assets/b83b99ad-1b92-4b01-84d5-d758a58533d8" />
<img width="1881" height="911" alt="Screenshot 2025-10-31 205808" src="https://github.com/user-attachments/assets/8f464478-a458-4ad5-ba79-c6d61150f7a6" />
<img width="1880" height="912" alt="Screenshot 2025-10-31 205903" src="https://github.com/user-attachments/assets/b2249885-08a2-476f-be85-ccd308e92174" />

---

## **Future Enhancements**

* AI-based image detection for accidents.

* Drone integration.
* Real-time crowd alerts.
* Multi-language support.
* Integration with government emergency services.





