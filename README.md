# Exclusive E-Commerce

Exclusive is a responsive e-commerce website built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It features an admin panel for managing products, users, transactions, and orders. The website is designed to be responsive, ensuring seamless usage across various devices including mobile, tablet, and desktop.

## Preview

[Exclusive E-Commerce](https://exclusive-ecommerce-omega.vercel.app/)

## Features

- Responsive design for mobile, tablet, and desktop.
- Admin panel for product management, user management, and order tracking.
- Integrated payment gateway using Stripe.
- Free to use with no licensing restrictions.

## Contact

For any inquiries or support, please contact:

- Email: vinitparmar03@gmail.com
- Instagram: https://www.instagram.com/vinitprajapat16/
- Whatsapp: [Contact us on WhatsApp](https://wa.me/9672240149)


## Installation

To download and use Exclusive E-Commerce:

1. Clone the repository: `git clone https://github.com/Vinitparmar03/Exclusive-ecommerce`
2. Navigate to the project directory of frontend: `cd frontend `
3. Navigate to the project directory of backend: `cd backend `
4. Install dependencies in each folder(frontend & backend): `npm install`
5. Create a `.env` file in the root directory of each folder(frontend, backend) and specify the required environment variables:



    ```
    PORT = 5000
    MONGO_URI = mongodb://localhost:27017/Exclusive
    STRIPE_KEY = enter your private stripe key

    CLIENT_ID = enter your client ID of the imgur
    CLIENT_SECRET = enter your client secret of the imgur
    ```

    ```
    VITE_SERVER = https://exclusive-ecommerce-mo9h.onrender.com
    VITE_STRIPE_KEY = enter your publishable key here
    ```

5. Start the development server: `npm start`

## Obtaining Stripe API Keys

To obtain your Stripe API keys:

1. Sign in to your Stripe account or create a new one at [Stripe Dashboard](https://dashboard.stripe.com/register).
2. Navigate to the Developers > API Keys section.
3. Copy your Secret Key and Publishable Key and paste them into your `.env` file.

## Obtaining Imgur API Credentials

To obtain your Imgur API credentials:

1. Sign in to your Imgur account or create a new one at [Imgur Register](https://imgur.com/register).
2. Navigate to the API Keys section > https://apidocs.imgur.com/ > Go to Registration Quick Start.
3. Register a new application to obtain your Client ID and Client Secret.
4. Copy your Client ID and Client Secret and paste them into your `.env` file.


## Usage

- Access the website at `http://localhost:5173/`.
- Use the admin panel to add, delete, and manage products.
- Monitor user activity, transactions, and orders through the admin dashboard.

## Authors
- [@VinitParmar](https://www.github.com/vinitparmar03)

