# Doc-Wave
The College Document Printing Management System is a powerful platform built with Next.js 14, designed to simplify document printing for colleges. It uses Clerk for secure user authentication and MongoDB for data storage.

# Project Link
https://doc-wave.vercel.app/

# ⚙️ Tech Stack
- Node.js
- Next.js
- TypeScript
- TailwindCSS
- Razorpay
- Zod
- React Hook Form
- uploadthing

# User Features

1. **Authentication and Management**:
   - **Clerk Integration**: Advanced user authentication ensures secure access.
   - **User Management**: Seamlessly handles user data and roles.

2. **Document Upload and Order History**:
   - **Upload Documents**: Users can upload documents and fill out a detailed form specifying:
     - Paper Type
     - Department
     - Color
     - Sides
     - Page Orientation
     - Binding
     - Number of Copies
     - Delivery Date and Time
   - **Store and Retrieve URLs**: Uses Uploadthings to store document images and returns URLs, which are saved in the order model in MongoDB.
   - **Order History**: Users can view past and current orders, tracking status and collection time slots.

3. **Payment Gateway**:
   - **Razorpay Integration**: Supports various payment methods including UPI, QR scanner, and cards.
   - **Redirect on Payment**: After successful payment, users are redirected to the recent orders page.
  
# Admin Features

1. **Order Management**:
   - **View Incoming Orders**: Admins can see all new orders.
   - **Order Processing**: Admins can initiate the printing process, assign collection time slots, and update order statuses.

# Technical Details

- **Frontend**: Built with Next.js 14 for a seamless, responsive user experience.
- **Backend**: Utilizes MongoDB for efficient storage and retrieval of user and order data.
- **Security**: Advanced authentication mechanisms ensure user data is protected.
- **Payment Processing**: Secure and versatile payment options via Razorpay.

The College Document Printing Management System is a comprehensive, secure, and user-friendly solution for managing document printing tasks within a college. By integrating advanced technologies and features, it ensures efficient handling of print orders from submission to collection.


