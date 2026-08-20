# Software Requirements Specification (SRS)

## Cab Booking System

**Document Version:** 1.0  
**Date:** 2026-08-20  
**Author:** Vo Tat Thien - 22652711  

---

## Table of Contents

1. [Introduction](#1-introduction)  
2. [Overall Description](#2-overall-description)  
3. [Specific Requirements](#3-specific-requirements)  
4. [System Features](#4-system-features)  
5. [Non-Functional Requirements](#5-non-functional-requirements)  
6. [Appendices](#6-appendices)  

---

## 1. Introduction

### 1.1 Purpose
This document provides a complete Software Requirements Specification (SRS) for the **Cab Booking System**. It describes the functional and non-functional requirements for the system, which allows customers to book cabs online and manage their trips efficiently.

### 1.2 Scope
The Cab Booking System is a web/mobile application that enables:
- Customers to book, track, and manage cab rides.
- Drivers to accept ride requests and navigate to destinations.
- Admins to manage the fleet, drivers, and monitor system operations.

### 1.3 Definitions, Acronyms, and Abbreviations

| Term | Definition |
|------|-----------|
| SRS | Software Requirements Specification |
| API | Application Programming Interface |
| GPS | Global Positioning System |
| UI | User Interface |
| Admin | System Administrator |

### 1.4 References
- IEEE 830-1998 Standard for Software Requirements Specification
- Customer Requirement Document

### 1.5 Overview
The remainder of this document provides a detailed description of the system requirements, organized by functional areas and non-functional attributes.

---

## 2. Overall Description

### 2.1 Product Perspective
The Cab Booking System is a standalone system that integrates with:
- **GPS/Map Services** for real-time location tracking and route navigation.
- **Payment Gateway** for online payment processing.
- **SMS/Email Services** for notifications.

### 2.2 Product Functions
The major functions of the system include:
- User Registration & Authentication
- Cab Booking & Scheduling
- Real-time Cab Tracking
- Fare Calculation & Payment
- Rating & Review System
- Admin Dashboard & Reporting

### 2.3 User Classes and Characteristics

| User Class | Description |
|-----------|-------------|
| **Customer** | End users who book cab rides. They interact with the system via web or mobile app. |
| **Driver** | Cab drivers who receive and fulfill ride requests. They use the driver app. |
| **Admin** | System administrators who manage drivers, vehicles, and system configurations. |

### 2.4 Operating Environment
- **Client:** Web browsers (Chrome, Firefox, Safari, Edge), Mobile (iOS, Android)
- **Server:** Cloud-based infrastructure
- **Database:** Relational database (e.g., MySQL, PostgreSQL)

### 2.5 Design and Implementation Constraints
- The system must comply with local transportation regulations.
- Payment processing must be PCI-DSS compliant.
- The system must support multiple concurrent users.

### 2.6 Assumptions and Dependencies
- Users have access to a stable internet connection.
- GPS is enabled on the user's device.
- Third-party services (Maps API, Payment Gateway) are available.

---

## 3. Specific Requirements

### 3.1 Functional Requirements

#### FR-01: User Registration
- **Description:** The system shall allow new users (customers and drivers) to register with email, phone number, and password.
- **Priority:** High
- **Input:** Name, Email, Phone, Password
- **Output:** Account created, confirmation email/SMS sent

#### FR-02: User Login/Authentication
- **Description:** The system shall authenticate users using email/phone and password.
- **Priority:** High
- **Input:** Email/Phone, Password
- **Output:** Authentication token, access to user dashboard

#### FR-03: Book a Cab
- **Description:** The system shall allow customers to book a cab by specifying pickup and drop-off locations.
- **Priority:** High
- **Input:** Pickup location, Drop-off location, Ride type (economy, premium)
- **Output:** Booking confirmation, estimated fare, ETA

#### FR-04: Real-time Tracking
- **Description:** The system shall provide real-time GPS tracking of the assigned cab.
- **Priority:** High
- **Input:** Active booking ID
- **Output:** Live location on map, ETA updates

#### FR-05: Fare Calculation
- **Description:** The system shall calculate the fare based on distance, time, ride type, and surge pricing.
- **Priority:** High
- **Input:** Distance, Duration, Ride type, Surge multiplier
- **Output:** Total fare amount

#### FR-06: Payment Processing
- **Description:** The system shall support multiple payment methods including cash, credit/debit card, and e-wallets.
- **Priority:** High
- **Input:** Payment method, Amount
- **Output:** Payment confirmation, receipt

#### FR-07: Rating & Review
- **Description:** The system shall allow customers to rate drivers and provide feedback after completing a trip.
- **Priority:** Medium
- **Input:** Rating (1-5 stars), Review text
- **Output:** Rating saved, driver average rating updated

#### FR-08: Ride History
- **Description:** The system shall maintain a history of all rides for both customers and drivers.
- **Priority:** Medium
- **Input:** User ID
- **Output:** List of past rides with details

#### FR-09: Driver Availability Management
- **Description:** The system shall allow drivers to set their availability status (online/offline).
- **Priority:** High
- **Input:** Driver ID, Status toggle
- **Output:** Updated availability status

#### FR-10: Admin Dashboard
- **Description:** The system shall provide an admin dashboard for managing drivers, vehicles, and viewing reports.
- **Priority:** High
- **Input:** Admin credentials
- **Output:** Dashboard with analytics, management tools

---

## 4. System Features

### 4.1 Cab Booking Module
- Search for available cabs nearby
- Select ride type (economy, premium, shared)
- Schedule rides in advance
- Cancel bookings

### 4.2 Driver Management Module
- Driver registration and verification
- Document upload (license, insurance)
- Earnings tracking
- Ride assignment algorithm

### 4.3 Payment Module
- Multiple payment methods
- Fare estimation before booking
- Invoice generation
- Refund processing

### 4.4 Notification Module
- Push notifications for ride status updates
- SMS alerts for booking confirmation
- Email receipts after ride completion

### 4.5 Admin Module
- User management (customers & drivers)
- Vehicle fleet management
- Analytics and reporting
- Surge pricing configuration

---

## 5. Non-Functional Requirements

### 5.1 Performance
- The system shall handle at least **1000 concurrent users**.
- Booking confirmation shall be processed within **3 seconds**.
- Real-time tracking shall update every **5 seconds**.

### 5.2 Security
- All data transmission shall be encrypted using **TLS 1.2+**.
- User passwords shall be hashed using **bcrypt**.
- The system shall implement **role-based access control (RBAC)**.

### 5.3 Reliability
- The system shall have **99.9% uptime**.
- The system shall implement automatic failover mechanisms.

### 5.4 Scalability
- The system shall be designed to scale horizontally to handle increased load.
- Database shall support sharding for large datasets.

### 5.5 Usability
- The UI shall be intuitive and require no training for customers.
- The system shall support **Vietnamese** and **English** languages.
- The app shall be responsive across different screen sizes.

### 5.6 Maintainability
- The system shall follow **microservices architecture** for easy maintenance.
- Code shall follow clean code principles and include comprehensive documentation.

---

## 6. Appendices

### 6.1 Use Case Diagram

```
+------------------+
|    Customer      |
+------------------+
| - Register       |
| - Login          |
| - Book Cab       |
| - Track Ride     |
| - Make Payment   |
| - Rate Driver    |
| - View History   |
+------------------+

+------------------+
|    Driver        |
+------------------+
| - Register       |
| - Login          |
| - Set Status     |
| - Accept Ride    |
| - Navigate       |
| - View Earnings  |
+------------------+

+------------------+
|    Admin         |
+------------------+
| - Manage Users   |
| - Manage Fleet   |
| - View Reports   |
| - Set Pricing    |
+------------------+
```

### 6.2 Data Flow Overview

1. **Customer** → Books a ride → **System** → Finds nearest available driver
2. **System** → Sends ride request → **Driver** → Accepts/Rejects
3. **Driver** → Picks up customer → **GPS Tracking** → Real-time updates
4. **Trip Completed** → **Fare Calculated** → **Payment Processed**
5. **Customer** → Rates driver → **System** → Updates driver profile

---

*Document prepared by: Vo Tat Thien (22652711)*  
*Last updated: 2026-08-20*
