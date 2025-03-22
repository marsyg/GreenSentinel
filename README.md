# GreenSentinel

## 🌍 Deforestation Detection & Environmental Monitoring System

### 📌 Overview
GreenSentinel is an AI-driven solution designed to combat deforestation and pollution using satellite imagery and machine learning. The system enables real-time detection of deforestation, pollution tracking, and public engagement through alerts and an interactive dashboard.

---

## 🚨 Problem Statement
Deforestation in Delhi has led to severe environmental consequences:
- 🌲 **15% forest cover loss** in the last decade.
- 🌫 **AQI exceeds 400** in winters, ranking Delhi among the most polluted cities globally.
- 📈 **CO₂ emissions increased by 20%** due to reduced green cover.

**Real-Life Examples:** Illegal logging in the Aravalli region and rapid urbanization replacing green spaces with concrete structures.

---

## 🌿 Solution: GreenSentinel
GreenSentinel offers an AI-powered, real-time environmental monitoring system to detect deforestation and pollution trends:
- 📡 **Satellite-based Deforestation Detection** using ML models (U-Net, Vision LLM BLIP2).
- 📊 **Pollution & CO₂ Analytics** to track environmental impact via a dashboard.
- 📍 **Public Engagement** through real-time alerts and user reports.
- 🔔 **WhatsApp Notifications** for instant deforestation and pollution alerts.

---

## 🔧 Technical Overview
### 🛠 Data Processing
1. **Satellite Data Collection**: Images from Sentinel-2, Bhuvan API.
2. **Preprocessing**: Normalization, augmentation, and annotation.

### 🖼 Image Segmentation (U-Net)
- Train a U-Net model to classify regions (trees, water, roads, buildings).
- Generate segmented masks to differentiate deforested areas.

### 🧠 Change Detection with Vision LLM (BLIP2)
- Compare segmented images from different time frames.
- Detect deforestation trends and highlight affected areas.

### 🚨 Alert System
- Flags areas with significant tree cover loss.
- Generates reports and heatmaps for visualization.
- Sends notifications via WhatsApp (Twilio API).

---

## 💻 Tech Stack
| Component | Technology |
|-----------|------------|
| **Frontend** | Next.js (React), Mapbox/Google Maps API |
| **Backend** | Flask/Django (API), Firebase (DB), AWS Lambda (serverless) |
| **AI/ML** | U-Net (CNN) for segmentation, GDAL/NDVI for preprocessing, BLIP2 for analysis |
| **APIs** | Google Earth Engine, Bhuvan API, Twilio for WhatsApp alerts |

---

## 🏢 Business Model
### 🎯 Target Audience
- **B2G**: Government agencies (MCD, DPCC, Ministry of Environment) for policy monitoring.
- **B2B**: Corporations with ESG mandates (e.g., Tata, Reliance), real estate firms, and research institutions.
- **B2C**: NGOs, eco-conscious citizens, and schools for awareness programs.

### 💰 Revenue Streams
- Paid API access for startups, researchers.
- Subscription-based environmental reports & analytics.
- Data insights for NCAP & CAMPA initiatives.

---

## 📈 Impact & Future Scope
### 🌍 Immediate Impact
- Real-time deforestation detection.
- Public engagement through alerts, forums, and dashboards.
- Improved pollution tracking for faster response.

### 🚀 Future Expansion
- Expand monitoring to NCR, Mumbai, and other deforestation-prone regions.
- Integrate IoT sensors for on-ground validation.
- Implement predictive analytics (LSTM) to forecast deforestation hotspots.
- Enable carbon credit tracking to support reforestation incentives.

---

## 🚀 Getting Started
### 🔧 Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/greensentinel.git
   cd greensentinel
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt  # Backend
   npm install  # Frontend
   ```
3. Run the backend server:
   ```bash
   flask run
   ```
4. Start the frontend:
   ```bash
   npm start
   ```

---

## 👨‍💻 Contributors
**Team Doraemon**
- Prince Prajapati
- Sakshi Kundra
- Maaz Ahmad
- Vansh Babbar
- Kosang Yadav

---

## 📜 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🌱 Conclusion
GreenSentinel leverages AI and satellite data to empower policymakers, corporations, and citizens to combat deforestation and pollution. By making technology an ally in environmental conservation, we aim to preserve green spaces for future generations. 🌎💚

> **Let’s take action today for a greener tomorrow!**

